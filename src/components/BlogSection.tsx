"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, Tags } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO date or display string
  categories: string[];
  imageUrl: string;
  imageAlt?: string;
};

interface BlogSectionProps {
  title?: string;
  description?: string;
  posts?: BlogPost[];
  maxItems?: number;
  className?: string;
}

const defaultPosts: BlogPost[] = [
  {
    slug: "ahmedabad-branding-playbook-2025",
    title: "The Ahmedabad Branding Playbook: 7 Moves to Stand Out in 2025",
    excerpt:
      "From textile heritage to tech parks, Ahmedabad brands are rewriting the rules. Here’s how to build a distinct visual identity that resonates locally and scales nationally.",
    author: "Endora Strategy Team",
    date: "2025-07-12",
    categories: ["Branding", "Strategy", "Ahmedabad"],
    imageUrl:
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Abstract branding materials and stationery on a desk",
  },
  {
    slug: "instagram-reels-for-ahmedabad-retail",
    title: "Instagram Reels That Convert for Ahmedabad Retail",
    excerpt:
      "Short-form storytelling tailored for local audiences. Our framework turns footfall insights into repeatable content formats that drive store visits and DMs.",
    author: "Meera Patel",
    date: "2025-08-03",
    categories: ["Social Media", "Content", "Retail"],
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Smartphone recording vertical video with lights in the background",
  },
  {
    slug: "seo-for-ahmedabad-startups",
    title: "Local SEO for Ahmedabad Startups: A No-Fluff Guide",
    excerpt:
      "Pragmatic steps to rank for intent-driven queries across Ambawadi, Bodakdev, and more—without bloated tools or vanity metrics.",
    author: "Rohit Sharma",
    date: "2025-06-21",
    categories: ["SEO", "Growth", "Startups"],
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Laptop with analytics dashboard on a wooden desk",
  },
  {
    slug: "design-systems-for-creative-smbs",
    title: "Design Systems for Creative SMBs in Gujarat",
    excerpt:
      "Scale your marketing ops with reusable components, accessible color tokens, and content patterns that keep teams aligned and shipping faster.",
    author: "Endora Design Team",
    date: "2025-05-28",
    categories: ["Design Systems", "Process"],
    imageUrl:
      "https://images.unsplash.com/photo-1551281044-8d8d0d8a3a5b?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Design system color swatches and UI components on a table",
  },
];

function formatDate(input: string) {
  const d = new Date(input);
  if (isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function BlogSection({
  title = "From the Studio Blog",
  description = "Insights on branding, design, and growth for Ahmedabad’s creative businesses.",
  posts = defaultPosts,
  maxItems = 4,
  className,
}: BlogSectionProps) {
  const items = posts.slice(0, maxItems);

  if (!items.length) return null;

  return (
    <section
      aria-labelledby="blog-heading"
      className={cn("w-full max-w-full", className)}
    >
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Newspaper className="h-4 w-4" aria-hidden="true" />
          <span>Latest Articles</span>
        </div>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="blog-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            {title}
          </h2>
          <div className="sm:shrink-0">
            <Button asChild className="rounded-md">
              <Link href="/blog" aria-label="View all blog posts on the blog page">
                View All Posts
              </Link>
            </Button>
          </div>
        </div>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm sm:text-base text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      <div
        className="grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Recent blog posts"
      >
        {items.map((post) => (
          <article
            key={post.slug}
            className="min-w-0"
            role="listitem"
            aria-labelledby={`post-${post.slug}-title`}
          >
            <Card className="group h-full overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md">
              <Link
                href={`/blog/${post.slug}`}
                className="block focus:outline-none"
                aria-label={`Read more: ${post.title}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt || post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    priority={false}
                  />
                </div>
              </Link>

              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <Tags className="h-3.5 w-3.5" aria-hidden="true" />
                  <div className="flex flex-wrap gap-1.5">
                    {post.categories.map((cat) => (
                      <Badge
                        key={cat}
                        variant="secondary"
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="focus:outline-none"
                  aria-label={`Open post: ${post.title}`}
                >
                  <h3
                    id={`post-${post.slug}-title`}
                    className="min-w-0 text-lg sm:text-xl font-semibold leading-snug hover:underline decoration-brand/60 underline-offset-4"
                  >
                    <span className="break-words">{post.title}</span>
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="truncate">
                    By <span className="font-medium text-foreground">{post.author}</span>
                  </div>
                  <span aria-hidden="true" className="text-border">•</span>
                  <time dateTime={post.date} className="whitespace-nowrap">
                    {formatDate(post.date)}
                  </time>
                </div>
              </CardContent>

              <CardFooter className="pt-3">
                <Button asChild variant="ghost" className="px-0 text-sm hover:bg-transparent hover:underline underline-offset-4">
                  <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}