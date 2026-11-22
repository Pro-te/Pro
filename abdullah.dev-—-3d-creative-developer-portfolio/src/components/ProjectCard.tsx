import { useState } from 'react';
import { Layers } from 'lucide-react';
import { TiltCard } from './TiltCard';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  onInspect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onInspect }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <TiltCard className="h-full rounded-[20px] bg-surface-container border border-outline-variant p-6 flex flex-col justify-between gap-4 hover:border-primary">
      <div className="flex flex-col gap-4 tilt-card-inner">
        <button
          type="button"
          onClick={() => onInspect(project)}
          aria-label={`Inspect ${project.title}`}
          className="rounded-[12px] overflow-hidden border border-outline-variant bg-surface-container-lowest w-full block text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer"
        >
          {!imageError ? (
            <img
              src={project.imageUrl}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-56 object-cover transition-transform duration-200 hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-56 bg-gradient-to-br from-surface-container-lowest via-secondary-container/40 to-primary-container/30 flex flex-col items-center justify-center gap-2 p-6 text-center">
              <Layers className="w-8 h-8 text-primary" aria-hidden="true" />
              <span className="font-title text-[16px] font-semibold text-on-surface">
                {project.title}
              </span>
              <span className="font-label text-[12px] text-on-surface-variant">
                {project.stack}
              </span>
            </div>
          )}
        </button>

        <header className="flex flex-col gap-1">
          <span
            className={`font-label text-[12px] leading-[16px] tracking-[0.4px] ${
              project.category === 'featured' ? 'text-tertiary' : 'text-primary'
            }`}
          >
            {project.categoryLabel}
          </span>
          <h3 className="font-title text-[20px] leading-[28px] font-semibold text-on-surface">
            {project.title}
          </h3>
          <p className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-secondary">
            {project.stack}
          </p>
        </header>

        <p className="font-body text-[16px] leading-[24px] text-on-surface-variant text-pretty">
          {project.summary}
        </p>
      </div>

      <footer className="flex items-center justify-between gap-2 pt-4 border-t border-outline-variant">
        <button
          type="button"
          onClick={() => onInspect(project)}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] hover:bg-primary hover:text-on-primary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer whitespace-nowrap shrink-0"
        >
          Inspect Project
        </button>
        <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-outline tabular-nums">
          {project.year}
        </span>
      </footer>
    </TiltCard>
  );
}
