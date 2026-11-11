import { ArrowUpRight } from 'lucide-react';
import { DisplayLines, Eyebrow } from './Elements';
import '../pages/about.css';

export function AboutIntroduction({ home = false }: { home?: boolean }) {
  return <>
    <section id={home ? 'about' : undefined} className={`about-profile about-company-section section-pad${home ? ' about-profile-home' : ''}`} aria-labelledby="about-heading">
      <div className="about-company-grid">
        <div className="about-company-main">
          <Eyebrow className="about-company-eyebrow">ABOUT / KNIGHTFX TRADING LABS</Eyebrow>
          <DisplayLines id="about-heading" as={home ? 'h2' : 'h1'} className="about-profile-heading" lines={['KNIGHTFX', <em>TRADING LABS</em>]} />
          <div className="about-company-copy"><p className="about-company-intro" data-reveal>KNIGHTFX TRADING LABS began in July 2026 with a mission to help traders become more knowledgeable, disciplined and consistent in the financial markets.</p><p className="about-company-detail" data-reveal>Our focus is trading education, market understanding, mentorship and building a community of traders.</p></div>
        </div>
        <div className="about-company-space" aria-hidden="true"/>
      </div>
    </section>

    <section className="about-founder-section section-pad" aria-labelledby="founder-name">
      <div className="about-founder-layout">
        <div className="about-founder-photo-wrap"><img className="about-founder-photo" src="/images/founder-hareesh.jpg" alt="Hareesh VN, founder of KNIGHTFX Trading Labs" loading={home ? 'lazy' : 'eager'} /><span className="about-photo-caption">HAREESH VN <i>·</i> KNIGHTFXTRADER</span></div>
        <div className="about-founder-details">
          <Eyebrow className="about-founder-kicker">FOUNDER / KNIGHTFXTRADER</Eyebrow>
          <h2 id="founder-name">Hareesh VN</h2>
          <p className="about-founder-role">FOUNDER · KNIGHTFX TRADING LABS</p>
          <p className="about-founder-alias">KNOWN AS <strong>KNIGHTFXTRADER</strong></p>
          <div className="about-founder-bio" data-reveal><p>Hareesh VN, known as KnightFXTrader, is the founder of KNIGHTFX TRADING LABS. With around 4 years of experience in the trading industry, he has explored and traded across crypto, Forex and futures markets.</p><p>His journey includes generating around $10,000 on a crypto platform in 20 days and continuing to develop his approach across multiple financial markets.</p></div>
          <p className="about-performance-note">Personal trading experience only. Past performance does not guarantee future results.</p>
          <div className="about-social-links" aria-label="Founder social profiles">
            <a href="https://www.instagram.com/knightfxtrader" target="_blank" rel="noreferrer"><span>INSTAGRAM</span><strong>@knightfxtrader</strong><ArrowUpRight size={15}/></a>
            <a href="https://x.com/knightfxtrader" target="_blank" rel="noreferrer"><span>X</span><strong>@knightfxtrader</strong><ArrowUpRight size={15}/></a>
          </div>
        </div>
      </div>
    </section>
  </>;
}
