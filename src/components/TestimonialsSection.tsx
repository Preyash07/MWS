"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ServiceType = "Branding" | "Web Design" | "Digital Marketing" | "Content Creation";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  location?: string;
  service: ServiceType;
  rating: 1 | 2 | 3 | 4 | 5;
  result?: string;
  avatarUrl?: string;
  initials?: string;
};

export type TestimonialsSectionProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  items?: Testimonial[];
  cardsPerView?: 1 | 2 | 3;
  showGridOnLarge?: boolean;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Endora elevated our brand presence across Ahmedabad. The new identity feels sophisticated yet approachable—exactly what we needed.",
    name: "Riya Shah",
    company: "Kalpana Textiles",
    location: "Ahmedabad",
    service: "Branding",
    rating: 5,
    result: "Brand recall up 38% within 3 months",
    avatarUrl:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=480&auto=format&fit=crop",
    initials: "RS",
  },
  {
    id: "t2",
    quote:
      "Our website loads faster, converts better, and finally reflects our craftsmanship. The UX details are stellar.",
    name: "Vishal Patel",
    company: "CraftEdge Studios",
    location: "Ahmedabad",
    service: "Web Design",
    rating: 5,
    result: "Bounce rate down 27%, demo requests up 2.3x",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=480&auto=format&fit=crop",
    initials: "VP",
  },
  {
    id: "t3",
    quote:
      "The content strategy is thoughtful and consistent. Our LinkedIn engagement feels organic, not forced.",
    name: "Aarav Mehta",
    company: "Nimbus Logistics",
    location: "Ahmedabad",
    service: "Content Creation",
    rating: 4,
    result: "Avg. post reach up 3.1x, +1,800 followers",
    avatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=480&auto=format&fit=crop",
    initials: "AM",
  },
  {
    id: "t4",
    quote:
      "Paid campaigns finally show ROI. The team iterates fast and backs decisions with data.",
    name: "Neha Desai",
    company: "Herbal Nest",
    location: "Ahmedabad",
    service: "Digital Marketing",
    rating: 5,
    result: "ROAS 4.6, CAC reduced by 32%",
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=480&auto=format&fit=crop",
    initials: "ND",
  },
  {
    id: "t5",
    quote:
      "A cohesive rebrand and a modular design system we can actually use. Love the craft and clarity.",
    name: "Sanjay Kumar",
    company: "Mosaic Realty",
    location: "Gandhinagar",
    service: "Branding",
    rating: 5,
    result: "Shortened proposal cycles by 22%",
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=480&auto=format&fit=crop",
    initials: "SK",
  },
  {
    id: "t6",
    quote:
      "From wireframes to launch, the process was smooth. We’re proud to share the site with clients.",
    name: "Priya Iyer",
    company: "Aster Clinics",
    location: "Ahmedabad",
    service: "Web Design",
    rating: 4,
    result: "Session duration up 41%, leads +68%",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=480&auto=format&fit=crop",
    initials: "PI",
  },
];

function StarRating({ value, label }: { value: number; label?: string }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < value);
  return (
    <div className="flex items-center" aria-label={label || `${value} out of 5 stars`} role="img">
      {stars.map((filled, idx) => (
        <Star
          key={idx}
          className={cn(
            "h-4 w-4",
            filled ? "text-chart-2" : "text-muted-foreground/40",
            "fill-current"
          )}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{label || `${value} out of 5 stars`}</span>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Card
      className={cn(
        "bg-card border-border",
        "rounded-[var(--radius)] h-full",
        "transition-shadow duration-300 hover:shadow-md"
      )}
    >
      <CardContent className="p-6 flex h-full flex-col">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-primary"
          >
            <Quote className="h-4 w-4" />
          </span>
          <StarRating value={t.rating} />
        </div>

        <blockquote className="mt-4 text-base sm:text-lg text-foreground leading-relaxed">
          “{t.quote}”
        </blockquote>

        {t.result ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Result: <span className="font-medium text-foreground">{t.result}</span>
          </p>
        ) : null}

        <div className="mt-6 flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-1 ring-border">
            {t.avatarUrl ? (
              <AvatarImage
                src={t.avatarUrl}
                alt={`${t.name} avatar`}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-muted text-foreground">{t.initials || "EC"}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {t.company}
              {t.location ? ` • ${t.location}` : ""}
            </p>
          </div>
          <div className="ml-auto">
            <Badge variant="secondary" className="bg-secondary text-foreground border-border">
              {t.service}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection({
  className,
  title = "What our clients say",
  subtitle = "Trusted by Ahmedabad businesses and beyond.",
  items = DEFAULT_TESTIMONIALS,
  cardsPerView = 3,
  showGridOnLarge = true,
}: TestimonialsSectionProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const scrollByCards = (dir: "prev" | "next") => {
    const el = containerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth : el.clientWidth;
    const gap = parseInt(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "24", 10);
    const amount = (cardWidth + (isNaN(gap) ? 24 : gap)) * (cardsPerView === 3 ? 2 : 1);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth - 2; // buffer
      setCanPrev(el.scrollLeft > 2);
      setCanNext(el.scrollLeft < maxScroll);
    };
    onScroll();

    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [items, cardsPerView]);

  const gridClasses =
    showGridOnLarge
      ? "lg:grid lg:grid-cols-3 lg:gap-6"
      : "";

  return (
    <section className={cn("w-full", className)}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display">
          {title}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="relative">
        <div className="flex items-center justify-end gap-2 mb-3 sm:mb-4">
          <div className="sr-only" aria-live="polite">
            {canPrev ? "Previous testimonials available" : "At start of list"}
            {canNext ? " Next testimonials available" : " At end of list"}
          </div>
          <Button
            type="button"
            variant="secondary"
            className="bg-secondary text-foreground border border-border"
            onClick={() => scrollByCards("prev")}
            aria-label="Previous testimonials"
            disabled={!canPrev}
          >
            <span aria-hidden="true">←</span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="bg-secondary text-foreground border border-border"
            onClick={() => scrollByCards("next")}
            aria-label="Next testimonials"
            disabled={!canNext}
          >
            <span aria-hidden="true">→</span>
          </Button>
        </div>

        <div
          ref={containerRef}
          className={cn(
            "not-prose w-full max-w-full",
            "flex lg:block gap-4 sm:gap-6",
            "overflow-x-auto lg:overflow-visible",
            "scroll-smooth snap-x snap-mandatory lg:snap-none",
            "pb-2 -mb-2",
            "min-w-0",
            gridClasses
          )}
          aria-label="Client testimonials carousel"
        >
          {items.map((t) => (
            <div
              key={t.id}
              data-card
              className={cn(
                "snap-start lg:snap-none",
                "min-w-[85%] sm:min-w-[60%] md:min-w-[45%]",
                showGridOnLarge ? "lg:min-w-0" : "",
                "lg:w-auto"
              )}
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {/* Decorative subtle gradients for polish */}
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}