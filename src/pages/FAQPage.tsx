import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What does "Certified Pre-Owned" mean?', a: 'Every pre-owned product we sell goes through a full diagnostic inspection — battery health, functionality, cosmetic condition, and accessories are all verified. Each item is graded and backed by a BuyAndSellOutlets warranty.' },
  { q: 'What warranty do you offer?', a: 'Brand-new products come with the manufacturer\'s warranty (typically 1-2 years). Pre-owned products include a BuyAndSellOutlets warranty ranging from 3 months to 1 year, depending on the product category and condition.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 2-5 business days nationwide. Express delivery (1-2 business days) is available at checkout. Free shipping applies to orders over ₦50,000.' },
  { q: 'What is your return policy?', a: 'You can return any product within 7 days of delivery if it doesn\'t match the described condition or has a defect not noted in the inspection report. Items must be in the same condition received with all included accessories.' },
  { q: 'What payment methods do you accept?', a: 'We accept Paystack, Flutterwave, card payments, and bank transfers. All payments are processed securely.' },
  { q: 'Can I sell my products on BuyAndSellOutlets?', a: 'No. BuyAndSellOutlets is not a marketplace. We are a single-owner retailer — all products are sourced, inspected, and sold by us. This ensures consistent quality and warranty coverage.' },
  { q: 'How do I track my order?', a: 'Once your order is shipped, you\'ll receive a tracking number via email and notification. You can also track your order in your account under "Orders".' },
  { q: 'Do you offer installation for appliances?', a: 'Yes, for large appliances like ACs, washing machines, and refrigerators, installation is available. Some products include free installation — check the product page for details.' },
];

export function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container-page py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-3 text-navy-600">Everything you need to know about shopping with BuyAndSellOutlets.</p>
      </div>

      <div className="mx-auto max-w-2xl space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-navy-50 transition"
            >
              <span className="font-medium text-navy-900">{faq.q}</span>
              <ChevronDown className={`h-5 w-5 text-navy-400 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-4 pt-0 text-sm text-navy-600">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
