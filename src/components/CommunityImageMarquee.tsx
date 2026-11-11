import { useEffect, useRef } from 'react';
import type { CommunityArchiveImage } from '../data/communityArchive';

type CommunityImageMarqueeProps = {
  images: CommunityArchiveImage[];
  direction: 'left-to-right' | 'right-to-left';
  label: string;
  speedPxPerSecond: number;
  minimumDuration: number;
};

export function CommunityImageMarquee({ images, direction, label, speedPxPerSecond, minimumDuration }: CommunityImageMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !track || !firstSet) return;

    const updateDuration = () => {
      const width = firstSet.getBoundingClientRect().width;
      if (width > 0) {
        const seconds = Math.max(minimumDuration, width / speedPxPerSecond);
        track.style.setProperty('--archive-duration', `${seconds}s`);
        track.style.setProperty('--archive-distance', `${width}px`);
      }
    };

    updateDuration();
    const resizeObserver = new ResizeObserver(updateDuration);
    resizeObserver.observe(firstSet);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      viewport.classList.toggle('is-outside', !entry.isIntersecting);
    });
    visibilityObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [minimumDuration, speedPxPerSecond]);

  return <div ref={viewportRef} className={`community-archive-marquee community-archive-${direction}`} role="region" aria-label={label}>
    <div ref={trackRef} className="community-archive-track">
      <div ref={firstSetRef} className="community-archive-set">
        {images.map((image) => <figure className="community-archive-item" key={image.id}>
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="eager" decoding="async" />
        </figure>)}
      </div>
      <div className="community-archive-set community-archive-set-duplicate" aria-hidden="true">
        {images.map((image) => <figure className="community-archive-item" key={image.id}>
          <img src={image.src} alt="" width={image.width} height={image.height} loading="eager" decoding="async" />
        </figure>)}
      </div>
    </div>
  </div>;
}
