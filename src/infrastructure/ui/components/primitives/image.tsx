import NextImage, { ImageProps as NextImageProps } from 'next/image';
import './image.css';

interface ImageProps extends NextImageProps {
  variant?: 'square' | 'circle';
  className?: string;
}

export function Image({ variant = 'square', className = '', ...props }: ImageProps) {
  return <NextImage className={`image image--${variant} ${className}`} {...props} />;
}
