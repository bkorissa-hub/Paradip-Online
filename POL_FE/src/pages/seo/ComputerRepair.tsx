import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Cpu, Wrench, Clock, CheckCircle2, Phone, MapPin, 
  ArrowRight, HardDrive, Zap, Star, MessageSquare, AlertTriangle,
  History, Settings, Laptop, MousePointer2, Settings2, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

const testimonials = [
  {
    name: "Rajesh Mohanty",
    role: "Local Business Owner",
    content: "My laptop died in the middle of tax filing. Paradip Online diagnosed a faulty SSD and had me back up and running with all data intact in under 24 hours. Their professionalism is unmatched in Paradip.",
    rating: 5
  },
  {
    name: "Soumya Ranjan",
    role: "Student",
    content: "Best place for custom PC parts and repairs. They replaced my broken screen with a genuine panel at half the price of the authorized service center. Highly recommended!",
    rating: 5
  }
];

const faqItems = [
  {
    q: "How long does a typical laptop repair take?",
    a: "Most software-related issues and basic hardware swaps (RAM/SSD) are completed within 4-6 hours. Complex motherboard repairs usually take 2-3 business days depending on part availability."
  },
  {
    q: "Do you provide on-site repair in Paradip Port area?",
    a: "Yes! We offer on-site diagnostics and minor repairs for businesses and residents within 10km of Vijay Market, including the Paradip Port and PPL townships."
  },
  {
    q: "Will my data be safe during the repair?",
    a: "Absolutely. We follow strict data privacy protocols. We always recommend a backup, but if your system won't boot, we use specialized tools to protect your files before any hardware intervention."
  },
  {
    q: "Do you use genuine spare parts?",
    a: "We only use OEM (Original Equipment Manufacturer) or high-quality certified compatible parts with full warranty coverage. We never use 'grey market' components without customer consent."
  }
];

