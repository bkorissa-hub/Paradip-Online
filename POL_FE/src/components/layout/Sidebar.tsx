import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Phone,
  Clock,
  ArrowRight,
  Headphones,
  Ticket,
  Mail,
  HelpCircle,
  FileText,
  ShoppingBag,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '@/contexts/SettingsContext';

interface SidebarProps {
  enabled?: boolean;
}

export function Sidebar({ enabled = true }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useSettings();
  const isTicketingEnabled = settings?.enableTicketing ?? true;

  if (!enabled) return null;

  return (
    <>
      {/* 1. The Trigger Button - Modern "Pill" Style */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed right-6 bottom-6 z-40',
          'flex items-center gap-3 px-5 py-3',
          'bg-slate-900 text-white rounded-full shadow-2xl shadow-slate-900/30',
          'hover:scale-105 transition-all duration-300',
          'group',
          isOpen && 'translate-x-[200%] opacity-0' // Hide when open
        )}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="font-semibold text-sm tracking-wide">Quick Help</span>
        <MessageSquare className="h-5 w-5 text-white/90" />
      </button>

      {/* 2. Overlay (Backdrop) */}
      <div
        className={cn(
          'fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity duration-300',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* 3. Sidebar Panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 h-full w-full sm:w-[400px] z-50',
          'bg-white',
          'shadow-2xl shadow-slate-900/20',
          'transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)', // Smooth iOS-like ease
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full bg-slate-50/50">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-slate-100">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Help Center
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                How can we help you :)
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Direct Contact Options */}
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Contact Support
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+919876543210"
                  className="group flex items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Call Support
                    </p>
                    <p className="text-xs text-slate-500">
                      Available 9 AM - 9 PM
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-green-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="h-5 w-5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      WhatsApp
                    </p>
                    <p className="text-xs text-slate-500">
                      Fastest response time
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="mailto:help@example.com"
                  className="group flex items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-red-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Email Us
                    </p>
                    <p className="text-xs text-slate-500">
                      For complex queries
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </section>

            {/* Quick Actions Grid */}
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Self Service
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Track Ticket', icon: Ticket, href: '/support' },
                  { title: 'Book Repair', icon: WrenchIcon, href: '/services' }, // Defined icon below
                  { title: 'Shop Parts', icon: ShoppingBag, href: '/sales' },
                  { title: 'FAQs', icon: HelpCircle, href: '/support' },
                ].map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <item.icon className="h-6 w-6 text-slate-400 group-hover:text-primary mb-2 transition-colors" />
                    <span className="text-xs font-medium text-slate-700 group-hover:text-primary">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Hours Card (Clean Version) */}
            <section>
              <div className="bg-slate-900 rounded-xl p-5 text-white relative overflow-hidden">
                {/* Decorative Circle */}
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold tracking-wide">
                    Business Hours
                  </span>
                </div>

                <div className="space-y-3 relative z-10 text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Mon - Sat</span>
                    <span className="font-medium">10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sunday</span>
                    <span className="font-medium text-primary">
                      Open 10AM - 10PM
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Footer CTA */}
          {isTicketingEnabled && (
            <div className="p-6 bg-white border-t border-slate-100">
              <Button
                className="w-full h-12 text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 bg-primary hover:bg-primary/90 text-white rounded-xl"
                asChild
              >
                <Link to="/support" onClick={() => setIsOpen(false)}>
                  Create Support Ticket
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// Helper component for the icon used above
function WrenchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
