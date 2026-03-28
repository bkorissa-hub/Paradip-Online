import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Headphones,
  MessageSquare,
  Search,
  Clock,
  Send,
  Phone,
  Mail,
  Ticket,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useSettings } from '@/contexts/SettingsContext';
import { trackTicket, type Ticket as TicketType } from '@/api/ticketsApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Laptop, ShieldCheck, Wrench, Package, Truck, CheckCircle, Loader2 } from 'lucide-react';

const faqs = [
  {
    question: 'How long does a typical laptop repair take in Paradip?',
    answer: "Most repairs at our Paradip center are completed within 24-48 hours. Complex issues like motherboard replacements take 3-5 days. If you're searching for 'laptop repair near me', we offer the fastest turnaround in the region.",
  },
  {
    question: 'Do you offer warranty on repairs and CCTV installations?',
    answer: "Yes! All our laptop repairs and CCTV installation Paradip services come with a 90-day warranty. We act as your trusted technical partner and Dell HP service center alternative in Jagatsinghpur and Paradip.",
  },
  {
    question: 'Do you provide Industrial IT AMC for businesses?',
    answer: 'Absolutely! We specialize in Industrial IT AMC Paradip, offering complete on-site support. This includes Corporate laptop supply Odisha, Server maintenance services, Network switch AMC, and Port gate CCTV maintenance.',
  },
  {
    question: 'Can you recover data or perform printer repairs?',
    answer: 'Yes! Our high success rate data recovery is trusted by many. We are also the leading center for Printer repair Paradip and offer a premium selection of refurbished desktops.',
  },
  {
    question: 'Do you offer GPS tracking systems for vehicles?',
    answer: 'Yes, we provide Car GPS tracker Paradip and Truck GPS installation. Our solutions include RTO approved VLT devices, AIS 140 GPS Odisha, and comprehensive Fleet management software Paradip.',
  },
  {
    question: 'Can I track the status of my repair?',
    answer: 'Yes! Use the search bar at the top of this Support page with your Ticket ID to get real-time status updates and technician notes on your device.',
  },
];

