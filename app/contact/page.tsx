"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Send, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react';
import { BRAND, socialLinks } from "@/lib/data";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ─── Types ──────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// ─── Social contact data ────────────────────────────────────────────────────
const contactSocials = [
  {
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    icon: Mail,
    description: "Best for project inquiries",
  },
  {
    label: "GitHub",
    value: "github.com/alexrivera-dev",
    href: "https://github.com/alexrivera-dev",
    icon: Github,
    description: "Check out my open-source work",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/alexrivera",
    href: "https://linkedin.com/in/alexrivera",
    icon: Linkedin,
    description: "Connect professionally",
  },
  {
    label: "Twitter",
    value: "@alexrivera",
    href: "https://twitter.com/alexrivera",
    icon: Twitter,
    description: "Follow for dev thoughts",
  },
];

// ─── Validation ─────────────────────────────────────────────────────────────
function validateForm(data: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.subject.trim()) {
    errors.subject = "Subject is required";
  } else if (data.subject.trim().length < 4) {
    errors.subject = "Subject must be at least 4 characters";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters";
  }
  return errors;
}

// ─── FormField component ─────────────────────────────────────────────────────
function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[var(--foreground)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </div>
  );
}

// ─── AvailabilityBadge ───────────────────────────────────────────────────────
function AvailabilityBadge() {
  const t = useTranslations();
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>
      <span className="text-sm font-medium text-emerald-400">
        {t("contact.availability")}
      </span>
    </div>
  );
}

// ─── GlowButton ─────────────────────────────────────────────────────────────
function GlowButton({
  children,
  loading,
  disabled,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className="relative w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(168,85,247,0.45)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden group"
    >
      <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-xl" />
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="relative z-10">Sending...</span>
        </>
      ) : (
        <>
          <Send size={15} className="relative z-10" />
          <span className="relative z-10">{children}</span>
        </>
      )}
    </motion.button>
  );
}

// ─── ContactForm ─────────────────────────────────────────────────────────────
function ContactForm() {
  const t = useTranslations();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)]/60 transition-all duration-200";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-5 py-16 px-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center"
        >
          <CheckCircle size={32} className="text-emerald-400" />
        </motion.div>
        <div>
          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            {t("contact.successTitle")}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs">
            {t("contact.successMessage")}
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="text-sm font-medium text-[var(--primary)] hover:underline transition-all"
        >
          {t("contact.sendAnother")}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={t("contact.form.name")} id="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder={t("contact.form.namePlaceholder")}
            className={`${inputClass} ${errors.name ? "border-red-500/50 focus:ring-red-500/30" : ""}`}
            autoComplete="name"
          />
        </FormField>
        <FormField label={t("contact.form.email")} id="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("contact.form.emailPlaceholder")}
            className={`${inputClass} ${errors.email ? "border-red-500/50 focus:ring-red-500/30" : ""}`}
            autoComplete="email"
          />
        </FormField>
      </div>
      <FormField label={t("contact.form.subject")} id="subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder={t("contact.form.subjectPlaceholder")}
          className={`${inputClass} ${errors.subject ? "border-red-500/50 focus:ring-red-500/30" : ""}`}
        />
      </FormField>
      <FormField label={t("contact.form.message")} id="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={t("contact.form.messagePlaceholder")}
          className={`${inputClass} resize-none ${errors.message ? "border-red-500/50 focus:ring-red-500/30" : ""}`}
        />
      </FormField>
      <GlowButton type="submit" loading={loading}>
        {t("contact.form.submit")}
      </GlowButton>
    </form>
  );
}

// ─── SocialLinks ─────────────────────────────────────────────────────────────
function SocialLinks() {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-3">
      {contactSocials.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors duration-200">
              <Icon size={18} className="text-[var(--primary)]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {social.label}
              </p>
              <p className="text-xs text-[var(--muted)] truncate">{social.value}</p>
              <p className="text-xs text-[var(--muted)]/70 mt-0.5">{social.description}</p>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[var(--primary)]/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* ── Section 1: Page Header ─────────────────────────────────────── */}
        <Reveal>
          <section className="mb-16 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-xs font-semibold text-[var(--primary)] uppercase tracking-widest">
                  {t("contact.eyebrow")}
                </span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] text-balance"
              >
                {t("contact.heading")}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-[var(--muted)] max-w-xl leading-relaxed text-pretty"
              >
                {t("contact.subheading")}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap justify-center">
                <AvailabilityBadge />
                <span className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
                  <Clock size={14} />
                  {t("contact.responseTime")}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
                  <MapPin size={14} />
                  {BRAND.location}
                </span>
              </motion.div>
            </motion.div>
          </section>
        </Reveal>

        {/* ── Section 2: Two-column layout ──────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left: Contact Form */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_40px_-12px_rgba(0,0,0,0.3)]">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[var(--foreground)] mb-1">
                  {t("contact.formTitle")}
                </h2>
                <p className="text-sm text-[var(--muted)]">
                  {t("contact.formSubtitle")}
                </p>
              </div>
              <ContactForm />
            </div>
          </motion.div>

          {/* Right: Social links + availability */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-7"
          >
            {/* Availability card */}
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_40px_-12px_rgba(0,0,0,0.3)]">
              <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">
                {t("contact.availabilityTitle")}
              </h2>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                {t("contact.availabilityDesc")}
              </p>
              <AvailabilityBadge />
              <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-[var(--muted)] uppercase tracking-wider font-medium">
                    {t("contact.timezone")}
                  </span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    PST (UTC-8)
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-[var(--muted)] uppercase tracking-wider font-medium">
                    {t("contact.workingHours")}
                  </span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    9am - 6pm
                  </span>
                </div>
              </div>
            </div>

            {/* Social links card */}
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_40px_-12px_rgba(0,0,0,0.3)]">
              <h2 className="text-base font-semibold text-[var(--foreground)] mb-4">
                {t("contact.findMe")}
              </h2>
              <SocialLinks />
            </div>
          </motion.div>
        </section>

        {/* ── Section 3: FAQ strip ──────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <section className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight mb-2">
                {t("contact.faqTitle")}
              </h2>
              <p className="text-sm text-[var(--muted)]">
                {t("contact.faqSubtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  q: t("contact.faq.q1"),
                  a: t("contact.faq.a1"),
                },
                {
                  q: t("contact.faq.q2"),
                  a: t("contact.faq.a2"),
                },
                {
                  q: t("contact.faq.q3"),
                  a: t("contact.faq.a3"),
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-5 h-full">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                      {item.q}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}