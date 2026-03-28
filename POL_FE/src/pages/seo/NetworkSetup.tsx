import { Helmet } from 'react-helmet-async';
import { 
  Network, Wifi, ShieldCheck, Zap, Laptop, Phone, MapPin, 
  ArrowRight, Globe, Server, CheckCircle2, Star, HelpCircle,
  Construction, Radio, Signal, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

const networkPlans = [
  {
    name: "Home / Small Office",
    price: "₹1,499+",
    desc: "Perfect for 2-5 users. We eliminate Wi-Fi dead zones and setup secure file sharing.",
    features: ["Dual-Band Router Setup", "SSID & Password Security", "Basic Printer Sharing", "Mobile App Access"]
  },
  {
    name: "Corporate / Hotel",
    price: "₹4,999+",
    desc: "Robust managed Wi-fi for high-density areas with guest portal and VLANs.",
    features: ["Access Point Grid Layout", "Captive Portal Setup", "Load Balancing", "Firewall Configuration"],
    highlight: true
  },
  {
    name: "Industrial / Port Link",
    price: "Custom",
    desc: "Extreme long-range outdoor wireless bridges and fiber optic termination.",
    features: ["P-to-P Wireless Bridge", "Fiber Splicing & SFP", "Outdoor Rugged Gear", "24/7 Monitoring tools"]
  }
];

export default function NetworkSetup() {
  const { settings } = useSettings();
  const contact = settings?.contactDefaults || {
    salesPhone: "9583839432"
  };

  const salesPhone = contact.salesPhone.replace(/[\s-+]/g, '');

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Professional Network & Wi-Fi Setup in Paradip | Fiber & Wireless</title>
        <meta name="description" content="Tired of slow Wi-Fi? Paradip Online provides enterprise networking, fiber optic cabling, and outdoor wireless bridges for homes and industries in Paradip Port area." />
        <link rel="canonical" href="https://paradiponline.com/services/network-and-wifi-setup" />
      </Helmet>

      {/* 1. Connectivity Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-900 border-b-8 border-indigo-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000')] bg-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-bold mb-8 uppercase tracking-widest">
             <Signal className="h-4 w-4 animate-pulse" /> 100% Signal Coverage Guaranteed
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Kill the <span className="text-indigo-400">Dead Zones.</span> <br />
            Connect Everything.
          </h1>
          <p className="text-xl text-slate-300 mb-12 font-medium leading-relaxed">
            From seamless home Wi-Fi meshes to multi-kilometer industrial point‑to‑point links, we design and deploy the backbone of your digital infrastructure in Paradip.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Button size="lg" className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-2xl shadow-indigo-600/40" asChild>
               <a href={`tel:${salesPhone}`}>Get Free Site Audit</a>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/20 bg-white/5 text-white text-lg hover:bg-white hover:text-slate-900 backdrop-blur-md" asChild>
               <a href={`https://wa.me/91${salesPhone}?text=I need Wi-Fi setup help.`}>WhatsApp Quote</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Technical Capabilities Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase leading-tight">Mastering The <br /> Coast's Connectivity</h2>
                <div className="grid gap-6">
                   {[
                     { t: "Managed Mesh Wi-Fi", d: "Seamless roaming between floors. Never drop a Zoom call while moving from the office to the balcony.", i: Wifi },
                     { t: "Fiber Optic Splicing", d: "High-speed backhaul for schools and large offices using industrial-grade fiber termination.", i: Globe },
                     { t: "Secure VPN & Firewalls", d: "Protect your corporate data with robust hardware firewalls and encrypted remote access.", i: Lock },
                     { t: "Outdoor Wireless Bridges", d: "Beam high-speed internet up to 5km between warehouses without digging a single cable.", i: Radio }
                   ].map((tech, i) => (
                     <div key={i} className="flex gap-5 p-6 rounded-3xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                        <div className="h-12 w-12 shrink-0 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                           <tech.i className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold text-slate-900 mb-1">{tech.t}</h4>
                           <p className="text-slate-500 font-medium text-sm leading-relaxed">{tech.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              <div className="relative">
                 <div className="absolute -inset-10 bg-indigo-600/5 blur-[80px] rounded-full" />
                 <img 
                  src="https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=1000" 
                  alt="Server Rack Setup" 
                  className="rounded-[3rem] shadow-3xl border border-slate-100 relative z-10"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* 3. Pricing & Tiers */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase">Predictable Networking Costs</h2>
              <p className="text-slate-600 font-medium italic">We quote per node so you know exactly what you are paying for.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {networkPlans.map((plan, i) => (
                <Card key={i} className={`rounded-[2.5rem] border-2 transition-all duration-300 ${plan.highlight ? 'bg-indigo-600 border-indigo-400 text-white shadow-2xl scale-105' : 'bg-white border-slate-100 hover:border-indigo-200'}`}>
                   <CardContent className="p-10">
                      <h3 className="text-2xl font-black mb-2 uppercase italic">{plan.name}</h3>
                      <div className="text-4xl font-black mb-6">{plan.price}</div>
                      <p className={`text-sm mb-8 font-medium ${plan.highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{plan.desc}</p>
                      <ul className="space-y-4 mb-10">
                         {plan.features.map((f, j) => (
                           <li key={j} className="flex items-center gap-3 font-bold text-sm">
                              <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.highlight ? 'text-white' : 'text-indigo-600'}`} /> {f}
                           </li>
                         ))}
                      </ul>
                      <Button variant={plan.highlight ? 'secondary' : 'default'} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest" asChild>
                         <a href={`tel:${salesPhone}`}>Hire Expert</a>
                      </Button>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* 4. Objection Handling / FAQs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="bg-slate-900 rounded-[4rem] px-8 py-16 md:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Connectivity Questions</h2>
              <div className="space-y-10 group">
                 {[
                   { q: "My Wi-Fi signal is strong but internet is slow. Why?", a: "This is often 'interference' or 'congestion'. We use spectrum analyzers to find clear channels and optimize your router's placement for physical penetration through Paradip's thick concrete walls." },
                   { q: "Can you provide internet to my warehouse 2km away?", a: "Yes. We use 5GHz/60GHz Wireless Bridges that practically 'beam' fiber speeds through the air with zero latency, saving you the massive cost of underground cabling." },
                   { q: "How do I secure my office Wi-Fi from neighbors?", a: "We implement WPA3 encryption, hide non-essential SSIDs, and can setup Enterprise Authentication (RADIUS) so each employee has their own secure login." }
                 ].map((faq, i) => (
                   <div key={i} className="border-l-4 border-indigo-500 pl-6 group-hover:opacity-60 hover:!opacity-100 transition-opacity cursor-default">
                      <h4 className="text-xl font-extrabold mb-3 text-indigo-400">{faq.q}</h4>
                      <p className="text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-24">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 italic uppercase leading-none tracking-tighter">Stay Online. <br /> Always.</h2>
            <p className="text-xl text-slate-500 mb-12 font-medium max-w-2xl mx-auto italic">Commercial-grade uptime for Paradip businesses, hotels, and coastal villas.</p>
            <Button size="lg" className="h-20 px-16 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-700 text-2xl font-black shadow-3xl shadow-indigo-600/20 uppercase tracking-tighter" asChild>
               <a href={`https://wa.me/91${salesPhone}?text=Hi, I want to discuss a networking project.`}>Consult with Engineer</a>
            </Button>
         </div>
      </section>
    </div>
  );
}
