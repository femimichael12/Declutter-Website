import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  link?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, link, linkLabel = 'View all' }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold text-navy-900 sm:text-3xl"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <p className="mt-1 text-sm text-navy-500">{subtitle}</p>
        )}
      </div>
      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-sm font-semibold text-royal-600 hover:gap-2 transition-all"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
