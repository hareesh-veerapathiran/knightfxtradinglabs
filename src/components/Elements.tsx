import React from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteLink } from './SiteChrome';

export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}><span className="eyebrow-rule"/>{children}</p>;
}

export function SectionLabel({ number, children, side }: { number: string; children: React.ReactNode; side?: string }) {
  return <div className="section-label" data-reveal><span>{number} / {children}</span>{side && <span>{side}</span>}</div>;
}

export function DisplayLines({ lines, className = '', as: Tag = 'h2', id }: { lines: React.ReactNode[]; className?: string; as?: 'h1' | 'h2' | 'h3'; id?: string }) {
  return <Tag id={id} className={`display-lines ${className}`}>
    {lines.map((line, index) => <span className="display-line" key={index}><span>{line}</span></span>)}
  </Tag>;
}

export function TextLink({ to, children, down = false, className = '' }: { to: string; children: React.ReactNode; down?: boolean; className?: string }) {
  const Icon = down ? ArrowDown : ArrowRight;
  return <SiteLink to={to} className={`text-link ${className}`}>{children}<span className="link-arrow"><Icon size={14}/></span></SiteLink>;
}

export function PrimaryLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <SiteLink to={to} className="primary-link">{children}<ArrowUpRight size={16}/></SiteLink>;
}
