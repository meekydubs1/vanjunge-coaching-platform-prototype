// learner.jsx — Dashboard, Path overview, Live module, Recording module, Account

// ─── Dashboard ───────────────────────────────────────────────
const DashboardPage = ({ go }) => {
  const next = VJ.professionalModules.find(m => m.status === 'current') || VJ.professionalModules[3];
  const done = VJ.professionalModules.filter(m => m.status === 'done').length;
  return (
    <div className="route-fade">
      <Container style={{ padding: '56px 32px 96px' }} maxW={1240}>
        {/* Greeting + meta */}
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <Eyebrow style={{ marginBottom: 12 }}>Donnerstag · 04. Juni 2026</Eyebrow>
              <h1 style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, margin: 0 }}>
                Guten Abend,<br />
                <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>{VJ.user.firstName}.</span>
              </h1>
              <p style={{ fontSize: 15.5, color: 'var(--color-fg-secondary)', margin: '14px 0 0', maxWidth: 560, lineHeight: 1.65 }}>
                Heute Abend ist deine vierte Live-Session. Vorbereitung liegt im Modul, Materialien sind unten.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn variant="secondary" size="md"><Icon name="calendar" size={14} /> Kalender exportieren</Btn>
              <Magnetic strength={0.18}>
                <Btn variant="primary" size="md" className="vj-cta-primary" onClick={() => go('module-live')}>Zur Live-Session <Icon name="arrow" size={14} /></Btn>
              </Magnetic>
            </div>
          </div>
        </Reveal>

        {/* Next live session */}
        <Reveal delay={140}>
        <div style={{
          background: 'var(--color-near-black)', color: 'var(--color-fg-on-dark)',
          borderRadius: 22, padding: 40, marginBottom: 40,
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(48,47,56,0.18)',
        }}>
          <BackgroundOrbs variant="dark" count={3} />
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, position: 'relative', zIndex: 2 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--color-lemon-light)',
                  boxShadow: '0 0 0 6px rgba(237,255,102,0.18)',
                  animation: 'vj-pulse 2s infinite',
                }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-lemon-light)' }}>
                  Heute · in 2 Std. 14 Min.
                </span>
              </div>
              <Tag tone="dark">{next.type} · {next.duration} · Modul 0{next.n} / 9</Tag>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', margin: '18px 0 14px', color: 'var(--color-lavender-bg)', lineHeight: 1.15 }}>{next.title}</h2>
              <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#cdc8d8', marginBottom: 28 }}>
                <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="calendar" size={14} color="var(--color-lavender-light)" />{next.date}</span>
                <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="user" size={14} color="var(--color-lavender-light)" />{next.instructor}</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Magnetic strength={0.18}>
                  <Btn variant="primaryDark" size="md" className="vj-cta-primary" onClick={() => go('module-live')}>
                    <Icon name="video" size={14} /> Zur Session beitreten
                  </Btn>
                </Magnetic>
                <Btn variant="ghost" size="md" style={{ color: 'var(--color-lavender-light)' }} onClick={() => go('module-live')}>
                  Vorbereitung ansehen
                </Btn>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#a09eac', marginBottom: 12 }}>Kohorte „Sommer 2026"</div>
              <div style={{ display: 'flex', marginBottom: 16 }}>
                {[1,2,3,4,5,6,7].map(i => (
                  <Avatar key={i} name={`P ${i}`} size={34} style={{ marginLeft: i === 1 ? 0 : -8, border: '2px solid var(--color-near-black)' }} />
                ))}
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', marginLeft: -8,
                  background: 'rgba(213,191,255,0.15)', color: 'var(--color-lavender-light)',
                  fontSize: 10.5, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--color-near-black)',
                }}>+9</div>
              </div>
              <div style={{ fontSize: 13, color: '#cdc8d8', lineHeight: 1.6 }}>
                16 Teilnehmende · feste Kohorte für die gesamte Laufzeit.
              </div>
              <div style={{ marginTop: 22, padding: '16px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, fontSize: 12.5, color: '#cdc8d8', lineHeight: 1.55, border: '1px solid rgba(213,191,255,0.08)' }}>
                <strong style={{ color: 'var(--color-lavender-light)' }}>Vorbereitung:</strong> 12 S. PDF, ca. 35 Min. Lesezeit. Methodenkarte „Widerstand" als Druckvorlage.
              </div>
            </div>
          </div>
        </div>
        </Reveal>

        {/* Three columns: Pfade · Zertifikate · Supervision */}
        <Reveal delay={280}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 40 }}>
          {/* Pfade & Kurse */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Meine Pfade &amp; Kurse</h3>
              <InlineLink color="var(--color-fg-secondary)" onClick={() => go('catalogue')}>Weitere entdecken →</InlineLink>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <button onClick={() => go('path-overview')} style={{
                textAlign: 'left', background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)', borderRadius: 14,
                padding: 22, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <Tag tone="lavender">Pfad · Professional</Tag>
                    <div style={{ fontSize: 18, fontWeight: 800, marginTop: 10 }}>VanJunge Professional</div>
                    <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 4 }}>Kohorte Sommer 2026 · Start 14. Mai</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>{done} <span style={{ fontSize: 14, color: 'var(--color-fg-secondary)', fontWeight: 600 }}>/ 9</span></div>
                    <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>Module</div>
                  </div>
                </div>
                <Progress value={done} total={9} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 12, color: 'var(--color-fg-secondary)' }}>
                  <span>Nächste Live-Session: {next.date.split(' · ')[0]}</span>
                  <span style={{ color: 'var(--color-lavender-oil)', fontWeight: 700 }}>Pfad-Übersicht öffnen →</span>
                </div>
              </button>
              <button onClick={() => go('format-fragetechniken')} style={{
                textAlign: 'left', background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)', borderRadius: 14,
                padding: 22, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Tag tone="neutral">Workshop · 3 Std.</Tag>
                    <div style={{ fontSize: 16, fontWeight: 800, marginTop: 10 }}>Fragetechniken in schwierigen Gesprächen</div>
                    <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 4 }}>14. Juni 2026 · 14:00–17:00 · Miriam Junge</div>
                  </div>
                  <Tag tone="warn">Kommend</Tag>
                </div>
              </button>
            </div>
          </div>

          {/* Cert + Supervision */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card padding={22}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--gradient-dusk-dawn-vivid)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="badge" size={26} color="var(--color-near-black)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-lavender-oil)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Zertifikat</div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>33 % erreicht</div>
                  <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)', marginTop: 4, lineHeight: 1.5 }}>Open Badge wird nach Abschluss aller 9 Module ausgestellt.</div>
                </div>
              </div>
              <Progress value={3} total={9} color="var(--color-lavender-oil)" style={{ marginTop: 14 }} />
            </Card>

            <Card padding={22}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-lavender-oil)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Supervision</div>
                <Tag tone="neutral">Optional</Tag>
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--color-dark)', lineHeight: 1.55, marginBottom: 14 }}>
                Termin mit Miriam buchen — 60 Min., individuell.
              </div>
              <Btn variant="secondary" size="sm" full onClick={() => alert('Öffnet Calendly')}>
                <Icon name="calendar" size={13} /> Calendly öffnen
              </Btn>
              <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)', marginTop: 10, textAlign: 'center' }}>
                Im Pfad <strong>Expert</strong> automatisch enthalten.
              </div>
            </Card>
          </div>
        </div>
        </Reveal>

        {/* Recent materials */}
        <Reveal delay={400}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Zuletzt freigeschaltete Materialien</h3>
            <InlineLink color="var(--color-fg-secondary)" onClick={() => go('path-overview')}>Alle ansehen →</InlineLink>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['Methodenkarte „Widerstand"', 'PDF · 2 S.', 'vor 1 Std.'],
              ['Vorbereitung Modul 04', 'PDF · 12 S.', 'gestern'],
              ['Aufzeichnung Modul 03', 'Video · 87 Min.', 'vor 3 Tagen'],
            ].map(([t, meta, time]) => (
              <Card key={t} padding={20}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'var(--color-lavender-xlight)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><Icon name={meta.startsWith('Video') ? 'video' : 'file'} size={18} color="var(--color-lavender-oil)" /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }}>{t}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', marginTop: 4 }}>{meta} · {time}</div>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-fg-secondary)' }}><Icon name="download" size={16} /></button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        </Reveal>
      </Container>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

