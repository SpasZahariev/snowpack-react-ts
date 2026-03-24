import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  anchor?: 'bottom' | 'left' | 'right';
  children: ReactNode;
}

export function Drawer({ open, onClose, anchor = 'bottom', children }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open || typeof document === 'undefined') return null;

  const anchorClasses = {
    bottom:
      'bottom-0 left-0 right-0 w-full max-w-[100vw] rounded-t-xl border-t border-pink/15 bg-mantle/95 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md animate-slide-up',
    left: 'top-0 bottom-0 left-0 w-64 max-w-[85vw]',
    right: 'top-0 bottom-0 right-0 w-64 max-w-[85vw]',
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] transition-opacity"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`fixed z-[101] ${anchorClasses[anchor]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
