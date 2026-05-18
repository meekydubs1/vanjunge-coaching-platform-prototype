// admin.jsx — Admin dashboard, courses list, course edit, module edit

// ─── Admin Dashboard ─────────────────────────────────────────
const AdminDashboardPage = ({ go }) => (
  <div className="route-fade">
    <AdminTopBar
      title="Dashboard"
      kicker="Übersicht über aktuelle Kohorten, Umsatz und nächste Termine."
      actions={
        <>
          <Btn variant="secondary" size="sm"><Icon name="download" size={13} /> Export</Btn>
          <Btn variant="primary" size="sm" onClick={() => go('admin-course-edit')}><Icon name="plus" size={14} /> Neuer Kurs</Btn>
        </>
      }
    />
    <div style={{ padding: 36 }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 28 }}>
        {[
          { label: 'Aktive Teilnehmer:innen',  value: '124', delta: '+12 ggü. Vormonat', icon: 'users', tone: 'lavender' },
          { label: 'Umsatz Mai 2026',           value: '38.420 €', delta: '+18 % MoM', icon: 'chart',  tone: 'lemon' },
          { label: 'Kommende Live-Sessions',   value: '7',     delta: 'in den nächsten 14 T.', icon: 'video', tone: 'lavender' },
          { label: 'Neue Anmeldungen / Woche', value: '11',    delta: 'davon 6 für Professional', icon: 'user', tone: 'lavender' },
        ].map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Activity feed */}
        <SoftCard padding={0}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Aktuelle Aktivität</div>
              <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)', marginTop: 2 }}>Live · Letzte 24 Stunden</div>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-fg-secondary)', fontSize: 12, fontWeight: 700 }}>
              Alle ansehen →
            </button>
          </div>
          <div>
            {VJ.adminActivity.map((a, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: 'auto 100px 1fr',
                gap: 14, padding: '14px 24px',
                borderBottom: i === VJ.adminActivity.length - 1 ? 'none' : '1px solid var(--color-border)',
                alignItems: 'center',
              }}>
                <ActivityDot type={a.type} />
                <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)' }}>{a.time}</div>
                <div style={{ fontSize: 13.5, color: 'var(--color-dark)', lineHeight: 1.5 }}>{a.text}</div>
              </div>
            ))}
          </div>
        </SoftCard>

        {/* Right rail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Schnellaktionen */}
          <SoftCard padding={22}>
            <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 14 }}>Schnellaktionen</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <QuickAction icon="plus" label="Neuen Kurs anlegen" onClick={() => go('admin-course-edit')} />
              <QuickAction icon="video" label="Neues Modul" onClick={() => go('admin-module-edit')} />
              <QuickAction icon="users" label="Referent:in einladen" />
              <QuickAction icon="chart" label="Veröffentlichen-Übersicht" onClick={() => go('admin-courses')} />
            </div>
          </SoftCard>

          {/* Next sessions */}
          <SoftCard padding={22}>
            <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 14 }}>Nächste Live-Sessions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Widerstand &amp; Krisen', 'Heute · 19:00', '16 TN', 'Miriam Junge'],
                ['Fragetechniken (Workshop)', '14. Juni · 14:00', '12 TN', 'Miriam Junge'],
                ['Systemisches Coaching', '18. Juni · 19:00', '22 TN', 'Theresa Hoff'],
              ].map(([t, when, tn, who]) => (
                <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-lavender-oil)', marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }} dangerouslySetInnerHTML={{ __html: t }} />
                    <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', marginTop: 2 }}>{when} · {tn} · {who}</div>
                  </div>
                </div>
              ))}
            </div>
          </SoftCard>

          {/* Revenue chart placeholder */}
          <SoftCard padding={22}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)', fontWeight: 600 }}>UMSATZ · 6 MONATE</div>
                <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>184.310 €</div>
              </div>
              <Tag tone="success">+22 %</Tag>
            </div>
            <RevenueSpark />
          </SoftCard>
        </div>
      </div>
    </div>
  </div>
);

