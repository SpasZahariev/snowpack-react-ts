import { useEffect, useRef, ReactNode } from 'react';

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

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  const anchorClasses = {
    bottom: 'bottom-0 left-0 right-0 rounded-t-2xl animate-slide-up',
    left: 'top-0 bottom-0 left-0 w-64',
    right: 'top-0 bottom-0 right-0 w-64',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 transition-opacity"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={drawerRef}
        className={`fixed bg-base shadow-lg ${anchorClasses[anchor]}`}
      >
        {children}
      </div>
    </div>
  );
}
