#!/usr/bin/env python3
"""
Convert a case-study Markdown file into the block JSON the site renders.

Document rules (kept deliberately simple):

    #            page title            50px   .t-display
    ##           section heading       20px   .t-h4
    everything   body copy             14px   .t-small
    圖片佔位      an image placeholder

The first paragraph under the title is split: its first line becomes the
byline (role / dates), the rest becomes the lead.

Output:

    {
      "title": str, "meta": str|None, "lead": str|None,
      "blocks": [ {"type":"rich","items":[...]} | {"type":"image", ...} ]
    }

"---" rules are separators and are dropped. Editorial sections
("待你確認" / "待補") are private notes and are never emitted.
"""

import json
import re
import struct
import sys
from pathlib import Path

SKIP_HEADINGS = ('待你確認', '待補', '待確認')
DEFAULT_RATIO = 1.9091

# "圖片佔位", "圖片 1 佔位", "圖片 5, 6 佔位", "圖片佔位(待補，圖片編號 6, 7)"
IMAGE_LINE = re.compile(r'^圖片\s*([\d\s,、]*)\s*佔位(.*)$')


def png_ratio(path):
    """Aspect ratio straight from the file header — no dependencies."""
    try:
        with open(path, 'rb') as f:
            head = f.read(33)
        if head[:8] == b'\x89PNG\r\n\x1a\n':
            w, h = struct.unpack('>II', head[16:24])
            return round(w / h, 4)
    except OSError:
        pass
    return DEFAULT_RATIO


def resolve_slot(numbers, img_dir, slug):
    """Map the numbers in an image slot onto real files, if they exist."""
    found = []
    for n in numbers:
        for ext in ('png', 'jpg', 'jpeg', 'gif'):
            rel = f'{slug}/{n}.{ext}'
            full = Path(img_dir) / rel if img_dir else None
            if full and full.exists():
                ratio = png_ratio(full) if ext == 'png' else DEFAULT_RATIO
                found.append({'src': f'/images/{rel}', 'alt': '', 'ratio': ratio})
                break
    return found


