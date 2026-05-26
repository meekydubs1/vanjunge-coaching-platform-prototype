// shared.jsx, Small reusable atoms for the VanJunge prototype

const Eyebrow = ({ children, color = 'var(--color-lavender-oil)', style }) => (
  <div style={{
    fontSize: 11, fontWeight: 600, letterSpacing: '.1em',
    textTransform: 'uppercase', color, ...style,
  }}>{children}</div>
);

const Btn = (props) => {
  const {
    children, variant = 'primary', size = 'md', onClick, style, disabled, type, full, className,
  } = props;
  // Forward only DOM-safe attributes (aria-*, data-*, title, role, tabIndex, name, value)
  const forwardable = Object.fromEntries(Object.entries(props).filter(([k]) =>
    k.startsWith('aria-') || k.startsWith('data-') ||
    ['title', 'role', 'tabIndex', 'name', 'value', 'autoFocus', 'form'].includes(k)
  ));
  const base = {
    border: 'none',
    borderRadius: 9999,
    fontWeight: 700,
    fontFamily: 'var(--font-primary)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 180ms ease, color 180ms ease, transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 240ms ease',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: full ? '100%' : undefined,
    opacity: disabled ? 0.5 : 1,
  };
  const sizes = {
    sm: { padding: '8px 18px', fontSize: 12 },
    md: { padding: '12px 24px', fontSize: 13.5 },
    lg: { padding: '15px 32px', fontSize: 15 },
  };
  const variants = {
    primary:   { background: 'var(--color-lavender-deep)', color: '#ffffff' },
    primaryDark: { background: 'var(--color-lemon-light)', color: 'var(--color-near-black)' },
    secondary: { background: 'transparent', color: 'var(--color-near-black)', border: '1.5px solid rgba(48,47,56,0.18)' },
    ghost:     { background: 'transparent', color: 'var(--color-fg-secondary)' },
    danger:    { background: 'transparent', color: '#c25151', border: '1.5px solid rgba(194,81,81,0.30)' },
    dark:      { background: 'var(--color-near-black)', color: 'var(--color-lavender-bg)' },
  };
  const cls = ['vj-btn', `vj-btn-${variant}`, disabled ? 'vj-btn-disabled' : '', className || ''].filter(Boolean).join(' ');
  return (
    <button type={type || 'button'} disabled={disabled} onClick={onClick}
      className={cls}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...forwardable}
    >{children}</button>
  );
};

const Tag = ({ children, tone = 'lavender', style }) => {
  const tones = {
    lavender: { background: 'var(--color-lavender-xlight)', color: '#6d4ec7' },
    lemon:    { background: 'var(--color-lemon-pale)',      color: '#5a5a18' },
    dark:     { background: 'rgba(213,191,255,0.15)',       color: 'var(--color-lavender-light)' },
    neutral:  { background: '#f0eef8',                       color: 'var(--color-fg-secondary)' },
    success:  { background: '#e0f0e2',                       color: '#3b6b40' },
    warn:     { background: '#fbf2dc',                       color: '#8a6a1e' },
    danger:   { background: '#f8e0e0',                       color: '#a14040' },
  };
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
      padding: '4px 10px', borderRadius: 9999,
      ...tones[tone], ...style,
    }}>{children}</span>
  );
};

const Field = ({ label, hint, children, required, style }) => (
  <label style={{ display: 'block', ...style }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-dark)', letterSpacing: '.01em' }}>
        {label}{required && <span style={{ color: 'var(--color-lavender-oil)', marginLeft: 4 }}>*</span>}
      </span>
      {hint && <span style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>{hint}</span>}
    </div>
    {children}
  </label>
);

const inputStyle = {
  width: '100%',
  border: '1.5px solid var(--color-lavender-xlight)',
  background: 'var(--color-bg-card)',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--color-near-black)',
  fontFamily: 'var(--font-primary)',
};

const Input = (props) => <input {...props} style={{ ...inputStyle, ...(props.style || {}) }} />;
const Select = (props) => <select {...props} style={{ ...inputStyle, ...(props.style || {}) }}>{props.children}</select>;
const Textarea = (props) => <textarea {...props} style={{ ...inputStyle, resize: 'vertical', ...(props.style || {}) }} />;

