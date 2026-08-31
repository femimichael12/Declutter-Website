import type { Condition } from '@/types';
import { BadgeCheck, Award, Star, CheckCircle2, ShieldCheck, Box, RefreshCw } from 'lucide-react';

const config: Record<Condition, { color: string; icon: typeof BadgeCheck }> = {
  'Brand New': { color: 'bg-emerald-100 text-emerald-700', icon: BadgeCheck },
  'Open Box': { color: 'bg-sky-100 text-sky-700', icon: Box },
  'Certified Pre-Owned': { color: 'bg-royal-100 text-royal-700', icon: ShieldCheck },
  'Pre-Owned': { color: 'bg-amber-100 text-amber-700', icon: Award },
  'Refurbished': { color: 'bg-purple-100 text-purple-700', icon: RefreshCw },
  'Like New': { color: 'bg-royal-100 text-royal-700', icon: Award },
  'Excellent': { color: 'bg-royal-100 text-royal-700', icon: Star },
  'Very Good': { color: 'bg-amber-100 text-amber-700', icon: Star },
  'Good': { color: 'bg-amber-100 text-amber-700', icon: CheckCircle2 },
  'Fair': { color: 'bg-navy-100 text-navy-600', icon: CheckCircle2 },
};

export function ConditionBadge({ condition, size = 'sm' }: { condition: Condition; size?: 'sm' | 'xs' }) {
  if (condition === 'Brand New') return null;
  const c = config[condition];
  if (!c) return null;
  const Icon = c.icon;
  return (
    <span className={`badge ${c.color} ${size === 'xs' ? 'text-[10px] px-2 py-0.5' : ''}`}>
      <Icon className={size === 'xs' ? 'h-2.5 w-2.5' : 'h-3 w-3'} />
      {condition}
    </span>
  );
}
