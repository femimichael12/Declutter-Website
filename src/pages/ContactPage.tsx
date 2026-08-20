import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/context/ToastContext';

export function ContactPage() {
  const { settings } = useSettings();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast('Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: settings.contact_email, href: `mailto:${settings.contact_email}` },
    { icon: Phone, label: 'Phone', value: settings.contact_phone, href: `tel:${settings.contact_phone}` },
    { icon: MessageCircle, label: 'WhatsApp', value: settings.whatsapp_number, href: `https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}` },
    { icon: MapPin, label: 'Address', value: settings.address, href: null },
  ];

  return (
    <div className="container-page py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">Get in Touch</h1>
        <p className="mt-3 text-navy-600">
          Have a question? We're here to help. Reach out via any of the channels below or send us a message.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <div key={info.label} className="card p-4 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-100">
                  <Icon className="h-5 w-5 text-royal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-500">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="font-semibold text-navy-900 hover:text-royal-600 transition">{info.value}</a>
                  ) : (
                    <p className="font-semibold text-navy-900">{info.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1.5 block">Name</label>
              <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1.5 block">Email</label>
              <input required type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 mb-1.5 block">Subject</label>
            <input required className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 mb-1.5 block">Message</label>
            <textarea required className="input min-h-32" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary w-full">
            <Send className="h-4 w-4" /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
