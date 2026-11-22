import { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#100D16]/80 p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-[28px] bg-surface-container border border-outline-variant p-8 flex flex-col gap-4 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3
              id="modal-title"
              className="font-headline text-[24px] leading-[30px] font-semibold tracking-[-0.2px] text-on-surface"
            >
              {project.title}
            </h3>
            <p className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-primary">
              {project.stack}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant text-on-surface hover:border-primary hover:text-primary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p className="font-body text-[16px] leading-[24px] text-on-surface-variant">
          {project.detailDescription}
        </p>

        <ul className="flex flex-col gap-2 pt-1">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 font-body text-[14px] leading-[20px] text-on-surface-variant"
            >
              <CheckCircle2
                className="w-4 h-4 text-tertiary shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
          <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] text-tertiary tabular-nums">
            {project.categoryLabel} · {project.year}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-primary-container text-on-primary-container font-label text-[14px] leading-[20px] font-semibold tracking-[0.2px] hover:bg-primary hover:text-on-primary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer whitespace-nowrap shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
