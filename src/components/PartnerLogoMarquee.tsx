import type { Partner } from '../data/partners';
import { PartnerLogo } from './PartnerLogo';

type PartnerLogoMarqueeProps = {
  partners: Partner[];
  label: string;
};

export function PartnerLogoMarquee({ partners, label }: PartnerLogoMarqueeProps) {
  return <div className="partner-marquee partner-marquee-left-to-right" role="region" aria-label={label}>
    <div className="partner-marquee-track">
      {[false, true].map((duplicate) => <div className={`partner-marquee-set${duplicate ? ' partner-marquee-set-duplicate' : ''}`} key={String(duplicate)} aria-hidden={duplicate || undefined}>
        {partners.map((partner) => <PartnerLogo key={partner.name} partner={partner} square decorative={duplicate} />)}
      </div>)}
    </div>
  </div>;
}
