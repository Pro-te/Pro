export type ProjectCategory = 'featured' | 'progress';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  stack: string;
  summary: string;
  detailDescription: string;
  highlights: string[];
  year: string;
  imageUrl: string;
  imageAlt: string;
}

export interface SkillItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: 'code' | 'grid' | 'terminal' | 'git';
  badgeVariant: 'primary' | 'secondary' | 'tertiary';
}

export const DEVELOPER_EMAIL = 'abdullah@example.com';

export const ABDULLAH_JS_SNIPPET = `const developer = {
  name: "Abdullah",
  role: "Student",
  focus: "Front-end",
  learning: true
};`;

export const HERO_METRICS = [
  { value: 'Student', label: 'Learning & growing', tone: 'primary' as const },
  { value: 'Front-end', label: 'Current focus', tone: 'default' as const },
  { value: '∞', label: 'Curiosity to learn', tone: 'tertiary' as const },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'html5',
    tag: 'HTML5',
    title: 'HTML5',
    description: 'Semantic, structured and accessible markup.',
    icon: 'code',
    badgeVariant: 'primary',
  },
  {
    id: 'css3',
    tag: 'CSS3',
    title: 'CSS3',
    description: 'Responsive layouts with Flexbox and Grid.',
    icon: 'grid',
    badgeVariant: 'secondary',
  },
  {
    id: 'javascript',
    tag: 'JS',
    title: 'JavaScript',
    description: 'DOM manipulation and useful interactions.',
    icon: 'terminal',
    badgeVariant: 'tertiary',
  },
  {
    id: 'git',
    tag: 'GIT',
    title: 'Git & GitHub',
    description: 'Version control and collaborative workflows.',
    icon: 'git',
    badgeVariant: 'primary',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'developer-portfolio',
    title: 'Developer Portfolio',
    category: 'featured',
    categoryLabel: 'FEATURED / PERSONAL',
    stack: 'HTML · CSS · JavaScript · Three.js',
    summary:
      'Personal developer portfolio crafted with semantic HTML, responsive CSS Grid, interactive JavaScript, and a 3D WebGL hero stage.',
    detailDescription:
      'Built to showcase clean front-end engineering with semantic markup, responsive layout grids, and interactive 3D WebGL visuals.',
    highlights: [
      'Interactive Three.js WebGL stage with Wireframe, Solid Mesh, and Orbital Cloud modes',
      '3D perspective tilt cards with accessible reduced-motion fallbacks',
      'Semantic landmark structure and WCAG AA contrast tokens',
    ],
    year: '2026',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrCrFfdiOe7LYayzIfo3kFlWP7L3LjLFWfba9zWpLjhrYKF8LEEivs9FWU8Qo-KD-GxGIT39-8aJO5-hIe04DxcqybgmeskTg8xc1NLdXv9dBrEElsBp-DFJ2gEY5aiAWFUz_XCd8AGI0yx61kCTPBtvLsJlWbNiyytSxj0KQnAHkxEvL8SDJTbTv7nYb244B3PZ6YqdJ_cQ06w8OwxL_Az8gzOiCblhgL60-WOuxpkVzF7JI9MX6R1s4UkpSp3PbgEKEIc',
    imageAlt: 'Developer Portfolio 3D preview',
  },
  {
    id: 'responsive-landing-page',
    title: 'Responsive Landing Page',
    category: 'progress',
    categoryLabel: 'IN PROGRESS',
    stack: 'Responsive · UI Design',
    summary:
      'Modern multi-device landing page focused on fluid typography, accessible contrast, and smooth 3D card interactions.',
    detailDescription:
      'Designed with mobile-first Flexbox and CSS Grid breakpoints to adapt cleanly across phone, tablet, and desktop viewports.',
    highlights: [
      'Fluid typographic scale engineered across mobile, tablet, and desktop',
      'Consistent 60-30-10 dark surface hierarchy and crisp hairline borders',
      'Touch-friendly interactive controls and smooth viewport transitions',
    ],
    year: '2026',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrCcd6edbkJPTDDJofYS3Qi8GPHiH1jWunBqZF31sJX4a9Qo7KunLLTf2sFNsgkTQQk0Juk4qRKQ_dDyYYkHBRKQFd0Qz5rtLxoV8HPOfm_zEktsJ_u7evsySlxX0UVgb8EUj4OCcLU0162kAX9j9LWW62z3UiyMvg7uYNMr2Pl4rr8n3zl9Vd9391ftiJ79kN-Yqs1FT4oxrg_RaBfJccta8s6-9bRQMSfseK507dIZLWCcGRiDX24bqLm7oJVy',
    imageAlt: 'Responsive Landing Page 3D preview',
  },
];
