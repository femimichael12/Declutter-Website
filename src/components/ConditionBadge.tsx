import type { Condition } from '@/types';
import { BadgeCheck, Award, Star, CheckCircle2 } from 'lucide-react';

const config: Record<Condition, { color: string; icon: typeof BadgeCheck }> = {
  'Brand New': { color: 'bg-emerald-100 text-emerald-700', icon: BadgeCheck },
  'Like New': { color: 'bg-royal-100 text-royal-700', icon: Award },
  Excellent: { color: 'bg-royal-100 text-royal-700', icon: Star },
  'Very Good': { color: 'bg-amber-100 text-amber-700', icon: Star },
  Good: { color: 'bg-amber-100 text-amber-700', icon: CheckCircle2 },
  Fair: { color: 'bg-navy-100 text-navy-600', icon: CheckCircle2 },
};

export function ConditionBadge({ condition, size = 'sm' }: { condition: Condition; size?: 'sm' | 'xs' }) {
  const c = config[condition];
  const Icon = c.icon;
  return (
    <span className={`badge ${c.color} ${size === 'xs' ? 'text-[10px] px-2 py-0.5' : ''}`}>
      <Icon className={size === 'xs' ? 'h-2.5 w-2.5' : 'h-3 w-3'} />
      {condition}
    </span>
  );
}
