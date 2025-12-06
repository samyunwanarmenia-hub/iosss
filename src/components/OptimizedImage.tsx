"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
  fetchPriority?: 'auto' | 'high' | 'low';
  unoptimized?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 1200,
  height = 800,
  className,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  fetchPriority = 'auto',
  unoptimized = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const normalizeSrc = (value?: string) => {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
      return trimmed;
    }
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  };

  const normalizedSrc = normalizeSrc(src);

  if (!normalizedSrc) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-gray-200 p-6 text-gray-500 dark:bg-gray-800 dark:text-gray-300 ${className}`}
      >
        <ImageOff className="h-10 w-10" />
      </div>
    );
  }

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-gray-200 p-6 text-gray-500 dark:bg-gray-800 dark:text-gray-300 ${className}`}
      >
        <ImageOff className="h-10 w-10" />
      </div>
    );
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      sizes={sizes}
      priority={priority}
      fetchPriority={fetchPriority}
      unoptimized={unoptimized}
      onError={() => setImageError(true)}
    />
  );
};

export default OptimizedImage;
