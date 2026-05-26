// shells.jsx, Public, Learner, and Admin chrome (nav + footer)

// ─── Public top nav, scroll-aware, animated hover ──────────
const PublicNav = ({ go, route, authed }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Weiterbildungen', route: 'catalogue' },
    { label: 'Über VanJunge',   route: 'about' },
    { label: 'Referent:innen',  route: 'instructors' },
    { label: 'Kontakt',         route: 'contact' },
  ];
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
      height: scrolled ? 60 : 76,
      background: scrolled ? 'rgba(243,240,250,0.80)' : 'rgba(243,240,250,0.45)',
      backdropFilter: 'saturate(160%) blur(16px)',
      WebkitBackdropFilter: 'saturate(160%) blur(16px)',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'height 320ms cubic-bezier(.2,.8,.2,1), background 320ms ease, border-color 320ms ease',
    }}>
      <Logo onClick={() => go('home')} size={scrolled ? 16 : 18} />
      <ul style={{ display: 'flex', gap: 4, margin: 0, padding: 0, listStyle: 'none' }}>
        {links.map(l => {
          const active = route === l.route || (l.route === 'catalogue' && (route.startsWith('path-') || route.startsWith('format-')));
          return (
            <li key={l.route}>
              <button onClick={() => go(l.route)} className="vj-link" style={{
                fontSize: 13.5, fontWeight: 500,
                color: active ? 'var(--color-near-black)' : 'var(--color-dark)',
                padding: '8px 14px', borderRadius: 9999,
                background: active ? 'rgba(255,255,255,0.6)' : 'transparent',
                transition: 'background 240ms ease, color 240ms ease',
              }}>{l.label}</button>
            </li>
          );
        })}
      </ul>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {authed ? (
          <Magnetic strength={0.18}><Btn size="sm" variant="primary" onClick={() => go('dashboard')}>Meine Weiterbildung</Btn></Magnetic>
        ) : (
          <>
            <button onClick={() => go('login')} className="vj-link" style={{
              fontSize: 13, fontWeight: 600,
              color: 'var(--color-dark)', padding: '8px 4px',
            }}>Anmelden</button>
            <Magnetic strength={0.18}>
              <Btn size="sm" variant="primary" onClick={() => go('register')}>Registrieren</Btn>
            </Magnetic>
          </>
        )}
      </div>
    </nav>
  );
};

// ─── Public footer ───────────────────────────────────────────
const PublicFooter = ({ go }) => (
  <footer style={{
    background: 'var(--color-near-black)', color: 'var(--color-fg-on-dark)',
    padding: '96px 0 32px', position: 'relative', overflow: 'hidden',
  }}>
    {/* Oversized backdrop word */}
    <div aria-hidden style={{
      position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
      fontSize: 'clamp(180px, 22vw, 360px)', fontWeight: 900,
      letterSpacing: '-0.06em', lineHeight: 0.8,
      color: 'transparent', WebkitTextStroke: '1px rgba(213,191,255,0.07)',
      whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
    }}>VanJunge</div>

    <Container style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 56 }}>
        <div>
          <Logo dark size={22} />
          <p style={{ fontSize: 14, fontWeight: 500, color: '#a09eac', lineHeight: 1.7, marginTop: 22, maxWidth: 320 }}>
            Kuratierte Weiterbildung für alle, die andere Menschen begleiten, psychologisch fundiert, wissenschaftlich verantwortet, professionell entwickelt.
          </p>
          <div style={{ display: 'flex', gap: 20, marginTop: 28 }}>
            {['LinkedIn', 'Instagram', 'Newsletter'].map(l => (
              <a key={l} href="#" className="vj-link" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-lavender-light)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
        {[
          { title: 'Weiterbildung', items: [
            ['VanJunge Essential', () => go('path-essential')],
            ['VanJunge Professional', () => go('path-professional')],
            ['VanJunge Expert', () => go('path-expert')],
            ['Einzelformate', () => go('catalogue')],
          ]},
          { title: 'Akademie', items: [
            ['Über VanJunge', () => go('about')],
            ['Referent:innen', () => go('instructors')],
            ['Kontakt', () => go('contact')],
            ['FAQ', () => go('faq')],
          ]},
          { title: 'Rechtliches', items: [
            ['Impressum', () => {}],
            ['Datenschutz', () => {}],
            ['AGB', () => {}],
            ['Widerrufsrecht', () => {}],
          ]},
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-fg-secondary)', marginBottom: 20 }}>{col.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {col.items.map(([label, fn]) => (
                <button key={label} onClick={fn} className="vj-link" style={{
                  textAlign: 'left',
                  fontSize: 13.5, fontWeight: 500, color: '#cdc8d8',
                }}>{label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 72, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontSize: 12, color: 'var(--color-fg-secondary)' }}>© 2026 VanJunge Akademie · Miriam Junge</span>
        <span style={{ fontSize: 12, color: 'var(--color-fg-secondary)' }}>Preise netto zzgl. ges. MwSt., Rechnung an Geschäfts- und Privatkund:innen.</span>
      </div>
    </Container>
  </footer>
);

const PublicShell = ({ children, go, route, authed }) => (
  <div>
    <ScrollProgress />
    <PublicNav go={go} route={route} authed={authed} />
    <main>{children}</main>
    <PublicFooter go={go} />
  </div>
);

// ─── Learner shell ───────────────────────────────────────────
const LearnerNav = ({ go, route }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { label: 'Meine Weiterbildung', route: 'dashboard',  icon: 'chart' },
    { label: 'Kurse-Katalog',       route: 'catalogue',  icon: 'book' },
    { label: 'Account',             route: 'account',    icon: 'user' },
  ];
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
      height: scrolled ? 60 : 72,
      background: scrolled ? 'rgba(255,255,255,0.82)' : 'var(--color-bg-card)',
      backdropFilter: 'saturate(160%) blur(16px)',
      WebkitBackdropFilter: 'saturate(160%) blur(16px)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'height 320ms cubic-bezier(.2,.8,.2,1), background 320ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <Logo onClick={() => go('dashboard')} size={scrolled ? 16 : 18} />
        <div style={{ width: 1, height: 22, background: 'var(--color-border)' }} />
        <Tag tone="lavender" style={{ fontSize: 10 }}>Lernbereich</Tag>
      </div>
      <ul style={{ display: 'flex', gap: 4, margin: 0, padding: 0, listStyle: 'none' }}>
        {links.map(l => {
          const active = route === l.route || (l.route === 'dashboard' && ['path-overview', 'module-live', 'module-recording'].includes(route));
          return (
            <li key={l.route}>
              <button onClick={() => go(l.route)} style={{
                background: active ? 'var(--color-lavender-xlight)' : 'transparent',
                color: active ? 'var(--color-near-black)' : 'var(--color-fg-secondary)',
                border: 'none', borderRadius: 9999,
                padding: '8px 18px', fontSize: 13, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                transition: 'all 240ms ease',
              }}>
                <Icon name={l.icon} size={15} />
                {l.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button className="vj-icon-btn" style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--color-fg-secondary)',
          position: 'relative',
        }}>
          <Icon name="bell" size={16} />
          <span style={{
            position: 'absolute', top: 8, right: 9,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--color-lavender-oil)',
            boxShadow: '0 0 0 2px var(--color-bg-card)',
            animation: 'vj-pulse 2.4s ease-in-out infinite',
          }} />
        </button>
        <button onClick={() => go('account')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={VJ.user.name} size={36} ring />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-near-black)' }}>{VJ.user.firstName}</div>
            <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>{VJ.user.field}</div>
          </div>
        </button>
      </div>
    </nav>
  );
};

