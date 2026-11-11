import { ArrowUpRight } from 'lucide-react';
import type { Partner } from '../data/partners';

export function PartnerLogo({ partner, square = false, decorative = false }: { partner: Partner; square?: boolean; decorative?: boolean }) {
  const content = <>
    <span className="partner-logo-art"><img src={partner.logo} alt={decorative ? '' : `${partner.name} partner logo`} loading="lazy" /></span>
    {!square && <span className="partner-logo-visit">{partner.url ? <>VISIT PARTNER <ArrowUpRight size={13} aria-hidden="true" /></> : 'XM GLOBAL'}</span>}
  </>;
  const slug = partner.name.toLowerCase().replace(/ /g, '-');
  const squareClass = square ? ` partner-logo-square partner-logo-${slug}` : '';

  if (!partner.url) {
    return <div className="partner-reveal">
      <div className={`partner-logo-link partner-logo-unlinked${squareClass}`} role="img" aria-label={decorative ? undefined : `${partner.name} partner logo; partner website link not yet supplied`} aria-hidden={decorative || undefined}>{content}</div>
    </div>;
  }

  return <div className="partner-reveal">
    <a className={`partner-logo-link${squareClass}`} href={partner.url} target="_blank" rel="noopener noreferrer" tabIndex={decorative ? -1 : undefined} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : `Visit ${partner.name} (opens in a new tab)`}>{content}</a>
  </div>;
}
