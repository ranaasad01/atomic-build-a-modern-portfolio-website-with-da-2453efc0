"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail } from 'lucide-react';
import { navLinks, BRAND, socialLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  dribbble: null,
} as const;

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        {/* Top row */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12"
        >
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm select-none">
                {BRAND.initials}
              </span>
              <span className="font-semibold text-[var(--foreground)] tracking-tight">
                {t("footer.brand")}
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {t("footer.navigation")}
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {t(`nav.${link.label.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {t("footer.connect")}
            </p>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 group"
                    >
                      {Icon && (
                        <Icon
                          size={14}
                          className="group-hover:text-[var(--primary)] transition-colors"
                        />
                      )}
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {t("footer.available")}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm text-emerald-400 font-medium">
                {t("footer.availableStatus")}
              </span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-200"
            >
              {t("footer.cta")}
            </Link>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent mb-8" />

        {/* Bottom row */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]"
        >
          <p>{t("footer.copyright", { year: 2025, name: BRAND.name })}</p>
          <p>{t("footer.builtWith")}</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}