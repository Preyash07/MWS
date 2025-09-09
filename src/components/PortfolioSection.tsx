"use client";

import * as React from "react";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ServiceType = "all" | "branding" | "web" | "digital" | "content";

export type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  city?: string;
  type: Exclude<ServiceType, "all">;
  imageUrl: string;
  alt: string;
};

export interface PortfolioSectionProps {
  className?: string;
  style?: React.CSSProperties;
  items?: PortfolioItem[];
  initialFilter?: ServiceType;
  ctaLabel?: string;
  onViewAll?: () => void;
  viewAllHref?: string;
}

const DEFAULT_ITEMS: PortfolioItem[] = [
  {
    id: "ahm-brand-01",
    title: "Heritage Textile Rebrand",
    client: "Khadi Collective",
    city: "Ahmedabad",
    type: "branding",
    imageUrl:
      "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=1600&auto=format&fit=crop",
    alt: "Branding mockups with textured paper and stamp",
  },
  {
    id: "ahm-web-01",
    title: "Artisanal Craft Marketplace",
    client: "Haat Lane",
    city: "Ahmedabad",
    type: "web",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    alt: "Modern website interface displayed on laptop",
  },
  {
    id: "ahm-digital-01",
    title: "Festival Performance Campaign",
    client: "Sabarmati Fest",
    city: "Ahmedabad",
    type: "digital",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    alt: "Colorful abstract shapes representing a digital campaign",
  },
  {
    id: "ahm-content-01",
    title: "Culinary Story Series",
    client: "Pol House Kitchen",
    city: "Ahmedabad",
    type: "content",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop",
    alt: "Chef preparing a dish in a warm, candid scene",
  },
  {
    id: "ahm-brand-02",
    title: "Sustainable Furniture Identity",
    client: "Neem Studio",
    city: "Ahmedabad",
    type: "branding",
    imageUrl:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop",
    alt: "Minimal stationery set on neutral background",
  },
  {
    id: "ahm-web-02",
    title: "Architect Portfolio Website",
    client: "Aava Architects",
    city: "Ahmedabad",
    type: "web",
    imageUrl:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop",
    alt: "Sleek architectural website UI on desktop",
  },
  {
    id: "ahm-digital-02",
    title: "Eco Drive Social Launch",
    client: "Green Ahmedabad",
    city: "Ahmedabad",
    type: "digital",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    alt: "Mobile phone with social media content grid",
  },
  {
    id: "ahm-content-02",
    title: "Founders in Focus",
    client: "StartUp Gully",
    city: "Ahmedabad",
    type: "content",
    imageUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop",
    alt: "Team discussion in a modern studio",
  },
];

const FILTERS: { value: ServiceType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "branding", label: "Branding" },
  { value: "web", label: "Web Design" },
  { value: "digital", label: "Digital Marketing" },
  { value: "content", label: "Content" },
];

export default function PortfolioSection({
  className,
  style,
  items = DEFAULT_ITEMS,
  initialFilter = "all",
  ctaLabel = "View All Projects",
  onViewAll,
  viewAllHref,
}: PortfolioSectionProps) {
  const [filter, setFilter] = React.useState<ServiceType>(initialFilter);

  const filtered =
    filter === "all" ? items : items.filter((it) => it.type === filter);

  return (
    <section
      className={cn(
        "w-full bg-background",
        "rounded-[var(--radius)]",
        className
      )}
      style={style}
      aria-label="Portfolio showcase"
    >
      <div className="w-full max-w-full">
        <header className="mb-6 sm:mb-8 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-foreground"
            >
              <LayoutGrid className="size-4" />
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Selected Works from Ahmedabad
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-prose">
            A curated mix of branding, web design, digital marketing, and content
            projects that showcase our craft and versatility.
          </p>

          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as ServiceType)}
            className="w-full"
          >
            <TabsList className="bg-secondary">
              {FILTERS.map((f) => (
                <TabsTrigger
                  key={f.value}
                  value={f.value}
                  className="data-[state=active]:bg-card data-[state=active]:text-foreground"
                  aria-label={`Filter by ${f.label}`}
                >
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </header>

        <div
          className={cn(
            "grid gap-4 sm:gap-6",
            "grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {filtered.map((item) => (
            <article
              key={item.id}
              className={cn(
                "group relative overflow-hidden",
                "rounded-[var(--radius)] bg-card border border-border",
                "focus-within:ring-2 focus-within:ring-ring"
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                  <div
                    className={cn(
                      "translate-y-3 opacity-0",
                      "group-hover:translate-y-0 group-hover:opacity-100",
                      "transition-all duration-300 ease-out"
                    )}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-medium border border-border shadow-sm">
                      <span className="capitalize">{toLabel(item.type)}</span>
                      {item.city ? (
                        <span className="text-muted-foreground">• {item.city}</span>
                      ) : null}
                    </div>
                    <div className="mt-2 rounded-[calc(var(--radius)-6px)] bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border border-border p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-semibold leading-tight min-w-0 break-words">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {item.client}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={undefined}
                aria-label={`${item.title} by ${item.client}`}
                tabIndex={0}
                className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
            </article>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 flex w-full items-center justify-center">
          {viewAllHref ? (
            <Button asChild size="lg" className="bg-foreground text-primary-foreground hover:opacity-90">
              <Link href={viewAllHref} aria-label={ctaLabel}>
                {ctaLabel}
              </Link>
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={onViewAll}
              className="bg-foreground text-primary-foreground hover:opacity-90"
              aria-label={ctaLabel}
            >
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function toLabel(type: Exclude<ServiceType, "all">) {
  switch (type) {
    case "branding":
      return "Branding";
    case "web":
      return "Web Design";
    case "digital":
      return "Digital Marketing";
    case "content":
      return "Content";
  }
}