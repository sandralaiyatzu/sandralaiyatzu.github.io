import { useEffect, useRef } from 'react';

/**
 * Full-screen view of a case-study image. Closes on Escape, on a click
 * outside the picture, and via the close button. Focus moves to the dialog
 * on open and returns to the trigger on close.
 */
export default function Lightbox({ image, onClose }) {
  const closeRef = useRef(null);
  const restoreTo = useRef(null);

  useEffect(() => {
    if (!image) return;

    restoreTo.current = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      // Keep tabbing inside the dialog — it only holds the close button
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      restoreTo.current?.focus?.();
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
      onClick={onClose}
    >
      <button
        type="button"
        ref={closeRef}
        className="lb__close"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="lb__bar" />
        <span className="lb__bar" />
      </button>

      <img
        className="lb__img"
        src={image.src}
        alt={image.alt || ''}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
