import { HTMLAttributes } from 'react';

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: 'default' | 'outlined';
}

export function Chip({ label, variant = 'outlined', className = '', ...props }: ChipProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 text-xs rounded-full mr-2 mb-2';
  const variantClasses = variant === 'outlined' 
    ? 'border border-mauve text-mauve' 
    : 'bg-surface0 text-mauve';

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {label}
    </span>
  );
}
