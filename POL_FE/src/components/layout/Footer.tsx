import { Link } from 'react-router-dom';
import {
  Monitor,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Clock,
  Award,
} from 'lucide-react';
import logo from '@/assets/logo-paradeep-online.svg';
import { useSettings } from '@/contexts/SettingsContext';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Sales', href: '/sales' },
  { name: 'Services', href: '/services' },
  { name: 'Support', href: '/support' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

const services = [
  { name: 'Computer & Laptop Repair', href: '/services/computer-and-laptop-repair' },
  { name: 'Software Installation & Support', href: '/services/software-installation-support' },
  { name: 'Custom PC Builds', href: '/services/custom-pc-builds' },
  { name: 'On-site IT Support', href: '/services/on-site-it-support' },
  { name: 'Network & Wi‑Fi Setup', href: '/services/network-and-wifi-setup' },
  { name: 'CCTV & Security Solutions', href: '/services/cctv-and-security-solutions' },
];

const socialLinks = [
  {
    icon: Facebook,
    href: 'https://www.facebook.com/paradiponline',
    label: 'Facebook',
  },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const contact = settings?.contactDefaults || {
    address: "Paradeep Online Computer Service,\nUnit -1, Badapadia, Vijay Market,\nParadip, Odisha, India - 754142",
    email: "mail@paradiponline.com",
    salesPhone: "+91-9583839432",
    supportPhone: "+91-9439869690",
    complaintsPhone: "+91-7008700609"
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
      {/* Subtle top accent */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand / About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center transition-opacity">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Paradeep Online Computer Service – Your Trusted IT Navigator"
                  className="h-24 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-xs">
              Your trusted IT partner in Paradip, Odisha. We provide end‑to‑end
              computer sales & service, AMC, networking, CCTV and IT support for
              homes and businesses.
            </p>

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 text-xs text-slate-600 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100 mb-4">
              <Award className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Trusted Local IT Partner</span>
            </div>

            {/* Working hours */}
            <div className="flex items-start gap-3 text-sm bg-white rounded-xl px-4 py-3 border border-slate-200 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 flex-shrink-0 mt-0.5">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium mb-0.5">
                  Working Hours
                </span>
                <span className="text-slate-900 font-semibold">
                  Everyday: 10:00 AM - 10:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-5 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group flex items-center text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-5 uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="flex items-start gap-2.5 text-sm text-slate-600 hover:text-blue-600 transition-colors group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    <span className="leading-relaxed font-medium">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & social */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-5 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-sm text-slate-600 leading-relaxed pt-1">
                  <p className="font-medium text-slate-900">Address</p>
                  <p className="whitespace-pre-line">
                    {contact.address}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-sm pt-1.5 space-y-2">
                  <p className="font-medium text-slate-900 mb-0.5">Phone Lines</p>
                  <div className="flex flex-col gap-1 text-slate-600">
                    <div className="flex justify-between gap-4">
                      <span>Sales & WA:</span>
                      <a href={`tel:${contact.salesPhone.replace(/[\s-]/g, '')}`} className="hover:text-blue-600 font-medium transition-colors">{contact.salesPhone}</a>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Support:</span>
                      <a href={`tel:${contact.supportPhone.replace(/[\s-]/g, '')}`} className="hover:text-blue-600 font-medium transition-colors">{contact.supportPhone}</a>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Complaints:</span>
                      <a href={`tel:${contact.complaintsPhone.replace(/[\s-]/g, '')}`} className="hover:text-blue-600 font-medium transition-colors">{contact.complaintsPhone}</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="text-sm pt-1.5">
                  <p className="font-medium text-slate-900 mb-0.5">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-slate-600 hover:text-blue-600 font-medium transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>
            </ul>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 mb-3 uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border-2 border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 text-center md:text-left">
              © {year}{' '}
              <span className="font-semibold text-slate-900">
                Paradeep Online Computer Service
              </span>
              . All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Powered by</span>
              <span className="font-semibold text-blue-600">
                Paradeep Online
              </span>
              <span className="text-slate-300">|</span>
              <span>IT & Automation Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
