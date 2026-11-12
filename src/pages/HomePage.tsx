import { Eyebrow, TextLink } from '../components/Elements';

export function HomePage() {
  return <div className="page-content home-page">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" role="img" aria-label="Dark architectural view across Dubai at night" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-content">
        <Eyebrow>KNIGHTFX TRADING LABS</Eyebrow>
        <h1 className="hero-title" id="hero-title"><span>MASTER THE MARKET.</span><span>MONEY FOLLOWS.</span></h1>
        <TextLink to="/about" down className="hero-cta">EXPLORE KNIGHTFX</TextLink>
      </div>
      <div className="hero-meta"><span>DISCIPLINE / STRATEGY / GROWTH</span></div>
      <div className="hero-grain" aria-hidden="true" />
    </section>
  </div>;
}
