import { useState } from 'react';
import { Package, Smartphone, Laptop, Tablet, Watch, Tv, Gamepad2, Headphones, Camera, Microwave, Cable } from 'lucide-react';

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
  categorySlug?: string;
}

const categoryIcons: Record<string, typeof Package> = {
  phones: Smartphone,
  laptops: Laptop,
  tablets: Tablet,
  'smart-watches': Watch,
  tvs: Tv,
  'gaming-consoles': Gamepad2,
  speakers: Headphones,
  cameras: Camera,
  'home-appliances': Microwave,
  accessories: Cable,
};

export function ProductImage({ src, alt, className = '', categorySlug, ...props }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  function handleError() {
    if (import.meta.env.DEV) {
      console.warn(`[ProductImage] Failed to load image for "${alt}": ${src}`);
    }
    setHasError(true);
  }

  if (!src || hasError) {
    const Icon = (categorySlug && categoryIcons[categorySlug]) ? categoryIcons[categorySlug] : Package;
    return (
      <div className={`flex flex-col items-center justify-center bg-navy-50 text-navy-400 p-4 text-center select-none ${className}`}>
        <Icon className="h-10 w-10 text-navy-300 mb-1" />
        <span className="text-[11px] font-medium text-navy-500 line-clamp-1 max-w-[90%]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
