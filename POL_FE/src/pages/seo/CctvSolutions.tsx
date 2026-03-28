import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, Eye, Video, Bell, HardDrive, Smartphone,
  CheckCircle2, Phone, MapPin, Zap, Lock, ShieldAlert,
  HelpCircle, Settings2, ArrowRight, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

const features = [
  {
    icon: Video,
    title: "Ultra-HD 4K Cameras",
    desc: "Crystal clear night vision and smart motion detection to see every detail in Paradip's coastal climate."
  },
  {
    icon: Smartphone,
    title: "24/7 Remote Viewing",
    desc: "Watch your home or business live from anywhere in the world on your smartphone or PC."
  },
  {
    icon: HardDrive,
    title: "30-Day Storage",
    desc: "Robust NVR/DVR solutions with massive storage to keep your footage safe for a full month."
  },
  {
    icon: Bell,
    title: "AI Intrusion Alerts",
    desc: "Get instant notifications on your phone the second a human or vehicle is detected on your property."
  }
];

export default function CctvSolutions() {
  const { settings } = useSettings();
  const contact = settings?.contactDefaults || {
    salesPhone: "9583839432"
  };

  const salesPhone = contact.salesPhone.replace(/[\s-+]/g, '');

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Professional CCTV & Security Systems in Paradip | IP Cameras</title>
        <meta name="description" content="Secure your home or business in Paradip with high-definition CCTV, IP cameras, and biometric systems. Expert installation and 1-year warrant by Paradip Online." />
        <link rel="canonical" href="https://paradiponline.com/services/cctv-and-security-solutions" />
      </Helmet>

      {/* 1. Surveillance Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-900 border-b-8 border-red-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 lg:flex items-center gap-16">
          <div className="lg:w-3/5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-400/20 text-red-400 text-sm font-bold mb-8">
               <ShieldCheck className="h-4 w-4" /> Paradip's Most Trusted Security Partner
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
              Eyes Everywhere. <br />
              <span className="text-red-500">Sleep Soundly.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl font-medium">
              Don't wait for an incident to happen. Protect your family and assets with advanced AI-powered surveillance systems installed by Paradip's certified tech team.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-red-600 hover:bg-red-700 text-lg font-bold shadow-2xl shadow-red-600/40 group" asChild>
                <a href={`tel:${salesPhone}`}>
                   Book Free Site Survey
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/20 bg-white/5 text-white text-lg hover:bg-white hover:text-slate-900 backdrop-blur-md" asChild>
                <a href={`https://wa.me/91${salesPhone}?text=I want a CCTV quote.`}>
                   WhatsApp Pricing
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:w-2/5 mt-16 lg:mt-0 hidden lg:block">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 shadow-2xl rotate-3">
                <div className="flex items-center gap-4 mb-8">
                   <div className="h-4 w-4 rounded-full bg-red-500 animate-pulse" />
                   <span className="text-white font-bold uppercase tracking-widest text-sm italic">Live Transmission Feed</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="aspect-square bg-slate-800 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden group">
                        <img src={`https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400&auto=format`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="CCTV Feed" />
                        <span className="absolute top-2 left-2 text-[10px] text-white font-bold bg-black/40 px-2 py-0.5 rounded">CH {i}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Matrix */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-2xl mx-auto">
             <h2 className="text-4xl font-bold text-slate-900 mb-6 uppercase">Total Visibility Solutions</h2>
             <p className="text-lg text-slate-600 font-medium">We specialize in CP PLUS, Hikvision, and D-Link installations with 100% genuine warranties.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {features.map((item, i) => (
               <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 h-full flex flex-col hover:border-red-200 transition-colors group">
                  <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-red-600 mb-8 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all">
                     <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. Local Use-Cases (Trust Building) */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="lg:w-1/2">
                  <img src="https://images.unsplash.com/photo-1557597774-a745722361ef?q=80&w=1000" className="rounded-[4rem] shadow-3xl" alt="CCTV Paradip" />
               </div>
               <div className="lg:w-1/2 text-white">
                  <h2 className="text-4xl font-bold mb-10 leading-tight italic uppercase">Protecting What <br /> Matters in Odisha</h2>
                  <div className="space-y-8">
                     {[
                       { t: "Residential Security", d: "Keep track of domestic help, vendors, and deliveries from your mobile while you are at work." },
                       { t: "Retail & Shop Monitoring", d: "Reduce shrinkage and monitor staff behavior in real-time across multiple store locations." },
                       { t: "Industrial & Port Sites", d: "High-grade IP cameras designed to withstand the saline air and humidity of the Paradip coast." }
                     ].map((uc, i) => (
                       <div key={i} className="flex gap-6 group">
                          <div className="h-8 w-8 shrink-0 rounded-full border-2 border-red-500 flex items-center justify-center font-black group-hover:bg-red-500 transition-colors">
                             {i+1}
                          </div>
                          <div>
                             <h4 className="text-xl font-extrabold mb-2 uppercase">{uc.t}</h4>
                             <p className="text-slate-400 font-medium">{uc.d}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-24 bg-red-600">
         <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic uppercase leading-none">Safe. Secure. <br /> Professional.</h2>
            <p className="text-2xl text-red-100 mb-12 font-medium max-w-2xl mx-auto italic">Get your free quote and security assessment for Paradip port & municipality today.</p>
            <Button size="lg" className="h-20 px-16 rounded-[2rem] bg-white text-red-600 hover:bg-slate-50 text-2xl font-extrabold shadow-3xl shadow-black/20 uppercase tracking-tighter" asChild>
               <a href={`tel:${salesPhone}`}>Secure My Property</a>
            </Button>
         </div>
      </section>
    </div>
  );
}
