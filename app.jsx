// app.jsx, Router, screen overview palette, App entry

const PUBLIC_ROUTES = new Set([
  'home', 'catalogue', 'path-essential', 'path-professional', 'path-expert',
  'format-fragetechniken', 'format-widerstand', 'format-systemisch', 'format-fallarbeit',
  'format-fuehrungspsych', 'format-team',
  'about', 'instructors', 'contact', 'faq',
]);

const AUTH_ROUTES = new Set(['register', 'login', 'checkout']);

const LEARNER_ROUTES = new Set([
  'dashboard', 'path-overview', 'module-live', 'module-recording', 'account',
]);

const ADMIN_ROUTES = new Set([
  'admin', 'admin-courses', 'admin-course-edit', 'admin-module-edit',
  'admin-modules', 'admin-instructors', 'admin-participants', 'admin-orders', 'admin-settings',
]);

const App = () => {
  const [route, setRoute] = React.useState(() => {
    const h = window.location.hash.replace('#', '');
    return h || 'home';
  });
  const [authed, setAuthed] = React.useState(false);

  const go = React.useCallback((r) => {
    setRoute(r);
    window.location.hash = r;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Render screen content
  const renderScreen = () => {
    // Public marketing
    if (route === 'home')        return <HomePage go={go} />;
    if (route === 'catalogue')   return <CataloguePage go={go} />;
    if (route.startsWith('path-') && !route.includes('overview')) {
      const id = route.replace('path-', '');
      return <PathDetailPage go={go} pathId={id} />;
    }
    if (route.startsWith('format-')) {
      const id = route.replace('format-', '');
      return <FormatDetailPage go={go} formatId={id} />;
    }
    if (route === 'about')       return <AboutPage go={go} />;
    if (route === 'instructors') return <InstructorsPage />;
    if (route === 'contact')     return <ContactPage />;
    if (route === 'faq')         return <FaqPage />;

    // Auth & checkout
    if (route === 'register')    return <RegisterPage go={go} setAuthed={setAuthed} />;
    if (route === 'login')       return <LoginPage go={go} setAuthed={setAuthed} />;
    if (route === 'checkout')    return <CheckoutPage go={go} setAuthed={setAuthed} />;

    // Learner
    if (route === 'dashboard')       return <DashboardPage go={go} />;
    if (route === 'path-overview')   return <PathOverviewPage go={go} />;
    if (route === 'module-live')     return <LiveModulePage go={go} />;
    if (route === 'module-recording')return <RecordingModulePage go={go} />;
    if (route === 'account')         return <AccountPage go={go} setAuthed={setAuthed} />;

    // Admin
    if (route === 'admin')            return <AdminDashboardPage go={go} />;
    if (route === 'admin-courses')    return <AdminCoursesPage go={go} />;
    if (route === 'admin-course-edit')return <AdminCourseEditPage go={go} />;
    if (route === 'admin-module-edit')return <AdminModuleEditPage go={go} />;
    // Stubbed admin secondary pages, gentle placeholders so nav links work
    if (ADMIN_ROUTES.has(route))      return <AdminStub go={go} route={route} />;

    return <HomePage go={go} />;
  };

  const wrap = () => {
    if (ADMIN_ROUTES.has(route)) {
      return <AdminShell go={go} route={route}>{renderScreen()}</AdminShell>;
    }
    if (LEARNER_ROUTES.has(route)) {
      // Learner shell, also handles 'catalogue' from inside? No, catalogue is public.
      return <LearnerShell go={go} route={route}>{renderScreen()}</LearnerShell>;
    }
    if (AUTH_ROUTES.has(route)) {
      // Auth pages render full-bleed with their own slim chrome
      if (route === 'checkout') return renderScreen();
      // Login/Register still get the public nav above
      return (
        <div>
          <PublicShell go={go} route={route} authed={authed}>
            {renderScreen()}
          </PublicShell>
        </div>
      );
    }
    // Public
    return (
      <PublicShell go={go} route={route} authed={authed}>
        {renderScreen()}
      </PublicShell>
    );
  };

  return (
    <>
      {wrap()}
      <ScreenJumper route={route} go={go} authed={authed} setAuthed={setAuthed} />
    </>
  );
};

// ─── Admin stub for secondary admin pages ────────────────────
const AdminStub = ({ go, route }) => {
  const titles = {
    'admin-modules':      ['Module', 'Übersicht aller Module quer durch Pfade und Einzelformate.'],
    'admin-instructors':  ['Referent:innen', 'Profile, Honorare, gebuchte Module.'],
    'admin-participants': ['Teilnehmer:innen', 'Aktive Konten, Kohorten-Zuordnungen, Kommunikation.'],
    'admin-orders':       ['Bestellungen', 'Alle Zahlungen, Rechnungen und Rückerstattungen.'],
    'admin-settings':     ['Einstellungen', 'Akademie-weite Konfiguration: MwSt., Stripe, E-Mail-Templates.'],
  };
  const [t, sub] = titles[route] || ['', ''];
  return (
    <div>
      <AdminTopBar title={t} kicker={sub} />
      <div style={{ padding: 36 }}>
        <SoftCard padding={56} style={{ textAlign: 'center' }}>
          <Icon name="settings" size={28} color="var(--color-fg-secondary)" />
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 14 }}>{t}</div>
          <div style={{ fontSize: 13, color: 'var(--color-fg-secondary)', marginTop: 6, maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
            Diese Sektion zeigt im Prototyp den Sidebar-Eintrag, die Detail-Ansicht ist nicht Teil dieses Bausatzes.
          </div>
          <div style={{ marginTop: 18 }}>
            <Btn variant="secondary" size="sm" onClick={() => go('admin')}>Zurück zum Dashboard</Btn>
          </div>
        </SoftCard>
      </div>
    </div>
  );
};

// ─── Screen jumper, prototype-only ──────────────────────────
// Shows the 16-screen map so a reviewer can hop around without
// following the click flow each time.
const ScreenJumper = ({ route, go, authed, setAuthed }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const groups = [
    { title: 'Marketing, öffentlich', items: [
      ['home',                 '01 Homepage'],
      ['catalogue',            '02 Weiterbildungen / Katalog'],
      ['path-professional',    '03 Pfad-Detail (Professional)'],
      ['format-fragetechniken','04 Einzelformat-Detail'],
    ]},
    { title: 'Auth & Checkout', items: [
      ['register', '05 Registrierung'],
      ['login',    '06 Anmelden'],
      ['checkout', '07 Checkout'],
    ]},
    { title: 'Lernbereich', items: [
      ['dashboard',         '08 Meine Weiterbildung'],
      ['path-overview',     '09 Pfad-Module Übersicht'],
      ['module-live',       '10 Modul (Live-Session)'],
      ['module-recording',  '11 Modul (Aufzeichnung)'],
      ['account',           '12 Account / Profil'],
    ]},
    { title: 'Admin', items: [
      ['admin',             '13 Admin Dashboard'],
      ['admin-courses',     '14 Admin: Kurse & Pfade'],
      ['admin-course-edit', '15 Admin: Kurs bearbeiten'],
      ['admin-module-edit', '16 Admin: Modul bearbeiten'],
    ]},
  ];

  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 999,
        background: 'var(--color-near-black)', color: 'var(--color-lavender-bg)',
        border: '1px solid rgba(213,191,255,0.18)',
        borderRadius: 9999, padding: '12px 18px',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 12.5, fontWeight: 700, fontFamily: 'inherit',
        cursor: 'pointer', boxShadow: '0 12px 32px rgba(48,47,56,0.32)',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-lemon-light)' }} />
        Prototyp-Map
        <span style={{ fontSize: 10, color: '#a09eac', padding: '2px 6px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, fontFamily: 'monospace' }}>⌘K</span>
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(30,30,35,0.5)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxWidth: 880, maxHeight: '85vh', overflow: 'auto',
            background: 'var(--color-bg-card)', borderRadius: 18,
            boxShadow: '0 32px 80px rgba(0,0,0,0.32)',
            padding: 32,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-lavender-oil)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 4 }}>Prototyp · 16 Bildschirme</div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>VanJunge Akademie, Screen-Map</div>
                <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 6 }}>
                  Folge dem Klickpfad ab Homepage, oder springe direkt zu einem Bildschirm.
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                width: 32, height: 32, borderRadius: 8, background: 'var(--color-bg)',
                border: '1px solid var(--color-border)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, color: 'var(--color-fg-secondary)',
              }}>×</button>
            </div>

            <div style={{
              padding: '14px 16px', background: 'var(--color-lavender-xlight)',
              borderRadius: 10, fontSize: 12.5, lineHeight: 1.6, marginBottom: 22,
              display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            }}>
              <span style={{ fontWeight: 700 }}>Klickpfad:</span>
              <span>Home → Katalog → Professional → Checkout → Lernbereich → Modul (live) → Modul (Aufzeichnung) → Account → Admin → Kurs → Modul.</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button onClick={() => { setAuthed(!authed); }} style={{
                  background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                  borderRadius: 8, padding: '5px 10px', fontSize: 11.5, fontWeight: 700, cursor: 'pointer',
                }}>{authed ? 'Abmelden' : 'Eingeloggt simulieren'}</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
              {groups.map(g => (
                <div key={g.title}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-fg-secondary)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>{g.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {g.items.map(([r, label]) => {
                      const active = route === r;
                      return (
                        <button key={r} onClick={() => { go(r); setOpen(false); }} style={{
                          background: active ? 'var(--color-near-black)' : 'var(--color-bg)',
                          color: active ? 'var(--color-lavender-bg)' : 'var(--color-near-black)',
                          border: 'none', borderRadius: 10,
                          padding: '11px 14px', textAlign: 'left',
                          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                          display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: active ? 'var(--color-lemon-light)' : 'var(--color-lavender-oil)' }}>{label.split(' ')[0]}</span>
                          <span>{label.split(' ').slice(1).join(' ')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
