"use client"

import * as React from "react"
import { Heading3, MonitorSmartphone, LayoutGrid, Section } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Service = {
  key: string
  title: string
  items: string[]
  // Icon from lucide-react
  icon: React.ElementType
}

export interface ServicesSectionProps {
  className?: string
  heading?: string
  subheading?: string
  services?: Service[]
}

const defaultServices: Service[] = [
  {
    key: "branding",
    title: "Branding",
    items: ["Brand Strategy", "Brand Identity", "Logo Design", "Packaging Design"],
    icon: Heading3,
  },
  {
    key: "web",
    title: "Website Design & Development",
    items: ["UX/UI Design", "Responsive Development", "CMS Integration", "Performance Optimization"],
    icon: MonitorSmartphone,
  },
  {
    key: "marketing",
    title: "Digital Marketing",
    items: ["SEO & Analytics", "Email Marketing", "Social Media Marketing", "Social Campaigns", "Paid Media"],
    icon: LayoutGrid,
  },
  {
    key: "content",
    title: "Content Creation",
    items: ["Art Direction", "Copywriting", "Photography", "Video & Motion"],
    icon: Section,
  },
]

function clsx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ")
}

export default function ServicesSection({
  className,
  heading = "Our Services",
  subheading = "Endora Creative Studio offers a comprehensive suite of services that blend strategy, design, and storytelling. From brand foundations to high-performing digital experiences, we craft cohesive systems that scale with your vision.",
  services = defaultServices,
}: ServicesSectionProps) {
  const sectionId = React.useId()

  return (
    <section
      aria-labelledby={`${sectionId}-heading`}
      className={clsx(
        "w-full max-w-full bg-background",
        "rounded-none",
        className
      )}
    >
      <div className="w-full max-w-full">
        <header className="mb-8 md:mb-12">
          <h2
            id={`${sectionId}-heading`}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl break-words">
              {subheading}
            </p>
          ) : null}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.key}
                role="article"
                aria-label={service.title}
                className={clsx(
                  "group relative overflow-hidden",
                  "bg-card border border-border",
                  "rounded-[var(--radius)]",
                  "transition-all duration-300 ease-out",
                  "hover:shadow-lg hover:-translate-y-0.5",
                  "focus-within:shadow-lg"
                )}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <div className="absolute -top-16 -right-12 h-40 w-40 rounded-full bg-accent blur-3xl" />
                </div>

                <CardHeader className="pb-0">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="shrink-0">
                      <span
                        className={clsx(
                          "inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center",
                          "rounded-xl bg-accent text-foreground",
                          "ring-1 ring-border",
                          "transition-transform duration-300 ease-out",
                          "group-hover:-translate-y-0.5"
                        )}
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                        {service.title}
                      </CardTitle>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                        A focused set of capabilities to elevate your brand.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-5 sm:pt-6">
                  <ul className="grid grid-cols-1 gap-2 sm:gap-2.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 min-w-0">
                        <span
                          className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-foreground/70 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm sm:text-base text-foreground/90 break-words">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <div
                  className={clsx(
                    "pointer-events-none absolute inset-x-0 bottom-0 h-0.5",
                    "bg-gradient-to-r from-transparent via-foreground/20 to-transparent",
                    "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  )}
                  aria-hidden="true"
                />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}