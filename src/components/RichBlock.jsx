/**
 * Case-study rich text.
 *
 * The document only has three levels: the page title (rendered by the page),
 * "##" section headings at 20px, and body copy at 14px. Older case studies
 * still carry h5/h6 items, so those map onto the same heading style.
 */
const HEADING_TAGS = new Set(['h4', 'h5', 'h6']);

const html = (s) => ({ __html: s });

export default function RichBlock({ items, onImageClick }) {
  return (
    <div className="rich">
      {items.map((item, i) => {
        if (HEADING_TAGS.has(item.tag)) {
          return (
            <h4
              key={i}
              className="t-h4"
              dangerouslySetInnerHTML={html(item.html)}
            />
          );
        }

        switch (item.tag) {
          case 'label':
            return (
              <p
                key={i}
                className="t-small rich__label"
                dangerouslySetInnerHTML={html(item.html)}
              />
            );

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
              <button
                type="button"
                key={i}
                className="rich__img"
                onClick={() => onImageClick?.(item)}
                aria-label="Enlarge image"
              >
                <img
                  src={item.src}
                  alt={item.alt || ''}
                  loading="lazy"
                  style={{ aspectRatio: String(item.ratio) }}
                />
              </button>
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