const KpiCard = ({ label, value, delta, icon, tone }) => (
  <SoftCard padding={22} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 130 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: tone === 'lemon' ? 'var(--color-lemon-pale)' : 'var(--color-lavender-xlight)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={14} color={tone === 'lemon' ? '#7d6a18' : 'var(--color-lavender-oil)'} />
      </div>
    </div>
    <div>
      <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em' }}>{value}</div>
      <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', marginTop: 4 }}>{delta}</div>
    </div>
  </SoftCard>
);

const ActivityDot = ({ type }) => {
  const map = {
    signup:  { bg: 'var(--color-lavender-xlight)', fg: 'var(--color-lavender-oil)', icon: 'user' },
    payment: { bg: '#e0f0e2',                        fg: '#3b6b40',                    icon: 'check' },
    session: { bg: 'var(--color-lemon-pale)',        fg: '#7d6a18',                    icon: 'video' },
    message: { bg: '#f0eef8',                        fg: 'var(--color-fg-secondary)',   icon: 'edit' },
    publish: { bg: '#fbf2dc',                        fg: '#8a6a1e',                    icon: 'check' },
  };
  const cfg = map[type] || map.message;
  return (
    <div style={{
      width: 30, height: 30, borderRadius: '50%',
      background: cfg.bg, color: cfg.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Icon name={cfg.icon} size={14} color={cfg.fg} strokeWidth={2.2} />
    </div>
  );
};

const QuickAction = ({ icon, label, onClick }) => (
  <button onClick={onClick} style={{
    background: 'var(--color-bg)', border: '1px solid var(--color-border)',
    borderRadius: 10, padding: '10px 14px',
    display: 'flex', alignItems: 'center', gap: 10,
    cursor: 'pointer', fontFamily: 'inherit',
    fontSize: 13, fontWeight: 600, color: 'var(--color-dark)',
    width: '100%', textAlign: 'left',
  }}>
    <Icon name={icon} size={15} color="var(--color-lavender-oil)" />
    <span style={{ flex: 1 }}>{label}</span>
    <Icon name="chevron" size={13} color="var(--color-fg-secondary)" />
  </button>
);

const RevenueSpark = () => {
  // simple SVG sparkline
  const points = [40, 36, 48, 44, 58, 62, 70, 66, 80, 78, 92, 96];
  const width = 240, height = 60, max = 100;
  const step = width / (points.length - 1);
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${height - (p / max) * height}`).join(' ');
  const areaD = pathD + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="rg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-lavender-oil)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-lavender-oil)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#rg)" />
      <path d={pathD} fill="none" stroke="var(--color-lavender-oil)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ─── Admin: Courses list ─────────────────────────────────────
const AdminCoursesPage = ({ go }) => {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('Alle');
  const [sel, setSel] = React.useState(new Set());

  const filtered = VJ.adminCourses.filter(c => {
    if (filter === 'Pfade' && c.type !== 'Pfad') return false;
    if (filter === 'Einzelformate' && c.type !== 'Einzelformat') return false;
    if (filter === 'Entwürfe' && c.status !== 'Entwurf') return false;
    if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const toggle = (id) => {
    setSel(s => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  return (
    <div className="route-fade">
      <AdminTopBar
        title="Kurse & Pfade"
        kicker={`${VJ.adminCourses.length} Einträge · ${VJ.adminCourses.filter(c => c.status === 'Veröffentlicht').length} veröffentlicht · ${VJ.adminCourses.filter(c => c.status === 'Entwurf').length} Entwürfe`}
        actions={<Btn variant="primary" size="sm" onClick={() => go('admin-course-edit')}><Icon name="plus" size={14} /> Neuen Kurs anlegen</Btn>}
      />
      <div style={{ padding: 36 }}>
        {/* Filter bar */}
        <SoftCard padding={0} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 280 }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-fg-secondary)' }}>
                  <Icon name="search" size={14} />
                </span>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Kurs suchen…" style={{
                  ...inputStyle, paddingLeft: 36, fontSize: 13,
                }} />
              </div>
              <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--color-bg)', borderRadius: 9999, border: '1px solid var(--color-border)' }}>
                {['Alle', 'Pfade', 'Einzelformate', 'Entwürfe'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{
                    background: filter === f ? 'var(--color-near-black)' : 'transparent',
                    color: filter === f ? 'var(--color-lavender-bg)' : 'var(--color-fg-secondary)',
                    border: 'none', borderRadius: 9999, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  }}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {sel.size > 0 ? (
                <>
                  <span style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', padding: '8px 0' }}>{sel.size} ausgewählt</span>
                  <Btn variant="secondary" size="sm">Veröffentlichen</Btn>
                  <Btn variant="ghost" size="sm" onClick={() => setSel(new Set())}>Auswahl aufheben</Btn>
                </>
              ) : (
                <Btn variant="ghost" size="sm"><Icon name="download" size={13} /> Export CSV</Btn>
              )}
            </div>
          </div>
        </SoftCard>

        {/* Table */}
        <SoftCard padding={0}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--color-bg)' }}>
                {['', 'Titel', 'Typ', 'Preis (netto)', 'Status', 'TN', 'Letzte Änderung', ''].map((h, i) => (
                  <th key={i} style={{
                    textAlign: i === 5 ? 'right' : 'left',
                    padding: '14px 16px',
                    fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
                    color: 'var(--color-fg-secondary)',
                    borderBottom: '1px solid var(--color-border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <input type="checkbox" checked={sel.has(c.id)} onChange={() => toggle(c.id)} style={{ accentColor: 'var(--color-lavender-oil)' }} />
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => go('admin-course-edit')} style={{
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      fontSize: 14, fontWeight: 700, color: 'var(--color-near-black)', textAlign: 'left',
                    }}>{c.title}</button>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Tag tone={c.type === 'Pfad' ? 'lavender' : 'neutral'}>{c.type}</Tag>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{VJ.priceFmt(c.price)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <Tag tone={c.status === 'Veröffentlicht' ? 'success' : 'warn'}>{c.status}</Tag>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--color-fg-secondary)' }}>{c.tn}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--color-fg-secondary)', fontSize: 12 }}>{c.updated}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                      <IconBtn icon="edit"  label="Bearbeiten"   onClick={() => go('admin-course-edit')} />
                      <IconBtn icon="copy"  label="Duplizieren" />
                      <IconBtn icon="eye"   label={c.status === 'Veröffentlicht' ? 'Verstecken' : 'Veröffentlichen'} />
                      <IconBtn icon="trash" label="Löschen" tone="danger" />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} style={{ padding: 48, textAlign: 'center', color: 'var(--color-fg-secondary)' }}>
                  Nichts gefunden. <InlineLink onClick={() => { setQuery(''); setFilter('Alle'); }}>Filter zurücksetzen</InlineLink>
                </td></tr>
              )}
            </tbody>
          </table>
        </SoftCard>
      </div>
    </div>
  );
};

const IconBtn = ({ icon, label, onClick, tone }) => (
  <button onClick={onClick} title={label} style={{
    width: 30, height: 30, borderRadius: 8,
    background: 'transparent', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: tone === 'danger' ? '#a14040' : 'var(--color-fg-secondary)',
  }}
    onMouseEnter={e => e.currentTarget.style.background = tone === 'danger' ? '#f8e0e0' : 'var(--color-lavender-xlight)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <Icon name={icon} size={14} color="currentColor" />
  </button>
);

// ─── Admin: Course edit ──────────────────────────────────────
const AdminCourseEditPage = ({ go }) => {
  const [title, setTitle] = React.useState('VanJunge Professional');
  const [slug, setSlug] = React.useState('vanjunge-professional');
  const [published, setPublished] = React.useState(true);
  const [modules, setModules] = React.useState(VJ.professionalModules);
  const [dragId, setDragId] = React.useState(null);
  const [dragOver, setDragOver] = React.useState(null);

  const onDrop = (toId) => {
    if (!dragId || dragId === toId) return;
    setModules(ms => {
      const fromIdx = ms.findIndex(m => m.id === dragId);
      const toIdx = ms.findIndex(m => m.id === toId);
      const next = [...ms];
      const [item] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, item);
      return next.map((m, i) => ({ ...m, n: i + 1 }));
    });
    setDragId(null); setDragOver(null);
  };

  return (
    <div className="route-fade">
      <AdminTopBar
        title={title || 'Neuer Kurs'}
        breadcrumb={<>
          <button onClick={() => go('admin-courses')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-fg-secondary)', cursor: 'pointer', fontSize: 11 }}>Kurse</button>
          <span>/</span>
          <span>Bearbeiten</span>
        </>}
        actions={
          <>
            <Btn variant="ghost" size="sm">Vorschau</Btn>
            <Btn variant="secondary" size="sm">Entwurf speichern</Btn>
            <Btn variant="primary" size="sm">{published ? 'Aktualisieren' : 'Veröffentlichen'}</Btn>
          </>
        }
      />
      <div style={{ padding: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'flex-start' }}>
          {/* Main form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <SoftCard padding={28}>
              <SectionLabel>Grunddaten</SectionLabel>
              <div style={{ display: 'grid', gap: 16, marginTop: 18 }}>
                <Field label="Titel" required>
                  <Input value={title} onChange={e => setTitle(e.target.value)} />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 0.4fr', gap: 14 }}>
                  <Field label="Slug (URL)" hint="vanjunge.de/p/…">
                    <Input value={slug} onChange={e => setSlug(e.target.value)} />
                  </Field>
                  <Field label="Typ">
                    <Select defaultValue="Pfad">
                      <option>Pfad</option><option>Einzelformat</option>
                    </Select>
                  </Field>
                </div>
                <Field label="Kurzbeschreibung" hint="max. 220 Zeichen — Katalog & Karte">
                  <Textarea rows={2} defaultValue="Acht Live-Webinare und ein Praxis-Workshop. Du arbeitest in einer überschaubaren Kohorte an realen Fällen." />
                </Field>
                <Field label="Langbeschreibung">
                  <div style={{
                    border: '1.5px solid var(--color-lavender-xlight)', borderRadius: 10,
                    background: 'var(--color-bg-card)',
                  }}>
                    <RichTextToolbar />
                    <div style={{
                      padding: '14px 16px', minHeight: 120, fontSize: 14, fontWeight: 500, color: 'var(--color-near-black)', lineHeight: 1.7,
                    }} contentEditable suppressContentEditableWarning>
                      <p>Dieser Pfad ist für alle, die <strong>psychologische Tiefe</strong> ohne Esoterik suchen.</p>
                      <p>Du arbeitest live mit einer festen Kohorte und lernst Methoden, die Miriam Junge selbst seit 20 Jahren einsetzt.</p>
                    </div>
                  </div>
                </Field>
              </div>
            </SoftCard>

            <SoftCard padding={28}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <SectionLabel>Module</SectionLabel>
                <span style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)' }}>{modules.length} Module · zum Sortieren ziehen</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 14 }}>
                {modules.map(m => (
                  <div key={m.id}
                    draggable
                    onDragStart={() => setDragId(m.id)}
                    onDragOver={e => { e.preventDefault(); setDragOver(m.id); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={() => onDrop(m.id)}
                    style={{
                      display: 'grid', gridTemplateColumns: 'auto auto 1fr auto auto',
                      gap: 14, padding: '12px 14px',
                      background: dragOver === m.id ? 'var(--color-lavender-xlight)' : (dragId === m.id ? 'transparent' : 'var(--color-bg)'),
                      border: '1px solid var(--color-border)',
                      borderRadius: 10, marginBottom: 8,
                      opacity: dragId === m.id ? 0.4 : 1,
                      cursor: 'grab',
                      alignItems: 'center',
                    }}
                  >
                    <Icon name="grip" size={16} color="var(--color-fg-secondary)" />
                    <div style={{
                      width: 26, height: 26, borderRadius: 6, background: 'var(--color-lavender-xlight)',
                      color: 'var(--color-lavender-oil)', fontSize: 11, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{m.n}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700 }}>{m.title}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', marginTop: 2 }}>{m.type} · {m.date} · {m.instructor}</div>
                    </div>
                    <Tag tone="neutral">{m.duration}</Tag>
                    <div style={{ display: 'flex', gap: 2 }}>
                      <IconBtn icon="edit" label="Bearbeiten" onClick={() => go('admin-module-edit')} />
                      <IconBtn icon="trash" label="Entfernen" tone="danger" />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => go('admin-module-edit')} style={{
                width: '100%', padding: '14px',
                background: 'transparent', border: '1.5px dashed var(--color-lavender-light)',
                borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 13.5, fontWeight: 700, color: 'var(--color-lavender-oil)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                marginTop: 4,
              }}>
                <Icon name="plus" size={14} /> Modul hinzufügen
              </button>
            </SoftCard>

            <SoftCard padding={28}>
              <SectionLabel>Preis & MwSt-Behandlung</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 18 }}>
                <Field label="Preis (netto)"><Input defaultValue="1390" /></Field>
                <Field label="MwSt-Satz">
                  <Select defaultValue="19">
                    <option value="19">19 % (Standard)</option>
                    <option value="7">7 %</option>
                    <option value="0">0 % (Bildung — falls anwendbar)</option>
                  </Select>
                </Field>
                <Field label="Währung"><Select defaultValue="EUR"><option>EUR</option></Select></Field>
              </div>
              <div style={{ marginTop: 14, padding: 14, background: 'var(--color-bg)', borderRadius: 10, fontSize: 12.5, color: 'var(--color-fg-secondary)' }}>
                Brutto-Anzeige auf öffentlicher Seite: <strong style={{ color: 'var(--color-near-black)' }}>1.654 €</strong> (netto 1.390 € + 19 % MwSt.)
              </div>
            </SoftCard>

            <SoftCard padding={28}>
              <SectionLabel>Zielgruppen & Tags</SectionLabel>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                {VJ.audiences.map(a => (
                  <TagChip key={a.key} label={a.name} on={['coaches','hr','fuehrung','psych','consult'].includes(a.key)} />
                ))}
              </div>
              <div style={{ marginTop: 18 }}>
                <Field label="Zusätzliche Tags (Komma getrennt)">
                  <Input defaultValue="systemisch, fragetechnik, fallarbeit, supervision" />
                </Field>
              </div>
            </SoftCard>

            <SoftCard padding={28}>
              <SectionLabel>Referent:innen-Zuordnung</SectionLabel>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {VJ.instructors.map(ins => (
                  <div key={ins.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 12px', background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)', borderRadius: 10,
                  }}>
                    <Avatar name={ins.name} src={ins.img || undefined} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{ins.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)' }}>{ins.role}</div>
                    </div>
                    <span style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)' }}>{ins.id === 'miriam' ? '5 Module' : ins.id === 'hoff' ? '3 Module' : '1 Modul'}</span>
                    <IconBtn icon="trash" label="Entfernen" tone="danger" />
                  </div>
                ))}
                <button style={{
                  padding: '10px', background: 'transparent', border: '1.5px dashed var(--color-border)',
                  borderRadius: 10, color: 'var(--color-fg-secondary)', fontSize: 12.5, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>+ Referent:in zuordnen</button>
              </div>
            </SoftCard>

            <SoftCard padding={28}>
              <SectionLabel>Zertifikatsvorlage & SEO</SectionLabel>
              <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
                <Field label="Zertifikatsvorlage">
                  <Select defaultValue="standard">
                    <option value="standard">Standard „Dusk Dawn"</option>
                    <option value="minimal">Minimal Schwarz/Weiß</option>
                  </Select>
                </Field>
                <Field label="SEO-Titel"><Input defaultValue="VanJunge Professional — Live-Weiterbildung für Coaches" /></Field>
                <Field label="SEO-Meta-Description"><Textarea rows={2} defaultValue="8 Live-Webinare + Workshop. Psychologisch fundiert. Kuratiert von Miriam Junge." /></Field>
              </div>
            </SoftCard>
          </div>

          {/* Right sidebar — publish */}
          <div style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SoftCard padding={22}>
              <SectionLabel>Status</SectionLabel>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Sichtbarkeit</span>
                  <Tag tone={published ? 'success' : 'warn'}>{published ? 'Veröffentlicht' : 'Entwurf'}</Tag>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Im Katalog anzeigen</span>
                  <NewsToggle defaultOn={published} />
                </label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Suchmaschinen indexieren</span>
                  <NewsToggle defaultOn />
                </label>
                <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: 12, lineHeight: 1.55 }}>
                  Geplant veröffentlicht am <strong>14. Mai 2026</strong><br />
                  Letzte Änderung: <strong>vor 12 Min.</strong>
                </div>
                <Btn variant="primary" size="md" full>{published ? 'Aktualisieren' : 'Jetzt veröffentlichen'}</Btn>
              </div>
            </SoftCard>

            <SoftCard padding={22}>
              <SectionLabel>Vorschau-URL</SectionLabel>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--color-fg-secondary)', fontFamily: 'monospace', padding: '10px 12px', background: 'var(--color-bg)', borderRadius: 8, wordBreak: 'break-all' }}>
                vanjunge.de/p/{slug}
              </div>
              <Btn variant="ghost" size="sm" style={{ marginTop: 10 }}><Icon name="link" size={12} /> Vorschau im neuen Tab</Btn>
            </SoftCard>

            <SoftCard padding={22}>
              <SectionLabel>Statistik</SectionLabel>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                <SummaryRow label="Aktive Teilnehmer:innen" value={<strong>16</strong>} />
                <SummaryRow label="Wartlist" value={<strong>4</strong>} />
                <SummaryRow label="Umsatz gesamt" value={<strong>22.240 €</strong>} />
              </div>
            </SoftCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-lavender-oil)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{children}</div>
);

const TagChip = ({ label, on }) => {
  const [active, setActive] = React.useState(on);
  return (
    <button onClick={() => setActive(!active)} style={{
      background: active ? 'var(--color-near-black)' : 'transparent',
      color: active ? 'var(--color-lavender-bg)' : 'var(--color-fg-secondary)',
      border: active ? 'none' : '1px solid var(--color-border)',
      borderRadius: 9999, padding: '6px 14px',
      fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      {active && <Icon name="check" size={11} strokeWidth={2.5} />}
      {label}
    </button>
  );
};

const RichTextToolbar = () => (
  <div style={{
    display: 'flex', gap: 2,
    padding: '8px 10px', borderBottom: '1px solid var(--color-lavender-xlight)',
    background: 'var(--color-bg)',
  }}>
    {['B', 'I', 'U', 'H₂', 'H₃', '•', '1.', '"', '⎘'].map(t => (
      <button key={t} style={{
        width: 30, height: 28,
        background: 'transparent', border: 'none', cursor: 'pointer',
        fontSize: 12.5, fontWeight: 800, color: 'var(--color-fg-secondary)',
        borderRadius: 6,
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-lavender-xlight)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >{t}</button>
    ))}
    <div style={{ flex: 1 }} />
    <span style={{ fontSize: 11, color: 'var(--color-fg-secondary)', padding: '6px 0' }}>Markdown unterstützt</span>
  </div>
);

// ─── Admin: Module edit ──────────────────────────────────────
const AdminModuleEditPage = ({ go }) => {
  const [type, setType] = React.useState('Live-Webinar');
  const [blocks, setBlocks] = React.useState([
    { id: 'b1', kind: 'text',  content: '<p>In dieser Session arbeiten wir mit drei Fragetechniken …</p>' },
    { id: 'b2', kind: 'embed', url: 'https://vimeo.com/123456789' },
    { id: 'b3', kind: 'file',  filename: 'methodenkarte.pdf', size: '124 KB' },
  ]);

  const addBlock = (kind) => {
    const id = 'b' + (Date.now());
    const defaults = {
      text: { content: '<p>Neuer Textblock…</p>' },
      embed: { url: '' },
      file: { filename: '', size: '' },
      link: { url: '', label: '' },
    };
    setBlocks(b => [...b, { id, kind, ...defaults[kind] }]);
  };

  const removeBlock = (id) => setBlocks(b => b.filter(x => x.id !== id));

  return (
    <div className="route-fade">
      <AdminTopBar
        title="Modul bearbeiten"
        breadcrumb={<>
          <button onClick={() => go('admin-courses')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-fg-secondary)', cursor: 'pointer', fontSize: 11 }}>Kurse</button>
          <span>/</span>
          <button onClick={() => go('admin-course-edit')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-fg-secondary)', cursor: 'pointer', fontSize: 11 }}>VanJunge Professional</button>
          <span>/</span>
          <span>Modul 04</span>
        </>}
        actions={
          <>
            <Btn variant="ghost" size="sm">Vorschau</Btn>
            <Btn variant="secondary" size="sm">Entwurf</Btn>
            <Btn variant="primary" size="sm">Speichern</Btn>
          </>
        }
      />
      <div style={{ padding: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <SoftCard padding={28}>
              <SectionLabel>Grunddaten</SectionLabel>
              <div style={{ display: 'grid', gap: 16, marginTop: 18 }}>
                <Field label="Modul-Titel" required><Input defaultValue="Umgang mit Widerstand und Krisen" /></Field>
                <Field label="Typ">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {['Live-Webinar', 'Workshop', 'Aufzeichnung', 'Material'].map(t => (
                      <button key={t} onClick={() => setType(t)} style={{
                        background: type === t ? 'var(--color-near-black)' : 'var(--color-bg)',
                        color: type === t ? 'var(--color-lavender-bg)' : 'var(--color-dark)',
                        border: type === t ? 'none' : '1px solid var(--color-border)',
                        borderRadius: 10, padding: '12px 10px',
                        fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                      }}>{t}</button>
                    ))}
                  </div>
                </Field>

                {(type === 'Live-Webinar' || type === 'Workshop') && (
                  <div style={{
                    padding: 18, background: 'var(--color-lavender-xlight)',
                    borderRadius: 12, border: '1px solid var(--color-lavender-light)',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-lavender-oil)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>Live-Termin</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                      <Field label="Datum"><Input type="date" defaultValue="2026-06-04" /></Field>
                      <Field label="Uhrzeit"><Input type="time" defaultValue="19:00" /></Field>
                      <Field label="Dauer"><Select defaultValue="90"><option value="90">90 Min.</option><option value="180">3 Std.</option></Select></Field>
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <Field label="Zoom-Link" hint="Wird 15 Min. vor Start für Teilnehmende sichtbar">
                        <Input defaultValue="https://us02web.zoom.us/j/87654321098?pwd=…" />
                      </Field>
                    </div>
                  </div>
                )}
              </div>
            </SoftCard>

            <SoftCard padding={28}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <SectionLabel>Inhaltsblöcke</SectionLabel>
                <span style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)' }}>{blocks.length} Blöcke · beliebig kombinierbar</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
                {blocks.map((b, i) => <ContentBlock key={b.id} block={b} idx={i} onRemove={() => removeBlock(b.id)} />)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 18 }}>
                {[
                  ['text',  'Text',          'edit'],
                  ['embed', 'Embed-URL',     'video'],
                  ['file',  'Datei-Upload',  'file'],
                  ['link',  'Externer Link', 'link'],
                ].map(([k, l, i]) => (
                  <button key={k} onClick={() => addBlock(k)} style={{
                    background: 'transparent', border: '1.5px dashed var(--color-lavender-light)',
                    borderRadius: 10, padding: '12px 10px',
                    fontSize: 12.5, fontWeight: 700, color: 'var(--color-lavender-oil)',
                    cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    <Icon name={i} size={13} /> {l}
                  </button>
                ))}
              </div>
            </SoftCard>

            <SoftCard padding={28}>
              <SectionLabel>Voraussetzungs-Module</SectionLabel>
              <div style={{ marginTop: 14, fontSize: 13, color: 'var(--color-fg-secondary)', marginBottom: 14 }}>
                Diese Module müssen abgeschlossen sein, bevor dieses sichtbar wird.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {VJ.professionalModules.slice(0, 3).map(m => (
                  <label key={m.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)', borderRadius: 10, cursor: 'pointer',
                  }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-lavender-oil)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Modul 0{m.n} — {m.title}</span>
                  </label>
                ))}
              </div>
            </SoftCard>
          </div>

          {/* Right sidebar */}
          <div style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SoftCard padding={22}>
              <SectionLabel>Referent:in</SectionLabel>
              <div style={{ marginTop: 12 }}>
                <Select defaultValue="miriam">
                  {VJ.instructors.map(ins => <option key={ins.id} value={ins.id}>{ins.name}</option>)}
                </Select>
              </div>
              <div style={{ marginTop: 12, padding: '12px 14px', background: 'var(--color-bg)', borderRadius: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
                <Avatar name="Miriam Junge" src="assets/photo-miriam.jpg" size={36} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Miriam Junge</div>
                  <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>Diplom-Psychologin</div>
                </div>
              </div>
            </SoftCard>

            <SoftCard padding={22}>
              <SectionLabel>Sichtbarkeit</SectionLabel>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Modul aktiv</span>
                  <NewsToggle defaultOn />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Aufzeichnung erlauben</span>
                  <NewsToggle defaultOn />
                </label>
                <Field label="Sichtbar ab">
                  <Input type="date" defaultValue="2026-05-28" />
                </Field>
              </div>
            </SoftCard>

            <SoftCard padding={22}>
              <SectionLabel>Eingebettete Inhalte</SectionLabel>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--color-fg-secondary)', lineHeight: 1.6 }}>
                Embed-Blöcke unterstützen Vimeo, YouTube, Wistia, Bunny Stream und Zoom-Aufzeichnungen direkt.
              </div>
            </SoftCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentBlock = ({ block, idx, onRemove }) => {
  const kindMeta = {
    text:  { label: 'Text',          icon: 'edit',  color: 'var(--color-lavender-oil)' },
    embed: { label: 'Embed-URL',     icon: 'video', color: '#7d6a18' },
    file:  { label: 'Datei',         icon: 'file',  color: '#3b6b40' },
    link:  { label: 'Externer Link', icon: 'link',  color: 'var(--color-lavender-oil)' },
  };
  const k = kindMeta[block.kind] || kindMeta.text;
  return (
    <div style={{
      border: '1px solid var(--color-border)', borderRadius: 12, background: 'var(--color-bg)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px', borderBottom: '1px solid var(--color-border)',
      }}>
        <Icon name="grip" size={14} color="var(--color-fg-secondary)" />
        <Icon name={k.icon} size={14} color={k.color} />
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-fg-secondary)' }}>BLOCK {String(idx + 1).padStart(2, '0')} · {k.label}</span>
        <div style={{ flex: 1 }} />
        <IconBtn icon="copy" label="Duplizieren" />
        <IconBtn icon="trash" label="Entfernen" tone="danger" onClick={onRemove} />
      </div>
      <div style={{ padding: 14 }}>
        {block.kind === 'text' && (
          <div style={{
            border: '1.5px solid var(--color-lavender-xlight)', borderRadius: 10, background: 'var(--color-bg-card)',
          }}>
            <RichTextToolbar />
            <div style={{ padding: '14px 16px', fontSize: 14, fontWeight: 500, lineHeight: 1.7, minHeight: 60 }} contentEditable suppressContentEditableWarning
              dangerouslySetInnerHTML={{ __html: block.content }} />
          </div>
        )}
        {block.kind === 'embed' && (
          <div style={{ display: 'grid', gap: 10 }}>
            <Field label="Embed-URL" hint="Vimeo / YouTube / Wistia / Bunny / Zoom">
              <Input defaultValue={block.url} placeholder="https://vimeo.com/…" />
            </Field>
            <div style={{
              aspectRatio: '16 / 9',
              background: 'var(--color-near-black)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-lavender-light)', fontSize: 12,
            }}>
              <Icon name="play" size={36} color="var(--color-lavender-light)" />
            </div>
          </div>
        )}
        {block.kind === 'file' && (
          <div style={{
            display: 'flex', gap: 12, padding: '14px 16px',
            background: 'var(--color-bg-card)', border: '1px dashed var(--color-lavender-light)',
            borderRadius: 10, alignItems: 'center',
          }}>
            <Icon name="file" size={20} color="var(--color-lavender-oil)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{block.filename || 'Datei wählen…'}</div>
              <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>{block.size || 'PDF, MD, ZIP — bis 50 MB'}</div>
            </div>
            <Btn variant="secondary" size="sm">Hochladen</Btn>
          </div>
        )}
        {block.kind === 'link' && (
          <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 0.6fr', gap: 10 }}>
            <Field label="Bezeichnung"><Input placeholder="z. B. Buchempfehlung" /></Field>
            <Field label="URL"><Input placeholder="https://…" /></Field>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, {
  AdminDashboardPage, AdminCoursesPage, AdminCourseEditPage, AdminModuleEditPage,
});
