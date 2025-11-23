import { ElementType, ReactNode, HTMLAttributes } from 'react';
import './text.css';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'label';
  children: ReactNode;
  className?: string;
}

export function Text({
  as: Component = 'p',
  variant = 'body',
  children,
  className = '',
  ...props
}: TextProps) {
  return (
    <Component className={`text text--${variant} ${className}`} {...props}>
      {children}
    </Component>
  );
}
