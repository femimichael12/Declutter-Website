import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, Truck, RotateCcw, Headphones, ShoppingBag } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Logo } from './Logo';

const trustBadges = [
  { icon: Shield, title: 'Secure Payment', desc: 'Paystack & Flutterwave' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide shipping' },
  { icon: RotateCcw, title: '7-Day Returns', desc: 'Hassle-free returns' },
  { icon: Headphones, title: 'Expert Support', desc: 'WhatsApp & email' },
];

const footerLinks = {
  Shop: [
    { label: 'All Products', path: '/products' },
    { label: 'Flash Deals', path: '/products?filter=flash-deals' },
    { label: 'Pre-Owned', path: '/products?condition=pre-owned' },
    { label: 'New Arrivals', path: '/products?sort=newest' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ],
  Policies: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Return Policy', path: '/return-policy' },
    { label: 'Delivery Information', path: '/delivery' },
  ],
};

export function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="mt-20 border-t border-navy-100 bg-navy-50/50">
      {/* Trust badges */}
      <div className="border-b border-navy-100">
        <div className="container-page py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.title} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-100">
                    <Icon className="h-5 w-5 text-royal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{badge.title}</p>
                    <p className="text-xs text-navy-500">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-3 text-sm text-navy-500 max-w-sm">
              Premium electronics and appliances — brand-new and certified pre-owned, professionally inspected and backed by warranty.
            </p>
            <div className="mt-4 space-y-2">
              <a href={`mailto:${settings.contact_email}`} className="flex items-center gap-2 text-sm text-navy-600 hover:text-royal-600 transition">
                <Mail className="h-4 w-4" /> {settings.contact_email}
              </a>
              <a href={`tel:${settings.contact_phone}`} className="flex items-center gap-2 text-sm text-navy-600 hover:text-royal-600 transition">
                <Phone className="h-4 w-4" /> {settings.contact_phone}
              </a>
              <p className="flex items-center gap-2 text-sm text-navy-600">
                <MapPin className="h-4 w-4" /> {settings.address}
              </p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-display text-sm font-bold text-navy-900">{section}</h4>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-navy-500 hover:text-royal-600 transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-navy-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-500">
            &copy; {new Date().getFullYear()} BuyAndSellOutlets. All rights reserved.
            {!isSupabaseConfigured && (
              <span className="badge bg-amber-100 text-amber-700">Demo Mode — No Database</span>
            )}
          </p>
          <p className="text-xs text-navy-500">
            Secure payments by Paystack & Flutterwave
          </p>
        </div>
      </div>
    </footer>
  );
}
