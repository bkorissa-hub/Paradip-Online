import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollingHeadline } from "./ScrollingHeadline";
import { Sidebar } from "./Sidebar";
import { useSettings } from "@/contexts/SettingsContext";
import { useState, useEffect } from "react";
import { pagesApi, Page } from "@/api/pagesApi";

const MainLayout = () => {
  const { settings } = useSettings();
  const [homePage, setHomePage] = useState<Page | null>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const { data } = await pagesApi.getPage('home');
        if (data) setHomePage(data);
      } catch (error) {
        // Silently fail for layout data fetching
        console.error("Error fetching home page in layout:", error);
      }
    };
    fetchHome();
  }, []);

  const infobar = homePage?.sections.find(s => s.id === 'infobar');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <header className="sticky top-0 z-50 overflow-hidden">
        <ScrollingHeadline
          enabled={(settings?.showScrollingHeadline ?? true) && (infobar?.enabled ?? true)}
          text={infobar?.content.text}
          link={infobar?.content.link}
          linkText={infobar?.content.linkText}
        />
        <Header />
      </header>

      <main className="flex-1 animate-in fade-in duration-700">
        <Outlet />
      </main>

      <Footer />

      <aside aria-label="Quick Access">
        <Sidebar enabled={settings?.showSidebar ?? true} />
      </aside>
    </div>
  );
};

export default MainLayout;
