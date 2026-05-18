// polish.jsx — Motion + atmosphere primitives shared across every page.
// Scroll reveals, parallax, animated numerals, marquees, magnetic hovers,
// background orbs, grain, custom cursor, scroll progress bar.

// ── useInView ─────────────────────────────────────────────────
const useInView = (opts = {}) => {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    // Fallback path: check on mount + on scroll/resize.
    // Some iframe contexts deliver IntersectionObserver callbacks unreliably.
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const margin = vh * 0.08;
      if (r.top < vh - margin && r.bottom > margin * -1) {
        setSeen(true);
        return true;
      }
      return false;
    };
    // immediate
    if (check()) return;
    // Attach IO too (works in normal contexts)
    let io;
    try {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setSeen(true); io.disconnect(); }
      }, { threshold: opts.threshold ?? 0.08, rootMargin: opts.rootMargin ?? '0px 0px -6% 0px' });
      io.observe(el);
    } catch (e) { /* ignore */ }
    // Scroll/resize fallback
    let raf = 0;
    const onChange = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; if (check()) { window.removeEventListener('scroll', onChange); window.removeEventListener('resize', onChange); if (io) io.disconnect(); }});
    };
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);
    // Re-check after a tick (in case layout shifted)
    const t = setTimeout(() => { check(); }, 60);
    return () => {
      if (io) io.disconnect();
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
      clearTimeout(t);
    };
  }, []);
  return [ref, seen];
};

// ── Reveal (fade-up on scroll) ────────────────────────────────
const Reveal = ({ children, delay = 0, y = 24, as: As = 'div', style, ...rest }) => {
  const [ref, seen] = useInView();
  return (
    <As ref={ref} {...rest} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
      transition: `opacity 900ms cubic-bezier(.16,.84,.44,1) ${delay}ms, transform 1100ms cubic-bezier(.16,.84,.44,1) ${delay}ms`,
      willChange: 'opacity, transform',
      ...style,
    }}>{children}</As>
  );
};

// ── Stagger (cycle children with a delay step) ────────────────
const Stagger = ({ children, step = 80, initialDelay = 0, y = 20, as: As = 'div', style, ...rest }) => {
  const [ref, seen] = useInView();
  const kids = React.Children.toArray(children);
  return (
    <As ref={ref} {...rest} style={style}>
      {kids.map((c, i) => (
        <div key={i} style={{
          opacity: seen ? 1 : 0,
          transform: seen ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
          transition: `opacity 800ms cubic-bezier(.16,.84,.44,1) ${initialDelay + i * step}ms, transform 1000ms cubic-bezier(.16,.84,.44,1) ${initialDelay + i * step}ms`,
        }}>{c}</div>
      ))}
    </As>
  );
};

// ── Parallax (translateY by scroll, dampened) ─────────────────
const Parallax = ({ children, speed = 0.15, style, ...rest }) => {
  const ref = React.useRef(null);
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // -1 (above) → 0 (centered) → +1 (below)
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        setY(progress * speed * 100);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return (
    <div ref={ref} {...rest} style={{
      transform: `translate3d(0, ${y}px, 0)`,
      willChange: 'transform',
      ...style,
    }}>{children}</div>
  );
};

// ── AnimatedNumber — counts up from 0 when in view ────────────
const AnimatedNumber = ({ to = 100, duration = 1600, prefix = '', suffix = '', format = (n) => Math.round(n).toLocaleString('de-DE'), style }) => {
  const [ref, seen] = useInView();
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>{prefix}{format(val)}{suffix}</span>;
};

