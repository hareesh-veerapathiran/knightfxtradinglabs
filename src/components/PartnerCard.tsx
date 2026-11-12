import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Partner } from '../data/partners';

type PartnerCardProps = {
  partner: Partner;
  decorative?: boolean;
};

export function PartnerCard({ partner, decorative = false }: PartnerCardProps) {
  const [cardElement, setCardElement] = useState<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const hasUrl = Boolean(partner.url);
  const isPropFirm = partner.category === 'PROP FIRM';
  const partnerTypeClass = isPropFirm ? 'partner-card-prop' : '';
  const isWholeCardLink = partner.name === 'XM Global' && hasUrl;
  const revealDirection = partner.category === 'BROKER' ? 'from-right' : 'from-left';
  const offer = partner.offer || (isPropFirm ? 'KNIGHTFX COMMUNITY OFFER' : 'KNIGHTFX COMMUNITY PARTNER');

  useEffect(() => {
    const card = cardElement;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(card);
    return () => observer.disconnect();
  }, [cardElement]);

  const art = <div className="partner-card-art" style={{ background: partner.logoBackground }}>
    <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" decoding="async" />
  </div>;

  const content = <>
    <div className="partner-card-heading">
      <span>{partner.category}</span>
      <h4>{partner.name}</h4>
    </div>
    {hasUrl && !isWholeCardLink && !decorative ? <a className="partner-card-art-link" href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${partner.name} (opens in a new tab)`}>{art}</a> : decorative ? <div className="partner-card-art-link">{art}</div> : art}
    <p className="partner-card-offer">{offer}</p>
    {isPropFirm && partner.code && <div className="partner-card-code"><span>CODE</span><strong>{partner.code}</strong></div>}
    <div className="partner-card-actions">
      {decorative ? <>
        <span className="partner-card-action partner-card-action-primary">VIEW OFFER <ArrowUpRight size={14} aria-hidden="true" /></span>
        <span className="partner-card-action partner-card-action-secondary">VISIT PARTNER <ArrowUpRight size={14} aria-hidden="true" /></span>
      </> : isWholeCardLink ? <>
        <span className="partner-card-action partner-card-action-primary">VIEW OFFER <ArrowUpRight size={14} aria-hidden="true" /></span>
        <span className="partner-card-action partner-card-action-secondary">VISIT PARTNER <ArrowUpRight size={14} aria-hidden="true" /></span>
      </> : hasUrl ? <>
        <a className="partner-card-action partner-card-action-primary" href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${partner.name} offer (opens in a new tab)`}>VIEW OFFER <ArrowUpRight size={14} aria-hidden="true" /></a>
        <a className="partner-card-action partner-card-action-secondary" href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${partner.name} (opens in a new tab)`}>VISIT PARTNER <ArrowUpRight size={14} aria-hidden="true" /></a>
      </> : <>
        <button className="partner-card-action partner-card-action-primary" type="button" disabled aria-label={`${partner.name} offer link not yet available`}>VIEW OFFER</button>
        <button className="partner-card-action partner-card-action-secondary" type="button" disabled aria-label={`${partner.name} website link not yet available`}>VISIT PARTNER</button>
      </>}
    </div>
  </>;

  if (decorative) return <article className={`partner-card partner-card-prop partner-prop-marquee-card`} aria-hidden="true">{content}</article>;

  return isWholeCardLink
    ? <a ref={setCardElement} className={`partner-card partner-card-whole-link ${revealDirection} ${revealed ? 'is-revealed' : ''}`} href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit XM Global partner (opens in a new tab)`}>{content}</a>
    : <article ref={setCardElement} className={`partner-card ${partnerTypeClass} ${revealDirection} ${revealed ? 'is-revealed' : ''}`}>{content}</article>;
}
