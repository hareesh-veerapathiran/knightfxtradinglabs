import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config';
import { DisplayLines, Eyebrow, SectionLabel } from '../components/Elements';
import './mentorship.css';

gsap.registerPlugin(ScrollTrigger);

function JoinMentorshipLink({ children = 'JOIN MENTORSHIP', className = 'primary-link' }: { children?: ReactNode; className?: string }) {
  return <a className={className} href={siteConfig.telegramJoinUrl} target="_blank" rel="noopener noreferrer">{children}<ArrowRight size={15}/></a>;
}

function ClickToJoinLink() {
  return <a className="mentorship-text-join" href={siteConfig.telegramJoinUrl} target="_blank" rel="noopener noreferrer"><span>Want to join KNIGHTFX Mentorship?</span><strong>CLICK HERE TO JOIN <ArrowUpRight size={14}/></strong></a>;
}

function MentorshipOfferCard() {
  const cardRef = useRef<HTMLElement | null>(null);
  const setCardRef = (node: HTMLElement | null) => { cardRef.current = node; };

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(card, { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: card, start: 'top 84%', once: true },
      });
    }, card);

    return () => context.revert();
  }, []);

  return <article ref={setCardRef} className="mentorship-offer-card" aria-labelledby="mentorship-price-title">
    <span className="mentorship-popular-badge">MOST POPULAR</span>
    <header className="mentorship-offer-header">
      <h2 id="mentorship-price-title">KNIGHTFX MENTORSHIP</h2>
      <p>A personal trading mentorship built around live guidance, direct founder access and a structured approach to becoming a more disciplined trader.</p>
    </header>
    <div className="mentorship-offer-pricing">
      <del aria-label="Original price 349 dollars">$349</del>
      <span className="mentorship-limited-offer">LIMITED OFFER</span>
      <strong aria-label="149 dollars">$149</strong>
      <span className="mentorship-fee-label">ONE-TIME MENTORSHIP FEE</span>
    </div>
    <div className="mentorship-offer-divider" />
    <ul className="mentorship-offer-features">
      <li><span aria-hidden="true">✓</span>Live Mentoring</li>
      <li><span aria-hidden="true">✓</span>1:1 with Founder — Hareesh VN</li>
      <li><span aria-hidden="true">✓</span>Prop Firm Suggestions According to Trading Style</li>
      <li><span aria-hidden="true">✓</span>KNIGHTFX Inner Circle Included</li>
    </ul>
    <JoinMentorshipLink className="mentorship-offer-cta">JOIN MENTORSHIP</JoinMentorshipLink>
  </article>;
}

export function MentorshipPage() {
  return <div className="page-content inner-page mentorship-page">
    <section className="page-hero mentorship-hero"><div className="page-hero-image mentorship-image"/><div className="page-hero-shade"/><div className="page-hero-copy"><Eyebrow>KNIGHTFX MENTORSHIP</Eyebrow><DisplayLines as="h1" className="page-title" lines={['TRADE WITH A PLAN.', <em>NOT WITH EMOTION.</em>]} /><p>Market education with structure, context and an emphasis on disciplined practice.</p><div className="mentorship-hero-actions"><JoinMentorshipLink/><a className="mentorship-explore-link" href="#mentorship-program">EXPLORE THE PROGRAM <ArrowDown size={14}/></a></div></div><span className="page-hero-index">03 / 05</span></section>
    <section id="mentorship-program" className="mentorship-intro section-pad"><SectionLabel number="01" side="LEARN · ANALYSE · PRACTISE">A LEARNING PROCESS</SectionLabel><div className="mentorship-intro-grid"><DisplayLines className="section-title" lines={['UNDERSTAND FIRST.', <em>THEN TAKE ACTION.</em>]} /><p data-reveal>Mentorship is built around learning the market, forming a process and reviewing decisions. The work is educational; trading outcomes remain individual and uncertain.</p></div></section>
    <section className="mentorship-pricing section-pad" aria-label="KNIGHTFX Mentorship pricing">
      <MentorshipOfferCard />
    </section>
    <section className="mentorship-closing section-pad"><Eyebrow>READY TO START?</Eyebrow><DisplayLines className="section-title" lines={['BUILD YOUR PROCESS.', <em>TRADE WITH PURPOSE.</em>]} /><p data-reveal>Get direct guidance, live mentoring, personalized support and Inner Circle access through KNIGHTFX Mentorship.</p><div className="mentorship-closing-actions"><JoinMentorshipLink/><ClickToJoinLink/></div></section>
  </div>;
}
