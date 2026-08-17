import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { personal } from '@/lib/data';

export function Footer() {
  return (
    <footer className="relative border-t border-base py-10">
      <div className="mx-auto max-w-content px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div><div className="font-display font-semibold">{personal.name}</div><div className="mt-1 font-mono text-[10px] text-secondary">BUILDING WITH INTENT.</div></div>
        <div className="flex items-center gap-5"><a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-secondary hover:text-accent transition-colors"><Github size={17} strokeWidth={1.5} /></a><a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-secondary hover:text-accent transition-colors"><Linkedin size={17} strokeWidth={1.5} /></a><a href="#top" className="ml-3 inline-flex items-center gap-2 text-xs text-secondary hover:text-accent transition-colors">Back to top <ArrowUpRight size={13} /></a></div>
        <div className="font-mono text-[10px] text-secondary sm:absolute sm:left-1/2 sm:-translate-x-1/2">© {new Date().getFullYear()} ALL RIGHTS RESERVED</div>
      </div>
    </footer>
  );
}