const Support = () => {
  const { toast } = useToast();
  const { settings } = useSettings();
  const [ticketSearch, setTicketSearch] = useState('');
  const [trackPassword, setTrackPassword] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TicketType | null>(null);
  const [trackingOpen, setTrackingOpen] = useState(false);

  const contact = settings?.contactDefaults || {
    address: "Paradeep Online Computer Service,\nUnit -1, Badapadia, Vijay Market,\nParadip, Odisha, India - 754142",
    email: "mail@paradiponline.com",
    salesPhone: "+91-9583839432",
    supportPhone: "+91-9439869690",
    complaintsPhone: "+91-7008700609"
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
  });

  const handleTrackStatus = async () => {
    if (!ticketSearch) {
      toast({ title: "Error", description: "Please enter a Ticket ID", variant: "destructive" });
      return;
    }

    setIsTracking(true);
    const { data, error } = await trackTicket(ticketSearch, ""); // We need a way to get phone/pass
    // Simplified: Show a dialog to enter phone/pass if not already provided
    setTrackingOpen(true);
    setIsTracking(false);
  };

  const handleDetailedTrack = async (phone: string, pass: string) => {
    setIsTracking(true);
    const { data, error } = await trackTicket(ticketSearch, phone, pass);
    if (error) {
      toast({ title: "Tracking Failed", description: error, variant: "destructive" });
    } else if (data) {
      setTrackingResult(data);
    }
    setIsTracking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Support Ticket Created',
      description: 'Ticket #TK-88392 has been sent to your email.',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      message: '',
    });
  };

  const isTicketingEnabled = settings?.enableTicketing ?? true;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Helmet>
        <title>IT Support & FAQs | Paradip Online</title>
        <meta name="description" content="Get 24/7 IT support, ticket tracking, and answers to common questions about laptop repair, CCTV installation, and IT AMC in Paradip." />
        <link rel="canonical" href="https://paradiponline.com/support" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>
      {/* 1. Hero Section: Search Centric */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-[100%] blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <LifeBuoy className="h-4 w-4" />
              <span>24/7 Support Center</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              How can we help you today?
            </h1>

            {/* Ticket Tracking Bar */}
            <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-950/20 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto transform hover:scale-[1.01] transition-transform duration-300">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  className="pl-10 h-12 border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 text-base font-mono"
                  placeholder="Ticket ID (e.g. TCK-1001)"
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value.toUpperCase())}
                />
              </div>
              <Button
                size="lg"
                onClick={handleTrackStatus}
                disabled={isTracking}
                className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/20"
              >
                {isTracking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Track Status"}
              </Button>
            </div>
            <p className="mt-4 text-slate-400 text-sm">
              Enter your ticket ID to check repair status or technician notes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Quick Contact Cards (Floating) */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          <ContactCard
            icon={Phone}
            title="Sales & WhatsApp"
            value={contact.salesPhone}
            sub="Hardware & Service Inquiries"
            action="Call Sales"
            href={`tel:${contact.salesPhone.replace(/[\s-]/g, '')}`}
            color="blue"
          />
          <ContactCard
            icon={Headphones}
            title="Tech Support"
            value={contact.supportPhone}
            sub="Active Repair Tracking & Help"
            action="Call Support"
            href={`tel:${contact.supportPhone.replace(/[\s-]/g, '')}`}
            color="emerald"
          />
          <ContactCard
            icon={AlertCircle}
            title="Complaints & Feedback"
            value={contact.complaintsPhone}
            sub="Escalations & Resolutions"
            action="Call Escalation"
            href={`tel:${contact.complaintsPhone.replace(/[\s-]/g, '')}`}
            color="indigo"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* 3. Ticket Form (Main) */}
          <div className="lg:col-span-7">
            {isTicketingEnabled ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                      <Ticket className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-slate-900">
                        Submit a Request
                      </h2>
                      <p className="text-slate-500 text-sm">
                        Fill out the form below for a new repair or inquiry.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          required
                          className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-11"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-11"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-11"
                          placeholder="+91..."
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-slate-700">
                          Department
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="repair">
                              Hardware Repair
                            </SelectItem>
                            <SelectItem value="software">
                              Software Issue
                            </SelectItem>
                            <SelectItem value="sales">Product Sales</SelectItem>
                            <SelectItem value="amc">Corporate AMC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-700">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        required
                        className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-11"
                        placeholder="e.g. Laptop Screen Flickering"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-700">
                        Description
                      </Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        className="bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none"
                        placeholder="Please describe the issue in detail..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 shadow-lg shadow-slate-900/10"
                      >
                        Submit Ticket <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-400 flex items-center justify-center shadow-lg shadow-slate-400/20">
                      <Ticket className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-slate-900">
                        Ticket Submission Unavailable
                      </h2>
                      <p className="text-slate-500 text-sm">
                        Online ticketing is currently disabled
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                    <p className="text-slate-700 leading-relaxed">
                      Support ticketing is currently unavailable. Please contact us directly via phone or email for assistance.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`tel:${contact.supportPhone.replace(/[\s-]/g, '')}`}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Phone className="h-4 w-4" />
                      Call Support
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
                    >
                      <Mail className="h-4 w-4" />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. FAQ Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                Common Questions
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white border border-slate-200 rounded-xl px-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-blue-600 py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20">
              <h3 className="font-bold text-lg mb-2">Still need help?</h3>
              <p className="text-blue-100 text-sm mb-6">
                Our support team is available Mon-Sat to assist you with any
                technical issues.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  asChild
                >
                  <a href={`tel:${contact.supportPhone.replace(/[\s-]/g, '')}`}>Call Support</a>
                </Button>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  asChild
                >
                   <a href={`mailto:${contact.email}`}>Email Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Tracking Dialog */}
      <Dialog open={trackingOpen} onOpenChange={(open) => {
        setTrackingOpen(open);
        if (!open) {
          setTrackingResult(null);
          setTrackPassword('');
        }
      }}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
          {!trackingResult ? (
            <div className="p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                  Verify Tracking
                </DialogTitle>
                <p className="text-slate-500">
                  Please enter the phone number and security password associated with Ticket <span className="font-mono font-bold text-slate-900">{ticketSearch}</span> to continue.
                </p>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="track-phone">Phone Number</Label>
                  <Input
                    id="track-phone"
                    placeholder="+91..."
                    className="h-12 rounded-xl bg-slate-50"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="track-pass">Security Password (Fixed)</Label>
                  <Input
                    id="track-pass"
                    type="password"
                    placeholder="Enter password from Job Card"
                    className="h-12 rounded-xl bg-slate-50"
                    value={trackPassword}
                    onChange={(e) => setTrackPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold"
                  onClick={() => handleDetailedTrack(formData.phone, trackPassword)}
                  disabled={isTracking}
                >
                  {isTracking ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Verify & View Status
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col max-h-[90vh]">
              {/* Header with Status Badge */}
              <div className="bg-slate-900 p-8 text-white relative">
                <div className="absolute top-4 right-4">
                  <Badge className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-0",
                    ['Ready for Pickup', 'Closed'].includes(trackingResult.status) ? "bg-emerald-500 text-white" : "bg-blue-600 text-white"
                  )}>
                    {trackingResult.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Laptop className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Job Card Tracking</h3>
                    <p className="text-xl font-mono font-bold">{trackingResult.jobCardNo || trackingResult.id}</p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold truncate pr-20">{trackingResult.subject}</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Gadget Info Card */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Product</p>
                    <p className="text-sm font-bold text-slate-900">{trackingResult.gadget?.productName || 'Device'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Brand & Model</p>
                    <p className="text-sm font-bold text-slate-900">{trackingResult.gadget?.brand} {trackingResult.gadget?.model}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Serial</p>
                    <p className="text-sm font-mono text-slate-600">{trackingResult.gadget?.serial || 'N/A'}</p>
                  </div>
                  <div className="col-span-2 pt-3 mt-1 border-t border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Received Condition</p>
                    <p className="text-xs text-slate-600 italic leading-relaxed">{trackingResult.gadget?.condition || 'No initial condition notes'}</p>
                  </div>

                  {trackingResult.images && trackingResult.images.length > 0 && (
                    <div className="col-span-2 pt-3 mt-1 border-t border-slate-200">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Device Images</p>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {trackingResult.images.map((img, i) => (
                          <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="shrink-0">
                            <img src={img} alt={`Device Image ${i + 1}`} className="h-20 w-20 object-cover rounded-lg border border-slate-200 shadow-sm hover:scale-105 transition-transform" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Service Timeline
                  </h4>
                  <div className="space-y-8 relative ml-3 border-l-2 border-slate-100 pl-8">
                    {trackingResult.history && trackingResult.history.length > 0 ? (
                      [...trackingResult.history].reverse().map((event, i) => (
                        <div key={i} className="relative">
                          <div className={cn(
                            "absolute -left-[41px] top-0 h-4 w-4 rounded-full bg-white border-4",
                            i === 0 ? "border-blue-600" : "border-slate-200"
                          )}></div>
                          <div>
                            <p className={cn(
                              "text-sm font-bold uppercase tracking-tight",
                              i === 0 ? "text-blue-600" : "text-slate-900"
                            )}>{event.status}</p>
                            <p className="text-[10px] text-slate-400 mb-2">{new Date(event.timestamp).toLocaleString()}</p>
                            <p className="text-sm text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100 shadow-sm">{event.note}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="relative">
                        <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full bg-white border-4 border-blue-600"></div>
                        <div>
                          <p className="text-sm font-bold text-blue-600 uppercase tracking-tight">TICKET OPENED</p>
                          <p className="text-[10px] text-slate-400 mb-2">{trackingResult.date}</p>
                          <p className="text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">Your technical support request has been registered and is awaiting assessment.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technician's Final Comment/Summary */}
                {trackingResult.comment && (
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex gap-4">
                    <MessageSquare className="h-5 w-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-blue-900 mb-1 uppercase tracking-wider">Technician Summary</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{trackingResult.comment}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => window.print()}>
                  Print Job Card
                </Button>
                <Button asChild className="flex-[2] h-12 rounded-xl bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100 font-bold">
                  <a href={`https://wa.me/${contact.salesPhone.replace(/[\s-+]/g, '')}?text=Inquiry regarding Ticket ${trackingResult.id}`}>
                    Inquiry via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper Component for Contact Cards
function ContactCard({ icon: Icon, title, value, sub, action, href, color }) {
  const colorStyles = {
    blue: 'text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white',
    emerald:
      'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white',
    indigo:
      'text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white',
  };

  return (
    <a
      href={href}
      className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 border border-slate-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            'h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-300',
            colorStyles[color]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-center text-slate-400 group-hover:text-slate-600 text-xs font-medium transition-colors">
          {action} <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="font-bold text-slate-800 text-lg mb-1">{value}</p>
        <p className="text-slate-500 text-xs">{sub}</p>
      </div>
    </a>
  );
}

export default Support;
