"use client";

import { useEffect, useRef } from "react";

type Layer = { label: string; chips: string[] };

/** A product screenshot that fans out into its layers as you scroll.
 *  One number does all the work: --p goes from 0 (flat) to 1 (fully
 *  fanned out) with the scroll position, and the CSS turns it into
 *  angles and distances. With reduced motion it is shown fanned out. */
export default function Stack({
  image,
  alt,
  layers,
  floorLabel,
  tools,
  caption,
}: {
  image: string;
  alt: string;
  layers: Layer[];
  floorLabel: string;
  tools: string[];
  caption: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const raw = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      // Ease, and finish a little before the end so it rests fanned out.
      const t = Math.min(1, raw / 0.8);
      el.style.setProperty("--p", String(t * t * (3 - 2 * t)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const count = layers.length;
  return (
    <section ref={ref} className="stack-scroll" aria-label="What is under the product">
      <div className="stack-pin">
        <div className="stack-plane">
          <div className="stack-floor" style={{ ["--i" as string]: count + 1 }}>
            <span className="floor-label">{floorLabel}</span>
            {tools.map((t, i) => (
              <span key={t} className="floor-chip" style={{ ["--n" as string]: i }}>
                {t}
              </span>
            ))}
          </div>
          {[...layers].reverse().map((layer, r) => {
            const i = count - r;
            return (
              <div
                key={layer.label}
                className={`stack-layer${i === count ? " last" : ""}`}
                style={{ ["--i" as string]: i }}
              >
                <span className="layer-label">{layer.label}</span>
                <span className="layer-chips">
                  {layer.chips.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </span>
              </div>
            );
          })}
          <div className="stack-layer top" style={{ ["--i" as string]: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={alt} />
          </div>
        </div>
        <p className="mono stack-caption">↑ {caption}</p>
      </div>
    </section>
  );
}