// Brand logo, plays the role of the VanJunge wordmark
const Logo = ({ onClick, dark, size = 18 }) => (
  <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', userSelect: 'none', display: 'flex', alignItems: 'baseline', gap: 0 }}>
    <span style={{ fontSize: size, fontWeight: 900, letterSpacing: '-0.03em', color: dark ? 'var(--color-lavender-bg)' : 'var(--color-near-black)' }}>VanJunge</span>
    <span style={{ fontSize: size, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--color-fg-secondary)', marginLeft: 4 }}>Akademie</span>
  </div>
);

// Minimal stroke icons, keep visual language calm
const Icon = ({ name, size = 16, color = 'currentColor', strokeWidth = 1.6 }) => {
  const paths = {
    arrow:        <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></>,
    arrowLeft:    <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/></>,
    check:        <polyline points="5 12 10 17 19 7"/>,
    dot:          <circle cx="12" cy="12" r="3" fill={color} stroke="none"/>,
    circle:       <circle cx="12" cy="12" r="8"/>,
    play:         <polygon points="8 5 19 12 8 19"/>,
    download:     <><path d="M12 4v12"/><polyline points="6 12 12 18 18 12"/><line x1="4" y1="20" x2="20" y2="20"/></>,
    calendar:     <><rect x="4" y="5" width="16" height="15" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="9" y1="3" x2="9" y2="7"/><line x1="15" y1="3" x2="15" y2="7"/></>,
    clock:        <><circle cx="12" cy="12" r="8"/><polyline points="12 7 12 12 16 14"/></>,
    user:         <><circle cx="12" cy="9" r="4"/><path d="M4 20c1-4 5-6 8-6s7 2 8 6"/></>,
    users:        <><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M14 20c0-2 2-4 5-4"/></>,
    chevron:      <polyline points="9 6 15 12 9 18"/>,
    chevronDown:  <polyline points="6 9 12 15 18 9"/>,
    chevronUp:    <polyline points="6 15 12 9 18 15"/>,
    book:         <><path d="M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 0-2 2V4z"/><path d="M5 19h12"/></>,
    badge:        <><circle cx="12" cy="9" r="5"/><polyline points="9 13 7 21 12 18 17 21 15 13"/></>,
    video:        <><rect x="3" y="6" width="14" height="12" rx="2"/><polygon points="17 10 22 7 22 17 17 14"/></>,
    edit:         <><path d="M4 20h4l11-11-4-4L4 16v4z"/></>,
    plus:         <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    settings:     <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2.1-1.6-2-3.5-2.4 1a7 7 0 0 0-2-1.1L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.1l-2.4-1-2 3.5 2.1 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2L3 14.8l2 3.5 2.4-1a7 7 0 0 0 2 1.1L10 21h4l.6-2.6a7 7 0 0 0 2-1.1l2.4 1 2-3.5-2.1-1.6c.1-.4.1-.8.1-1.2z"/></>,
    search:       <><circle cx="11" cy="11" r="6"/><line x1="15.5" y1="15.5" x2="20" y2="20"/></>,
    bell:         <><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2z"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    eye:          <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    link:         <><path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/></>,
    file:         <><path d="M14 4H6v16h12V8z"/><polyline points="14 4 14 8 18 8"/></>,
    grip:         <><circle cx="9" cy="6" r="1.5" fill={color} stroke="none"/><circle cx="9" cy="12" r="1.5" fill={color} stroke="none"/><circle cx="9" cy="18" r="1.5" fill={color} stroke="none"/><circle cx="15" cy="6" r="1.5" fill={color} stroke="none"/><circle cx="15" cy="12" r="1.5" fill={color} stroke="none"/><circle cx="15" cy="18" r="1.5" fill={color} stroke="none"/></>,
    lock:         <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    trash:        <><path d="M5 7h14"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M7 7l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12"/></>,
    copy:         <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></>,
    chart:        <><polyline points="4 18 9 13 13 16 20 8"/><polyline points="14 8 20 8 20 14"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
};

// Card primitive
const Card = ({ children, style, padding = 28, dark }) => (
  <div style={{
    background: dark ? 'var(--color-near-black)' : 'var(--color-bg-card)',
    color: dark ? 'var(--color-fg-on-dark)' : 'inherit',
    borderRadius: 16,
    padding,
    boxShadow: dark ? 'none' : '0 2px 14px rgba(180,142,249,0.10)',
    ...style,
  }}>{children}</div>
);

// Section heading w/ eyebrow
const SectionHead = ({ eyebrow, title, kicker, align = 'left', maxW, eyebrowColor, dark }) => (
  <div style={{ textAlign: align, maxWidth: maxW, margin: align === 'center' ? '0 auto' : undefined, marginBottom: 36 }}>
    {eyebrow && <Eyebrow color={eyebrowColor || (dark ? 'var(--color-lemon-light)' : 'var(--color-lavender-oil)')} style={{ marginBottom: 12 }}>{eyebrow}</Eyebrow>}
    <h2 style={{
      fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15,
      color: dark ? 'var(--color-lavender-bg)' : 'var(--color-near-black)',
      margin: 0,
    }}>{title}</h2>
    {kicker && <p style={{
      fontSize: 16, fontWeight: 500, lineHeight: 1.6, marginTop: 16,
      color: dark ? '#a09eac' : 'var(--color-fg-secondary)',
      maxWidth: 640, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0,
    }}>{kicker}</p>}
  </div>
);

// Container, constrains content width
const Container = ({ children, style, maxW = 1180 }) => (
  <div style={{ maxWidth: maxW, margin: '0 auto', padding: '0 32px', ...style }}>{children}</div>
);

// A subtle textured panel, used a lot in admin & dashboards
const SoftCard = ({ children, style, hover }) => (
  <div style={{
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 14,
    padding: 24,
    ...style,
  }}>{children}</div>
);

// Tiny avatar with initials fallback
const Avatar = ({ name, src, size = 36, ring }) => {
  const initials = (name || '?').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: src ? `center/cover no-repeat url(${src})` : 'var(--color-lavender-xlight)',
      color: 'var(--color-near-black)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700,
      boxShadow: ring ? '0 0 0 2px var(--color-bg-card), 0 0 0 4px var(--color-lavender-oil)' : undefined,
      flexShrink: 0,
    }}>
      {!src && initials}
    </div>
  );
};

