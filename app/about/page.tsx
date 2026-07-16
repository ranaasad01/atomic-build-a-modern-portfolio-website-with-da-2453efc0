"use client";
import { motion, type Variants } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Download, Mail } from 'lucide-react';
import { BRAND, socialLinks } from "@/lib/data";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ─── Inline mock data ────────────────────────────────────────────────────────

interface SkillCategory {
  name: string;
  skills: string[];
}

interface TimelineEntry {
  role: string;
  company: string;
  dateRange: string;
  description: string;
  current?: boolean;
  type: "work" | "education";
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Rust", "SQL"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Radix UI"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "GraphQL", "REST APIs"],
  },
  {
    name: "Infra",
    skills: ["Vercel", "AWS", "Docker", "PostgreSQL", "Redis"],
  },
  {
    name: "Testing",
    skills: ["Vitest", "Playwright", "Jest", "Testing Library"],
  },
  {
    name: "Design",
    skills: ["Figma", "Storybook", "Design Systems", "Accessibility"],
  },
];

const timelineEntries: TimelineEntry[] = [
  {
    role: "Senior Full-Stack Engineer",
    company: "Luminary Labs",
    dateRange: "2022 — Present",
    description:
      "Lead engineer on a real-time collaboration platform serving 200k+ users. Architected a micro-frontend system that reduced deployment friction by 60%. Mentored a team of four engineers and drove adoption of TypeScript across the entire codebase.",
    current: true,
    type: "work",
  },
  {
    role: "UI Engineer",
    company: "Orbit Studio",
    dateRange: "2020 — 2022",
    description:
      "Designed and built the component library powering three SaaS products. Delivered pixel-perfect interfaces from Figma specs, improved Lighthouse scores from 62 to 97, and introduced end-to-end testing with Playwright.",
    type: "work",
  },
  {
    role: "Frontend Developer",
    company: "Pixel & Co.",
    dateRange: "2018 — 2020",
    description:
      "Joined as the first frontend hire at a fast-growing e-commerce startup. Rebuilt the checkout flow in React, cutting cart abandonment by 18%. Shipped a headless CMS integration that let the marketing team move independently.",
    type: "work",
  },
  {
    role: "B.S. Computer Science",
    company: "UC Berkeley",
    dateRange: "2014 — 2018",
    description:
      "Graduated with honors. Focused on human-computer interaction and distributed systems. Teaching assistant for CS61B (Data Structures). Hackathon finalist at Cal Hacks 2017.",
    type: "education",
  },
];

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function SkillBadge({ skill }: { skill: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 transition-colors duration-200 cursor-default select-none"
    >
      {skill}
    </motion.span>
  );
}

function GlowButton({
  href,
  children,
  download,
}: {
  href: string;
  children: React.ReactNode;
  download?: boolean;
}) {
  return (
    <motion.a
      href={href}
      download={download}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] transition-shadow duration-300"
    >
      {children}
    </motion.a>
  );
}

function SocialIconButton({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 transition-colors duration-200"
    >
      <Icon size={18} />
    </motion.a>
  );
}

