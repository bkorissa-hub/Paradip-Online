import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Zap, ShieldCheck, Star, CheckCircle2, Phone, MousePointer2,
  Gamepad2, Layers, Monitor, HardDrive, Thermometer, PenTool,
  Boxes, ChevronRight, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

const buildTiers = [
  {
    name: "Standard Office / Home",
    desc: "Optimized for productivity, streaming, and everyday tasks with zero lag.",
    price: "₹18,000+",
    color: "bg-slate-50 border-slate-200",
    features: ["i3/Ryzen 3 Processor", "8GB DDR4 RAM", "256GB NVMe SSD", "Internal Wi-Fi Display"]
  },
  {
    name: "Professional Gaming / Editing",
    desc: "Built for high FPS gaming (1080p/1440p) and smooth 4K video rendering.",
    price: "₹45,000+",
    color: "bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-500/20 scale-105",
    features: ["i5/i7 or Ryzen 5/7", "NVIDIA RTX / AMD RX GPU", "16GB+ Dual Channel RAM", "AIO Liquid Cooling Option"],
    highlight: true
  },
  {
    name: "Extreme Workstation",
    desc: "Uncompromising power for AI training, 3D modeling, and server workloads.",
    price: "₹1,20,000+",
    color: "bg-slate-900 border-slate-700 text-white",
    features: ["i9 / Threadripper", "RTX 4080/4090 or Quadro", "64GB+ DDR5 RAM", "Custom Loop Availability"]
  }
];

export default function CustomPcBuilds() {
  const { settings } = useSettings();
  const contact = settings?.contactDefaults || {
    salesPhone: "9583839432"
  };

  const salesPhone = contact.salesPhone.replace(/[\s-+]/g, '');

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Premium Custom PC Builds in Paradip | Gaming & Workstations</title>
        <meta name="description" content="Custom Gaming PCs and Professional Workstations in Paradip. Personalized component picking, expert assembly, and 1-year on-site support by Paradip Online." />
        <link rel="canonical" href="https://paradiponline.com/services/custom-pc-builds" />
      </Helmet>

      {/* 1. Neon Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2000')] bg-cover bg-fixed opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-sm font-black mb-8 animate-pulse uppercase tracking-widest">
            Performance Guaranteed
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic">
            Not Just a PC. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">A Masterpiece.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop buying 'off-the-shelf' bottlenecks. We hand-pick every capacitor, fan, and chip to match your exact workflow and budget in Paradip.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Button size="lg" className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-xl font-bold shadow-2xl shadow-blue-600/40 group" asChild>
               <a href={`https://wa.me/91${salesPhone}?text=I want to build a custom PC.`}>
                 <PenTool className="mr-3 h-5 w-5" /> Start Your Build
               </a>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/20 bg-white/5 text-white text-xl hover:bg-white hover:text-slate-900 backdrop-blur-md" asChild>
               <a href={`tel:${salesPhone}`}>Talk to Architect</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Visual Component Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight uppercase">Why We Build <br /> Better Than Others</h2>
                <div className="space-y-8">
                   {[
                     { t: "The Silicon Lottery", d: "We bin our processors to ensure you get the most stable boost clocks without overheating.", i: Cpu },
                     { t: "Acoustic Engineering", d: "Zero-noise fans and optimized airflow pathing for a dead-silent studio experience.", i: Thermometer },
                     { t: "Future-Proof Pathing", d: "Every motherboard choice includes an upgrade path for the next 3 years of tech.", i: Layers },
                     { t: "Surgical Cable Mgmt", d: "Art-gallery level wiring for maximum airflow and stunning internal aesthetics.", i: Boxes }
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-6">
                        <div className="h-14 w-14 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm">
                           <item.i className="h-7 w-7" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold text-slate-900 mb-1">{item.t}</h4>
                           <p className="text-slate-500 leading-relaxed font-medium">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="relative">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl" />
                <img 
                  src="https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000" 
                  alt="Custom PC Interior" 
                  className="rounded-[3rem] shadow-2xl border border-slate-100 relative z-10"
                />
             </div>
          </div>
        </div>
      </section>

      {/* 3. Pricing Tiers */}
      <section className="py-24 bg-slate-50">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase">Choose Your Tier</h2>
               <p className="text-slate-500 text-lg font-medium">Transparent component pricing + fixed assembly fee.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {buildTiers.map((tier, i) => (
                 <Card key={i} className={`rounded-[2.5rem] border-2 transition-all duration-500 hover:-translate-y-4 ${tier.color}`}>
                   <CardContent className="p-10">
                      <h3 className="text-2xl font-black mb-3 italic uppercase tracking-tight">{tier.name}</h3>
                      <p className={`text-sm mb-8 font-medium ${tier.highlight ? 'text-blue-100' : 'text-slate-500'}`}>{tier.desc}</p>
                      <div className="text-4xl font-black mb-10">{tier.price}</div>
                      <ul className="space-y-5 mb-10">
                         {tier.features.map((f, j) => (
                           <li key={j} className="flex items-center gap-3 font-bold text-sm">
                              <CheckCircle2 className={`h-5 w-5 shrink-0 ${tier.highlight ? 'text-white' : 'text-blue-600'}`} /> {f}
                           </li>
                         ))}
                      </ul>
                      <Button variant={tier.highlight ? 'secondary' : 'default'} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest" asChild>
                        <a href={`https://wa.me/91${salesPhone}?text=I want to build a ${tier.name} PC.`}>Customize Now</a>
                      </Button>
                   </CardContent>
                 </Card>
               ))}
            </div>
         </div>
      </section>

      {/* 4. The "Win Their Trust" Process */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-4xl font-black text-slate-900 mb-16 uppercase">The Build Journey</h2>
            <div className="space-y-12">
               {[
                 { t: "The Interview", d: "We sit with you (online or in Vijay Market) to understand your FPS goals or software requirements." },
                 { t: "The Virtual Simulation", d: "We run your desired specs through benchmark simulators to prove performance before you pay." },
                 { t: "The Assembly Live-Stream", d: "Optional photos/video updates as your machine is crafted by our master technicians." },
                 { t: "The Stress Test", d: "24-hour burn-in session to ensure no 'Dead on Arrival' components ever reach your home." }
               ].map((step, i) => (
                 <div key={i} className="flex flex-col md:flex-row gap-6 items-center text-left bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-600/20">
                       0{i+1}
                    </div>
                    <div>
                       <h4 className="text-2xl font-black text-slate-900 mb-1 uppercase italic">{step.t}</h4>
                       <p className="text-slate-500 font-medium leading-relaxed">{step.d}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Paradip Local Trust */}
      <section className="py-24 bg-blue-600 rounded-[4rem] mx-4 mb-24 text-white text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:500px_500px] animate-shimmer" />
         <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 italic uppercase leading-none">Your Dream Station <br /> is Just one call away.</h2>
            <p className="text-2xl text-blue-100 mb-12 font-medium max-w-2xl mx-auto">Free shipping and on-site setup within Paradip Port, Kujang, and Vijay Market.</p>
            <Button size="lg" className="h-20 px-16 rounded-[2rem] bg-white text-blue-600 hover:bg-slate-50 text-2xl font-black shadow-3xl shadow-black/20 uppercase tracking-tighter" asChild>
               <a href={`tel:${salesPhone}`}>Construct My PC</a>
            </Button>
         </div>
      </section>
    </div>
  );
}
