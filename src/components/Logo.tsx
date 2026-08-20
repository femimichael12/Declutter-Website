import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 flex-shrink-0 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900">
        <ShoppingBag className="h-5 w-5 text-royal-500" />
      </div>
      <span className="font-display text-xl font-extrabold tracking-tight leading-none">
        <span style={{ color: '#2563EB' }} className="">BuyAnd</span>
        <span style={{ color: '#10B981' }} className="">SellOutlets</span>
      </span>
    </Link>
  );
}
