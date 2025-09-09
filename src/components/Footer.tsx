"use client";

import * as React from "react";
import { Instagram, Linkedin, Twitter, Facebook, Youtube, Pin } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  showNewsletter?: boolean;
  onSubscribe?: (email: string) => Promise<void> | void;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Footer({
  className,
  style,
  showNewsletter = true,
  onSubscribe,
}: FooterProps) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        await new Promise((res) => setTimeout(res, 900));
      }
      toast.success("Thanks for subscribing!");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer
      className={clsx(
        "w-full bg-secondary text-foreground border-t border-border",
        className
      )}
      style={style}
      aria-label="Site Footer"
    >
      <div className="container w-full max-w-full py-12 sm:py-16">
        <div className="grid gap-10 sm:gap-12 md:gap-14 lg:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div className="min-w-0">
            <a href="#" className="inline-flex items-center gap-2 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-primary-foreground font-display text-base font-bold shadow-sm transition-transform group-hover:scale-105">
                EC
              </span>
              <span className="font-display font-extrabold tracking-tight text-xl sm:text-2xl leading-none">
                Endora Creative Studio
              </span>
            </a>
            <p className="mt-4 text-sm leading-6 text-muted-foreground max-w-prose break-words">
              We craft thoughtful brand identities, digital experiences, and stories that
              connect. Based in Ahmedabad, working worldwide.
            </p>

            <div className="mt-6 text-sm leading-6">
              <p className="font-semibold">Ahmedabad Studio</p>
              <address className="not-italic text-muted-foreground">
                B-322, Money Plant High Street,<br />
                Jagatpur Road, S.G Highway,<br />
                Gota, Ahmedabad,<br />
                Gujarat, India - 382470
              </address>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="min-w-0" aria-label="Quick links">
            <h3 className="font-semibold text-base">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#services"
                  className="inline-flex items-center text-foreground/90 hover:text-foreground transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="inline-flex items-center text-foreground/90 hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="inline-flex items-center text-foreground/90 hover:text-foreground transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="inline-flex items-center text-foreground/90 hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="inline-flex items-center text-foreground/90 hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <div className="min-w-0">
            <h3 className="font-semibold text-base">Connect</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Follow our work and behind-the-scenes explorations.
            </p>
            <ul className="mt-5 grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs">
              <li>
                <a
                  href="https://www.instagram.com/endoracreatives/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-card border border-border px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:inline">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-card border border-border px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:inline">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-card border border-border px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:inline">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-card border border-border px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:inline">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-card border border-border px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:inline">YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Pinterest"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-card border border-border px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Pin className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:inline">Pinterest</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {showNewsletter && (
            <div className="min-w-0">
              <h3 className="font-semibold text-base">Newsletter</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Join our monthly dispatch of studio notes, process, and resources.
              </p>
              <form onSubmit={handleSubscribe} className="mt-5 space-y-3" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="sm:col-span-2 min-w-0">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-card"
                      aria-invalid={email.length > 0 && !isValidEmail(email)}
                      aria-describedby="newsletter-hint"
                    />
                    <p id="newsletter-hint" className="sr-only">
                      Enter a valid email to subscribe
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={loading}
                    aria-label="Subscribe to newsletter"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <a href="#terms" className="underline underline-offset-4">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" className="underline underline-offset-4">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mt-10 sm:mt-12 border-t border-border" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Endora Creative Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a href="#privacy" className="text-foreground/90 hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-foreground/90 hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="text-foreground/90 hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}