// Progress bar
const Progress = ({ value, total, label, color = 'var(--color-lavender-oil)' }) => {
  const pct = Math.max(0, Math.min(100, (value / total) * 100));
  return (
    <div>
      {label && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, fontWeight: 600, color: 'var(--color-fg-secondary)' }}>
        <span>{label}</span><span>{value} / {total}</span>
      </div>}
      <div style={{ height: 6, background: 'var(--color-lavender-xlight)', borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: color, transition: 'width 400ms ease' }} />
      </div>
    </div>
  );
};

// Press strip, used on home + checkout trust
const PressStrip = ({ dark, label }) => (
  <div style={{ padding: '32px 0', borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--color-border)', borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--color-border)', background: dark ? 'transparent' : 'var(--color-bg-card)' }}>
    <Container>
      <Eyebrow color={dark ? 'var(--color-lavender-light)' : 'var(--color-fg-secondary)'} style={{ textAlign: 'center', marginBottom: 18 }}>
        {label || 'Bekannt aus'}
      </Eyebrow>
      <div style={{ display: 'flex', gap: 48, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', opacity: dark ? 0.6 : 0.5 }}>
        {[1,2,3,4,5,6].map(i => (
          <img key={i} src={`assets/press-${i}.png`} alt="" style={{ height: 24, width: 'auto', filter: dark ? 'invert(0.9) grayscale(100%)' : 'grayscale(100%)', objectFit: 'contain' }} />
        ))}
      </div>
    </Container>
  </div>
);

// Status dot, used in module lists
const StatusDot = ({ status }) => {
  const map = {
    done:     { bg: 'var(--color-lavender-xlight)', fg: 'var(--color-lavender-oil)', label: 'Abgeschlossen', icon: 'check' },
    current:  { bg: '#1e1e23',                       fg: 'var(--color-lemon-light)', label: 'Aktuell',        icon: 'play' },
    upcoming: { bg: 'transparent',                   fg: 'var(--color-fg-secondary)', label: 'Kommend',       icon: 'circle', border: true },
  };
  const cfg = map[status] || map.upcoming;
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: cfg.bg, color: cfg.fg,
      border: cfg.border ? '1.5px dashed var(--color-border)' : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }} title={cfg.label}>
      <Icon name={cfg.icon} size={cfg.icon === 'circle' ? 6 : 14} color={cfg.fg} strokeWidth={2.2} />
    </div>
  );
};

// Disclosure / accordion row
const Disclosure = ({ title, open, onToggle, children, meta, dark }) => (
  <div style={{
    borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--color-border)',
  }}>
    <button onClick={onToggle} style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 0', background: 'none', border: 'none', textAlign: 'left',
      color: dark ? 'var(--color-lavender-bg)' : 'var(--color-near-black)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
        <span style={{ fontSize: 16, fontWeight: 700 }}>{title}</span>
        {meta && <span style={{ fontSize: 12, color: 'var(--color-fg-secondary)', fontWeight: 500 }}>{meta}</span>}
      </div>
      <Icon name={open ? 'chevronUp' : 'chevronDown'} size={18} color="currentColor" />
    </button>
    {open && (
      <div style={{ paddingBottom: 22, paddingRight: 32, fontSize: 14, lineHeight: 1.7, color: dark ? '#a09eac' : 'var(--color-fg-secondary)' }}>
        {children}
      </div>
    )}
  </div>
);

// Dusk dawn gradient backdrop
const GradientBackdrop = ({ children, style, intense }) => (
  <div style={{
    background: intense ? 'var(--gradient-dusk-dawn-vivid)' : 'var(--gradient-dusk-dawn)',
    ...style,
  }}>{children}</div>
);

// Inline link
const InlineLink = ({ children, onClick, color }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none', padding: 0,
    color: color || 'var(--color-lavender-oil)',
    fontWeight: 700, fontSize: 'inherit', fontFamily: 'var(--font-primary)',
    textDecoration: 'underline', textDecorationThickness: '1.5px', textUnderlineOffset: '3px',
    cursor: 'pointer',
  }}>{children}</button>
);

Object.assign(window, {
  Eyebrow, Btn, Tag, Field, Input, Select, Textarea, Logo, Icon,
  Card, SoftCard, SectionHead, Container, Avatar, Progress,
  PressStrip, StatusDot, Disclosure, GradientBackdrop, InlineLink,
  inputStyle,
});
