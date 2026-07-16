"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, ExternalLink, Code2 as Github, Sparkles } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ─── Project Data ────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  image: string;
  liveHref: string;
  githubHref: string;
  featured?: boolean;
  year: string;
  stack: string[];
}

const projects: Project[] = [
  {
    id: "luminary-dashboard",
    title: "Luminary Dashboard",
    description:
      "A real-time analytics platform for SaaS businesses with live KPI tracking, cohort analysis, and customizable widget layouts.",
    longDescription:
      "Built for growth teams who need clarity at a glance. Luminary surfaces the metrics that matter with sub-second data refresh and a drag-and-drop canvas.",
    tags: ["Web App"],
    category: "Web App",
    image: "https://www.luminaryanalytics.com/assets/logo-color.png",
    liveHref: "https://luminary.demo",
    githubHref: "https://github.com/alexrivera-dev/luminary",
    featured: true,
    year: "2024",
    stack: ["Next.js", "TypeScript", "Recharts", "Supabase", "Tailwind CSS"],
  },
  {
    id: "orbitpay",
    title: "OrbitPay Billing Portal",
    description:
      "End-to-end billing management for subscription businesses — invoices, dunning flows, revenue recognition, and Stripe integration.",
    longDescription:
      "OrbitPay reduces churn by automating failed-payment recovery and gives finance teams a single source of truth for MRR and ARR.",
    tags: ["Web App", "API/Backend"],
    category: "Web App",
    image: "https://orbitpay.info/wp-content/uploads/2025/05/Orbitpay-logo.png",
    liveHref: "https://orbitpay.demo",
    githubHref: "https://github.com/alexrivera-dev/orbitpay",
    featured: true,
    year: "2024",
    stack: ["React", "Node.js", "Stripe", "PostgreSQL", "Prisma"],
  },
  {
    id: "nova-ui",
    title: "Nova UI",
    description:
      "A themeable, accessible component library with 60+ primitives, dark-mode tokens, and Storybook documentation.",
    longDescription:
      "Nova UI ships with a design-token system that lets teams swap brand colors in one file. Every component meets WCAG 2.1 AA out of the box.",
    tags: ["Design System"],
    category: "Design System",
    image: "https://s3-alpha.figma.com/hub/file/2165966137817105960/1a6e9e4d-1b51-4685-8912-476f650a4805-cover.png",
    liveHref: "https://nova-ui.demo",
    githubHref: "https://github.com/alexrivera-dev/nova-ui",
    featured: false,
    year: "2023",
    stack: ["React", "TypeScript", "Radix UI", "Storybook", "CSS Variables"],
  },
  {
    id: "traillog",
    title: "TrailLog",
    description:
      "A cross-platform hiking companion app with offline maps, elevation profiles, and social trail reviews.",
    longDescription:
      "TrailLog works without cell service. Routes are cached on-device and synced when connectivity returns, so hikers never lose their progress.",
    tags: ["Mobile"],
    category: "Mobile",
    image: "https://www.traillink.com/images/tl/photos/phone-hero@2x.png",
    liveHref: "https://traillog.demo",
    githubHref: "https://github.com/alexrivera-dev/traillog",
    featured: false,
    year: "2023",
    stack: ["React Native", "Expo", "MapLibre", "SQLite", "TypeScript"],
  },
  {
    id: "pulse-api",
    title: "Pulse API",
    description:
      "A high-throughput REST and GraphQL API gateway with rate limiting, request tracing, and a developer portal.",
    longDescription:
      "Pulse handles 50k+ requests per minute with p99 latency under 40ms. The built-in developer portal auto-generates SDKs from the OpenAPI spec.",
    tags: ["API/Backend", "Open Source"],
    category: "API/Backend",
    image: "https://picsum.photos/seed/810d867b26d3/800/600",
    liveHref: "https://pulse-api.demo",
    githubHref: "https://github.com/alexrivera-dev/pulse-api",
    featured: false,
    year: "2023",
    stack: ["Node.js", "Fastify", "GraphQL", "Redis", "Docker"],
  },
  {
    id: "folio-cms",
    title: "Folio CMS",
    description:
      "A headless CMS built for creative studios — structured content, rich media management, and a live preview editor.",
    longDescription:
      "Folio gives editors a WYSIWYG canvas while developers consume clean JSON via REST or GraphQL. Webhooks trigger instant CDN purges on publish.",
    tags: ["Open Source", "Web App"],
    category: "Web App",
    image: "https://images.prismic.io/prismic-main/655a4a90531ac2845a254648_TraditionalvsHeadlesscms.png?auto=compress,format",
    liveHref: "https://folio-cms.demo",
    githubHref: "https://github.com/alexrivera-dev/folio-cms",
    featured: false,
    year: "2022",
    stack: ["Next.js", "MongoDB", "AWS S3", "TypeScript", "tRPC"],
  },
];