const dotPulse: Variants = {
  hidden: { scale: 0.8, opacity: 0.4 },
  visible: {
    scale: [0.8, 1.3, 0.8],
    opacity: [0.4, 1, 0.4],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── (1) AboutIntro — split layout ── */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Portrait */}
          <motion.div variants={slideInLeft} className="relative flex justify-center lg:justify-start">
            <div className="relative w-72 h-80 lg:w-80 lg:h-96">
              {/* Glow behind portrait */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/20 blur-2xl scale-110" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/537b9b47e4b06d846cb6d2ad/31287a21-5189-426f-80ad-11e0e7eef078/HU8A1262.jpg"
                  alt={t("about.portraitAlt")}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background =
                        "linear-gradient(135deg, var(--surface) 0%, var(--primary)/10 100%)";
                      const initials = document.createElement("div");
                      initials.className =
                        "absolute inset-0 flex items-center justify-center text-6xl font-bold text-[var(--primary)] opacity-40 select-none";
                      initials.textContent = BRAND.initials;
                      parent.appendChild(initials);
                    }
                  }}
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-4 -right-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                <motion.span
                  variants={dotPulse}
                  initial="hidden"
                  animate="visible"
                  className="w-2.5 h-2.5 rounded-full bg-rose-400 flex-shrink-0"
                />
                <span className="text-xs font-medium text-[var(--foreground)]">
                  {t("about.availableBadge")}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Headline + intro */}
          <motion.div variants={slideInRight} className="flex flex-col gap-6">
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-sm font-semibold uppercase tracking-widest text-[var(--primary)] mb-3"
              >
                {t("about.eyebrow")}
              </motion.p>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.05] text-balance">
                {t("about.headline")}
              </h1>
            </div>
            <p className="text-lg text-[var(--muted)] leading-relaxed text-pretty max-w-lg">
              {t("about.introText")}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <GlowButton href="/contact">{t("about.ctaHire")}</GlowButton>
              <GlowButton href="/alex-rivera-resume.pdf" download>
                <Download size={15} />
                {t("about.ctaResume")}
              </GlowButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── (2) BioBlock ── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-4">
                {t("about.bioLabel")}
              </h2>
              <div className="w-12 h-px bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
            </div>
            <div className="lg:col-span-2 space-y-6 text-[var(--muted)] leading-relaxed">
              <p className="text-[var(--foreground)] text-lg leading-relaxed">
                <span className="float-left text-7xl font-extrabold leading-none mr-3 mt-1 text-[var(--primary)] select-none">
                  I
                </span>
                {t("about.bio1")}
              </p>
              <p>{t("about.bio2")}</p>
              <p>{t("about.bio3")}</p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: t("about.statYears"), value: "6+" },
                  { label: t("about.statProjects"), value: "40+" },
                  { label: t("about.statClients"), value: "18" },
                  { label: t("about.statContribs"), value: "500+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5"
                  >
                    <p className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── (3) TechStack ── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-2">
              {t("about.stackEyebrow")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              {t("about.stackHeadline")}
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={scaleIn}
                custom={i}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--primary)]/30 transition-colors duration-300 group"
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-4">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Reveal>

      {/* ── (4) ExperienceTimeline ── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-2">
              {t("about.expEyebrow")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              {t("about.expHeadline")}
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)]/60 via-[var(--border)] to-transparent hidden md:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-8"
            >
              {timelineEntries.map((entry, i) => (
                <motion.div
                  key={`${entry.company}-${i}`}
                  variants={fadeInUp}
                  className="relative md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-xl items-center justify-center bg-[var(--surface)] border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
                    {entry.type === "education" ? (
                      <span className="text-lg">🎓</span>
                    ) : (
                      <span className="text-lg">💼</span>
                    )}
                  </div>

                  <div
                    className={`bg-[var(--surface)] border rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] ${
                      entry.current
                        ? "border-[var(--primary)]/40 shadow-[0_0_0_1px_var(--primary)/10]"
                        : "border-[var(--border)]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-base font-semibold text-[var(--foreground)]">
                          {entry.role}
                        </h3>
                        <p className="text-sm font-medium text-[var(--primary)]">
                          {entry.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] px-3 py-1 rounded-full">
                          {entry.dateRange}
                        </span>
                        {entry.current && (
                          <span className="text-xs font-semibold text-rose-400 bg-rose-400/10 border border-rose-400/20 px-3 py-1 rounded-full">
                            {t("about.currentBadge")}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── (5) SocialLinks row ── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
          <div className="flex flex-col items-center text-center gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">
                {t("about.connectEyebrow")}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3">
                {t("about.connectHeadline")}
              </h2>
              <p className="text-[var(--muted)] max-w-md leading-relaxed">
                {t("about.connectSubtext")}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <SocialIconButton
                href="https://github.com/alexrivera-dev"
                label="GitHub"
                icon={Github}
              />
              <SocialIconButton
                href="https://linkedin.com/in/alexrivera"
                label="LinkedIn"
                icon={Linkedin}
              />
              <SocialIconButton
                href="https://twitter.com/alexrivera"
                label="Twitter"
                icon={Twitter}
              />
              <SocialIconButton
                href={`mailto:${BRAND.email}`}
                label="Email"
                icon={Mail}
              />
            </div>

            <GlowButton href="/alex-rivera-resume.pdf" download>
              <Download size={15} />
              {t("about.ctaResume")}
            </GlowButton>
          </div>
        </section>
      </Reveal>
    </main>
  );
}