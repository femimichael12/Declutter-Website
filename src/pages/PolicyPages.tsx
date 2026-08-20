import { motion } from 'framer-motion';

interface PolicyPageProps {
  title: string;
  sections: { heading: string; body: string }[];
}

function PolicyPage({ title, sections }: PolicyPageProps) {
  return (
    <div className="container-page py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl mb-8">{title}</h1>
        <div className="prose prose-sm max-w-3xl">
          {sections.map((section, i) => (
            <div key={i} className="mb-6">
              <h2 className="font-display text-lg font-bold text-navy-900 mb-2">{section.heading}</h2>
              <p className="text-navy-600 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return <PolicyPage title="Privacy Policy" sections={[
    { heading: 'Information We Collect', body: 'We collect information you provide when creating an account, placing orders, or contacting us. This includes your name, email, phone number, and shipping address. We also collect order history and browsing data to improve your experience.' },
    { heading: 'How We Use Your Information', body: 'Your information is used to process orders, deliver products, send order updates, provide customer support, and improve our services. We never sell your personal data to third parties.' },
    { heading: 'Data Security', body: 'We use industry-standard encryption and security measures to protect your personal information. Payment data is processed securely through our payment partners (Paystack and Flutterwave) and is never stored on our servers.' },
    { heading: 'Your Rights', body: 'You have the right to access, update, or delete your personal information. You can manage your data in your account settings or contact us for assistance.' },
    { heading: 'Cookies', body: 'We use cookies to remember your preferences, cart contents, and login session. You can disable cookies in your browser settings, though some features may not work properly.' },
  ]} />;
}

export function TermsPage() {
  return <PolicyPage title="Terms & Conditions" sections={[
    { heading: 'Acceptance of Terms', body: 'By using BuyAndSellOutlets, you agree to these terms and conditions. If you do not agree, please do not use our website or services.' },
    { heading: 'Products & Pricing', body: 'All products are subject to availability. We reserve the right to limit quantities and correct pricing errors. Prices are displayed in Nigerian Naira (₦) and include applicable taxes.' },
    { heading: 'Orders & Payment', body: 'Orders are confirmed once payment is verified. We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspected fraudulent activity.' },
    { heading: 'Warranty', body: 'Warranty coverage varies by product and condition. Brand-new products carry manufacturer warranty. Pre-owned products carry BuyAndSellOutlets warranty as specified on each product page.' },
    { heading: 'Limitation of Liability', body: 'BuyAndSellOutlets is not liable for indirect or consequential damages. Our liability is limited to the value of the product purchased.' },
  ]} />;
}

export function ReturnPolicyPage() {
  return <PolicyPage title="Return Policy" sections={[
    { heading: '7-Day Return Window', body: 'You may return any product within 7 days of delivery if it does not match the described condition or has a defect not noted in the inspection report. Items must be returned in the same condition received with all included accessories.' },
    { heading: 'How to Initiate a Return', body: 'Contact us via WhatsApp or email with your order number and reason for return. We will provide return instructions and a pickup arrangement where applicable.' },
    { heading: 'Refund Processing', body: 'Once we receive and inspect the returned item, refunds are processed within 3-5 business days to the original payment method. Bank transfers may take additional time to reflect.' },
    { heading: 'Non-Returnable Items', body: 'Certain items are non-returnable for hygiene reasons, including earbuds (if unsealed), and products damaged due to misuse after delivery.' },
    { heading: 'Damaged or Wrong Items', body: 'If you receive a damaged or incorrect item, contact us within 48 hours of delivery with photos. We will arrange a replacement or full refund at no cost to you.' },
  ]} />;
}

export function DeliveryInfoPage() {
  return <PolicyPage title="Delivery Information" sections={[
    { heading: 'Delivery Areas', body: 'We deliver nationwide across Nigeria. Some remote areas may require additional delivery time or incur extra charges.' },
    { heading: 'Delivery Timeframes', body: 'Standard delivery: 2-5 business days. Express delivery: 1-2 business days. Orders placed before 2 PM on business days are processed the same day.' },
    { heading: 'Shipping Costs', body: 'Free shipping on orders over ₦50,000. Below that, a flat shipping rate of ₦2,500 applies. Express delivery adds ₦3,000 to the standard rate.' },
    { heading: 'Order Tracking', body: 'You will receive a tracking number via email and notification once your order is shipped. Track your order in real-time from your account dashboard.' },
    { heading: 'Large Items', body: 'Large appliances (ACs, refrigerators, washing machines, TVs, furniture) include free delivery and setup where applicable. Installation may be available for an additional fee.' },
  ]} />;
}
