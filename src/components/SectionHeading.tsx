interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  number: string;
}

export function SectionHeading({ eyebrow, title, number }: SectionHeadingProps) {
  return (
    <div data-reveal className="opacity-0 flex items-end justify-between gap-6 mb-14">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">{number}</span>
          <span className="h-px w-8 bg-accent/50" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary">{eyebrow}</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">{title}</h2>
        <div className="mt-5 h-[2px] w-24 origin-left bg-accent" data-line-draw-x style={{ transform: 'scaleX(0)' }} />
      </div>
      <span className="hidden sm:block text-6xl lg:text-8xl font-display font-semibold text-primary/[0.04] leading-none">{number}</span>
    </div>
  );
}
