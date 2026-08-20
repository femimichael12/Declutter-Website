import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Headphones, BadgeCheck, Target, Eye, Heart, ShoppingBag } from 'lucide-react';

export function AboutPage() {
  const values = [
    { icon: ShieldCheck, title: 'Quality First', desc: 'Every product — new or pre-owned — meets our rigorous standards before it reaches you.' },
    { icon: BadgeCheck, title: 'Transparency', desc: 'Full inspection reports and honest condition grading on every pre-owned item.' },
    { icon: Heart, title: 'Customer Care', desc: 'Real human support via WhatsApp, email, and phone — before and after your purchase.' },
    { icon: Truck, title: 'Reliable Delivery', desc: 'Fast, tracked, nationwide shipping with free delivery on orders over ₦50,000.' },
  ];

  return (
    <div className="container-page py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-navy-900 flex items-center justify-center mb-4">
          <ShoppingBag className="h-7 w-7 text-royal-500" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">About BuyAndSellOutlets</h1>
        <p className="mt-4 text-navy-600">
          We're a premium electronics and appliance retailer specializing in both brand-new and professionally inspected pre-owned products.
          Our mission is to make quality technology accessible, affordable, and sustainable — without compromising on trust.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-5 text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-royal-100 flex items-center justify-center mb-3">
                <Icon className="h-6 w-6 text-royal-600" />
              </div>
              <h3 className="font-display font-semibold text-navy-900 mb-1">{v.title}</h3>
              <p className="text-sm text-navy-500">{v.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-3 mb-12">
        {[
          { icon: Target, title: 'Our Mission', desc: 'To provide access to premium technology through quality, affordability, and trust.' },
          { icon: Eye, title: 'Our Vision', desc: 'A world where great tech is sustainable, accessible, and backed by real warranty.' },
          { icon: Heart, title: 'Our Promise', desc: 'Every product inspected, every order tracked, every customer cared for.' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6">
              <Icon className="h-8 w-8 text-royal-600 mb-3" />
              <h3 className="font-display font-bold text-navy-900 mb-2">{item.title}</h3>
              <p className="text-sm text-navy-500">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-3xl bg-navy-900 p-8 sm:p-12 text-center">
        <h2 className="font-display text-2xl font-bold text-white mb-2">10,000+ Happy Customers</h2>
        <p className="text-navy-300 max-w-xl mx-auto">
          Since launching, we've delivered quality electronics and appliances to thousands of satisfied customers across Nigeria —
          backed by professional inspection, warranty, and expert support.
        </p>
      </div>
    </div>
  );
}