def inline(text):
    """Markdown inline syntax -> the small HTML subset RichBlock allows."""
    text = text.strip()
    text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', '', text)
    def _link(label, url):
        """External links leave the portfolio, so open them in a new tab."""
        url = url.strip()
        if not re.match(r'^[a-zA-Z][\w+.-]*:', url) and not url.startswith('/'):
            url = 'https://' + url
        attrs = ''
        if url.startswith(('http://', 'https://')):
            attrs = ' target="_blank" rel="noreferrer"'
        return f'<a href="{url}"{attrs}>{label.strip()}</a>'

    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)',
                  lambda m: _link(m.group(1), m.group(2)), text)

    # "（連結至：…）" turns the preceding text into a link. The URL may be
    # written bare ("ruhachu.com") or with a scheme.
    text = re.sub(
        r'^(.*?)\s*[（(]\s*連結至\s*[：:]\s*([^\s）)]+)\s*[）)]\s*$',
        lambda m: _link(m.group(1), m.group(2)), text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', text)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    return text.strip()


def parse(md_path, img_dir=None, slug=None):
    lines = Path(md_path).read_text(encoding='utf-8').split('\n')

    title = meta = lead = None
    blocks = []
    items = []          # items of the rich block currently being built
    para = []
    skipping = False
    seen_first_para = False

    def flush_para():
        nonlocal para, meta, lead, seen_first_para
        if not para:
            return
        rows = [p.strip() for p in para if p.strip()]
        para = []
        if not rows:
            return
        # The first paragraph under the title carries the byline and the hook
        if title and not seen_first_para and not items and not blocks:
            seen_first_para = True
            meta = inline(rows[0])
            if len(rows) > 1:
                lead = inline('<br/>'.join(rows[1:]))
            return
        # A leading "01 | …" line labels the copy beneath it. Emit it as its
        # own item so a label always sits in the same relationship to its
        # body, whether the source glued them together or not.
        if re.match(r'^\d{1,2}\s*[|｜]', rows[0]):
            items.append({'tag': 'label', 'html': inline(rows[0])})
            rows = rows[1:]
            if not rows:
                return
        items.append({'tag': 'p',
                      'html': '<br/>'.join(inline(r) for r in rows)})

    def close_rich():
        nonlocal items
        if items:
            blocks.append({'type': 'rich', 'items': items})
            items = []

    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        stripped = line.strip()

        # ── headings (tolerate a missing space after the hashes) ──
        m = re.match(r'^(#{1,6})\s*(.+)$', stripped)
        if m:
            flush_para()
            level, text = len(m.group(1)), m.group(2).strip()

            if any(k in text for k in SKIP_HEADINGS):
                skipping = True
                i += 1
                continue
            skipping = False

            if level == 1:
                title = re.sub(r'<[^>]+>', '', inline(text))
            else:
                items.append({'tag': 'h4', 'html': inline(text)})
            i += 1
            continue

        if skipping:
            i += 1
            continue

        # ── image slot ────────────────────────────────────────────
        m_img = IMAGE_LINE.match(stripped)
        if m_img:
            flush_para()
            close_rich()
            nums_text, trailing = m_img.group(1), m_img.group(2)
            # "圖片佔位(待補，圖片編號 6, 7)" is still pending — not a real slot
            pending = '待補' in trailing
            nums = [] if pending else [int(x) for x in re.findall(r'\d+', nums_text)]
            images = resolve_slot(nums, img_dir, slug) if nums else []
            if images:
                blocks.append({'type': 'image', 'images': images})
            else:
                blocks.append({'type': 'image', 'placeholder': True,
                               'ratio': DEFAULT_RATIO})
            i += 1
            continue

        # ── horizontal rule: a separator, not content ─────────────
        if re.fullmatch(r'-{3,}|\*{3,}', stripped):
            flush_para()
            i += 1
            continue

        # ── table ─────────────────────────────────────────────────
        if stripped.startswith('|') and i + 1 < len(lines) \
                and re.match(r'^\|[\s:|-]+\|$', lines[i + 1].strip()):
            flush_para()
            header = [c.strip() for c in stripped.strip('|').split('|')]
            i += 2
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                rows.append([inline(c.strip())
                             for c in lines[i].strip().strip('|').split('|')])
                i += 1
            items.append({'tag': 'table',
                          'head': [inline(h) for h in header], 'rows': rows})
            continue

        # ── blockquote ────────────────────────────────────────────
        if stripped.startswith('>'):
            flush_para()
            buf = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                buf.append(lines[i].strip().lstrip('>').strip())
                i += 1
            items.append({'tag': 'quote',
                          'html': inline('<br/>'.join(b for b in buf if b))})
            continue

        # ── lists ─────────────────────────────────────────────────
        if re.match(r'^\s*[-*]\s+', line) or re.match(r'^\s*\d+\.\s+', line):
            flush_para()
            ordered = bool(re.match(r'^\s*\d+\.\s+', line))
            entries = []
            while i < len(lines):
                cur = lines[i]
                if re.match(r'^\s*[-*]\s+', cur) or re.match(r'^\s*\d+\.\s+', cur):
                    entries.append(inline(re.sub(r'^\s*(?:[-*]|\d+\.)\s+', '', cur)))
                    i += 1
                elif cur.strip() and cur.startswith(('  ', '\t')) and entries:
                    entries[-1] += '<br/>' + inline(cur.strip())
                    i += 1
                else:
                    break
            # A lone bullet with copy glued directly beneath it (no blank
            # line) is a label for that copy, not a one-item list. A lone
            # bullet followed by a blank line is a genuine list entry.
            glued = (
                len(entries) == 1 and not ordered
                and i < len(lines) and lines[i].strip()
                and not re.match(r'^\s*(?:[-*]|\d+\.)\s+', lines[i])
            )
            if glued:
                items.append({'tag': 'label', 'html': entries[0]})
            else:
                items.append({'tag': 'ol' if ordered else 'ul',
                              'entries': entries})
            continue

        if not stripped:
            flush_para()
            i += 1
            continue

        para.append(stripped)
        i += 1

    flush_para()
    close_rich()

    return {'title': title, 'meta': meta, 'lead': lead, 'blocks': blocks}


if __name__ == '__main__':
    src, dest = sys.argv[1], sys.argv[2]
    img_dir = sys.argv[3] if len(sys.argv) > 3 else None
    slug = Path(dest).stem
    data = parse(src, img_dir, slug)
    Path(dest).write_text(
        json.dumps(data, ensure_ascii=False, indent=1), encoding='utf-8')
    real = sum(len(b.get('images', [])) for b in data['blocks'])
    ph = sum(1 for b in data['blocks'] if b.get('placeholder'))
    n_txt = sum(1 for b in data['blocks'] if b['type'] == 'rich')
    print(f'{Path(dest).name:20} {n_txt:3} text  {real:3} images  '
          f'{ph:2} placeholders   {data["title"]}')