// ─── Path overview (purchased) ───────────────────────────────
const PathOverviewPage = ({ go }) => {
  const path = VJ.paths.find(p => p.id === 'professional');
  const modules = VJ.professionalModules;
  const done = modules.filter(m => m.status === 'done').length;
  const next = modules.find(m => m.status === 'current');
  return (
    <div className="route-fade">
      <Container style={{ padding: '40px 32px 96px' }} maxW={1180}>
        <button onClick={() => go('dashboard')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--color-fg-secondary)', marginBottom: 22 }}>
          <Icon name="arrowLeft" size={14} /> Meine Weiterbildung
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, marginBottom: 40, alignItems: 'flex-start' }}>
          <Reveal>
            <Tag tone="lavender">{path.tier} · Kohorte Sommer 2026</Tag>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.035em', margin: '16px 0 16px', lineHeight: 1.0 }}>
              {path.name.split(' ').map((w, i) => i === 1 ? <span key={i} style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>{w}</span> : <span key={i}>{w}{i === 0 ? ' ' : ''}</span>)}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--color-fg-secondary)', lineHeight: 1.7, margin: 0, maxWidth: 600 }}>
              Du bist in der vierten Woche. Jedes Modul ist eine 90-minütige Live-Session — zusätzlich gibt es einen Praxis-Workshop und begleitende Lesematerialien.
            </p>
            <div style={{ marginTop: 32 }}>
              <Progress value={done} total={9} label={`${done} von 9 Modulen abgeschlossen`} />
            </div>
          </Reveal>
          <Reveal delay={180} y={28}>
            <Card padding={28}>
              <Eyebrow style={{ marginBottom: 12 }}>Nächste Live-Session</Eyebrow>
              <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.3, marginBottom: 8 }}>{next.title}</div>
              <div style={{ fontSize: 13, color: 'var(--color-fg-secondary)' }}>{next.date} · {next.instructor}</div>
              <div style={{ marginTop: 20 }}>
                <Btn variant="primary" size="md" full className="vj-cta-primary" onClick={() => go('module-live')}><Icon name="video" size={14} />Zur Session</Btn>
              </div>
            </Card>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 36, alignItems: 'flex-start' }}>
          {/* Modulliste */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 18 }}>Curriculum</h2>
            <Card padding={4}>
              {modules.map((m, i) => {
                const isLast = i === modules.length - 1;
                const tone = m.status === 'done' ? 'var(--color-fg-secondary)' : m.status === 'current' ? 'var(--color-near-black)' : 'var(--color-dark)';
                return (
                  <button key={m.id}
                    onClick={() => go(m.status === 'done' ? 'module-recording' : 'module-live')}
                    style={{
                      width: '100%', display: 'grid', gridTemplateColumns: 'auto 1fr auto',
                      gap: 18, padding: '18px 22px', textAlign: 'left',
                      background: m.status === 'current' ? 'var(--color-lavender-xlight)' : 'transparent',
                      border: 'none', borderBottom: isLast ? 'none' : '1px solid var(--color-border)',
                      cursor: 'pointer', fontFamily: 'inherit',
                      borderRadius: m.status === 'current' ? 12 : 0,
                    }}>
                    <StatusDot status={m.status} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-fg-secondary)', letterSpacing: '.04em', marginBottom: 4 }}>MODUL 0{m.n} · {m.type}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: tone, textDecoration: m.status === 'done' ? 'none' : 'none' }}>{m.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)', marginTop: 4 }}>{m.date} · {m.instructor}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {m.status === 'current' && <Tag tone="lemon">Jetzt aktuell</Tag>}
                      {m.status === 'done' && <Tag tone="success">Abgeschlossen</Tag>}
                      <Icon name="chevron" size={16} color="var(--color-fg-secondary)" />
                    </div>
                  </button>
                );
              })}
            </Card>
          </div>

          {/* Side: cert + materials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card padding={22}>
              <Eyebrow style={{ marginBottom: 12 }}>Zertifikat</Eyebrow>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--gradient-dusk-dawn-vivid)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="badge" size={28} color="var(--color-near-black)" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>Privates Zertifikat</div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)' }}>+ Open Badge nach Abschluss</div>
                </div>
              </div>
              <Progress value={done} total={9} label="Fortschritt" />
            </Card>

            <Card padding={22}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <Eyebrow>Begleitmaterialien</Eyebrow>
                <span style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>9 Dateien</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['Methodenkarte „Widerstand"', '2 S.'],
                  ['Vorbereitung Modul 04', '12 S.'],
                  ['Fragebogen Selbstreflexion', '6 S.'],
                  ['Curriculum-Übersicht (Druck)', '4 S.'],
                ].map(([t, s]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon name="file" size={16} color="var(--color-fg-secondary)" />
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{t}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>{s}</div>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-lavender-oil)' }}><Icon name="download" size={14} /></button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

// ─── Module — Live (upcoming session) ────────────────────────
const LiveModulePage = ({ go }) => {
  const m = VJ.professionalModules[3]; // current
  const [remind, setRemind] = React.useState(true);
  const [timeLeft, setTimeLeft] = React.useState({ h: 2, m: 14, s: 32 });
  React.useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(({ h, m, s }) => {
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="route-fade">
      <Container style={{ padding: '40px 32px 96px' }} maxW={1180}>
        <button onClick={() => go('path-overview')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--color-fg-secondary)', marginBottom: 22 }}>
          <Icon name="arrowLeft" size={14} /> Curriculum
        </button>

        <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
          <Tag tone="lavender">Modul 0{m.n} / 9</Tag>
          <Tag tone="neutral">{m.type} · {m.duration}</Tag>
          <Tag tone="lemon">Heute Abend</Tag>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0, maxWidth: 800 }}>{m.title}</h1>
        <p style={{ fontSize: 15.5, color: 'var(--color-fg-secondary)', lineHeight: 1.65, marginTop: 16, maxWidth: 720 }}>
          In dieser Live-Session arbeitest du mit zwei zentralen Schemata: Widerstand als Information lesen und ihn in einen produktiven Dialog überführen. Wir üben in Breakouts.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 28, marginTop: 36, alignItems: 'flex-start' }}>
          {/* Countdown + join + reminder */}
          <div>
            <div style={{
              background: 'var(--color-near-black)', color: 'var(--color-fg-on-dark)',
              borderRadius: 22, padding: 40, position: 'relative', overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(48,47,56,0.2)',
            }}>
              <BackgroundOrbs variant="dark" count={2} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Eyebrow color="var(--color-lemon-light)" style={{ marginBottom: 16 }}>Startet in</Eyebrow>
                <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                  {[['Std.', timeLeft.h], ['Min.', timeLeft.m], ['Sek.', timeLeft.s]].map(([l, v], i) => (
                    <div key={l} style={{ minWidth: 84, position: 'relative' }}>
                      <div className="vj-num" style={{
                        fontSize: 72, fontWeight: 900,
                        color: 'var(--color-lemon-light)',
                        letterSpacing: '-0.06em',
                        lineHeight: 0.9,
                        textShadow: '0 12px 32px rgba(237,255,102,0.18)',
                      }}>
                        {String(v).padStart(2, '0')}
                      </div>
                      <div style={{ fontSize: 11.5, color: '#a09eac', marginTop: 8, letterSpacing: '.08em', textTransform: 'uppercase' }}>{l}</div>
                      {i < 2 && (
                        <div style={{
                          position: 'absolute', top: 14, right: -14,
                          fontSize: 36, color: 'rgba(213,191,255,0.20)', fontWeight: 300,
                        }}>:</div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 13.5, color: '#cdc8d8', marginBottom: 22 }}>
                  {m.date} · mit {m.instructor}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Magnetic strength={0.18}>
                    <Btn variant="primaryDark" size="lg" className="vj-cta-primary" onClick={() => alert('Öffnet Zoom — im Produktiv-Build mit One-Click-Join.')}>
                      <Icon name="video" size={16} /> Zur Session beitreten
                    </Btn>
                  </Magnetic>
                  <Btn variant="ghost" size="lg" style={{ color: 'var(--color-lavender-light)' }} onClick={() => alert('Kalender-Datei (ICS) heruntergeladen.')}>
                    <Icon name="calendar" size={16} /> Kalender (ICS)
                  </Btn>
                </div>
                <div style={{ marginTop: 26, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, color: '#cdc8d8' }}>Erinnerung 15 Min. vor Start</div>
                  <Toggle on={remind} onChange={setRemind} />
                </div>
              </div>
            </div>

            {/* Vorbereitung */}
            <div style={{ marginTop: 28 }}>
              <Eyebrow style={{ marginBottom: 12 }}>Vorbereitung</Eyebrow>
              <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 18px' }}>Vor der Session</h3>
              <Card padding={4}>
                {[
                  ['Reading: „Widerstand als Information lesen"', 'PDF · 12 S. · ~35 Min.', 'file'],
                  ['Methodenkarte als Druckvorlage', 'PDF · 2 S.', 'file'],
                  ['Vorbereitende Frage — kurz schriftlich beantworten', '3 Min.', 'edit'],
                ].map(([t, meta, icon], i, arr) => (
                  <div key={t} style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '18px 22px',
                    borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--color-border)',
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, background: 'var(--color-lavender-xlight)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}><Icon name={icon} size={18} color="var(--color-lavender-oil)" /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{t}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)', marginTop: 2 }}>{meta}</div>
                    </div>
                    <Btn variant="secondary" size="sm">Öffnen</Btn>
                  </div>
                ))}
              </Card>
            </div>

            {/* Recording placeholder */}
            <div style={{
              marginTop: 28, padding: 28,
              background: 'var(--color-lavender-xlight)',
              border: '1.5px dashed var(--color-lavender-light)',
              borderRadius: 14,
              display: 'flex', gap: 18, alignItems: 'center',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--color-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="video" size={20} color="var(--color-lavender-oil)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-near-black)' }}>Aufzeichnung erscheint hier nach der Session</div>
                <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)', marginTop: 4, lineHeight: 1.5 }}>
                  Verfügbar bis 14 Tage nach Termin. Du erhältst eine Benachrichtigung, sobald die Datei freigegeben ist.
                </div>
              </div>
            </div>
          </div>

          {/* Instructor + notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card padding={22}>
              <Eyebrow style={{ marginBottom: 14 }}>Referentin</Eyebrow>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                <Avatar name={m.instructor} src={m.instructor === 'Miriam Junge' ? 'assets/photo-miriam.jpg' : undefined} size={56} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{m.instructor}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-lavender-oil)', fontWeight: 600 }}>Diplom-Psychologin, approb. Psychotherapeutin</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-fg-secondary)', lineHeight: 1.65, margin: 0 }}>
                Miriam moderiert das Modul selbst und gibt im Anschluss 30 Minuten Q&amp;A.
              </p>
            </Card>
            <Card padding={22}>
              <Eyebrow style={{ marginBottom: 12 }}>Hinweise der Referentin</Eyebrow>
              <p style={{ fontSize: 13, color: 'var(--color-dark)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                „Bringt einen Fall mit, den ihr in der letzten Woche erlebt habt — auch wenn er klein wirkt. Wir werden gemeinsam schauen, an welcher Stelle ein Widerstand euch eine wertvolle Information gegeben hat."
              </p>
            </Card>
            <Card padding={22}>
              <Eyebrow style={{ marginBottom: 12 }}>Technik-Check</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Zoom-Version aktuell</span>
                  <Icon name="check" size={16} color="var(--color-lavender-oil)" strokeWidth={2.4} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Mikrofon &amp; Kamera</span>
                  <Icon name="check" size={16} color="var(--color-lavender-oil)" strokeWidth={2.4} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Stabile Verbindung</span>
                  <span style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>Test starten</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

const Toggle = ({ on, onChange }) => (
  <button onClick={() => onChange(!on)} style={{
    width: 44, height: 24, borderRadius: 9999,
    background: on ? 'var(--color-lemon-light)' : 'rgba(255,255,255,0.15)',
    border: 'none', cursor: 'pointer', position: 'relative', padding: 0,
    transition: 'background 200ms ease',
  }}>
    <span style={{
      position: 'absolute', top: 2, left: on ? 22 : 2, width: 20, height: 20,
      borderRadius: '50%', background: 'var(--color-near-black)',
      transition: 'left 200ms ease',
    }} />
  </button>
);

// ─── Module — Recording / embedded ────────────────────────────
const RecordingModulePage = ({ go }) => {
  const m = VJ.professionalModules[2]; // done module
  const [completed, setCompleted] = React.useState(false);
  return (
    <div className="route-fade">
      <Container style={{ padding: '40px 32px 96px' }} maxW={1180}>
        <button onClick={() => go('path-overview')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--color-fg-secondary)', marginBottom: 22 }}>
          <Icon name="arrowLeft" size={14} /> Curriculum
        </button>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Tag tone="lavender">Modul 0{m.n} / 9</Tag>
          <Tag tone="success">Abgeschlossen</Tag>
          <Tag tone="neutral">Aufzeichnung verfügbar</Tag>
        </div>
        <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0, maxWidth: 800 }}>{m.title}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 28, marginTop: 36, alignItems: 'flex-start' }}>
          <div>
            {/* Video player placeholder, 16:9 */}
            <div style={{
              position: 'relative', width: '100%', paddingBottom: '56.25%',
              background: 'var(--color-near-black)', borderRadius: 22, overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(48,47,56,0.22)',
            }}>
              <BackgroundOrbs variant="dark" count={2} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--color-lavender-bg)', zIndex: 2 }}>
                <Magnetic strength={0.2}>
                  <button style={{
                    width: 100, height: 100, borderRadius: '50%',
                    background: 'rgba(213,191,255,0.16)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid var(--color-lavender-light)',
                    cursor: 'pointer',
                    boxShadow: '0 0 0 0 rgba(213,191,255,0.4)',
                    animation: 'vj-pulse 2.8s ease-in-out infinite',
                    transition: 'transform 280ms cubic-bezier(.2,.8,.2,1)',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Icon name="play" size={36} color="var(--color-lavender-light)" strokeWidth={1.5} />
                  </button>
                </Magnetic>
                <div style={{ fontSize: 14, fontWeight: 700, marginTop: 20, color: 'var(--color-lavender-light)', letterSpacing: '.02em' }}>Aufzeichnung · 87 Min.</div>
                <div style={{ fontSize: 11, color: '#a09eac', marginTop: 6, letterSpacing: '.06em', textTransform: 'uppercase' }}>Eingebetteter Player · Vimeo / YouTube / Bunny / Zoom</div>
              </div>
              {/* fake controls */}
              <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18, height: 4, background: 'rgba(255,255,255,0.18)', borderRadius: 9999, zIndex: 2 }}>
                <div style={{ width: '24%', height: '100%', background: 'var(--color-lemon-light)', borderRadius: 9999, boxShadow: '0 0 12px rgba(237,255,102,0.5)' }} />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: 36 }}>
              <Eyebrow style={{ marginBottom: 10 }}>Beschreibung</Eyebrow>
              <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Worüber wir gesprochen haben</h3>
              <p style={{ fontSize: 15, color: 'var(--color-dark)', lineHeight: 1.7, margin: 0 }}>
                In dieser Session haben wir drei Fragetechniken miteinander verbunden: Klärung (was ist gemeint), Konfrontation (was bleibt unausgesprochen) und Ressource (was war schon einmal anders möglich). Du findest die Methodenkarte unten, dazu ein kurzes Skript für deine eigene Praxis.
              </p>
              <div style={{ display: 'flex', gap: 24, marginTop: 24, fontSize: 13, color: 'var(--color-fg-secondary)' }}>
                <span><Icon name="calendar" size={14} /> {m.date}</span>
                <span><Icon name="user" size={14} /> {m.instructor}</span>
                <span><Icon name="clock" size={14} /> {m.duration}</span>
              </div>
            </div>

            {/* Action row */}
            <div style={{
              marginTop: 32, padding: 24,
              background: completed ? 'var(--color-lavender-xlight)' : 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 14,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{completed ? 'Modul abgeschlossen.' : 'Bereit für das nächste Modul?'}</div>
                <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 4 }}>
                  {completed ? 'Dein Fortschritt wurde aktualisiert.' : 'Markiere dieses Modul als abgeschlossen und gehe weiter.'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {!completed && <Btn variant="secondary" size="md" onClick={() => setCompleted(true)}><Icon name="check" size={14} /> Als abgeschlossen markieren</Btn>}
                <Btn variant="primary" size="md" onClick={() => go('module-live')}>Nächstes Modul <Icon name="arrow" size={14} /></Btn>
              </div>
            </div>
          </div>

          {/* Right rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card padding={22}>
              <Eyebrow style={{ marginBottom: 14 }}>Downloads</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['Methodenkarte „Drei Fragen"', 'PDF · 2 S.'],
                  ['Skript der Session', 'PDF · 8 S.'],
                  ['Übungsfragebogen', 'PDF · 4 S.'],
                ].map(([t, m]) => (
                  <button key={t} style={{
                    background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                    borderRadius: 10, padding: '12px 14px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  }}>
                    <Icon name="file" size={16} color="var(--color-fg-secondary)" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{t}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)', marginTop: 2 }}>{m}</div>
                    </div>
                    <Icon name="download" size={14} color="var(--color-lavender-oil)" />
                  </button>
                ))}
              </div>
            </Card>
            <Card padding={22}>
              <Eyebrow style={{ marginBottom: 14 }}>Weiterführend</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['Buchempfehlung: Schulz von Thun', 'Externer Link'],
                  ['Podcast-Episode #42 mit Miriam', '47 Min.'],
                  ['Forschungsartikel zu Fragetechnik', 'PDF'],
                ].map(([t, m]) => (
                  <a key={t} href="#" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textDecoration: 'none', color: 'inherit' }}>
                    <Icon name="link" size={14} color="var(--color-lavender-oil)" />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-near-black)' }}>{t}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>{m}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

// ─── Account ─────────────────────────────────────────────────
const AccountPage = ({ go, setAuthed }) => {
  const [tab, setTab] = React.useState('profile');
  const tabs = [
    ['profile',  'Profil-Daten'],
    ['password', 'Passwort'],
    ['orders',   'Kaufhistorie'],
    ['certs',    'Zertifikate'],
    ['news',     'Newsletter'],
    ['danger',   'Konto löschen'],
  ];
  return (
    <div className="route-fade">
      <Container style={{ padding: '56px 32px 96px' }} maxW={1100}>
        <Reveal>
          <Eyebrow style={{ marginBottom: 12 }}>Account</Eyebrow>
          <h1 style={{ fontSize: 'clamp(36px, 4.4vw, 52px)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0 0 36px', lineHeight: 1.05 }}>
            Profil &amp;<br />
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>Einstellungen.</span>
          </h1>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 36, alignItems: 'flex-start' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'sticky', top: 88 }}>
            {tabs.map(([k, label]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                background: tab === k ? 'var(--color-near-black)' : 'transparent',
                color: tab === k ? 'var(--color-lavender-bg)' : 'var(--color-dark)',
                border: 'none', textAlign: 'left',
                padding: '10px 14px', borderRadius: 10,
                fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}>{label}</button>
            ))}
          </nav>

          <div>
            {tab === 'profile' && (
              <Card padding={32}>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Profil-Daten</h2>
                <p style={{ fontSize: 13.5, color: 'var(--color-fg-secondary)', margin: '8px 0 28px' }}>Diese Angaben erscheinen auf deinem Zertifikat.</p>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--color-border)' }}>
                  <Avatar name={VJ.user.name} size={72} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-fg-secondary)', marginBottom: 4 }}>Profilbild</div>
                    <Btn variant="secondary" size="sm">Bild hochladen</Btn>
                    <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)', marginTop: 6 }}>PNG oder JPG · max. 2 MB</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <Field label="Vorname"><Input defaultValue="Lena" /></Field>
                    <Field label="Nachname"><Input defaultValue="Albrecht" /></Field>
                  </div>
                  <Field label="E-Mail-Adresse"><Input type="email" defaultValue={VJ.user.email} /></Field>
                  <Field label="Berufsfeld">
                    <Select defaultValue="Coaches">
                      {VJ.audiences.map(a => <option key={a.key}>{a.name}</option>)}
                    </Select>
                  </Field>
                  <Field label="Über mich (erscheint nur intern)">
                    <Textarea rows={3} defaultValue="Selbständige Coachin mit Schwerpunkt Übergänge in Führung. Vorher 12 Jahre HR-Leitung." />
                  </Field>
                </div>
                <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
                  <Btn variant="primary" size="md">Änderungen speichern</Btn>
                  <Btn variant="ghost" size="md">Verwerfen</Btn>
                </div>
              </Card>
            )}

            {tab === 'password' && (
              <Card padding={32}>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Passwort ändern</h2>
                <p style={{ fontSize: 13.5, color: 'var(--color-fg-secondary)', margin: '8px 0 28px' }}>Min. 8 Zeichen, mindestens eine Ziffer.</p>
                <div style={{ display: 'grid', gap: 16, maxWidth: 380 }}>
                  <Field label="Aktuelles Passwort"><Input type="password" placeholder="••••••••" /></Field>
                  <Field label="Neues Passwort"><Input type="password" placeholder="••••••••" /></Field>
                  <Field label="Neues Passwort wiederholen"><Input type="password" placeholder="••••••••" /></Field>
                </div>
                <div style={{ marginTop: 24 }}><Btn variant="primary" size="md">Passwort aktualisieren</Btn></div>
              </Card>
            )}

            {tab === 'orders' && (
              <Card padding={32}>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Kaufhistorie</h2>
                <p style={{ fontSize: 13.5, color: 'var(--color-fg-secondary)', margin: '8px 0 24px' }}>Alle Rechnungen mit MwSt.-Ausweis zum Download.</p>
                <div style={{ borderTop: '1px solid var(--color-border)' }}>
                  {[
                    ['VanJunge Professional · Kohorte Sommer 2026', '14. Mai 2026', '1.390 € netto', 'Bezahlt'],
                    ['Workshop „Fragetechniken in schwierigen Gesprächen"', '02. Mai 2026', '329 € netto', 'Bezahlt'],
                    ['Webinar „Systemisches Denken im Coaching"', '08. Apr 2026', '149 € netto', 'Bezahlt'],
                  ].map(([t, date, price, status], i, arr) => (
                    <div key={t} style={{
                      display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto auto',
                      gap: 18, padding: '18px 0',
                      borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--color-border)',
                      alignItems: 'center',
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{t}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)' }}>{date}</div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{price}</div>
                      <Tag tone="success">{status}</Tag>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-lavender-oil)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700 }}>
                        <Icon name="download" size={14} /> PDF
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {tab === 'certs' && (
              <Card padding={32}>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Erworbene Zertifikate &amp; Open Badges</h2>
                <p style={{ fontSize: 13.5, color: 'var(--color-fg-secondary)', margin: '8px 0 24px' }}>Privates Weiterbildungszertifikat — keine staatliche Anerkennung.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  <Card padding={22} style={{ background: 'var(--gradient-dusk-dawn)' }}>
                    <Tag tone="lavender">In Bearbeitung</Tag>
                    <div style={{ fontSize: 17, fontWeight: 800, marginTop: 12 }}>VanJunge Professional</div>
                    <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 6, marginBottom: 16 }}>Voraussichtlich Juli 2026</div>
                    <Progress value={3} total={9} />
                  </Card>
                  <Card padding={22}>
                    <Tag tone="success">Ausgestellt</Tag>
                    <div style={{ fontSize: 17, fontWeight: 800, marginTop: 12 }}>Webinar: Systemisches Denken</div>
                    <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 6, marginBottom: 16 }}>Ausgestellt 09. Apr 2026</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Btn variant="secondary" size="sm"><Icon name="download" size={12} /> PDF</Btn>
                      <Btn variant="ghost" size="sm">Open Badge teilen</Btn>
                    </div>
                  </Card>
                </div>
              </Card>
            )}

            {tab === 'news' && (
              <Card padding={32}>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Newsletter-Einstellungen</h2>
                <p style={{ fontSize: 13.5, color: 'var(--color-fg-secondary)', margin: '8px 0 24px' }}>Du entscheidest, was wir dir schicken — drei Mal pro Jahr, höchstens.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    ['VanJunge Briefing', 'Eine kuratierte Lese-Empfehlung von Miriam, plus Modulrückblick.', true],
                    ['Termin-Updates', 'Neue Workshops, freie Plätze, Wartelisten-Status.', true],
                    ['Kohorten-Mailings', 'Inhaltliche Updates während meines aktiven Pfads.', true],
                  ].map(([t, d, def]) => (
                    <div key={t} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '18px 0', borderBottom: '1px solid var(--color-border)',
                    }}>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 700 }}>{t}</div>
                        <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 4 }}>{d}</div>
                      </div>
                      <NewsToggle defaultOn={def} />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {tab === 'danger' && (
              <Card padding={32} style={{ border: '1px solid rgba(194,81,81,0.3)' }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#a14040' }}>Konto löschen</h2>
                <p style={{ fontSize: 13.5, color: 'var(--color-fg-secondary)', margin: '8px 0 18px', lineHeight: 1.65 }}>
                  Beim Löschen deines Kontos werden alle Profil-Daten dauerhaft entfernt. Bereits erworbene Zertifikate bleiben als PDF in deiner E-Mail verfügbar.
                  <br/>Laufende Kohorten kannst du auch ohne aktives Konto bis zum Ende besuchen — kontaktiere uns dazu vorab.
                </p>
                <Btn variant="danger" size="md" onClick={() => { if (confirm('Konto wirklich löschen?')) { setAuthed(false); go('home'); } }}>
                  <Icon name="trash" size={14} /> Konto unwiderruflich löschen
                </Btn>
              </Card>
            )}

            {/* Logout */}
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button onClick={() => { setAuthed(false); go('home'); }} style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontSize: 13, fontWeight: 700, color: 'var(--color-fg-secondary)', textDecoration: 'underline', textUnderlineOffset: 3,
              }}>Abmelden</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const NewsToggle = ({ defaultOn }) => {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} style={{
      width: 44, height: 24, borderRadius: 9999,
      background: on ? 'var(--color-lavender-oil)' : 'var(--color-border)',
      border: 'none', cursor: 'pointer', position: 'relative', padding: 0,
      transition: 'background 200ms ease',
    }}>
      <span style={{
        position: 'absolute', top: 2, left: on ? 22 : 2, width: 20, height: 20,
        borderRadius: '50%', background: 'var(--color-bg-card)',
        transition: 'left 200ms ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
};

Object.assign(window, {
  DashboardPage, PathOverviewPage, LiveModulePage, RecordingModulePage, AccountPage,
});
