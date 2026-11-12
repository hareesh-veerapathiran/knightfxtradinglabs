import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config';
import { DisplayLines, Eyebrow } from '../components/Elements';
import './mentorship.css';

gsap.registerPlugin(ScrollTrigger);

const mentorshipBenefits = [
  'Live Interactive Classes',
  'Market Basics & Price Action',
  '15-Day Structured Learning',
  'Doubt Solving',
  'Prop Firm Suggestions',
  'Trusted Broker Guidance',
  'Payout Roadmap',
  'Risk & Money Management',
];

function JoinMentorshipLink({ children = 'JOIN KNIGHTFX TRADING LABS', className = 'primary-link' }: { children?: ReactNode; className?: string }) {
  return <a className={className} href={siteConfig.telegramJoinUrl} target="_blank" rel="noopener noreferrer" aria-label="Join KNIGHTFX Trading Labs on Telegram">{children}<ArrowRight size={16} aria-hidden="true" /></a>;
}

function MentorshipOfferCard() {
  const cardRef = useRef<HTMLElement | null>(null);
  const featuresRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const list = featuresRef.current;
    if (!card || !list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 82%', once: true } });
      timeline
        .fromTo(card, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .68, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0)
        .fromTo(card.querySelector('.mentorship-price-block'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .42, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, .16)
        .fromTo(list.children, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .36, stagger: .03, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, .14)
        .fromTo(card.querySelector('.mentorship-offer-cta'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .35, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, .49);
    }, card);

    return () => context.revert();
  }, []);

  return <article ref={cardRef} className="mentorship-offer-card" aria-labelledby="mentorship-offer-title">
    <span className="mentorship-popular-badge">MOST POPULAR</span>
    <div className="mentorship-offer-main">
      <header className="mentorship-offer-header">
        <span className="mentorship-card-kicker">PRIVATE TRADING EDUCATION</span>
        <h2 id="mentorship-offer-title">KNIGHTFX MENTORSHIP</h2>
        <p>A structured 15-Day Live Mentorship built around live guidance, market understanding, disciplined execution and direct founder access.</p>
      </header>
      <ul className="mentorship-offer-features" ref={featuresRef}>
        {mentorshipBenefits.map((benefit, index) => <li key={benefit}>
          <span className="mentorship-feature-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="mentorship-feature-check" aria-hidden="true">✓</span>
          <span>{benefit}</span>
          <span className="mentorship-feature-arrow" aria-hidden="true">↗</span>
        </li>)}
        <li className="mentorship-inner-circle-benefit">
          <span className="mentorship-feature-number">09</span>
          <span className="mentorship-feature-check" aria-hidden="true">✓</span>
          <strong>FREE 3-MONTH INNER CIRCLE ACCESS</strong>
          <span className="mentorship-feature-arrow" aria-hidden="true">↗</span>
        </li>
      </ul>
    </div>

    <aside className="mentorship-offer-side" aria-label="Mentorship price and enrollment">
      <div className="mentorship-price-block">
        <span className="mentorship-limited-offer">LIMITED OFFER</span>
        <del aria-label="Original price 349 dollars">$349</del>
        <strong aria-label="149 dollars">$149</strong>
        <span className="mentorship-fee-label">ONE-TIME MENTORSHIP FEE</span>
      </div>
      <p className="mentorship-learning-motto">Learn <i>•</i> Practice <i>•</i> Improve</p>
      <JoinMentorshipLink className="mentorship-offer-cta" children="JOIN MENTORSHIP" />
    </aside>
  </article>;
}

export function MentorshipPage() {
  return <div className="page-content inner-page mentorship-page">
    <section className="mentorship-intro section-pad" aria-labelledby="mentorship-page-title">
      <div className="mentorship-intro-copy">
        <Eyebrow>KNIGHTFX TRADING LABS / MENTORSHIP</Eyebrow>
        <DisplayLines as="h1" id="mentorship-page-title" className="mentorship-page-title" lines={['MASTER THE MARKETS.', <em>TRADE WITH A PLAN.</em>]} />
        <p data-reveal>A structured 15-Day Live Mentorship designed to help traders understand the market, build a process and improve their decision-making with direct guidance.</p>
      </div>
      <span className="mentorship-intro-index" aria-hidden="true">KNIGHTFX / 15 DAYS</span>
    </section>

    <section className="mentorship-pricing section-pad" aria-label="KNIGHTFX Mentorship offer">
      <MentorshipOfferCard />
    </section>

    <section className="mentorship-closing section-pad" aria-labelledby="mentorship-closing-title">
      <Eyebrow>KNIGHTFX MENTORSHIP</Eyebrow>
      <DisplayLines as="h2" id="mentorship-closing-title" className="mentorship-closing-title" lines={['READY TO START?', <em>BUILD YOUR PROCESS.</em>, 'TRADE WITH PURPOSE.']} />
      <p data-reveal>Start your 15-Day Live Mentorship with KNIGHTFX TRADING LABS.</p>
      <JoinMentorshipLink className="mentorship-final-cta" />
      <a className="mentorship-final-text-link" href={siteConfig.telegramJoinUrl} target="_blank" rel="noopener noreferrer">MESSAGE @KNIGHTFX16 <ArrowUpRight size={14} aria-hidden="true" /></a>
    </section>
  </div>;
}
