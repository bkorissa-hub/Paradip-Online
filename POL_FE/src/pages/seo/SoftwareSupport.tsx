import { Helmet } from 'react-helmet-async';
import { 
  ShieldAlert, Download, Settings, RefreshCcw, CheckCircle2, Phone, 
  ShieldCheck, ArrowRight, Zap, Star, MessageSquare, Laptop,
  Lock, HardDrive, Layout, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

const softServices = [
  {
    icon: RefreshCcw,
    title: "Operating System Support",
    features: ["Windows 10/11 Installation", "Driver Optimization", "Registry Repair", "Boot Loop Fixing"],
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: ShieldAlert,
    title: "Malware & Security",
    features: ["Virus Removal", "Antivirus Deployment", "Adware Cleaning", "Firewall Configuration"],
    color: "bg-red-50 text-red-600"
  },
  {
    icon: Download,
    title: "Software Setup",
    features: ["Microsoft Office", "Tally ERP/Prime", "AutoCAD & Design Tools", "Custom Trading Apps"],
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    features: ["Deleted File Recovery", "OS Partition Fix", "Cloud Backup Setup", "NAS Configuration"],
    color: "bg-amber-50 text-amber-600"
  }
];

export default function SoftwareSupport() {
  const { settings } = useSettings();
  const contact = settings?.contactDefaults || {
    salesPhone: "9583839432",
    supportPhone: "9439869690"
  };

  const salesPhone = contact.salesPhone.replace(/[\s-+]/g, '');

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Professional Software Installation & Windows Repair in Paradip</title>
        <meta name="description" content="Is your computer slow? Get expert Windows installation, virus removal, and official software setup in Paradip. Remote and on-site software support by Paradip Online." />
        <link rel="canonical" href="https://paradiponline.com/services/software-installation-support" />
      </Helmet>

      {/* 1. Impact Hero */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-bold mb-6">
              Certified Software Engineers
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-none">
              Clean <span className="text-indigo-400">Software.</span> <br />
              Blazing Speed.
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium">
              Don't let software bloat or viruses slow your business down. We provide professional OS installations, licensed software setup, and remote troubleshooting for Paradip's corporate and home users.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-16 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg shadow-xl shadow-indigo-600/30" asChild>
                <a href={`tel:${salesPhone}`}>Instant Remote Help</a>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-8 rounded-2xl border-white/20 bg-white/5 text-white text-lg hover:bg-white hover:text-slate-900 backdrop-blur-md" asChild>
                 <a href={`https://wa.me/91${salesPhone}?text=Hi, I need software support.`}>Chat with Tech</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Solving Core Problems */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h2 className="text-4xl font-bold text-slate-900 mb-4">Software Solutions That Actually Work</h2>
             <p className="text-slate-600 text-lg font-medium">We don't just 'format' your PC. We tune it for professional-grade performance.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
             {softServices.map((service, i) => (
               <Card key={i} className="group border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 rounded-3xl overflow-hidden">
                 <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                       <div className={`h-16 w-16 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${service.color}`}>
                          <service.icon className="h-8 w-8" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                          <ul className="grid sm:grid-cols-2 gap-3">
                             {service.features.map((feat, j) => (
                               <li key={j} className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {feat}
                               </li>
                             ))}
                          </ul>
                          <Button variant="link" className="mt-6 p-0 h-auto text-indigo-600 font-bold group">
                             Learn More <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                       </div>
                    </div>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* 3. Remote Support Trust Section */}
      <section className="py-24 bg-indigo-900 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10" />
         <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                    Fixed in Minutes with <span className="text-indigo-400">Remote Desktop Support</span>
                  </h2>
                  <p className="text-lg text-indigo-100 mb-10 leading-relaxed font-medium">
                    Stuck with a printer error or a slow Excel sheet? Don't bring your CPU to us! Most software glitches can be fixed in 15 minutes using secure, encrypted remote access (AnyDesk/TeamViewer).
                  </p>
                  <div className="space-y-6">
                     {[
                       { t: "Secure & Encrypted", d: "We use 256-bit AES encryption for all remote sessions." },
                       { t: "Pay Only When Fixed", d: "Our success-only policy means zero billing if the issue persists." },
                       { t: "Available 10AM - 10PM", d: "Immediate response during working hours in Paradip." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                             <Lock className="h-5 w-5 text-indigo-300" />
                          </div>
                          <div>
                             <h4 className="font-bold text-xl mb-1">{item.t}</h4>
                             <p className="text-indigo-200/80 text-sm">{item.d}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-20 rounded-full" />
                    <img 
                      src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000" 
                      alt="Remote Software Support" 
                      className="rounded-[40px] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.5)] border border-white/10 relative z-10"
                    />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4">
            <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10">
                 System Running Slow? <br /> <span className="text-indigo-500">Let's Clean It Up.</span>
               </h2>
               <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium relative z-10">
                 We've fixed over 2,500 software instances in Paradip port and industries. Get your system back to state-of-the-art condition today.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                  <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 text-lg font-bold" asChild>
                    <a href={`tel:${salesPhone}`}>Call for Optimization</a>
                  </Button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
