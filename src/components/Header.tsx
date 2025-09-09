"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"

type NavItem = {
  label: string
  href: string
}

export interface HeaderProps {
  className?: string
  items?: NavItem[]
  activeHref?: string
  sticky?: boolean
  onCTAClick?: () => void
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Header({
  className,
  items = DEFAULT_ITEMS,
  activeHref,
  sticky = true,
  onCTAClick,
}: HeaderProps) {
  const [hash, setHash] = React.useState<string>("")

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const update = () => setHash(window.location.hash || "#home")
    update()
    window.addEventListener("hashchange", update, { passive: true })
    return () => window.removeEventListener("hashchange", update)
  }, [])

  const current = activeHref ?? hash

  return (
    <header
      className={[
        "w-full bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 border-b border-border shadow-sm",
        sticky ? "sticky top-0 z-50" : "",
        className || "",
      ].join(" ")}
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Endora Creative Studio"
          className="flex items-center gap-3 shrink-0"
        >
          <div className="relative grid size-9 place-items-center rounded-full bg-foreground text-primary-foreground shadow-sm ring-1 ring-border/60">
            <span className="font-display text-sm font-extrabold tracking-tight">E</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg sm:text-xl font-extrabold tracking-[-0.02em]">
              Endora
            </span>
            <span className="text-xs text-muted-foreground">Creative Studio</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-2">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const isActive = current && current === item.href
              return (
                <li key={item.href} className="min-w-0">
                  <Link
                    href={item.href}
                    className={[
                      "group relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      "text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="truncate">{item.label}</span>
                    <span
                      className={[
                        "pointer-events-none absolute inset-x-2 -bottom-[2px] h-[2px] rounded-full transition-opacity",
                        isActive ? "bg-foreground opacity-100" : "bg-foreground/40 opacity-0 group-hover:opacity-100",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88%] sm:max-w-sm p-0">
              <SheetHeader className="px-4 pb-2 pt-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <Link
                    href="/"
                    aria-label="Endora Creative Studio"
                    className="flex items-center gap-3"
                  >
                    <div className="relative grid size-9 place-items-center rounded-full bg-foreground text-primary-foreground shadow-sm ring-1 ring-border/60">
                      <span className="font-display text-sm font-extrabold tracking-tight">E</span>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="font-display text-lg font-extrabold tracking-[-0.02em]">
                        Endora
                      </span>
                      <span className="text-xs text-muted-foreground">Creative Studio</span>
                    </div>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <ArrowLeft className="size-5" aria-hidden="true" />
                    </Button>
                  </SheetClose>
                </div>
                <SheetDescription className="sr-only">
                  Mobile navigation menu
                </SheetDescription>
              </SheetHeader>

              <div className="px-2 pb-3 pt-1">
                <nav aria-label="Mobile primary">
                  <ul className="flex flex-col">
                    {items.map((item) => {
                      const isActive = current && current === item.href
                      return (
                        <li key={item.href}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className={[
                                "flex items-center justify-between rounded-md px-2.5 py-2.5 text-base transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                isActive
                                  ? "bg-secondary text-foreground"
                                  : "text-foreground/90 hover:bg-muted",
                              ].join(" ")}
                              aria-current={isActive ? "page" : undefined}
                            >
                              <span className="font-medium">{item.label}</span>
                              <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                            </Link>
                          </SheetClose>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}