export default function ComputerRepair() {
  const { settings } = useSettings();
  const contact = settings?.contactDefaults || {
    salesPhone: "9583839432",
    supportPhone: "9439869690"
  };

  const salesPhone = contact.salesPhone.replace(/[\s-+]/g, '');

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Fast Computer & Laptop Repair in Paradip | Guaranteed Support</title>
        <meta name="description" content="Stuck with a slow laptop or broken screen in Paradip? Get expert hardware repair, chip-level motherboard servicing, and SSD upgrades at Vijay Market. 100% genuine parts." />
        <link rel="canonical" href="https://paradiponline.com/services/computer-and-laptop-repair" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Computer & Laptop Repair",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Paradip Online Computer Service",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Unit-1, Badapadia, Vijay Market",
                "addressLocality": "Paradip",
                "addressRegion": "Odisha",
                "addressCountry": "IN"
              }
            },
            "areaServed": ["Paradip", "Kujang", "Ersama", "Jagatsinghpur"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Computer Repair Tiers",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "Basic Diagnosis" }
                },
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "Component Level Repair" }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      {/* 1. Dynamic Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-900 leading-tight">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900 to-slate-900" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-bold mb-8 animate-pulse">
              <Zap className="h-4 w-4 fill-blue-400" /> Paradip's #1 Rated Computer Service Center
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
              Don't Wait Days for a <span className="text-blue-400">Repair.</span> Get It Fixed Today!
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Slow Windows? Broken Hinges? Blue Screen of Death? Our engineers solve 90% of laptop issues within 24 hours at our Vijay Market facility.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button size="lg" className="h-16 px-10 text-lg bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-500/40 rounded-2xl group transition-all" asChild>
                <a href={`tel:${salesPhone}`}>
                  <Phone className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" /> 
                  Free Phone Diagnosis
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-white/20 bg-white/5 text-white hover:bg-white hover:text-slate-900 backdrop-blur-md rounded-2xl" asChild>
                <a href={`https://wa.me/91${salesPhone}?text=Hi, I need help with my computer repair.`}>
                  <FaWhatsapp className="mr-3 h-6 w-6 text-green-400" /> 
                  WhatsApp for Quotes
                </a>
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
               {[
                 { label: "Repair Done", val: "5000+" },
                 { label: "Happy Clients", val: "2500+" },
                 { label: "Warranty Days", val: "90-365" },
                 { label: "Expert Techs", val: "10+" }
               ].map((stat, i) => (
                 <div key={i}>
                    <div className="text-3xl font-bold text-blue-400">{stat.val}</div>
                    <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Urgent Objection Handling Grids */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-3xl -rotate-2" />
                <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1000" 
                    alt="Laptop Repair Paradip" 
                    className="rounded-2xl w-full h-[400px] object-cover"
                   />
                   <div className="absolute bottom-10 left-10 right-10 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <span className="text-sm font-bold">4.9/5 Rating</span>
                      </div>
                      <p className="text-sm italic text-slate-300">"The only place in Paradip that actually knows motherboard level repair."</p>
                   </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-10">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  Stop Struggling with a <span className="text-red-500">Broken Device.</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We understand how frustrating it is when your primary workstation or gaming machine fails. Most authorized centers will tell you to replace the whole board—we tell you we can fix the specific chip for a fraction of the cost.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { title: "No Data Loss Guarantee", icon: ShieldCheck, color: "text-emerald-600" },
                  { title: "Genuine Spares Only", icon: CheckCircle2, color: "text-blue-600" },
                  { title: "Doorstep Pickup Available", icon: MapPin, color: "text-orange-600" },
                  { title: "Express 2-Hour Service", icon: Clock, color: "text-purple-600" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={`mt-1 h-10 w-10 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform ${item.color}`}>
                       <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">Industry standard compliance</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pricing Tiers */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Transparent Service Pricing</h2>
            <p className="text-slate-400 text-lg">Best rates in the Jagatsinghpur district. No surprises.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {[
               { name: "Basic Health Check", price: "₹299", features: ["Full OS Optimization", "Thermal Paste Cleaning", "Virus Removal Check", "Battery Health Audit"] },
               { name: "Hardware Repair", price: "₹499+", features: ["Screen Replacement", "Keyboard Repairs", "Hinge Reconstruction", "DC Jack Replacement"], highlighted: true },
               { name: "Advanced Board Service", price: "₹1499+", features: ["Chip-level IC repair", "Short Circuit fix", "Liquid Damage Service", "Bios Programming"] }
             ].map((plan, i) => (
               <div key={i} className={`rounded-3xl p-8 border transition-all duration-300 ${plan.highlighted ? 'bg-blue-600 border-blue-400 shadow-2xl scale-105' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-6">{plan.price}</div>
                  <ul className="space-y-4 mb-8">
                     {plan.features.map((f, j) => (
                       <li key={j} className="flex items-center gap-3 text-sm text-slate-100">
                         <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.highlighted ? 'text-white' : 'text-blue-400'}`} /> {f}
                       </li>
                     ))}
                  </ul>
                  <Button variant={plan.highlighted ? 'secondary' : 'outline'} className="w-full h-12 rounded-xl font-bold" asChild>
                    <a href={`tel:${salesPhone}`}>Book Diagnostic</a>
                  </Button>
               </div>
             ))}
          </div>
          <p className="text-center mt-12 text-slate-500 text-sm italic">* Spare part costs are extra and quoted before installation.</p>
        </div>
      </section>

      {/* 4. The Process */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 text-slate-900 font-bold">
            <h2 className="text-4xl font-bold mb-6">How We Get You Back Online</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 hidden md:block" />
            <div className="grid md:grid-cols-4 gap-12 relative z-10">
               {[
                 { step: "01", title: "Free Diagnosis", desc: "Bring your device or call us. We identifying the core issue in minutes.", icon: SearchIcon },
                 { step: "02", title: "Instant Quote", desc: "We provide an exact cost for parts and labor. No work starts without your OK.", icon: FileText },
                 { step: "03", title: "Precision Repair", desc: "Our certified engineers use ESD-safe tools and lab-grade IC stations.", icon: Settings2 },
                 { step: "04", title: "Quality Check", desc: "We run a 24-point stress test to insure stability before handover.", icon: ShieldCheck }
               ].map((item, i) => (
                 <div key={i} className="text-center group">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-blue-500/20">
                       <item.icon className="h-10 w-10" />
                    </div>
                    <div className="text-2xl font-black text-slate-200 mb-2">{item.step}</div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 rounded-2xl border border-blue-200 text-blue-700 font-bold text-sm">
            <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-12">Expert Insights for You</h2>
          
          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden bg-white">
                <CardContent className="p-0">
                   <div className="p-8">
                      <h4 className="font-bold text-slate-900 mb-4 text-xl">{faq.q}</h4>
                      <p className="text-slate-600 leading-relaxed text-lg">{faq.a}</p>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sticky Bottom Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden animate-bounce-subtle">
         <Button className="w-full h-16 rounded-2xl bg-green-600 hover:bg-green-700 text-white shadow-2xl shadow-green-500/40 font-black text-lg gap-3" asChild>
            <a href={`https://wa.me/91${salesPhone}`}>
               <FaWhatsapp className="h-7 w-7" /> Chat with Expert Now
            </a>
         </Button>
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  )
}

function FileText(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>
  )
}
