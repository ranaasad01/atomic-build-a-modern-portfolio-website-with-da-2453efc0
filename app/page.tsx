"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Code, Layers, Zap, Users, CheckCircle, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ExternalLink } from 'lucide-react';
import { BRAND, socialLinks } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight, heroHeadline, heroWord } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ─── Inline data ────────────────────────────────────────────────────────────

const featuredProjects = [
  {
    id: "1",
    title: "Orbit Design System",
    description: "A comprehensive component library powering 12 products across a Series B startup. Built with React, TypeScript, and Storybook.",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    image: "https://s3-alpha.figma.com/hub/file/2243587999456758553/75e4372a-8462-487a-9eef-232cbcde11ad-cover.png",
    href: "/projects",
    accent: "from-violet-500 to-purple-600",
  },
  {
    id: "2",
    title: "Pulse Analytics",
    description: "Real-time data visualization platform processing 50M+ events per day. Features live dashboards, custom chart builders, and team collaboration.",
    tags: ["Next.js", "D3.js", "PostgreSQL", "Redis"],
    image: "https://media.licdn.com/dms/image/v2/C560BAQFE9hgXdIuk8g/company-logo_200_200/company-logo_200_200/0/1630666773600/pulsedigital_logo?e=2147483647&v=beta&t=bZmZ1PqmRtJYH98AP9oD8heKWwDkKZXGbUyBxAe-vy0",
    href: "/projects",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    id: "3",
    title: "Verdant E-Commerce",
    description: "Headless commerce storefront for a sustainable goods brand. Achieved 98 Lighthouse score and 2.1s average load time across 40k monthly visitors.",
    tags: ["Next.js", "Shopify", "Tailwind", "Vercel"],
    image: "https://cdn.shopify.com/theme-store/inrup6g21zzikhu0s9anhpw8vfvc.jpg",
    href: "/projects",
    accent: "from-rose-500 to-teal-600",
  },
];

const services = [
  {
    icon: Code,
    title: "Full-Stack Engineering",
    description: "End-to-end product development from database schema to polished UI. I own the full stack so nothing falls through the cracks.",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description: "Scalable component libraries that keep teams aligned and shipping faster. Tokens, documentation, and Figma handoff included.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Audits and rewrites that turn sluggish apps into sub-second experiences. Core Web Vitals, bundle analysis, and edge delivery.",
  },
  {
    icon: Users,
    title: "Technical Leadership",
    description: "Embedded engineering lead for early-stage teams. Architecture decisions, code reviews, hiring pipelines, and engineering culture.",
  },
];

const stats = [
  { value: "8+", label: "Years of experience" },
  { value: "40+", label: "Products shipped" },
  { value: "12M+", label: "Users reached" },
  { value: "98", label: "Avg Lighthouse score" },
];

const testimonials = [
  {
    id: "t1",
    quote: "Alex rewrote our frontend in six weeks and cut our load time by 70%. The codebase is now something the whole team is proud of.",
    name: "Priya Nair",
    role: "CTO, Fieldwork Labs",
    avatar: "https://developer.chrome.com/static/docs/lighthouse/performance/performance-scoring/image/lighthouse-scoring-calcul-196f49058e387.png",
  },
  {
    id: "t2",
    quote: "Working with Alex felt like having a senior engineer and a product designer in one. Every decision was thoughtful and well-reasoned.",
    name: "Marcus Webb",
    role: "Founder, Clearpath",
    avatar: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/aewahyauhdstskbbuq43",
  },
  {
    id: "t3",
    quote: "The design system Alex built became the foundation of our entire product suite. It saved us hundreds of hours in the first quarter alone.",
    name: "Sofia Delgado",
    role: "Head of Product, Luminary",
    avatar: "https://usdtoreros.com/images/2022/11/24/Sofia_Delgado_Headshot_23.png",
  },
];

const techStack = [
  "TypeScript", "React", "Next.js", "Node.js",
  "PostgreSQL", "Redis", "Tailwind CSS", "Figma",
  "AWS", "Vercel", "Docker", "GraphQL",
];

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  dribbble: null,
} as const;

