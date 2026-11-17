"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Layer = { label: string; chips: string[] };

const RAD = Math.PI / 180;
const TILT = 57 * RAD; // how far the stack leans back
const SPIN = 36 * RAD; // how far it turns
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** A product screenshot that leans back and fans out into its layers as
 *  you scroll.
 *
 *  It looks 3D but is drawn flat: a tilted, turned sheet seen without
 *  perspective is just a squashed, rotated rectangle, and a sheet
 *  "further back" is the same rectangle moved down the screen. Drawing
 *  it that way keeps it sharp at any zoom level and identical in every
 *  browser. The script measures the space it has and sizes the stack to
 *  fit, so it can never slide off screen. Without scripting it stays a
 *  plain screenshot; with reduced motion it is shown already fanned out. */
export default function Stack({
  image,
  alt,
  href,
  layers,
  floorLabel,
  floor,
  caption,
  cta,
}: {
  image: string;
  alt: string;
  href: string;
  layers: Layer[];
  floorLabel: string;
  floor: string[];
  caption: string;
  cta: string;
}) {
  const root = useRef<HTMLElement | null>(null);
  const count = layers.length;

  useEffect(() => {
    const el = root.current;
    const pin = el?.querySelector<HTMLElement>(".stack-pin");
    const plane = el?.querySelector<HTMLElement>(".stack-plane");
    if (!el || !pin || !plane) return;
    const sheets = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = !still && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let frame = 0;
    let lookX = 0;
    let lookY = 0;
    let aimX = 0;
    let aimY = 0;

    const draw = () => {
      frame = 0;
      const vw = pin.clientWidth;
      const vh = pin.clientHeight;
      const w = plane.offsetWidth;
      const h = plane.offsetHeight;
      if (!vw || !vh || !w || !h) return;

      // How far through the section we are, starting a little before it
      // reaches the top of the screen and resting open near the end.
      const rect = el.getBoundingClientRect();
      const lead = window.innerHeight * 0.3;
      const span = rect.height - window.innerHeight + lead;
      const raw = still || span <= 0 ? 1 : clamp((lead - rect.top) / span / 0.86);

      const turn = ease(clamp(raw / 0.55));
      const open = clamp((raw - 0.16) / 0.62);
      const reveal = clamp((raw - 0.5) / 0.42);

      // The room there is to draw in.
      // Wide screens keep the stack to the middle so the tools show
      // around it; phones and upright tablets give it the full width.
      const narrow = vw < 900 || vh > vw;
      const padX = vw < 640 ? 10 : 32;
      const padTop = vw < 640 ? 20 : 26;
      const padBottom = narrow ? Math.min(150, vh * 0.2) : Math.max(Math.min(110, vh * 0.3), vh * 0.2);
      const boxW = narrow ? vw - padX * 2 : Math.min(vw - padX * 2, vw * 0.64);
      const boxH = Math.max(120, vh - padTop - padBottom);

      // Size the gap between sheets from the space left over once the
      // stack is fully open: tall screens get taller, easier to read gaps.
      const c1 = Math.cos(TILT);
      const s1 = Math.sin(TILT);
      const fullW = w * Math.cos(SPIN) + h * Math.sin(SPIN);
      const fullH = c1 * (w * Math.sin(SPIN) + h * Math.cos(SPIN));
      const fitW = Math.min(1, boxW / fullW);
      const gap = clamp((boxH / fitW - fullH) / (count * s1), w * 0.085, w * 0.21);

      // Ease the pointer nudge, then work out this frame's angles.
      lookX += (aimX - lookX) * 0.08;
      lookY += (aimY - lookY) * 0.08;
      const tilt = TILT * turn + lookY * turn * RAD;
      const spin = SPIN * turn + lookX * turn * RAD;
      const c = Math.cos(tilt);
      const s = Math.sin(tilt);

      // Deeper sheets drop first, so the stack opens from the bottom up.
      let drop = 0;
      for (const sheet of sheets) {
        const depth = Number(sheet.dataset.depth);
        const lag = ((count + 1 - depth) / (count + 1)) * 0.4;
        const y = depth * gap * s * ease(clamp(open * 1.4 - lag));
        sheet.style.setProperty("--y", `${y.toFixed(2)}px`);
        if (depth <= count) drop = Math.max(drop, y);
      }

      const nowW = w * Math.cos(spin) + h * Math.abs(Math.sin(spin));
      const nowH = c * (w * Math.abs(Math.sin(spin)) + h * Math.cos(spin));
      const scale = Math.min(1, boxW / nowW, boxH / (nowH + drop));
      const top = mix(0, padTop + (boxH - scale * (nowH + drop)) / 2, turn);
      const shift = top - scale * (h / 2 - nowH / 2);

      el.style.setProperty("--p", raw.toFixed(4));
      el.style.setProperty("--c", c.toFixed(4));
      el.style.setProperty("--rz", `${(-spin).toFixed(4)}rad`);
      el.style.setProperty("--s", scale.toFixed(4));
      el.style.setProperty("--ty", `${shift.toFixed(2)}px`);
      el.style.setProperty("--open", ease(open).toFixed(3));
      el.style.setProperty("--reveal", reveal.toFixed(3));
      el.style.setProperty("--strip", `${(((gap * s1) / c1) * Math.cos(SPIN)).toFixed(1)}px`);
      el.classList.toggle("tall", gap > w * 0.14);
      el.classList.toggle("is-open", raw >= 1);

      if (Math.abs(aimX - lookX) > 0.02 || Math.abs(aimY - lookY) > 0.02) queue();
    };

    const queue = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onMove = (e: PointerEvent) => {
      const r = pin.getBoundingClientRect();
      aimX = ((e.clientX - r.left) / r.width - 0.5) * 7;
      aimY = ((e.clientY - r.top) / r.height - 0.5) * -5;
      queue();
    };
    const onLeave = () => {
      aimX = 0;
      aimY = 0;
      queue();
    };

    draw();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    const watcher = new ResizeObserver(queue);
    watcher.observe(pin);
    if (pointer) {
      pin.addEventListener("pointermove", onMove);
      pin.addEventListener("pointerleave", onLeave);
    }
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      watcher.disconnect();
      pin.removeEventListener("pointermove", onMove);
      pin.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  return (
    <section ref={root} className="stack-scroll" aria-label="What is under the product">
      <div className="stack-pin">
        <div className="stack-plane">
          <div className="sheet floor" data-depth={count + 1} style={{ ["--i" as string]: count + 1 }}>
            <ul className="floor-grid">
              <li className="floor-label">{floorLabel}</li>
              {floor.map((item, i) => {
                const [name, note] = item.split(" / ");
                return (
                  <li
                    key={item}
                    className={note ? "tool lit" : "tool"}
                    style={{ ["--d" as string]: ((i * 7) % 10) / 10, ["--k" as string]: i % 6 }}
                  >
                    <b>{name}</b>
                    {note ? <small>{note}</small> : null}
                  </li>
                );
              })}
            </ul>
          </div>
          {[...layers].reverse().map((layer, r) => {
            const depth = count - r;
            return (
              <div
                key={layer.label}
                className={depth === count ? "sheet layer last" : "sheet layer"}
                data-depth={depth}
                style={{ ["--i" as string]: depth }}
              >
                <div className="layer-row">
                  <span className="layer-label">{layer.label}</span>
                  <span className="layer-chips">
                    {layer.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </span>
                </div>
              </div>
            );
          })}
          <Link href={href} className="sheet top" data-depth={0} style={{ ["--i" as string]: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={alt} />
            <span className="top-hint" aria-hidden="true">
              Open the case study →
            </span>
          </Link>
        </div>
        <p className="mono stack-caption">↑ {caption}</p>
        <Link href={href} className="stack-cta">
          {cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
