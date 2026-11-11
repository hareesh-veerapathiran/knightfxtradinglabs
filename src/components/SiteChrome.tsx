import React, { createContext, useContext, useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems, SitePage } from '../content';
import { siteConfig } from '../config';

type Navigate = (path: string) => void;
const NavigationContext = createContext<Navigate>(() => undefined);
export const useNavigate = () => useContext(NavigationContext);

export function SiteLink({ to, className, children, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  const navigate = useNavigate();
  return <a href={to} className={className} {...props} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!to.startsWith('/')) return;
    event.preventDefault();
    navigate(to);
  }}>{children}</a>;
}

export function BrandMark({ light = false }: { light?: boolean }) {
  return <SiteLink to="/" className={`wordmark${light ? ' wordmark-light' : ''}`} aria-label="KNIGHTFX Trading Labs home">
    <span className="brand-logo-badge"><img className="brand-mark" src="/images/knightfx-logo.jpg" alt="" /></span>
    <span className="wordmark-copy"><strong>KNIGHTFX</strong><small>TRADING LABS</small></span>
  </SiteLink>;
}

export function Navbar({ page }: { page: SitePage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  return <>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <SiteLink key={item.id} to={item.path} aria-current={page === item.id ? 'page' : undefined}>{item.label}</SiteLink>)}
        </nav>
        <a href={siteConfig.telegramJoinUrl} className="nav-cta" target="_blank" rel="noopener noreferrer">JOIN KNIGHTFX <ArrowUpRight size={14} aria-hidden="true" /></a>
        <button type="button" className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open}><Menu /></button>
      </div>
    </header>
    <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="mobile-menu-top"><BrandMark light/><button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button></div>
      <nav aria-label="Mobile navigation">
        {navItems.map((item, index) => <SiteLink key={item.id} to={item.path} onClick={() => setOpen(false)} aria-current={page === item.id ? 'page' : undefined}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={17}/></SiteLink>)}
      </nav>
      <a className="nav-cta mobile-menu-cta" href={siteConfig.telegramJoinUrl} target="_blank" rel="noopener noreferrer">JOIN KNIGHTFX <ArrowUpRight size={15} aria-hidden="true" /></a>
      <p>DISCIPLINE / STRATEGY / GROWTH</p>
    </div>
  </>;
}

export function Footer() {
  return <footer className="footer">
    <div className="footer-main">
      <div className="footer-brand"><BrandMark light/><p>MASTER THE MARKET.<br/>MONEY FOLLOWS.</p></div>
      <div className="footer-nav"><span>EXPLORE</span>{navItems.map((item) => <SiteLink key={item.id} to={item.path}>{item.label}<ArrowUpRight size={12}/></SiteLink>)}</div>
      <div className="footer-nav"><span>CONNECT</span><a href="mailto:hello@knightfxtradinglabs.com">Contact KnightFX <ArrowUpRight size={12}/></a></div>
      <img className="footer-mark" src="/images/knightfx-logo.jpg" alt="KNIGHTFX Trading Labs crest" loading="lazy" />
    </div>
    <div className="footer-disclaimer"><span>RISK DISCLOSURE</span><p>Trading involves significant risk and may not be suitable for every investor. Educational content is for informational purposes only and does not constitute financial advice or a recommendation to trade. Past performance does not guarantee future results.</p></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} KNIGHTFX TRADING LABS</span><span>INDEPENDENT MARKET EDUCATION</span><a href="#top">BACK TO TOP ↑</a></div>
  </footer>;
}

export function NavigationProvider({ navigate, children }: { navigate: Navigate; children: React.ReactNode }) {
  return <NavigationContext.Provider value={navigate}>{children}</NavigationContext.Provider>;
}
