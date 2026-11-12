import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DisplayLines, Eyebrow, SectionLabel } from '../components/Elements';
import { CommunityImageMarquee } from '../components/CommunityImageMarquee';
import { SiteLink } from '../components/SiteChrome';
import { communityLinks, siteConfig } from '../config';
import { novemberJournalImages, octoberJournalImages, payoutImages, phaseClearanceImages } from '../data/communityArchive';
import './community.css';

type CommunityPlatform = {
  id: 'telegram' | 'discord' | 'whatsapp';
  name: string;
  label: string;
  copy: string;
  action: string;
  logo: string;
  url: string;
};

function CommunityPlatformRow({ platform, index }: { platform: CommunityPlatform; index: number }) {
  const content = <>
    <span className="community-platform-top"><span>0{index + 1} / {platform.name.toUpperCase()}</span><span>{platform.action} <ArrowUpRight size={14} aria-hidden="true" /></span></span>
    <span className="community-platform-main">
      <span className={`community-platform-mark community-platform-mark-${platform.id}`}><img src={platform.logo} alt="" loading="lazy" decoding="async" /></span>
      <span className="community-platform-copy"><small>{platform.label}</small><span>{platform.copy}</span></span>
    </span>
  </>;

  return <div className={`community-platform-reveal community-platform-reveal-${platform.id}`}>
    <a className={`community-platform-row community-platform-row-${platform.id}`} href={platform.url} target="_blank" rel="noopener noreferrer" aria-label={`${platform.action} (opens in a new tab)`}>{content}</a>
  </div>;
}

const communityPlatforms: CommunityPlatform[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    label: 'PUBLIC CHANNEL',
    copy: 'Follow KNIGHTFX for trading updates, market content, announcements and community information.',
    action: 'JOIN TELEGRAM',
    logo: 'https://cdn.simpleicons.org/telegram',
    url: communityLinks.telegram,
  },
  {
    id: 'discord',
    name: 'Discord',
    label: 'COMMUNITY SERVER',
    copy: 'Join the KNIGHTFX Discord community and connect with traders in a structured community environment.',
    action: 'JOIN DISCORD',
    logo: 'https://cdn.simpleicons.org/discord',
    url: communityLinks.discord,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    label: 'COMMUNITY GROUP',
    copy: 'Stay connected with the KNIGHTFX community through WhatsApp.',
    action: 'JOIN WHATSAPP',
    logo: 'https://cdn.simpleicons.org/whatsapp',
    url: communityLinks.whatsapp,
  },
];

