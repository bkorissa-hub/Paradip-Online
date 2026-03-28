import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, Lock, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo-paradeep-online.svg';
import { useSettings } from '@/contexts/SettingsContext';



const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Sales', href: '/sales' },
  { name: 'Services', href: '/services' },
  { name: 'Support', href: '/support' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

export function Header() {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const contact = settings?.contactDefaults || {
    address: "Paradip, Odisha, India - 754142",
    email: "mail@paradiponline.com",
    salesPhone: "+91-9583839432",
    supportPhone: "+91-9439869690",
    complaintsPhone: "+91-7008700609"
  };

  const salesPhonePlain = contact.salesPhone.replace(/[\s-]/g, '');



  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-blue-100 shadow-sm">
      {/* Top bar with contact info + location */}
      <div className="hidden md:block bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between text-sm">
            {/* Left: contact */}
            <div className="flex items-center gap-6">
              <a
                href={`tel:${salesPhonePlain}`}
                className="flex items-center gap-2 hover:text-blue-100 transition-colors font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>{contact.salesPhone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-blue-100 transition-colors font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>{contact.email}</span>
              </a>
            </div>

            {/* Center: location */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">
                {contact.address}
              </span>
            </div>

            {/* Right: timing */}
            <div className="flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" />
              <span>Everyday: 9:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-opacity">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Paradeep Online Computer Service – Your Trusted IT Navigator"
                className="h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  location.pathname === item.href
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700',
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 relative">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all font-semibold" asChild>
              <Link to="/support">Get Support</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-blue-100">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200',
                    location.pathname === item.href
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-blue-50',
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 shadow-md font-semibold" asChild>
                <Link to="/support" onClick={() => setMobileMenuOpen(false)}>Get Support</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