const LearnerShell = ({ children, go, route }) => (
  <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
    <LearnerNav go={go} route={route} />
    <main>{children}</main>
  </div>
);

// ─── Admin shell ─────────────────────────────────────────────
const AdminSidebar = ({ go, route }) => {
  const groups = [
    { title: 'Kuration', items: [
      ['admin',           'Dashboard',       'chart'],
      ['admin-courses',   'Kurse & Pfade',   'book'],
      ['admin-modules',   'Module',          'video'],
      ['admin-instructors', 'Referent:innen', 'users'],
    ]},
    { title: 'Teilnehmende', items: [
      ['admin-participants', 'Teilnehmer:innen', 'user'],
      ['admin-orders',       'Bestellungen',     'file'],
    ]},
    { title: 'System', items: [
      ['admin-settings', 'Einstellungen', 'settings'],
    ]},
  ];
  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: 'var(--color-near-black)',
      color: 'var(--color-fg-on-dark)',
      padding: '20px 0',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, height: '100vh', overflow: 'auto',
    }}>
      <div style={{ padding: '4px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-lavender-bg)' }}>VanJunge</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-lemon-light)', marginLeft: 8 }}>Admin</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '0 12px' }}>
        {groups.map(g => (
          <div key={g.title} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#656785', padding: '0 12px', marginBottom: 8 }}>{g.title}</div>
            {g.items.map(([r, label, icon]) => {
              const active = route === r || (r === 'admin-courses' && ['admin-course-edit'].includes(route)) || (r === 'admin-modules' && ['admin-module-edit'].includes(route));
              return (
                <button key={r} onClick={() => go(r)} style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 8,
                  background: active ? 'rgba(213,191,255,0.10)' : 'transparent',
                  color: active ? 'var(--color-lavender-light)' : '#cdc8d8',
                  border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 500,
                  marginBottom: 2,
                }}>
                  <Icon name={icon} size={15} color={active ? 'var(--color-lavender-light)' : '#a09eac'} />
                  {label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name="Miriam Junge" src="assets/photo-miriam.jpg" size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-lavender-bg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Miriam Junge</div>
            <div style={{ fontSize: 10.5, color: '#656785' }}>Gründerin · Kuratorin</div>
          </div>
        </div>
        <button onClick={() => go('home')} style={{
          marginTop: 12, width: '100%', background: 'transparent', color: '#a09eac',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
          padding: '7px 10px', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
        }}>Zur Website</button>
      </div>
    </aside>
  );
};

const AdminTopBar = ({ title, kicker, breadcrumb, actions }) => (
  <div style={{
    background: 'var(--color-bg-card)',
    borderBottom: '1px solid var(--color-border)',
    padding: '20px 36px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <div>
      {breadcrumb && <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>{breadcrumb}</div>}
      <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-near-black)' }}>{title}</h1>
      {kicker && <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 2 }}>{kicker}</div>}
    </div>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{actions}</div>
  </div>
);

const AdminShell = ({ children, go, route }) => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f5fb' }}>
    <AdminSidebar go={go} route={route} />
    <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
  </div>
);

Object.assign(window, { PublicShell, LearnerShell, AdminShell, AdminTopBar });