// ─── Component ──────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[var(--accent)]/8 rounded-full blur-[100px]" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/8 text-[var(--primary)] text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            {t("hero.available")}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroHeadline}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            {["Building", "products", "people", "love."].map((word) => (
              <motion.span
                key={word}
                variants={heroWord}
                className="inline-block mr-[0.25em] last:mr-0 bg-gradient-to-br from-[var(--foreground)] to-[var(--muted)] bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {t("hero.sub")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_32px_rgba(168,85,247,0.45)] hover:-translate-y-0.5"
            >
              {t("hero.cta.primary")}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm transition-all duration-300 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 hover:-translate-y-0.5"
            >
              {t("hero.cta.secondary")}
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.icon];
              if (!Icon) return null;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-colors duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[var(--muted)] tracking-widest uppercase">{t("hero.scroll")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[var(--primary)] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="py-16 border-y border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, i) => (
                <motion.li key={stat.label} variants={fadeInUp} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--muted)]">{t(`stats.${i}.label`)}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      </Reveal>

      {/* ── Featured Projects ─────────────────────────────────────────────── */}
      <Reveal>
        <section id="projects" className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">{t("projects.eyebrow")}</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">{t("projects.heading")}</h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 shrink-0"
              >
                {t("projects.viewAll")}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Project grid — asymmetric bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large featured card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="md:row-span-2 group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.24)] flex flex-col"
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={featuredProjects[0]?.image ?? ""}
                    alt={featuredProjects[0]?.title ?? ""}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(featuredProjects[0]?.tags ?? []).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{featuredProjects[0]?.title ?? ""}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">{featuredProjects[0]?.description ?? ""}</p>
                  <Link
                    href={featuredProjects[0]?.href ?? "/projects"}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:gap-3 transition-all duration-200"
                  >
                    {t("projects.caseStudy")} <ExternalLink size={14} />
                  </Link>
                </div>
              </motion.div>

              {/* Two smaller cards */}
              {(featuredProjects.slice(1) ?? []).map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.24)] flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(project.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold mb-1.5 text-[var(--foreground)]">{project.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed flex-1 line-clamp-2">{project.description}</p>
                    <Link
                      href={project.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:gap-3 transition-all duration-200"
                    >
                      {t("projects.caseStudy")} <ExternalLink size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="services" className="py-24 md:py-32 px-6 bg-[var(--surface)]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
              <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">{t("services.eyebrow")}</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight mb-6">{t("services.heading")}</h2>
                <p className="text-[var(--muted)] leading-relaxed">{t("services.sub")}</p>
              </motion.div>
              <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
                <ul className="space-y-3">
                  {[
                    t("services.check1"),
                    t("services.check2"),
                    t("services.check3"),
                    t("services.check4"),
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                      <CheckCircle size={16} className="text-[var(--primary)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Service cards — 2x2 grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    variants={scaleIn}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.16)] group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 border border-[var(--primary)]/20 flex items-center justify-center mb-4 group-hover:from-[var(--primary)]/30 group-hover:to-[var(--accent)]/30 transition-all duration-300">
                      <Icon size={20} className="text-[var(--primary)]" />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-[var(--foreground)]">{t(`services.items.${i}.title`)}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{t(`services.items.${i}.desc`)}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Tech Stack ───────────────────────────────────────────────────── */}
      <Reveal>
        <section className="py-20 px-6 border-y border-[var(--border)] overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-10">{t("stack.label")}</p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex flex-wrap justify-center gap-3"
            >
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/40 transition-all duration-200 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <Reveal>
        <section id="testimonials" className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">{t("testimonials.eyebrow")}</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">{t("testimonials.heading")}</h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid md:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.18)] flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={14} className="fill-[var(--primary)] text-[var(--primary)]" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-[var(--muted)] leading-relaxed flex-1 mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--border)]"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{testimonial.name}</p>
                      <p className="text-xs text-[var(--muted)]">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="contact" className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative rounded-3xl overflow-hidden border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--surface)] to-[var(--background)] p-10 md:p-16 text-center shadow-[0_0_80px_-20px_rgba(168,85,247,0.25)]"
            >
              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--primary)]/10 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-4">{t("cta.eyebrow")}</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">{t("cta.heading")}</h2>
                <p className="text-[var(--muted)] max-w-xl mx-auto leading-relaxed mb-10">{t("cta.sub")}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
                  >
                    {t("cta.button")}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold transition-all duration-300 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 hover:-translate-y-0.5"
                  >
                    <Mail size={16} />
                    {t("cta.email")}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

    </main>
  );
}