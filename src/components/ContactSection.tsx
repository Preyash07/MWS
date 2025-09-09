"use client";

import * as React from "react";
import { Mail, Phone, MapPin, MessageSquare, MailCheck, PhoneCall, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

type BusinessHour = {
  day: string;
  hours: string;
};

export interface ContactSectionProps {
  className?: string;
  addressLines?: string[]; // Each line of the office address
  phone?: string; // E.164 or local, will be used in tel:
  email?: string; // Email for mailto:
  businessHours?: BusinessHour[];
  mapEmbedSrc?: string; // Full Google Maps embed src
  onSubmit?: (payload: {
    name: string;
    email: string;
    phone: string;
    service: string;
    budget: string;
    message: string;
  }) => Promise<void>;
}

export default function ContactSection({
  className,
  addressLines = [
    "B-322, Money Plant High Street",
    "Jagatpur Road, S.G Highway", 
    "Gota, Ahmedabad",
    "Gujarat, India - 382470",
  ],
  phone = "+91-7043686169",
  email = "info@endoracreatives.com",
  businessHours = [
    { day: "Mon–Fri", hours: "10:00 – 19:00 IST" },
    { day: "Saturday", hours: "11:00 – 16:00 IST" },
    { day: "Sunday", hours: "Closed" },
  ],
  mapEmbedSrc = "https://www.google.com/maps?q=Money+Plant+High+Street,+Jagatpur+Road,+Gota,+Ahmedabad,+Gujarat+382470&output=embed",
  onSubmit,
}: ContactSectionProps) {
  const [name, setName] = React.useState("");
  const [emailVal, setEmailVal] = React.useState("");
  const [phoneVal, setPhoneVal] = React.useState("");
  const [service, setService] = React.useState<string | undefined>(undefined);
  const [budget, setBudget] = React.useState<string | undefined>(undefined);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const errors = React.useMemo(() => {
    const e: Record<string, string | undefined> = {};
    if (!name.trim()) e.name = "Please enter your full name.";
    else if (name.trim().length < 2) e.name = "Name should be at least 2 characters.";

    if (!emailVal.trim()) e.emailVal = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) e.emailVal = "Enter a valid email address.";

    if (phoneVal.trim()) {
      // Basic validation: numbers, spaces, +, -, ()
      if (!/^[\d+\-\s()]{6,}$/.test(phoneVal.trim())) e.phoneVal = "Enter a valid phone number.";
    }

    if (!service) e.service = "Select the service you're interested in.";
    if (!budget) e.budget = "Select your estimated budget.";

    if (!message.trim()) e.message = "Please tell us a bit about your project.";
    else if (message.trim().length < 20) e.message = "Message should be at least 20 characters.";

    return e;
  }, [name, emailVal, phoneVal, service, budget, message]);

  const hasErrors = Object.values(errors).some(Boolean);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({
      name: true,
      emailVal: true,
      phoneVal: true,
      service: true,
      budget: true,
      message: true,
    });
    if (hasErrors) {
      toast("Please review the form", {
        description: "Some fields need your attention.",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        email: emailVal.trim(),
        phone: phoneVal.trim(),
        service: service as string,
        budget: budget as string,
        message: message.trim(),
      };

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // Simulate request
        await new Promise((res) => setTimeout(res, 1400));
      }

      toast.success("Thanks! We'll be in touch shortly.");
      setName("");
      setEmailVal("");
      setPhoneVal("");
      setService(undefined);
      setBudget(undefined);
      setMessage("");
      setTouched({});
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={className}>
      <div className="w-full max-w-full bg-card rounded-2xl border border-border shadow-sm">
        <div className="px-6 pt-8 pb-2 sm:px-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Let's build something remarkable together
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Share your project details and our team will get back within 1 business day.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 px-6 pb-8 sm:px-8 sm:pb-10 md:grid-cols-2">
          <div className="min-w-0">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg font-semibold">
                  Get a free consultation
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tell us about your goals, constraints, and timelines.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        placeholder="Jane Doe"
                        autoComplete="name"
                        required
                        aria-invalid={touched.name && !!errors.name}
                        aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                        className="bg-card"
                      />
                      {touched.name && errors.name ? (
                        <p id="name-error" className="text-xs text-destructive">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={emailVal}
                        onChange={(e) => setEmailVal(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, emailVal: true }))}
                        placeholder="you@company.com"
                        autoComplete="email"
                        required
                        aria-invalid={touched.emailVal && !!errors.emailVal}
                        aria-describedby={touched.emailVal && errors.emailVal ? "email-error" : undefined}
                        className="bg-card"
                      />
                      {touched.emailVal && errors.emailVal ? (
                        <p id="email-error" className="text-xs text-destructive">
                          {errors.emailVal}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneVal}
                        onChange={(e) => setPhoneVal(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, phoneVal: true }))}
                        placeholder="+91 98 7654 3210"
                        autoComplete="tel"
                        aria-invalid={touched.phoneVal && !!errors.phoneVal}
                        aria-describedby={touched.phoneVal && errors.phoneVal ? "phone-error" : undefined}
                        className="bg-card"
                      />
                      {touched.phoneVal && errors.phoneVal ? (
                        <p id="phone-error" className="text-xs text-destructive">
                          {errors.phoneVal}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label>Service interest</Label>
                      <Select
                        value={service}
                        onValueChange={(v) => setService(v)}
                      >
                        <SelectTrigger aria-invalid={touched.service && !!errors.service}>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branding">Brand Identity</SelectItem>
                          <SelectItem value="web-design">Web Design & Development</SelectItem>
                          <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                          <SelectItem value="motion">Motion Graphics</SelectItem>
                          <SelectItem value="content">Content Strategy</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {touched.service && errors.service ? (
                        <p className="text-xs text-destructive">{errors.service}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Project budget</Label>
                    <Select
                      value={budget}
                      onValueChange={(v) => setBudget(v)}
                    >
                      <SelectTrigger aria-invalid={touched.budget && !!errors.budget}>
                        <SelectValue placeholder="Choose a range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lt-2k">Under ₹1.5 Lakh</SelectItem>
                        <SelectItem value="2-5k">₹1.5 Lakh – ₹4 Lakh</SelectItem>
                        <SelectItem value="5-10k">₹4 Lakh – ₹8 Lakh</SelectItem>
                        <SelectItem value="10-25k">₹8 Lakh – ₹20 Lakh</SelectItem>
                        <SelectItem value="25k-plus">₹20 Lakh+</SelectItem>
                      </SelectContent>
                    </Select>
                    {touched.budget && errors.budget ? (
                      <p className="text-xs text-destructive">{errors.budget}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                      placeholder="Share objectives, timeline, scope, and any links we should review."
                      rows={5}
                      required
                      aria-invalid={touched.message && !!errors.message}
                      aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                      className="resize-y bg-card"
                    />
                    {touched.message && errors.message ? (
                      <p id="message-error" className="text-xs text-destructive">
                        {errors.message}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        We typically reply within one business day.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-primary-foreground hover:opacity-90"
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 animate-pulse" aria-hidden="true" />
                          Sending...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <MailCheck className="h-4 w-4" aria-hidden="true" />
                          Get Free Consultation
                        </span>
                      )}
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      No commitment required. Your details are kept confidential.
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="min-w-0">
            <div className="flex flex-col gap-6">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg font-semibold">
                    Ahmedabad Studio
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Visit or reach us using the details below.
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-secondary p-2">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">Address</p>
                      <div className="text-sm text-muted-foreground break-words">
                        {addressLines.map((line, idx) => (
                          <div key={idx}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {phone ? (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-secondary p-2">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">Phone</p>
                        <a
                          href={`tel:${phone}`}
                          className="text-sm underline-offset-4 hover:underline"
                        >
                          {phone}
                        </a>
                        <div className="text-xs text-muted-foreground">
                          Best time: 10:00 – 19:00 IST
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {email ? (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-secondary p-2">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">Email</p>
                        <a
                          href={`mailto:${email}`}
                          className="text-sm underline-offset-4 hover:underline break-words"
                        >
                          {email}
                        </a>
                        <div className="text-xs text-muted-foreground">
                          We reply within 1 business day.
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-secondary p-2">
                      <PhoneCall className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">Business hours</p>
                      <ul className="text-sm text-muted-foreground">
                        {businessHours.map((bh, idx) => (
                          <li key={idx} className="flex justify-between gap-4">
                            <span>{bh.day}</span>
                            <span className="text-foreground/80">{bh.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm hover:bg-accent transition-colors"
                        aria-label="Email us"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Email
                      </a>
                    ) : null}
                    {phone ? (
                      <a
                        href={`tel:${phone}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm hover:bg-accent transition-colors"
                        aria-label="Call us"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Call
                      </a>
                    ) : null}
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm hover:bg-accent transition-colors"
                      aria-label="Connect on LinkedIn"
                      disabled
                      title="LinkedIn link not configured"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                      LinkedIn
                    </button>
                  </div>
                </CardContent>
              </Card>

              <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                <div className="sr-only" aria-live="polite">
                  Map showing our Ahmedabad location
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    title="Endora Creative Studio — Ahmedabad"
                    src={mapEmbedSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full"
                    aria-label="Google Maps location in Ahmedabad"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}