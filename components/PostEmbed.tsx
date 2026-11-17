"use client";

import { useEffect, useRef, useState } from "react";

type Twttr = {
  ready: (fn: (t: Twttr) => void) => void;
  widgets: { createTweet: (id: string, el: HTMLElement, options: Record<string, unknown>) => Promise<HTMLElement | undefined> };
};

const SRC = "https://platform.twitter.com/widgets.js";
let loading: Promise<Twttr> | null = null;

/** Loads X's own embed script once, the first time a post scrolls near. */
function loadX(): Promise<Twttr> {
  if (loading) return loading;
  loading = new Promise<Twttr>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.onload = () => {
      const t = (window as unknown as { twttr?: Twttr }).twttr;
      if (t) t.ready(resolve);
      else reject(new Error("X embed unavailable"));
    };
    script.onerror = () => reject(new Error("X embed blocked"));
    document.head.appendChild(script);
  });
  return loading;
}

/** Shows a post from X, with its picture or video, using X's official
 *  embed. The media is served by X; nothing is copied onto this site.
 *  If X cannot be reached (an ad blocker, say) nothing is shown and the
 *  card still links to the post. */
export default function PostEmbed({ url }: { url: string }) {
  const box = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"waiting" | "shown" | "failed">("waiting");
  const id = url.match(/status\/(\d+)/)?.[1];

  useEffect(() => {
    const el = box.current;
    if (!el || !id) return;
    let cancelled = false;
    const watcher = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        watcher.disconnect();
        loadX()
          .then((t) => t.widgets.createTweet(id, el, { dnt: true, conversation: "none", align: "center" }))
          .then((made) => {
            if (!cancelled) setState(made ? "shown" : "failed");
          })
          .catch(() => {
            if (!cancelled) setState("failed");
          });
      },
      { rootMargin: "600px" },
    );
    watcher.observe(el);
    return () => {
      cancelled = true;
      watcher.disconnect();
    };
  }, [id]);

  if (!id || state === "failed") return null;
  return <div ref={box} className={`post-embed ${state}`} aria-busy={state === "waiting"} />;
}
