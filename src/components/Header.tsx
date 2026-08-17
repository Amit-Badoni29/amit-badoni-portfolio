import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { personal, navLinks } from '@/lib/data';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-base' : ''
      }`}
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 h-20 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-3" onClick={closeMenu} aria-label="Back to top">
          <span className="font-mono text-sm tracking-tight text-accent">&lt;/&gt;</span>
          <span className="font-display font-semibold tracking-tight text-primary">{personal.name}</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="link-underline text-xs text-secondary hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden w-9 h-9 rounded-full border border-base flex items-center justify-center text-secondary hover:text-accent hover:border-accent transition-colors"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden absolute top-20 inset-x-0 border-b border-base glass overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-5 py-5 flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="flex items-center gap-4 py-3 text-secondary hover:text-accent transition-colors">
              <span className="font-mono text-[10px] text-accent/60">0{index + 1}</span>
              <span className="font-display text-lg">{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
