import { Wrench, ArrowRight } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const Maintenance = () => {
  const { settings } = useSettings();
  const contact = settings?.contactDefaults || { 
    salesPhone: "+91-9583839432",
    email: "mail@paradiponline.com"
  };
  const salesPhonePlain = contact.salesPhone.replace(/[\s-]/g, '');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center px-4 max-w-2xl">
        {/* Icon */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="relative h-32 w-32 mx-auto bg-white rounded-full shadow-xl flex items-center justify-center">
            <Wrench className="h-16 w-16 text-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Under Maintenance
        </h1>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          We're currently performing scheduled maintenance to improve your experience.
          <br />
          We'll be back online shortly!
        </p>

        {/* Info Box */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 inline-block">
          <p className="text-sm text-slate-500 mb-2">Need immediate assistance?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${salesPhonePlain}`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Call Support
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
            >
              Email Us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-slate-400 mt-8">
          Estimated downtime: Less than 1 hour
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
