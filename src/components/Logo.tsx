import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-1.5 sm:gap-2 min-w-0 flex-shrink ${className}`}>
      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-navy-900 flex-shrink-0">
        <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-royal-500" />
      </div>
      <span className="font-display text-base sm:text-xl font-extrabold tracking-tight leading-none truncate">
        <span style={{ color: '#2563EB' }} className="">BuyAnd</span>
        <span style={{ color: '#10B981' }} className="">SellOutlets</span>
      </span>
    </Link>
  );
}