const FILTER_CATEGORIES = [
  "All",
  "Web App",
  "Design System",
  "Open Source",
  "Mobile",
  "API/Backend",
] as const;

type FilterCategory = (typeof FILTER_CATEGORIES)[number];

// ─── Card hover variant ───────────────────────────────────────────────────────

const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const imageHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.06,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const overlayHover: Variants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// ─── ProjectCard ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations();
  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
      transition={{ delay: index * 0.07 }}
      whileHover="hover"
      initial_="rest"
      animate_="rest"
      className={`group relative flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_32px_-8px_rgba(0,0,0,0.28)] ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <motion.img
          variants={imageHover}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Overlay */}
        <motion.div
          variants={overlayHover}
          className="absolute inset-0 bg-[var(--primary)]/20 backdrop-blur-[2px] flex items-center justify-center gap-4"
        >
          <a
            href={project.liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm hover:bg-white/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
            {t("projects.card.live")}
          </a>
          <a
            href={project.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm hover:bg-white/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={14} />
            {t("projects.card.code")}
          </a>
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--primary)]/90 text-white text-xs font-semibold backdrop-blur-sm">
            <Sparkles size={10} />
            {t("projects.card.featured")}
          </span>
        )}

        {/* Year badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 text-white/80 text-xs font-medium backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Category pill */}
        <span className="self-start px-2.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold tracking-wide">
          {project.category}
        </span>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {(project.stack ?? []).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ─── FilterBar ───────────────────────────────────────────────────────────────

function FilterBar({
  active,
  onChange,
}: {
  active: FilterCategory;
  onChange: (cat: FilterCategory) => void;
}) {
  const t = useTranslations();
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={t("projects.filter.aria")}>
      {FILTER_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
            active === cat
              ? "text-white"
              : "text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/40"
          }`}
        >
          {active === cat && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{t(`projects.filter.${cat.toLowerCase().replace(/\//g, "_").replace(/ /g, "_")}`)}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <main className="min-h-screen bg-[var(--background)] pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section 1: Page Header ─────────────────────────────────────── */}
        <Reveal>
          <section className="mb-16 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold tracking-widest uppercase mb-6">
              <Sparkles size={12} />
              {t("projects.header.eyebrow")}
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.05] text-balance mb-5">
              {t("projects.header.title")}
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed text-pretty">
              {t("projects.header.subtitle")}
            </p>
          </section>
        </Reveal>

        {/* ── Section 2: Filter Bar ──────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <section className="mb-12">
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
          </section>
        </Reveal>

        {/* ── Section 3: Projects Grid ───────────────────────────────────── */}
        <section aria-label={t("projects.grid.aria")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.length > 0 ? (
                filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))
              ) : (
                <motion.div
                  variants={fadeInUp}
                  className="col-span-full flex flex-col items-center justify-center py-24 text-center"
                >
                  <p className="text-2xl font-bold text-[var(--foreground)] mb-2">
                    {t("projects.empty.title")}
                  </p>
                  <p className="text-[var(--muted)] text-sm">
                    {t("projects.empty.subtitle")}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── Section 4: CTA Banner ──────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <section className="mt-24">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary)]/20 via-[var(--surface)] to-[var(--accent)]/10 border border-[var(--border)] p-12 md:p-16 text-center">
              {/* Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--primary)]/20 blur-3xl"
              />
              <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold tracking-widest uppercase">
                  <Sparkles size={12} />
                  {t("projects.cta.eyebrow")}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)] text-balance">
                  {t("projects.cta.title")}
                </h2>
                <p className="text-[var(--muted)] leading-relaxed text-pretty">
                  {t("projects.cta.subtitle")}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_28px_rgba(168,85,247,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                >
                  {t("projects.cta.button")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

      </div>
    </main>
  );
}