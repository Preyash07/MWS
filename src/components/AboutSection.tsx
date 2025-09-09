"use client"

import Image from "next/image"
import { HeartHandshake, Briefcase, Users, Dribbble, Instagram, CreativeCommons, Compass, Layers, Sparkles } from "lucide-react"
import * as React from "react"

type Stat = {
  label: string
  value: string
  icon?: React.ReactNode
}

type TeamMember = {
  name: string
  role: string
  bio: string
  imageUrl: string
}

export type AboutSectionProps = {
  className?: string
  id?: string
  heading?: string
  subheading?: string
  story?: string
  mission?: string
  stats?: Stat[]
  team?: TeamMember[]
}

const defaultStats: Stat[] = [
  { label: "Years in Craft", value: "8+", icon: <Briefcase className="size-4" aria-hidden="true" /> },
  { label: "Projects Delivered", value: "240+", icon: <CreativeCommons className="size-4" aria-hidden="true" /> },
  { label: "Happy Clients", value: "150+", icon: <HeartHandshake className="size-4" aria-hidden="true" /> },
]

const defaultTeam: TeamMember[] = [
  {
    name: "Aanya Patel",
    role: "Creative Director",
    bio: "Leads brand vision with a balance of strategy and artistry, crafting narratives that resonate.",
    imageUrl:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=Mnwx",
  },
  {
    name: "Rahul Shah",
    role: "Lead Designer",
    bio: "Shapes visual systems and interfaces with meticulous attention to typography and motion.",
    imageUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=Mnwx",
  },
  {
    name: "Mira Desai",
    role: "Brand Strategist",
    bio: "Translates business goals into clear brand positioning and meaningful customer journeys.",
    imageUrl:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=Mnwx",
  },
  {
    name: "Arjun Mehta",
    role: "Product Photographer",
    bio: "Captures honest, compelling product stories with warm lighting and refined composition.",
    imageUrl:
      "https://images.unsplash.com/photo-1547425260-9193d76b7f1b?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=Mnwx",
  },
]

export default function AboutSection({
  className,
  id,
  heading = "Rooted in Ahmedabad. Driven by creative craft.",
  subheading = "Endora Creative Studio",
  story = "Born in the busy lanes of Ahmedabad's vibrant business community, Endora blends strategic clarity with expressive design. We partner with ambitious brands—startups to stalwarts—to turn intent into identity and experiences people remember.",
  mission = "Our mission is simple: make brands feel human. We craft thoughtful systems—identity, digital, and content—that earn trust, spark emotion, and move businesses forward.",
  stats = defaultStats,
  team = defaultTeam,
}: AboutSectionProps) {
  return (
    <section
      id={id}
      className={`w-full bg-secondary/60 text-foreground ${className ? " " + className : ""}`}
      aria-labelledby="about-heading"
    >
      <div className="container max-w-6xl py-16 sm:py-20">
        <header className="w-full">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-foreground">
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-card shadow-sm">
              <Users className="size-3.5" aria-hidden="true" />
            </span>
            Ahmedabad, India
          </div>
          <h2
            id="about-heading"
            className="mt-4 text-2xl leading-tight sm:text-3xl md:text-4xl font-extrabold"
          >
            {heading}
          </h2>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            {subheading}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <p className="text-base leading-relaxed break-words">
                {story}
              </p>
              <div className="mt-6 rounded-xl bg-muted p-4">
                <div className="flex items-start gap-3">
                  <HeartHandshake className="mt-0.5 size-5 text-foreground" aria-hidden="true" />
                  <p className="text-sm sm:text-base text-foreground">
                    {mission}
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="group rounded-xl bg-secondary p-4 ring-1 ring-border transition-colors hover:bg-card"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {s.icon}
                      <dt className="text-xs sm:text-sm">{s.label}</dt>
                    </div>
                    <dd className="mt-1 text-2xl font-extrabold tracking-tight">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Dribbble className="size-4" aria-hidden="true" />
                  Design-first practice
                </span>
                <span className="inline-flex items-center gap-2">
                  <Instagram className="size-4" aria-hidden="true" />
                  Story-led content
                </span>
              </div>
            </div>
          </div>

          <aside className="md:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
              <div className="relative h-56 w-full sm:h-64">
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=Mnwx"
                  alt="Endora studio collaboration space in Ahmedabad"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">Our Ahmedabad Story</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ahmedabad's entrepreneurial energy keeps us grounded and bold. We learn from local founders,
                  collaborate with manufacturers and retailers, and bring that real-world practicality into every brand
                  we build.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium">
                  <Users className="size-3.5" aria-hidden="true" />
                  Part of a vibrant business community
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold sm:text-2xl">Our Approach</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A simple, collaborative process to move from insight to impact.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li className="group relative rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border transition-colors hover:bg-secondary">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent ring-1 ring-border">
                  <Compass className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-base font-semibold">Discover & Define</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We align on goals, audience, and positioning through workshops and research.
                  </p>
                </div>
              </div>
            </li>

            <li className="group relative rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border transition-colors hover:bg-secondary">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent ring-1 ring-border">
                  <Layers className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-base font-semibold">Design & Build</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    From brand systems to interactive websites, we craft with precision and intent.
                  </p>
                </div>
              </div>
            </li>

            <li className="group relative rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border transition-colors hover:bg-secondary">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent ring-1 ring-border">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-base font-semibold">Launch & Grow</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We launch, measure, and iterate—driving results with content and performance.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}