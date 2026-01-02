import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const variantClasses = {
      primary: 'cyber-button cyber-glow-sm',
      secondary: 'cyber-glass border-primary/50 hover:border-primary',
      accent: 'neon-border bg-accent/10 hover:bg-accent/20',
    };

    const sizeClasses = {
      default: 'h-10 px-6 py-2',
      sm: 'h-8 px-4 text-sm',
      lg: 'h-12 px-8 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

CyberButton.displayName = 'CyberButton';

export { CyberButton };