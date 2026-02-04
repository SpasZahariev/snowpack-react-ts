import { AnchorHTMLAttributes, ReactNode } from 'react';

interface IconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function IconLink({ children, className = '', ...props }: IconLinkProps) {
  return (
    <a
      className={`text-dark-blue hover:text-very-blue transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
