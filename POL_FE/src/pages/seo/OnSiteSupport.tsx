import { Helmet } from 'react-helmet-async';
import { 
  Building2, Users, HardDrive, Wrench, ShieldCheck, Phone, MapPin, 
  ArrowRight, Clock, CheckCircle2, Star, HelpCircle, 
  MonitorCheck, Truck, Zap, History, ClipboardCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

const siteServices = [
  {
    icon: Building2,
    title: "Corporate AMC",
    desc: "Annual Maintenance Contracts for industries and offices. We become your dedicated IT department.",
    features: ["Bi-Weekly Health Visits", "Unlimited Remote Support", "Hardware Inventory Tracking", "Priority 4-Hour Response"]
  },
  {
    icon: Truck,
    title: "Doorstep Home Repair",
    desc: "Can't visit Vijay Market? Our mobile technicians come to your home in Paradip city.",
    features: ["Desktop/Laptop Pickup", "Peripheral Installation", "New System Unboxing", "Home Wi-Fi troubleshooting"],
    highlight: true
  },
  {
    icon: MonitorCheck,
    title: "Project Deployment",
    desc: "Setting up a new office or lab? We handle the cabling, workstations, and server setup from scratch.",
    features: ["Structured Cabling", "Workstation Bulk Setup", "Asset Management", "User Training Sessions"]
  }
];

export default function OnSiteSupport() {
  const { settings } = useSettings();
  const contact = settings?.contactDefaults || {
    salesPhone: "9583839432"
  };

  const salesPhone = contact.salesPhone.replace(/[\s-+]/g, '');

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Professional On-Site IT Support in Paradip | Home & Business</title>
        <meta name="description" content="Get expert IT support at your doorstep in Paradip. We provide on-site computer repair, office AMC, and server maintenance for businesses in Odisha." />
        <link rel="canonical" href="https://paradiponline.com/services/on-site-it-support" />
      </Helmet>

      {/* 1. Doorstep Hero */}
      <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 translate-x-20" />
        <div className="container mx-auto px-4 relative z-10">
           <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-blue-600 text-sm font-bold mb-8">
                 <Truck className="h-4 w-4" /> Paradip's Only Guaranteed 4-Hour Service Arrival
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none uppercase">
                Expert IT Support. <br />
                <span className="text-blue-600">At Your Desk.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-12 font-medium leading-relaxed max-w-2xl">
                Tired of lugging your heavy CPU across town? Our mobile response team brings the Vijay Market workshop to your doorstep across the Jagatsinghpur district.
              </p>
              <div className="flex flex-wrap gap-5">
                 <Button size="lg" className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-2xl shadow-blue-500/30" asChild>
                    <a href={`tel:${salesPhone}`}>Request a Technician</a>
                 </Button>
                 <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-slate-200 bg-white text-slate-900 text-lg hover:bg-slate-50" asChild>
                    <a href={`https://wa.me/91${salesPhone}?text=I need a technician at my home/office.`}>WhatsApp Booking</a>
                 </Button>
              </div>
           </div>
        </div>
      </section>

      {/* 2. Service Matrix */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {siteServices.map((service, i) => (
                <Card key={i} className={`rounded-[3rem] border-2 transition-all duration-300 hover:shadow-3xl ${service.highlight ? 'bg-slate-900 text-white border-slate-800 scale-105 z-10' : 'bg-white border-slate-100'}`}>
                   <CardContent className="p-10">
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-8 ${service.highlight ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                         <service.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-black mb-4 uppercase">{service.title}</h3>
                      <p className={`text-sm mb-8 font-medium ${service.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{service.desc}</p>
                      <ul className="space-y-4 mb-10">
                         {service.features.map((f, j) => (
                           <li key={j} className="flex items-center gap-3 font-bold text-sm">
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-500" /> {f}
                           </li>
                         ))}
                      </ul>
                      <Button variant={service.highlight ? 'secondary' : 'default'} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest" asChild>
                         <a href={`tel:${salesPhone}`}>Select Plan</a>
                      </Button>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* 3. The Corporate Reliability Promise */}
      <section className="py-24 bg-slate-50 rounded-[5rem] mx-4 mb-24 overflow-hidden relative">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl" />
                    <img 
                      src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=1000" 
                      alt="IT Technician Working" 
                      className="rounded-[3rem] shadow-2xl relative z-10"
                    />
                  </div>
               </div>
               <div className="lg:w-1/2">
                  <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase leading-tight italic">Why Paradip Port's <br /> Industries Trust Us</h2>
                  <div className="space-y-10">
                     {[
                       { t: "Predictable IT Spend", d: "No more shock bills. Our AMCs provide clear, transparent budgeting for all your hardware maintenance.", icon: clipboardCheck },
                       { t: "Fast Disaster Recovery", d: "If your server fails or network goes dark, our priority team is mobilized within 60 minutes.", icon: zap },
                       { t: "Compliance & Security", d: "We ensure all your systems are running licensed software and are patched against local threats.", icon: shieldCheck }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 group">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all font-bold">
                             0{i+1}
                          </div>
                          <div>
                             <h4 className="text-xl font-bold text-slate-900 mb-2 uppercase">{item.t}</h4>
                             <p className="text-slate-500 font-medium leading-relaxed">{item.d}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Contact Block */}
      <section className="py-24">
         <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-blue-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative shadow-3xl">
               <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
               <h2 className="text-5xl md:text-7xl font-black mb-8 italic uppercase tracking-tighter leading-none">Stop Waiting for a Fix. <br /> Bring the Pro to You.</h2>
               <p className="text-2xl text-blue-100 mb-12 font-medium max-w-2xl mx-auto italic">Servicing Paradip Port, Vijay Market, Kujang, and Industrial Townships daily.</p>
               <Button size="lg" className="h-20 px-16 rounded-[2rem] bg-white text-slate-900 hover:bg-slate-100 text-2xl font-black shadow-2xl shadow-black/20 uppercase" asChild>
                  <a href={`tel:${salesPhone}`}>Call Pro Technicians</a>
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}

function clipboardCheck(props: any) { return <ClipboardCheck {...props} /> }
function zap(props: any) { return <Zap {...props} /> }
function shieldCheck(props: any) { return <ShieldCheck {...props} /> }
