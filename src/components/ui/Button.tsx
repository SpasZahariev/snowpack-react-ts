import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  target?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'px-6 py-2 border border-pink text-pink rounded hover:bg-pink hover:text-base transition-colors duration-200 cursor-pointer bg-transparent',
  outline: 'px-4 py-2 border border-pink text-pink rounded hover:bg-pink hover:text-base transition-colors duration-200 cursor-pointer bg-transparent text-sm',
  ghost: 'px-4 py-2 text-pink hover:bg-surface0/50 transition-colors duration-200 cursor-pointer bg-transparent rounded',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', href, target, children, ...props }, ref) => {
    const classes = `${variantClasses[variant]} ${className}`.trim();

    if (href) {
      return (
        <a href={href} target={target} className="no-underline">
          <button ref={ref} className={classes} {...props}>
            {children}
          </button>
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
