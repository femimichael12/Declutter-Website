export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-square w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="flex items-center justify-between">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return <div className="skeleton h-[400px] w-full rounded-3xl" />;
}
