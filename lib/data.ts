export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "dribbble" | "mail";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  image: string;
  href: string;
  featured?: boolean;
}

export interface TimelineEntry {
  role: string;
  company: string;
  dateRange: string;
  description: string;
  current?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

// ─── Navigation ────────────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

// ─── Brand constants ────────────────────────────────────────────────────────
export const BRAND = {
  name: "Alex Rivera",
  initials: "AR",
  role: "Full-Stack Developer & UI Engineer",
  tagline: "Crafting digital experiences that leave a mark.",
  email: "hello@alexrivera.dev",
  location: "San Francisco, CA",
} as const;

// ─── Social links ───────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/alexrivera-dev", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/alexrivera", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/alexrivera", icon: "twitter" },
  { label: "Dribbble", href: "https://dribbble.com/alexrivera", icon: "dribbble" },
  { label: "Email", href: "mailto:hello@alexrivera.dev", icon: "mail" },
];