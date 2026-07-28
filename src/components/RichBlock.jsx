const PRESET_CLASS = {
  h5: 't-h5',
  h6: 't-h6',
  p: 't-small',
};

const html = (s) => ({ __html: s });

/**
 * Renders one section of a case study. Item order follows the source
 * Markdown; every tag maps onto an existing design-system preset.
 */
export default function RichBlock({ items }) {
  return (
    <div className="rich">
      {items.map((item, i) => {
        switch (item.tag) {
          case 'h5':
          case 'h6': {
            const Tag = item.tag;
            return (
              <Tag
                key={i}
                className={PRESET_CLASS[item.tag]}
                dangerouslySetInnerHTML={html(item.html)}
              />
            );
          }

          case 'quote':
            return (
              <blockquote
                key={i}
                className="t-small rich__quote"
                dangerouslySetInnerHTML={html(item.html)}
              />
            );

          case 'ul':
          case 'ol': {
            const Tag = item.tag;
            return (
              <Tag key={i} className="t-small rich__list">
                {item.entries.map((entry, j) => (
                  <li key={j} dangerouslySetInnerHTML={html(entry)} />
                ))}
              </Tag>
            );
          }

          case 'table':
            return (
              <div className="rich__table-wrap" key={i}>
                <table className="t-small rich__table">
                  <thead>
                    <tr>
                      {item.head.map((cell, j) => (
                        <th key={j} dangerouslySetInnerHTML={html(cell)} />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k} dangerouslySetInnerHTML={html(cell)} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'img':
            return (
              <img
                key={i}
                src={item.src}
                alt={item.alt || ''}
                loading="lazy"
                style={{ aspectRatio: String(item.ratio) }}
              />
            );

          default:
            return (
              <p
                key={i}
                className="t-small"
                dangerouslySetInnerHTML={html(item.html)}
              />
            );
        }
      })}
    </div>
  );
}
