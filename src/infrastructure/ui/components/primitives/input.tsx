import { InputHTMLAttributes, forwardRef } from 'react';
import './input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', ...props },
  ref
) {
  return <input ref={ref} className={`input ${className}`} {...props} />;
});
