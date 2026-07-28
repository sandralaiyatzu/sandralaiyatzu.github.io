#!/usr/bin/env python3
"""
Convert a case-study Markdown file into the block JSON the site renders.

Output schema (consumed by src/components/RichBlock.jsx):

  [{"type": "rich", "items": [ {...}, ... ]}, ...]

Item tags map onto the existing design-system presets:
  h6  -> .t-h6   (Inter 700 18px)   section heading   -- from "##"
  h5  -> .t-h5   (Inter 700 20px)   sub-heading       -- from "###"
  p   -> .t-small(Inter 14px)       body copy
  lead-> .t-body (Satoshi 16px)     the page intro
  meta-> .t-small                   role / date line
  ul / ol / quote / table / img     structural blocks

Editorial sections ("待你確認" / "待補") are private notes and never emitted.
"""

import json
import re
import sys
from pathlib import Path

SKIP_HEADINGS = ('待你確認', '待補', '待確認')

# Section headings that only label the source document, not the page
DROP_SECTIONS = ('Hook',)


def inline(text):
    """Markdown inline syntax -> the small HTML subset RichBlock allows."""
    text = text.strip()
    text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', '', text)          # images: pending
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', text)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    return text.strip()


def parse(md_path):
    lines = Path(md_path).read_text(encoding='utf-8').split('\n')
    items = []
    title = subtitle = meta = None
    i = 0
    skipping = False

    def flush_para(buf):
        if not buf:
            return
        html = inline('<br/>'.join(b.strip() for b in buf if b.strip()))
        if html:
            items.append({'tag': 'p', 'html': html})

    para = []

    while i < len(lines):
        raw = lines[i]
        line = raw.rstrip()
        stripped = line.strip()

        # ── headings ──────────────────────────────────────────────
        m = re.match(r'^(#{1,6})\s+(.*)$', stripped)
        if m:
            flush_para(para); para = []
            level, text = len(m.group(1)), m.group(2).strip()

            if any(k in text for k in SKIP_HEADINGS):
                skipping = True
                i += 1
                continue
            skipping = False

            if level == 1:
                parts = [p.strip() for p in re.split(r'[｜|]', text, 1)]
                title = parts[0]
                subtitle = parts[1] if len(parts) > 1 else None
            elif text.strip('# ') in DROP_SECTIONS:
                pass  # the hook body still renders, just not its label
            else:
                items.append({'tag': 'h6' if level == 2 else 'h5',
                              'html': inline(text)})
            i += 1
            continue

        if skipping:
            i += 1
            continue

        # ── horizontal rule ───────────────────────────────────────
        if re.fullmatch(r'-{3,}|\*{3,}', stripped):
            flush_para(para); para = []
            i += 1
            continue

        # ── the bold meta line right under the title ──────────────
        if meta is None and title and re.fullmatch(r'\*\*.+\*\*', stripped):
            meta = inline(stripped)
            i += 1
            continue

        # ── table ─────────────────────────────────────────────────
        if stripped.startswith('|') and i + 1 < len(lines) \
                and re.match(r'^\|[\s:|-]+\|$', lines[i + 1].strip()):
            flush_para(para); para = []
            header = [c.strip() for c in stripped.strip('|').split('|')]
            i += 2
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                rows.append([inline(c.strip())
                             for c in lines[i].strip().strip('|').split('|')])
                i += 1
            items.append({'tag': 'table',
                          'head': [inline(h) for h in header],
                          'rows': rows})
            continue

        # ── blockquote ────────────────────────────────────────────
        if stripped.startswith('>'):
            flush_para(para); para = []
            buf = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                buf.append(lines[i].strip().lstrip('>').strip())
                i += 1
            items.append({'tag': 'quote',
                          'html': inline('<br/>'.join(b for b in buf if b))})
            continue

        # ── lists ─────────────────────────────────────────────────
        if re.match(r'^\s*[-*]\s+', line) or re.match(r'^\s*\d+\.\s+', line):
            flush_para(para); para = []
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
            items.append({'tag': 'ol' if ordered else 'ul', 'entries': entries})
            continue

        # ── blank line ends a paragraph ───────────────────────────
        if not stripped:
            flush_para(para); para = []
            i += 1
            continue

        para.append(stripped)
        i += 1

    flush_para(para)

    # Trim a leading empty run and collapse doubled headings
    while items and items[0]['tag'] in ('h5', 'h6') and len(items) > 1 \
            and items[1]['tag'] in ('h5', 'h6'):
        items.pop(0)

    return {
        'title': title,
        'subtitle': subtitle,
        'meta': meta,
        'blocks': [{'type': 'rich', 'items': items}],
    }


if __name__ == '__main__':
    src, dest = sys.argv[1], sys.argv[2]
    data = parse(src)
    Path(dest).write_text(
        json.dumps(data, ensure_ascii=False, indent=1), encoding='utf-8')
    n = len(data['blocks'][0]['items'])
    print(f'{Path(dest).name:22} {n:3} items   title={data["title"]}')
