import React, { useState } from 'react';
import {
  Zap,
  Rocket,
  Code2,
  LayoutGrid,
  Terminal,
  GitCommitHorizontal,
  Copy,
  Check,
  Mail,
  Send,
} from 'lucide-react';
import { Hero3DStage } from './components/Hero3DStage';
import { TiltCard } from './components/TiltCard';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import {
  DEVELOPER_EMAIL,
  HERO_METRICS,
  PROJECTS,
  SKILLS,
  type ProjectItem,
  type SkillItem,
} from './data/portfolioData';

type ProjectFilter = 'all' | 'featured' | 'progress';

function SkillIcon({ icon }: { icon: SkillItem['icon'] }) {
  switch (icon) {
    case 'code':
      return <Code2 className="w-5 h-5" aria-hidden="true" />;
    case 'grid':
      return <LayoutGrid className="w-5 h-5" aria-hidden="true" />;
    case 'terminal':
      return <Terminal className="w-5 h-5" aria-hidden="true" />;
    case 'git':
      return <GitCommitHorizontal className="w-5 h-5" aria-hidden="true" />;
  }
}

export default function App() {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredProjects = PROJECTS.filter(
    (p) => projectFilter === 'all' || p.category === projectFilter,
  );

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(DEVELOPER_EMAIL).catch(() => {});
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormName('');
    setFormEmail('');
    setFormMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-surface/95 border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-4">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-[12px] bg-primary-container text-on-primary-container font-headline text-[20px] leading-[28px] font-semibold">
              A.
            </span>
            <span className="font-headline text-[20px] leading-[28px] font-semibold text-on-surface">
              Abdullah.dev
            </span>
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8"
          >
            <a
              href="#about"
              className="font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] text-on-surface-variant hover:text-primary transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#skills"
              className="font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] text-on-surface-variant hover:text-primary transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#work"
              className="font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] text-on-surface-variant hover:text-primary transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              Work
            </a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] transition-transform duration-150 hover:scale-[1.02] hover:bg-primary hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 3D Interactive Hero Section */}
        <section
          id="hero"
          className="max-w-7xl mx-auto px-6 md:px-8 py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant text-tertiary font-label text-[12px] leading-[16px] tracking-[0.4px] hover:border-tertiary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer whitespace-nowrap shrink-0"
              >
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Available for Opportunities</span>
              </button>

              <h1 className="font-display text-[32px] leading-[38px] tracking-[-0.5px] md:text-[56px] md:leading-[64px] md:tracking-[-1.2px] font-bold text-on-surface text-balance">
                Hi, I&apos;m Abdullah. I build for the web.
              </h1>

              <p className="font-body text-[18px] leading-[28px] text-on-surface-variant max-w-prose text-pretty">
                A student developer crafting clean, responsive and accessible
                digital experiences with HTML, CSS and JavaScript — now upgraded
                with interactive 3D spatial depth.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] transition-transform duration-150 hover:scale-[1.02] hover:bg-primary hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  <Rocket className="w-4 h-4" aria-hidden="true" />
                  <span>Explore My Work</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-surface-container-high border border-outline-variant text-on-surface font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  Get in Touch
                </a>
              </div>

              {/* Identity & Focus Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-outline-variant w-full max-w-md">
                {HERO_METRICS.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-1">
                    <span
                      className={`font-headline text-[24px] leading-[30px] tracking-[-0.2px] font-semibold tabular-nums ${
                        metric.tone === 'primary'
                          ? 'text-primary'
                          : metric.tone === 'tertiary'
                            ? 'text-tertiary'
                            : 'text-on-surface'
                      }`}
                    >
                      {metric.value}
                    </span>
                    <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-outline">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive 3D WebGL Stage + Floating abdullah.js */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <Hero3DStage />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="max-w-7xl mx-auto px-6 md:px-8 py-16 border-t border-outline-variant"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-primary">
                ABOUT
              </span>
              <h2 className="font-display text-[28px] leading-[34px] tracking-[-0.4px] md:text-[40px] md:leading-[48px] md:tracking-[-0.8px] font-bold text-on-surface text-balance">
                Curious mind. Creative builder.
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <p className="font-body text-[18px] leading-[28px] text-on-surface-variant max-w-prose text-pretty">
                I&apos;m Abdullah, a student passionate about turning ideas into
                fast and meaningful web experiences. I focus on writing semantic
                code and creating interfaces that feel natural on every screen.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="max-w-7xl mx-auto px-6 md:px-8 py-16 border-t border-outline-variant"
        >
          <div className="flex flex-col gap-2 mb-8">
            <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-primary">
              SKILLS
            </span>
            <h2 className="font-display text-[28px] leading-[34px] tracking-[-0.4px] md:text-[40px] md:leading-[48px] md:tracking-[-0.8px] font-bold text-on-surface">
              What I work with.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch tilt-stage">
            {SKILLS.map((skill) => {
              const badgeStyles =
                skill.badgeVariant === 'primary'
                  ? 'bg-primary-container text-on-primary-container'
                  : skill.badgeVariant === 'secondary'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container-high border border-outline-variant text-tertiary';

              return (
                <TiltCard
                  key={skill.id}
                  className="h-full rounded-[20px] bg-surface-container border border-outline-variant p-6 flex flex-col gap-4 hover:border-primary"
                >
                  <div className="flex items-center justify-between tilt-card-inner">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-[12px] ${badgeStyles}`}
                    >
                      <SkillIcon icon={skill.icon} />
                    </span>
                    <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-outline">
                      {skill.tag}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 tilt-card-inner">
                    <h3 className="font-title text-[20px] leading-[28px] font-semibold text-on-surface">
                      {skill.title}
                    </h3>
                    <p className="font-body text-[16px] leading-[24px] text-on-surface-variant">
                      {skill.description}
                    </p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* Selected Projects Section */}
        <section
          id="work"
          className="max-w-7xl mx-auto px-6 md:px-8 py-16 border-t border-outline-variant"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-primary">
                WORK
              </span>
              <h2 className="font-display text-[28px] leading-[34px] tracking-[-0.4px] md:text-[40px] md:leading-[48px] md:tracking-[-0.8px] font-bold text-on-surface">
                Selected projects.
              </h2>
              <p className="font-body text-[16px] leading-[24px] text-on-surface-variant max-w-prose">
                Hover any project card for 3D spatial tilt, or inspect its build
                details.
              </p>
            </div>

            {/* Filter Chips */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter projects"
            >
              {(
                [
                  { id: 'all', label: 'All Projects' },
                  { id: 'featured', label: 'Featured' },
                  { id: 'progress', label: 'In Progress' },
                ] as const
              ).map((chip) => {
                const active = projectFilter === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setProjectFilter(chip.id)}
                    className={`inline-flex items-center px-4 py-1.5 rounded-full font-label text-[12px] leading-[16px] tracking-[0.4px] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-secondary-container border border-primary text-on-secondary-container'
                        : 'bg-surface-container-high border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Tilt Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch tilt-stage">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onInspect={setSelectedProject}
              />
            ))}
          </div>
        </section>

        {/* Contact & Inquiry Section */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-6 md:px-8 py-16 border-t border-outline-variant"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-primary">
                HAVE A PROJECT OR OPPORTUNITY?
              </span>
              <h2 className="font-display text-[28px] leading-[34px] tracking-[-0.4px] md:text-[40px] md:leading-[48px] md:tracking-[-0.8px] font-bold text-on-surface text-balance">
                Let&apos;s create something great.
              </h2>
              <p className="font-body text-[16px] leading-[24px] text-on-surface-variant max-w-prose">
                Looking for a motivated front-end developer or want to
                collaborate on a web project? Say hello and let&apos;s build
                something memorable.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-container-high border border-outline-variant text-on-surface font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-tertiary" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span>{copiedEmail ? 'Copied Email' : 'Copy Email'}</span>
                </button>
                <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-outline">
                  {DEVELOPER_EMAIL}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                className="rounded-[28px] bg-surface-container border border-outline-variant p-8 flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-1 w-full">
                    <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-on-surface-variant">
                      Your Name
                    </span>
                    <input
                      required
                      type="text"
                      value={formName}
                      onChange={(e) => {
                        setFormName(e.target.value);
                        if (formSubmitted) setFormSubmitted(false);
                      }}
                      placeholder="Abdullah"
                      aria-describedby="contact-name-hint"
                      className="w-full rounded-[12px] bg-surface-container-lowest border border-outline-variant px-4 py-3 font-body text-[16px] leading-[24px] text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                    <span
                      id="contact-name-hint"
                      className="font-body text-[12px] leading-[16px] text-outline"
                    >
                      How should I address you?
                    </span>
                  </label>

                  <label className="flex flex-col gap-1 w-full">
                    <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-on-surface-variant">
                      Email Address
                    </span>
                    <div className="relative flex items-center">
                      <Mail
                        aria-hidden="true"
                        className="w-5 h-5 text-outline absolute left-3.5 pointer-events-none"
                      />
                      <input
                        required
                        type="email"
                        inputMode="email"
                        value={formEmail}
                        onChange={(e) => {
                          setFormEmail(e.target.value);
                          if (formSubmitted) setFormSubmitted(false);
                        }}
                        placeholder="you@example.com"
                        aria-describedby="contact-email-hint"
                        className="w-full rounded-[12px] bg-surface-container-lowest border border-outline-variant pl-11 pr-4 py-3 font-body text-[16px] leading-[24px] text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <span
                      id="contact-email-hint"
                      className="font-body text-[12px] leading-[16px] text-outline"
                    >
                      I reply within 24 hours.
                    </span>
                  </label>
                </div>

                <label className="flex flex-col gap-1 w-full">
                  <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-on-surface-variant">
                    Message
                  </span>
                  <textarea
                    required
                    rows={3}
                    value={formMessage}
                    onChange={(e) => {
                      setFormMessage(e.target.value);
                      if (formSubmitted) setFormSubmitted(false);
                    }}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full rounded-[12px] bg-surface-container-lowest border border-outline-variant px-4 py-3 font-body text-[16px] leading-[24px] text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] transition-transform duration-150 hover:scale-[1.02] hover:bg-primary hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Say Hello</span>
                  </button>
                  {formSubmitted && (
                    <span
                      className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-tertiary"
                      role="status"
                    >
                      Message sent — thanks for reaching out!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-outline">
            © 2026 Abdullah.dev
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#work"
              className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-on-surface-variant hover:text-primary transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href="#contact"
              className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-on-surface-variant hover:text-primary transition-colors duration-150"
            >
              LinkedIn
            </a>
            <a
              href="#hero"
              className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-primary hover:underline"
            >
              Back to Top
            </a>
          </div>
        </div>
      </footer>

      {/* Project Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
