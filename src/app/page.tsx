"use client";

import * as React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Page() {
  const sectionOrder = React.useMemo(
    () => ["#home", "#services", "#portfolio", "#about", "#blog", "#contact"],
    []
  );
  const [activeHref, setActiveHref] = React.useState<string>("#home");

  const scrollTo = React.useCallback((hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback to setting hash if element not found
      window.location.hash = hash;
    }
  }, []);

  const handleCTAClick = React.useCallback(() => {
    scrollTo("#contact");
  }, [scrollTo]);

  React.useEffect(() => {
    const sections = sectionOrder
      .map((hash) => {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        return el ? { hash, el } : null;
      })
      .filter(Boolean) as { hash: string; el: Element }[];

    if (!sections.length) return;

    let ticking = false;

    const updateActive = () => {
      ticking = false;
      const viewportMid = window.innerHeight / 2;
      let best: { hash: string; dist: number } | null = null;

      for (const s of sections) {
        const rect = s.el.getBoundingClientRect();
        const sectionMid = rect.top + rect.height / 2;
        const dist = Math.abs(sectionMid - viewportMid);
        if (best === null || dist < best.dist) {
          best = { hash: s.hash, dist };
        }
      }

      if (best && best.hash !== activeHref) {
        setActiveHref(best.hash);
        if (typeof history.replaceState === "function") {
          history.replaceState(null, "", best.hash);
        } else {
          window.location.hash = best.hash;
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionOrder, activeHref]);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header items={[
        { label: "Home", href: "#home" },
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Blog", href: "#blog" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ]} activeHref={activeHref} onCTAClick={handleCTAClick} />

      <main>
        <section id="home" className="scroll-mt-20">
          <HeroSection
            fullHeight
            viewWorkHref="#contact"
          />
        </section>

        <section id="services" className="scroll-mt-24 py-14 sm:py-16 md:py-20">
          <div className="container">
            <ServicesSection />
          </div>
        </section>

        <section id="portfolio" className="scroll-mt-24 py-14 sm:py-16 md:py-20 bg-secondary/40">
          <div className="container">
            <PortfolioSection />
          </div>
        </section>

        <section id="about" className="scroll-mt-24 py-14 sm:py-16 md:py-20">
          <div className="container">
            <AboutSection />
          </div>
        </section>

        <section id="blog" className="scroll-mt-24 py-14 sm:py-16 md:py-20 bg-secondary/40">
          <div className="container">
            <BlogSection />
          </div>
        </section>

        <section aria-label="Client testimonials" className="scroll-mt-24 py-14 sm:py-16 md:py-20">
          <div className="container">
            <TestimonialsSection />
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-14 sm:py-16 md:py-20 bg-secondary/40">
          <div className="container max-w-6xl">
            <ContactSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}