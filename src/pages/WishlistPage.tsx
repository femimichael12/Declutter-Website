import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ProductCard';

export function WishlistPage() {
  const { items, loading } = useWishlist();

  if (loading) {
    return (
      <div className="container-page py-8">
        <div className="skeleton h-8 w-32 mb-6" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton aspect-square rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-navy-100 flex items-center justify-center mb-4">
          <Heart className="h-10 w-10 text-navy-400" />
        </div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Your wishlist is empty</h1>
        <p className="mt-2 text-navy-500">Save items you love and come back to them later.</p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">
          Browse Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-1">My Wishlist</h1>
      <p className="text-sm text-navy-500 mb-6">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => item.product && <ProductCard key={item.id} product={item.product} />)}
      </div>
    </div>
  );
}
