import { ComponentType, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer, Navbar, NavigationProvider } from './components/SiteChrome';
import { pages, SitePage } from './content';
import { AboutPage } from './pages/AboutPage';
import { CommunityPage } from './pages/CommunityPage';
import { HomePage } from './pages/HomePage';
import { MentorshipPage } from './pages/MentorshipPage';
import { PartnershipsPage } from './pages/PartnershipsPage';

gsap.registerPlugin(ScrollTrigger);

const pageComponents: Record<SitePage, ComponentType> = {
  home: HomePage,
  about: AboutPage,
  mentorship: MentorshipPage,
  partnerships: PartnershipsPage,
  community: CommunityPage,
};

const orderedPages = pages;

function sectionFromLocation(): SitePage {
  const hash = window.location.hash.slice(1);
  const hashPage = orderedPages.find((entry) => entry.id === hash);
  if (hashPage) return hashPage.id;
  return orderedPages.find((entry) => entry.path === window.location.pathname.replace(/\/$/, '') || entry.path === window.location.pathname)?.id ?? 'home';
}

function locationForSection(section: SitePage) {
  return section === 'home' ? '/' : `/#${section}`;
}

export function App() {
  const [activeSection, setActiveSection] = useState<SitePage>(() => sectionFromLocation());

  const scrollToSection = useCallback((section: SitePage, behavior: ScrollBehavior = 'smooth') => {
    document.getElementById(section)?.scrollIntoView({ behavior, block: 'start' });
  }, []);

  const navigate = useCallback((destination: string) => {
    const url = new URL(destination, window.location.href);
    const hash = url.hash.slice(1);
    const section = orderedPages.find((entry) => entry.id === hash)?.id
      ?? orderedPages.find((entry) => entry.path === url.pathname.replace(/\/$/, '') || entry.path === url.pathname)?.id
      ?? 'home';
    window.history.pushState({ section }, '', locationForSection(section));
    scrollToSection(section, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
  }, [scrollToSection]);

  useLayoutEffect(() => {
    const section = sectionFromLocation();
    const canonicalLocation = locationForSection(section);
    if (`${window.location.pathname}${window.location.hash}` !== canonicalLocation) {
      window.history.replaceState({ section }, '', canonicalLocation);
    }
    if (section !== 'home') requestAnimationFrame(() => scrollToSection(section, 'auto'));
  }, [scrollToSection]);

  useEffect(() => {
    const updateFromHistory = () => scrollToSection(sectionFromLocation(), 'auto');
    window.addEventListener('popstate', updateFromHistory);
    return () => window.removeEventListener('popstate', updateFromHistory);
  }, [scrollToSection]);

  useEffect(() => {
    const sections = orderedPages.map((entry) => document.getElementById(entry.id)).filter((element): element is HTMLElement => Boolean(element));
    if (!sections.length) return;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.38;
      const active = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });
      if (active) setActiveSection(active.id as SitePage);
    };

    const observer = new IntersectionObserver(updateActiveSection, { rootMargin: '-37% 0px -61% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const meta = pages.find((entry) => entry.id === activeSection)!;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description);
  }, [activeSection]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      // The approved home hero keeps its entrance sequence; the other content reveals only on scroll.
      gsap.fromTo('.home-page .hero-image', { scale: 1.045, opacity: .55 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out' });
      gsap.fromTo('.home-page .hero-content .eyebrow', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .7, delay: .22, ease: 'power3.out' });
      gsap.fromTo('.home-page .hero-title span', { yPercent: 105, opacity: 0, filter: 'blur(8px)' }, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: .11, delay: .35, ease: 'power4.out' });
      gsap.fromTo('.home-page .hero-cta', { y: 13, opacity: 0 }, { y: 0, opacity: 1, duration: .6, delay: .85, ease: 'power3.out' });
      gsap.fromTo('.home-page .hero-meta', { opacity: 0 }, { opacity: 1, duration: .7, delay: 1.05 });

      gsap.utils.toArray<HTMLElement>('.site-section:not(.site-section-home) .page-content').forEach((pageContent) => {
        gsap.fromTo(pageContent, { y: 12, opacity: .88 }, {
          y: 0,
          opacity: 1,
          duration: .55,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: pageContent.parentElement, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .62,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.display-lines:not(.hero-title)').forEach((heading) => {
        const lines = heading.querySelectorAll<HTMLElement>('.display-line > span');
        if (!lines.length) return;
        gsap.fromTo(lines, { yPercent: 104, opacity: 0, filter: 'blur(6px)' }, {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: .86,
          stagger: .075,
          ease: 'power4.out',
          clearProps: 'filter,transform,opacity',
          scrollTrigger: { trigger: heading, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.site-section .page-hero').forEach((hero) => {
        const revealTargets = hero.querySelectorAll<HTMLElement>('.page-hero-image, .page-title .display-line > span, .page-hero-copy > p');
        gsap.fromTo(revealTargets, { y: 18, opacity: .25 }, {
          y: 0,
          opacity: 1,
          duration: .65,
          stagger: .07,
          ease: 'power3.out',
          scrollTrigger: { trigger: hero, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.site-section:not(.site-section-home) .eyebrow, .about-founder-heading .eyebrow, .about-founder-details > h2, .about-founder-role, .about-founder-alias, .about-founder-stats > div, .about-social-links a, .partner-category-heading > *').forEach((element) => {
        gsap.fromTo(element, { y: 18, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .58,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.about-founder-manifesto span').forEach((line, index) => {
        gsap.fromTo(line, { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .75,
          delay: index * .08,
          ease: 'power3.out',
          scrollTrigger: { trigger: line, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.partnerships-main-title span').forEach((element, index) => {
        gsap.fromTo(element, { y: 18, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .62,
          delay: index * .06,
          ease: 'power3.out',
          scrollTrigger: { trigger: element.closest('.partnerships-opening'), start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.partnerships-opening-copy > p, .partnerships-opening-link').forEach((element) => {
        gsap.fromTo(element, { y: 18, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .6,
          ease: 'power3.out',
          scrollTrigger: { trigger: element.closest('.partnerships-opening'), start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.path-step').forEach((step) => {
        gsap.fromTo(step.querySelector('.path-index'), { scale: .9, opacity: 0 }, {
          scale: 1,
          opacity: 1,
          duration: .55,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 85%', once: true },
        });
      });

      const communityStat = document.querySelector<HTMLElement>('.community-trader-stat');
      if (communityStat) {
        gsap.fromTo(communityStat.querySelector('strong'), { y: 40, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .82,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: communityStat, start: 'top 82%', once: true },
        });
        gsap.fromTo(communityStat.querySelector('span'), { y: 14, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .58,
          delay: .12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: communityStat, start: 'top 82%', once: true },
        });
      }

      gsap.utils.toArray<HTMLElement>('.community-platform-reveal').forEach((row, index) => {
        const direction = index % 2 === 0 ? -16 : 16;
        gsap.fromTo(row, { x: direction, y: 18, opacity: 0, filter: 'blur(4px)' }, {
          x: 0,
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: .68,
          delay: index * .08,
          ease: 'power3.out',
          clearProps: 'transform,opacity,filter',
          scrollTrigger: { trigger: row, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.community-journal-reveal').forEach((journal) => {
        gsap.fromTo(journal, { y: 30, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .82,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: journal, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.preview-image').forEach((image) => {
        gsap.fromTo(image, { clipPath: 'inset(0 0 0 100%)' }, {
          clipPath: 'inset(0 0 0 0)',
          duration: 1.1,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: image, start: 'top 85%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.about-founder-photo-wrap').forEach((portrait) => {
        gsap.fromTo(portrait, { y: 50, opacity: 0, scale: .97 }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: .9,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: portrait, start: 'top 84%', once: true },
        });
        gsap.to(portrait.querySelector('.about-founder-photo'), {
          y: -14,
          ease: 'none',
          scrollTrigger: { trigger: portrait, start: 'top bottom', end: 'bottom top', scrub: .6 },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => context.revert();
  }, []);

  return <NavigationProvider navigate={navigate}>
    <Navbar page={activeSection} />
    <main id="top" className="site-scroll">
      {orderedPages.map(({ id }) => {
        const Page = pageComponents[id];
        return <section id={id} className={`site-section site-section-${id}`} key={id} aria-label={pages.find((entry) => entry.id === id)?.label}>
          <Page />
        </section>;
      })}
    </main>
    <Footer />
  </NavigationProvider>;
}
