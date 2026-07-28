const PRESET_CLASS = {
  g2ekjm: 't-display',
  '1o1rag8': 't-hero',
  '1jwh9zw': 't-h3',
  adw3nh: 't-h4',
  '1s63em2': 't-h5',
  '1ridul0': 't-h6',
  '1wtb5pn': 't-body',
  '9if2k7': 't-body-lg',
  '6uco42': 't-small',
};

const TAG_FALLBACK = {
  h1: 't-hero',
  h2: 't-display',
  h3: 't-h3',
  h4: 't-h4',
  h5: 't-h5',
  h6: 't-h6',
  p: 't-body',
};

/**
 * Renders one rich-text section of a case study. Items keep the original
 * document order, including images that were placed inline in the copy.
 */
export default function RichBlock({ items }) {
  return (
    <div className="rich">
      {items.map((item, i) => {
        if (item.tag === 'img') {
          // Inline images keep their authored size; `max-width: 100%` caps them
          // to the column and `height: auto` preserves the ratio.
          return (
            <img
              key={i}
              src={item.src}
              alt={item.alt || ''}
              loading="lazy"
              width={item.w}
              height={item.h}
              style={{
                aspectRatio: String(item.ratio),
                marginTop: `${item.mt ?? 20}px`,
              }}
            />
          );
        }

        const Tag = item.tag;
        const cls = PRESET_CLASS[item.preset] || TAG_FALLBACK[item.tag] || 't-body';
        const style = item.preset === '1wtb5pn' ? { color: 'var(--c-80)' } : undefined;

        return (
          <Tag
            key={i}
            className={cls}
            style={style}
            dangerouslySetInnerHTML={{ __html: item.html }}
          />
        );
      })}
    </div>
  );
}
