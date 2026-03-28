import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesHighlight } from "@/components/home/ServicesHighlight";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { pagesApi, Page } from "@/api/pagesApi";
import { useSettings } from "@/contexts/SettingsContext";

const Home = () => {
  const { settings } = useSettings();
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data } = await pagesApi.getPage('home');
        if (data) {
          setPageData(data);
        }
      } catch (error) {
        console.error("Error fetching home page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const getSection = (id: string) => {
    return pageData?.sections.find(s => s.id === id);
  };

  const heroSection = getSection('hero');
  const productsSection = getSection('products');
  const servicesSection = getSection('services');
  const ctaSection = getSection('cta');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-blue-600 font-medium">Loading amazing content...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Paradip Online | Best Computer Shop & Laptop Repair in Paradip</title>
        <meta name="description" content="Looking for the best computer shop in Paradip (Paradeep)? Paradip Online offers premium laptops, desktops, and expert repair services. Certified technicians, quick turnaround." />
        <link rel="canonical" href="https://paradiponline.com/" />
        <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Paradip Online",
  "image": "https://paradiponline.com/POL_LOGO.svg",
  "@id": "https://paradiponline.com",
  "url": "https://paradiponline.com",
  "telephone": settings?.contactDefaults?.salesPhone || "+91-9583839432",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Paradip",
    "addressLocality": "Paradip",
    "postalCode": "754142",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 20.2706,
    "longitude": 86.6664
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "20:00"
  }
})}
        </script>
      </Helmet>
      <HeroSection
        slides={heroSection?.enabled ? heroSection.content.slides : []}
        features={heroSection?.enabled ? heroSection.content.features : []}
      />
      <ServicesHighlight
        data={servicesSection?.enabled ? servicesSection.content : null}
      />
      <FeaturedProducts
        data={productsSection?.enabled ? productsSection.content : null}
      />
      <Testimonials />
      <CTASection
        data={ctaSection?.enabled ? ctaSection.content : null}
      />
    </>
  );
};

export default Home;