// ── Marquee (infinite horizontal scroll of children) ──────────
const Marquee = ({ children, speed = 50, reverse = false, gap = 56, style }) => {
  const kids = React.Children.toArray(children);
  return (
    <div style={{
      overflow: 'hidden', width: '100%',
      maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
      ...style,
    }}>
      <div style={{
        display: 'flex', width: 'max-content',
        animation: `vj-marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
        gap,
      }}>
        {[0, 1].map(loop => (
          <div key={loop} style={{ display: 'flex', gap, alignItems: 'center', flexShrink: 0 }}>
            {kids}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── MagneticBtn — wraps a button so it leans toward cursor ────
const Magnetic = ({ children, strength = 0.25, radius = 80, style, ...rest }) => {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius * 2) { setT({ x: 0, y: 0 }); return; }
    setT({ x: dx * strength, y: dy * strength });
  };
  const onLeave = () => setT({ x: 0, y: 0 });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        display: 'inline-block',
        transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
        transition: 'transform 320ms cubic-bezier(.2,.8,.2,1)',
        ...style,
      }} {...rest}
    >{children}</div>
  );
};

// ── WordReveal — split children string into words; staggered ──
const WordReveal = ({ text, delay = 0, step = 60, lineHeight = 1.05, style, wordStyle, accentWords = [], accentStyle = {} }) => {
  const [ref, seen] = useInView();
  const words = text.split(' ');
  return (
    <span ref={ref} style={{ display: 'inline-block', lineHeight, ...style }}>
      {words.map((w, i) => {
        const isAccent = accentWords.includes(w);
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
            <span style={{
              display: 'inline-block',
              transform: seen ? 'translate3d(0,0,0)' : 'translate3d(0,120%,0)',
              transition: `transform 900ms cubic-bezier(.2,.8,.2,1) ${delay + i * step}ms`,
              ...wordStyle,
              ...(isAccent ? accentStyle : {}),
            }}>{w}{i < words.length - 1 && '\u00A0'}</span>
          </span>
        );
      })}
    </span>
  );
};

// ── BackgroundOrbs — slow drifting blurred radial blobs ───────
const BackgroundOrbs = ({ variant = 'dark', count = 3 }) => {
  const palettes = {
    dark:  ['#b48ef9', '#edff66', '#8a5ef5'],
    light: ['#b48ef9', '#edff66', '#d5bfff'],
  };
  const colors = palettes[variant] || palettes.dark;
  const orbs = Array.from({ length: count }, (_, i) => ({
    color: colors[i % colors.length],
    size: 360 + (i * 40 % 240),
    top: ['8%', '60%', '30%', '70%'][i % 4],
    left: ['8%', '60%', '78%', '20%'][i % 4],
    delay: i * 2,
    opacity: variant === 'dark' ? 0.32 : 0.55,
    duration: 18 + i * 4,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: 'absolute', top: o.top, left: o.left,
          width: o.size, height: o.size, borderRadius: '50%',
          background: `radial-gradient(circle at center, ${o.color}, transparent 60%)`,
          filter: 'blur(60px)', opacity: o.opacity,
          animation: `vj-drift-${i % 3} ${o.duration}s ease-in-out ${o.delay}s infinite alternate`,
          mixBlendMode: variant === 'dark' ? 'screen' : 'multiply',
        }} />
      ))}
    </div>
  );
};

// ── GrainOverlay — fine film grain on top of everything ───────
const GrainOverlay = ({ opacity = 0.04, fixed = true }) => (
  <div aria-hidden style={{
    position: fixed ? 'fixed' : 'absolute', inset: 0,
    pointerEvents: 'none', zIndex: 1, opacity,
    backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    mixBlendMode: 'overlay',
  }} />
);

// ── HoverImage — image with subtle zoom + dim overlay on hover ─
const HoverImage = ({ src, alt, height = 460, radius = 20, caption, style }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      position: 'relative', borderRadius: radius, overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(48,47,56,0.18)', cursor: 'pointer',
      ...style,
    }}>
      <img src={src} alt={alt || ''} style={{
        width: '100%', height, objectFit: 'cover', display: 'block',
        transform: hover ? 'scale(1.06)' : 'scale(1.02)',
        transition: 'transform 1400ms cubic-bezier(.2,.8,.2,1), filter 600ms ease',
        filter: hover ? 'saturate(1.08)' : 'saturate(1)',
      }} />
      {caption && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, rgba(30,30,35,0.62), transparent)',
          padding: '32px 24px 18px', color: 'var(--color-lavender-bg)',
          fontSize: 12.5, fontWeight: 700, letterSpacing: '.04em',
          opacity: hover ? 1 : 0.85, transition: 'opacity 300ms ease',
        }}>{caption}</div>
      )}
    </div>
  );
};

// ── ScrollProgress — thin top bar that fills with page scroll ──
const ScrollProgress = ({ color = 'var(--color-lavender-oil)' }) => {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 2,
      background: 'transparent', zIndex: 1000, pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%', width: `${p * 100}%`,
        background: `linear-gradient(90deg, ${color}, var(--color-lemon-light))`,
        transition: 'width 80ms linear',
      }} />
    </div>
  );
};

// ── CursorBlob — subtle blob trails the mouse on dark sections ─
const CursorBlob = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    let x = -1000, y = -1000, tx = -1000, ty = -1000, raf = 0;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      if (Math.hypot(tx - x, ty - y) > 0.5) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden style={{
      position: 'fixed', top: 0, left: 0, width: 400, height: 400,
      borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      background: 'radial-gradient(circle, rgba(180,142,249,0.18), transparent 70%)',
      mixBlendMode: 'screen', filter: 'blur(12px)',
      willChange: 'transform',
    }} />
  );
};

// ── DividerLabel — eyebrow set on a thin gradient rule ────────
const DividerLabel = ({ children, color = 'var(--color-fg-secondary)', align = 'center', style }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 16, ...style,
  }}>
    {align !== 'left' && <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--color-border))' }} />}
    <div style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase',
      color,
    }}>{children}</div>
    {align !== 'right' && <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--color-border), transparent)' }} />}
  </div>
);

// ── Ticker — vertical ascending/descending rotating words ─────
const Ticker = ({ words, intervalMs = 2400, style }) => {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [words.length, intervalMs]);
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline', position: 'relative', ...style }}>
      <span style={{
        display: 'inline-block',
        transform: `translateY(-${i * 100}%)`,
        transition: 'transform 700ms cubic-bezier(.7,0,.2,1)',
      }}>
        {words.concat(words[0]).map((w, idx) => (
          <span key={idx} style={{ display: 'block', whiteSpace: 'nowrap' }}>{w}</span>
        ))}
      </span>
    </span>
  );
};

// ── KineticHeadline — oversized headline that scales on hover ─
const KineticHeadline = ({ children, italic, style }) => (
  <span style={{
    fontStyle: italic ? 'italic' : 'normal',
    fontFamily: 'var(--font-primary)',
    background: 'linear-gradient(180deg, var(--color-near-black) 0%, var(--color-near-black) 60%, var(--color-mid) 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    ...style,
  }}>{children}</span>
);

// ── OutlineText — text rendered as transparent with stroke ────
const OutlineText = ({ children, stroke = 'rgba(48,47,56,0.30)', italic = true, style }) => (
  <span style={{
    color: 'transparent',
    WebkitTextStroke: `1px ${stroke}`,
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: 800,
    ...style,
  }}>{children}</span>
);

// ── Tilt — light 3D tilt on hover (used for cards/certificates) ─
const Tilt = ({ children, max = 6, style, ...rest }) => {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0 });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -dy * max, ry: dx * max });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{ perspective: 1200, ...style }} {...rest}
    >
      <div style={{
        transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: 'transform 320ms cubic-bezier(.2,.8,.2,1)',
        transformStyle: 'preserve-3d',
      }}>{children}</div>
    </div>
  );
};

Object.assign(window, {
  useInView, Reveal, Stagger, Parallax, AnimatedNumber, Marquee, Magnetic,
  WordReveal, BackgroundOrbs, GrainOverlay, HoverImage, ScrollProgress,
  CursorBlob, DividerLabel, Ticker, KineticHeadline, OutlineText, Tilt,
});