export function CommunityPage() {
  return <div className="page-content inner-page community-page">
    <section className="community-opening section-pad" aria-labelledby="community-title">
      <div className="community-opening-atmosphere" aria-hidden="true" />
      <div className="community-opening-copy">
        <Eyebrow>05 / KNIGHTFX COMMUNITY</Eyebrow>
        <DisplayLines as="h1" id="community-title" className="community-title" lines={['TRADE TOGETHER.', <em>GROW TOGETHER.</em>]} />
        <p>A growing community of traders focused on learning, market discussion, discipline and continuous improvement.</p>
      </div>
      <div className="community-trader-stat" aria-label="200 plus active traders">
        <strong>200+</strong>
        <span>ACTIVE TRADERS</span>
      </div>
      <span className="community-opening-index">KNIGHTFX TRADING LABS / 05</span>
    </section>

    <section className="community-platforms section-pad" aria-labelledby="community-platforms-title">
      <SectionLabel number="01" side="LEARN · DISCUSS · CONNECT">THE KNIGHTFX COMMUNITY</SectionLabel>
      <div className="community-platforms-intro">
        <DisplayLines id="community-platforms-title" className="community-section-title" lines={['CHOOSE YOUR SPACE.', <em>STAY CONNECTED.</em>]} />
        <p>Connect with the KNIGHTFX community across the platforms where traders stay informed, discuss the markets and interact with the community.</p>
      </div>
      <div className="community-platform-list">
        {communityPlatforms.map((platform, index) => <CommunityPlatformRow key={platform.id} platform={platform} index={index} />)}
      </div>
    </section>

    <section className="community-proof section-pad" aria-labelledby="community-proof-title">
      <SectionLabel number="02" side="PHASE CLEARANCES · PAYOUTS">COMMUNITY / PROOF</SectionLabel>
      <DisplayLines id="community-proof-title" className="community-section-title community-proof-title" lines={['BUILT THROUGH', <em>DISCIPLINE.</em>, 'PROVEN THROUGH', <em>THE JOURNEY.</em>]} />

      <section className="community-proof-row" aria-label="Phase clearances">
        <div className="community-proof-row-heading"><Eyebrow>PHASE CLEARANCES</Eyebrow></div>
        <CommunityImageMarquee images={phaseClearanceImages} direction="left-to-right" label="Phase clearance certificates moving left to right" speedPxPerSecond={100} minimumDuration={48} />
      </section>

      <section className="community-proof-row community-payout-row" aria-label="Payout certificates">
        <div className="community-proof-row-heading"><Eyebrow>PAYOUTS</Eyebrow></div>
        <CommunityImageMarquee images={payoutImages} direction="right-to-left" label="Payout certificates moving right to left" speedPxPerSecond={60} minimumDuration={40} />
      </section>
    </section>

    <section className="community-journal section-pad" aria-labelledby="community-journal-title">
      <SectionLabel number="03" side="OCTOBER + NOVEMBER 2026">INNER CIRCLE / WEEKLY JOURNAL</SectionLabel>
      <div className="community-journal-heading">
        <div><Eyebrow>INNER CIRCLE / WEEKLY JOURNAL</Eyebrow><DisplayLines id="community-journal-title" className="community-section-title" lines={['INSIDE THE', <em>INNER CIRCLE.</em>]} /></div>
        <p>A look at the weekly trading journal shared within the KNIGHTFX Inner Circle.</p>
      </div>
      <div className="community-journal-result" data-reveal><span>OCTOBER 2026</span><strong>~8,000<span>+</span></strong><small>PIPS</small></div>
      <div className="community-journal-reveal">
        <section className="community-journal-month" aria-labelledby="october-journal-heading">
          <div className="community-journal-month-heading"><Eyebrow>01 / OCTOBER 2026</Eyebrow><h3 id="october-journal-heading">INNER CIRCLE <em>WEEKLY JOURNAL</em></h3></div>
          <div className="community-journal-grid" aria-label="October 2026 Inner Circle weekly journal images">
            {octoberJournalImages.map((image, index) => <article className="community-journal-entry" key={image.id}>
              <span>WEEK {String(index + 1).padStart(2, '0')}</span>
              <a className="community-journal-image-link" href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size October Week ${index + 1} journal: ${image.alt}`}>
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
              </a>
            </article>)}
          </div>
        </section>
        <section className="community-journal-month community-november-journal" aria-labelledby="november-journal-heading">
          <div className="community-journal-month-heading"><Eyebrow>02 / NOVEMBER 2026</Eyebrow><h3 id="november-journal-heading">INNER CIRCLE <em>WEEKLY JOURNAL</em></h3></div>
          {novemberJournalImages.length > 0 ? <div className="community-journal-grid" aria-label="November 2026 Inner Circle weekly journal images">
            {novemberJournalImages.map((image, index) => <article className="community-journal-entry" key={image.id}>
              <span>WEEK {String(index + 1).padStart(2, '0')}</span>
              <a className="community-journal-image-link" href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size November Week ${index + 1} journal: ${image.alt}`}>
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
              </a>
            </article>)}
          </div> : <p className="community-journal-empty">Weekly journal entries will appear here as they are added.</p>}
        </section>
      </div>
      <div className="community-journal-caption" data-reveal><span>INNER CIRCLE / WEEKLY JOURNAL</span><p>The journal reflects the weekly trading activity shared within the KNIGHTFX Inner Circle.</p></div>
      <p className="community-journal-disclaimer">Shared trading activity is not a promise of future results. Trading involves significant risk.</p>
    </section>

    <section className="community-inner-circle section-pad" aria-labelledby="community-inner-circle-title">
      <div className="community-inner-copy">
        <Eyebrow>KNIGHTFX MENTORSHIP</Eyebrow>
        <DisplayLines id="community-inner-circle-title" className="community-section-title" lines={['INNER CIRCLE.', <em>INCLUDED WITH MENTORSHIP.</em>]} />
        <p data-reveal>The KNIGHTFX Inner Circle is included with Mentorship, giving members access to a closer trading community and the shared environment around the program.</p>
        <SiteLink to="/mentorship" className="community-editorial-link" data-reveal>EXPLORE MENTORSHIP <ArrowRight size={15} aria-hidden="true" /></SiteLink>
      </div>
    </section>

    <section className="community-final section-pad" aria-labelledby="community-final-title">
      <Eyebrow>KNIGHTFX COMMUNITY</Eyebrow>
      <DisplayLines id="community-final-title" className="community-final-title" lines={['FIND YOUR', <em>TRADING COMMUNITY.</em>]} />
      <p data-reveal>200+ traders. One growing community.</p>
      <a className="community-join-link" data-reveal href={siteConfig.communityJoinUrl}>JOIN KNIGHTFX <ArrowUpRight size={16} aria-hidden="true" /></a>
    </section>

    <section className="community-brand-close section-pad" aria-label="KNIGHTFX Trading Labs closing statement">
      <span>KNIGHTFX TRADING LABS</span>
      <DisplayLines className="community-brand-title" lines={['MASTER THE MARKET.', <em>MONEY FOLLOWS.</em>]} />
    </section>
  </div>;
}
