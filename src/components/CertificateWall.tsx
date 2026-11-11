import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { certificates } from '../content';

type Position = { x: number; y: number; rotation: number; scale: number; opacity: number; z: number };
const arrangements: Position[][] = [
  [
    { x: -.34, y: -.19, rotation: -7, scale: .84, opacity: .26, z: 1 },
    { x: .32, y: -.18, rotation: 6, scale: .87, opacity: .34, z: 2 },
    { x: -.32, y: .19, rotation: 5, scale: .83, opacity: .29, z: 2 },
    { x: .34, y: .19, rotation: -6, scale: .84, opacity: .25, z: 1 },
    { x: 0, y: .24, rotation: 1, scale: .92, opacity: .38, z: 3 },
  ],
  [
    { x: -.3, y: .2, rotation: -5, scale: .84, opacity: .27, z: 1 },
    { x: .33, y: .18, rotation: 7, scale: .82, opacity: .25, z: 1 },
    { x: -.34, y: -.18, rotation: 4, scale: .87, opacity: .31, z: 2 },
    { x: .3, y: -.18, rotation: -5, scale: .85, opacity: .3, z: 2 },
    { x: 0, y: -.23, rotation: -1, scale: .94, opacity: .4, z: 3 },
  ],
];

export function CertificateWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const wall = wallRef.current;
    if (!wall || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = Array.from(wall.querySelectorAll<HTMLElement>('.certificate-frame'));
    let order = cards.map((_, index) => index);
    let state = 0;
    let timer: gsap.core.Tween | undefined;
    let timeline: gsap.core.Timeline | undefined;
    const paint = (duration = 0) => {
      const width = wall.clientWidth;
      const height = wall.clientHeight;
      const compact = width < 761;
      cards.forEach((card, index) => {
        const positionIndex = order.indexOf(index);
        const position = arrangements[state][positionIndex];
        const vars = { x: position.x * width * (compact ? .45 : 1), y: position.y * height * (compact ? .6 : 1), rotation: position.rotation, scale: compact ? Math.max(.78, position.scale - .02) : position.scale, opacity: compact ? Math.min(.28, position.opacity) : position.opacity, zIndex: position.z, xPercent: -50, yPercent: -50, duration, ease: 'power3.inOut' };
        if (duration) timeline?.to(card, vars, 0);
        else gsap.set(card, vars);
      });
    };
    const cycle = () => {
      state = (state + 1) % arrangements.length;
      order = [...order.slice(1), order[0]];
      timeline = gsap.timeline({ onComplete: () => { timer = gsap.delayedCall(4.2, cycle); } });
      paint(1.55);
    };
    paint();
    timer = gsap.delayedCall(2.4, cycle);
    const resize = () => paint();
    window.addEventListener('resize', resize, { passive: true });
    return () => { timer?.kill(); timeline?.kill(); window.removeEventListener('resize', resize); gsap.killTweensOf(cards); };
  }, []);

  return <div className="certificate-wall" ref={wallRef} aria-hidden="true">
    {certificates.map((certificate, index) => <figure className={`certificate-frame certificate-frame-${index + 1}`} key={certificate.id}>
      <img className="certificate-image" src={certificate.src} alt="" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
    </figure>)}
  </div>;
}
