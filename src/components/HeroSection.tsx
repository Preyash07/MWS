"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Paintbrush, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeroSectionProps {
  className?: string;
  style?: React.CSSProperties;
  fullHeight?: boolean;
  headline?: string;
  subheading?: string;
  valuePoints?: string[];
  viewWorkHref?: string;
  startProjectHref?: string;
  onViewWork?: () => void;
  onStartProject?: () => void;
  imageAlt?: string;
  imageUrl?: string;
}

export default function HeroSection({
  className,
  style,
  fullHeight = true,
  headline = "Crafting Digital Experiences That Inspire",
  subheading = "Endora Creative Studio is a full‑service creative agency in Ahmedabad, blending strategy, design, and technology to help brands stand out with clarity and soul.",
  valuePoints = [
    "Brand strategy and identity",
    "Web design and development",
    "Motion and content design",
  ],
  viewWorkHref,
  startProjectHref,
  onViewWork,
  onStartProject,
  imageAlt = "Abstract digital artistry showcasing creative technology and design",
  imageUrl = "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1974&auto=format&fit=crop",
}: HeroSectionProps) {
  const SectionTag = "section";

  return (
    <SectionTag
      aria-label="Hero"
      className={[
        "relative w-full bg-background text-foreground",
        fullHeight ? "min-h-[100svh]" : "",
        className ?? "",
      ].join(" ")}
      style={style}
    >
      {/* Subtle background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-accent/60 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-brand-soft/60 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08]">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            role="img"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="fade" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
            <rect width="100" height="100" fill="url(#fade)" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 md:py-16 lg:py-20">
        <div
          className={[
            "grid w-full items-center gap-10",
            "lg:grid-cols-2 lg:gap-14",
            fullHeight ? "min-h-[80svh]" : "",
          ].join(" ")}
        >
          {/* Left: Copy */}
          <div className="flex flex-col items-start justify-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-3 py-1 text-sm text-muted-foreground ring-1 ring-inset ring-border backdrop-blur">
              <Paintbrush className="h-4 w-4 text-foreground/80" aria-hidden="true" />
              <span className="font-medium">Endora Creative Studio</span>
            </div>

            <h1 className="font-display text-[1.95rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
              {headline}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subheading}
            </p>

            <ul className="mt-2 grid w-full gap-3 sm:grid-cols-2">
              {valuePoints.map((point, idx) => (
                <li
                  key={idx}
                  className="group flex items-center gap-3 rounded-lg bg-card/70 px-3 py-2 text-sm text-foreground ring-1 ring-border backdrop-blur transition-colors hover:bg-card"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-foreground ring-1 ring-border">
                    <PenTool className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 truncate">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {viewWorkHref ? (
                <Button
                  asChild
                  size="lg"
                  aria-label="Get in touch"
                  className="rounded-lg"
                >
                  <Link href={viewWorkHref}>Get in Touch</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  aria-label="Get in touch"
                  className="rounded-lg"
                  onClick={onViewWork}
                >
                  Get in Touch
                </Button>
              )}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-card ring-1 ring-border">
              <div className="absolute inset-0 opacity-20 mix-blend-multiply">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent blur-2xl" />
                <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-brand-soft blur-2xl" />
              </div>
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={1200}
                height={900}
                priority
                className="h-[46svh] w-full max-w-full object-cover sm:h-[48svh] lg:h-[60svh]"
                sizes="(min-width: 1024px) 48rem, 100vw"
              />
              {/* Decorative corner tag */}
              <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-xs text-muted-foreground ring-1 ring-border backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-foreground" aria-hidden="true" />
                Conceptual Art Direction
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionTag>
  );
}