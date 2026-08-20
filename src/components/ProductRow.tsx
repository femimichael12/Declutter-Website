import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

export function ProductRow({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 'left' | 'right') {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-[200px] sm:w-[240px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full glass-strong shadow-soft hover:scale-110 transition"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 text-navy-600" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full glass-strong shadow-soft hover:scale-110 transition"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5 text-navy-600" />
      </button>
    </div>
  );
}
