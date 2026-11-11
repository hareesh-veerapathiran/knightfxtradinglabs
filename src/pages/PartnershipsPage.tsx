import { useState } from 'react';
import { ArrowDown, ArrowRight, Check, Copy } from 'lucide-react';
import { PartnerLogo } from '../components/PartnerLogo';
import { PartnerLogoMarquee } from '../components/PartnerLogoMarquee';
import { Eyebrow, SectionLabel } from '../components/Elements';
import { partners } from '../data/partners';
import './partnerships.css';

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  document.execCommand('copy');
  field.remove();
}

export function PartnershipsPage() {
  const [copied, setCopied] = useState(false);
  const propFirms = partners.filter((partner) => partner.category === 'PROP FIRM');
  const brokers = partners.filter((partner) => partner.category === 'BROKER');
  const educationPartner = partners.find((partner) => partner.category === 'EDUCATION PARTNER');

  const handleCopy = async () => {
    try {
      await copyText('KNIGHTFX');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return <div className="page-content inner-page partnerships-page">
    <section className="partnerships-opening">
      <div className="partnerships-opening-atmosphere" aria-hidden="true" />
      <div className="partnerships-opening-copy">
        <Eyebrow>KNIGHTFX TRADING LABS / PARTNERSHIPS</Eyebrow>
        <h1 className="partnerships-main-title"><span>ONE CODE.</span><span>MAXIMUM <em>SAVINGS.</em></span></h1>
        <p>Our partner network connects the KNIGHTFX community with selected trading firms, brokers and education platforms.</p>
        <a className="partnerships-opening-link" href="#partner-network">EXPLORE PARTNERS <ArrowDown size={14} aria-hidden="true" /></a>
      </div>
      <div className="partnerships-code-intro" data-reveal>
        <span className="partnerships-code-label">THE COMMUNITY CODE</span>
        <strong>KNIGHTFX</strong>
        <span className="partnerships-code-rule" />
        <p>The community code across participating trading partners.</p>
        <small>MAXIMUM AVAILABLE OFFER</small>
      </div>
      <span className="partnerships-opening-index">PARTNERSHIPS / 04</span>
    </section>

    <section id="partner-network" className="partner-network section-pad">
      <SectionLabel number="01" side="SELECTED COLLABORATIONS">OUR PARTNER NETWORK</SectionLabel>
      <div className="partner-network-intro" data-reveal>
        <h2 className="display-lines"><span className="display-line"><span>BUILT AROUND</span></span><span className="display-line"><span>THE RIGHT <em>PARTNERS.</em></span></span></h2>
        <p>Selected partnerships across proprietary trading, brokerage and trading education.</p>
      </div>

      <section className="partner-category" aria-labelledby="prop-firms-heading">
        <div className="partner-category-heading"><span>02 / PROP FIRM PARTNERS</span><h3 id="prop-firms-heading">TRADE WITH OUR PARTNERS.</h3></div>
        <PartnerLogoMarquee partners={propFirms} label="Prop firm partner logos" />
        <div className="partner-code-note"><span>CODE: KNIGHTFX</span><p>Use KNIGHTFX to access the maximum available offer from participating partners.</p></div>
      </section>

      <section className="partner-category partner-category-brokers" aria-labelledby="brokers-heading">
        <div className="partner-category-heading"><span>03 / BROKER PARTNERS</span><h3 id="brokers-heading">ACCESS THE MARKETS.</h3></div>
        <div className="broker-statement">
          <span className="broker-network-label">BROKER NETWORK</span>
          <h2>ACCESS THE MARKETS.<br /><em>TRADE WITH CONFIDENCE.</em></h2>
          <p>Selected brokerage partners connected to the KNIGHTFX community.</p>
        </div>
        <div id="broker-partner-panels" className="broker-partner-list" aria-label="Broker partners">
          {brokers.map((partner) => <PartnerLogo key={partner.name} partner={partner} square />)}
        </div>
        <a className="broker-partners-cta" href="#broker-partner-panels">EXPLORE OUR BROKER PARTNERS <ArrowRight size={15} aria-hidden="true" /></a>
      </section>

      {educationPartner && <section className="partner-category partner-category-education" aria-labelledby="education-partner-heading">
        <div className="partner-category-heading"><span>04 / EDUCATION PARTNERSHIP</span><h3 id="education-partner-heading">LEARN. DEVELOP. EVOLVE.</h3></div>
        <div className="education-partner-layout">
          <PartnerLogo partner={educationPartner} />
          <div className="education-partner-caption" data-reveal><span>KNIGHTFX TRADING LABS × INFINITY VISION</span><p>EDUCATION PARTNERSHIP</p></div>
        </div>
      </section>}
    </section>

    <section className="partnership-code section-pad" aria-labelledby="partnership-code-heading">
      <div className="partnership-code-left" data-reveal><span className="partnerships-code-label">05 / COMMUNITY CODE</span><h2 id="partnership-code-heading">ONE CODE.</h2></div>
      <div className="partnership-code-right" data-reveal>
        <p className="partnership-code-word">KNIGHTFX</p><p className="partnership-code-offer">MAXIMUM AVAILABLE OFFER.</p>
        <p className="partnership-code-description">Use the KNIGHTFX community code across participating partners.</p>
        <button className="partnership-copy-button" type="button" onClick={handleCopy} aria-live="polite">
          {copied ? <><Check size={15} aria-hidden="true" /> CODE COPIED</> : <><Copy size={14} aria-hidden="true" /> COPY CODE</>}
        </button>
      </div>
    </section>

    <section className="partnerships-statement section-pad" data-reveal>
      <span className="partnerships-code-label">06 / SHARED WITH PURPOSE</span>
      <h2>PARTNERSHIPS BUILT<br /><em>FOR THE COMMUNITY.</em></h2>
      <p>From proprietary trading firms and brokers to education partners, KNIGHTFX TRADING LABS works with selected brands to create meaningful opportunities for our community.</p>
    </section>

    <section className="partnerships-final section-pad">
      <div className="partnerships-final-content" data-reveal>
        <Eyebrow>KNIGHTFX COMMUNITY</Eyebrow><h2>USE THE CODE.<br /><em>ACCESS THE OFFER.</em></h2>
        <p>Explore the KNIGHTFX partner network and use our community code wherever available.</p>
        <div className="partnerships-final-actions"><a href="#partner-network" className="partnerships-final-primary">EXPLORE PARTNERS <ArrowRight size={15} aria-hidden="true" /></a><span>CODE: KNIGHTFX</span></div>
      </div>
    </section>
  </div>;
}
