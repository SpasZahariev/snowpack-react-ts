import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  target?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'inline-flex justify-center items-center px-6 py-2.5 font-semibold text-[1rem] border border-pink bg-pink text-[var(--color-base)] rounded hover:opacity-90 transition-all duration-200 cursor-pointer',
  outline:
    'inline-flex justify-center items-center px-6 py-2.5 font-semibold text-[1rem] border border-pink text-pink bg-transparent rounded hover:bg-pink hover:text-[var(--color-base)] transition-all duration-200 cursor-pointer',
  ghost:
    'inline-flex justify-center items-center px-6 py-2.5 font-semibold text-[1rem] text-pink hover:bg-surface0/50 transition-all duration-200 cursor-pointer bg-transparent rounded',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', className = '', href, target, children, ...props },
    ref,
  ) => {
    const classes = `${variantClasses[variant]} ${className}`.trim();

    if (href) {
      return (
        <a
          ref={ref as any}
          className={`${classes} no-underline`}
          {...(props as any)}
          href={href}
          target={target}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
