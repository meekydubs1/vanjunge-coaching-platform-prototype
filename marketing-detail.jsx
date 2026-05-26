// marketing-detail.jsx, Path detail, Format detail, About, Instructors, Contact, FAQ
// Editorial layouts with scroll reveals, parallax certificate, refined typography.

// ─── Path detail (canonical: Professional) ──────────────────
const PathDetailPage = ({ go, pathId }) => {
  const path = VJ.paths.find(p => p.id === pathId) || VJ.paths[1];
  const [openIdx, setOpenIdx] = React.useState(null);
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="route-fade" style={{ paddingBottom: 96 }}>
      {/* Sticky CTA bar */}
      <div className="vj-glass-dark" style={{
        position: 'sticky', top: 72, zIndex: 50,
        color: 'var(--color-fg-on-dark)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Tag tone="dark">{path.tier}</Tag>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{path.name}</div>
              <span style={{ fontSize: 12, color: '#a09eac' }}>
                {path.webinars} Webinare · {path.workshops > 0 ? path.workshops + ' Workshop · ' : ''}{path.hours} Std.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span className="vj-num" style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em' }}>{VJ.priceFmt(path.price)}</span>
              <span style={{ fontSize: 11, color: '#a09eac' }}>netto zzgl. MwSt.</span>
              <Magnetic strength={0.18}>
                <Btn variant="primaryDark" size="md" onClick={() => go('checkout')}>Jetzt buchen <Icon name="arrow" size={13} /></Btn>
              </Magnetic>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--gradient-dusk-dawn)' }}>
        <BackgroundOrbs variant="light" count={2} />
        <Container style={{ paddingTop: 72, paddingBottom: 96, position: 'relative', zIndex: 2 }}>
          <Reveal>
            <button onClick={() => go('catalogue')} className="vj-link" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12.5, fontWeight: 700, color: 'var(--color-dark)', marginBottom: 28,
            }}>
              <Icon name="arrowLeft" size={14} /> Alle Pfade
            </button>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'flex-start' }}>
            <div>
              <Reveal>
                <Tag tone="lavender">{path.tier} {path.recommended && '· Empfohlen'}</Tag>
                <h1 style={{
                  fontSize: 'clamp(46px, 6vw, 84px)', fontWeight: 800,
                  letterSpacing: '-0.04em', lineHeight: 0.98,
                  margin: '20px 0 22px',
                }}>{path.name}</h1>
              </Reveal>
              <Reveal delay={160}>
                <p style={{ fontSize: 19, fontWeight: 500, color: 'var(--color-dark)', lineHeight: 1.55, maxWidth: 560 }}>
                  {path.description}
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
                  {[
                    [path.webinars, 'Live-Webinare', '90 Min. je Session'],
                    [path.workshops, 'Workshops', '3 Stunden Praxis'],
                    [path.hours, 'Stunden', 'Gesamtumfang ≈'],
                  ].map(([n, label, sub]) => (
                    <div key={label} style={{ borderLeft: '2px solid var(--color-near-black)', paddingLeft: 16 }}>
                      <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.95 }}>
                        <AnimatedNumber to={n} />
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-near-black)', marginTop: 6 }}>{label}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', marginTop: 2 }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={300} y={36}>
              <Tilt max={2}>
                <Card style={{ borderRadius: 22, boxShadow: '0 32px 80px rgba(48,47,56,0.16)' }} padding={32}>
                  <Eyebrow style={{ marginBottom: 14 }}>Nächste Kohorte</Eyebrow>
                  <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.015em', marginBottom: 6 }}>Start: 14. Mai 2026</div>
                  <div style={{ fontSize: 13, color: 'var(--color-fg-secondary)', marginBottom: 26 }}>
                    Donnerstags · 19:00–20:30 · 9 Termine
                  </div>
                  <Progress value={2} total={18} label="Plätze vergeben" />
                  <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)', marginTop: 8, fontStyle: 'italic' }}>16 Plätze noch verfügbar · max. 18 TN</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '32px 0 20px' }}>
                    <span className="vj-num" style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9 }}>{VJ.priceFmt(path.price)}</span>
                    <span style={{ fontSize: 12, color: 'var(--color-fg-secondary)' }}>netto · einmalig</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginBottom: 18, lineHeight: 1.55 }}>
                    Inkl. 19 % MwSt.: <strong>{VJ.priceFmt(Math.round(path.price * 1.19))}</strong> · Auf Rechnung oder per Karte
                  </div>
                  <Btn variant="primary" size="lg" full className="vj-cta-primary" onClick={() => go('checkout')}>
                    Jetzt für {path.name.split(' ')[1]} buchen
                  </Btn>
                  <div style={{ marginTop: 14, fontSize: 11.5, textAlign: 'center', color: 'var(--color-fg-secondary)' }}>
                    14 Tage Widerrufsrecht · Sichere Zahlung über Stripe
                  </div>
                </Card>
              </Tilt>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Für wen */}
      <section style={{ padding: '96px 0', background: 'var(--color-bg-card)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 0.6fr', gap: 64, alignItems: 'flex-start' }}>
            <Reveal>
              <Eyebrow style={{ marginBottom: 16 }}>Für wen?</Eyebrow>
              <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>
                Wenn du andere fundiert begleiten willst,<br />
                <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>nicht „Mindset-Coachen".</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="vj-dropcap" style={{ fontSize: 16, color: 'var(--color-dark)', lineHeight: 1.75, margin: '0 0 22px' }}>
                Du bist erfahren genug, um zu spüren: ein gutes Tool reicht nicht. Du willst psychologische Tiefe, verstehen, was in einer Begegnung passiert, wann eine Methode greift, wann sie schadet, und wo deine eigene Grenze ist.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
                {VJ.audiences.filter(a => path.audience.includes(a.key)).map(a => (
                  <span key={a.key} style={{
                    background: 'var(--color-lavender-xlight)', color: 'var(--color-near-black)',
                    fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 9999,
                  }}>{a.name}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Modulcurriculum */}
      <section style={{ padding: '96px 0', background: 'var(--color-bg)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 0.6fr', gap: 64, alignItems: 'flex-start' }}>
            <div style={{ position: 'sticky', top: 152 }}>
              <Reveal>
                <Eyebrow style={{ marginBottom: 16 }}>Curriculum</Eyebrow>
                <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>
                  {path.webinars} Webinare<br />+ {path.workshops} Workshop.
                </h2>
                <p style={{ fontSize: 14.5, color: 'var(--color-fg-secondary)', lineHeight: 1.7, marginTop: 18 }}>
                  Jedes Modul wird live gehalten. Aufzeichnungen ergänzen, sie ersetzen nicht das gemeinsame Arbeiten.
                </p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Card padding={4} style={{ borderRadius: 18 }}>
                {VJ.professionalModules.map((m, i) => (
                  <Disclosure key={m.id}
                    open={openIdx === i}
                    onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                    title={<><span style={{ color: 'var(--color-fg-secondary)', fontWeight: 500, marginRight: 12 }}>0{m.n}</span>{m.title}</>}
                    meta={<>{m.type} · {m.duration}</>}
                  >
                    <div style={{ paddingLeft: 0 }}>
                      <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'var(--color-fg-secondary)', marginBottom: 12 }}>
                        <span><Icon name="calendar" size={12} /> {m.date}</span>
                        <span><Icon name="user" size={12} /> {m.instructor}</span>
                      </div>
                      Inhalte: methodische Grundlagen, Fallübungen in Kleingruppen, geleitete Reflexion. Begleitmaterial wird vorab im Lernbereich freigeschaltet.
                    </div>
                  </Disclosure>
                ))}
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Referent:innen */}
      <section style={{ padding: '96px 0', background: 'var(--color-bg-card)' }}>
        <Container>
          <Reveal>
            <SectionHead eyebrow="Referent:innen" title="Drei Stimmen, ein Standard." maxW={560} />
          </Reveal>
          <Stagger step={140} y={28} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {VJ.instructors.map(ins => (
              <div key={ins.id} className="vj-card" style={{
                background: 'var(--color-bg)', borderRadius: 18, padding: 28, border: '1px solid var(--color-border)',
              }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 18 }}>
                  <Avatar name={ins.name} src={ins.img || undefined} size={64} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em' }}>{ins.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--color-lavender-oil)', fontWeight: 600, marginTop: 4 }}>{ins.role}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--color-fg-secondary)', margin: 0 }}>{ins.bio}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Certificate */}
      <section style={{ padding: '96px 0', background: 'var(--color-near-black)', color: 'var(--color-fg-on-dark)', position: 'relative', overflow: 'hidden' }}>
        <BackgroundOrbs variant="dark" count={3} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <Reveal>
              <Eyebrow color="var(--color-lemon-light)" style={{ marginBottom: 16 }}>Was du bekommst</Eyebrow>
              <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: 'var(--color-lavender-bg)' }}>
                Ein Zeugnis,<br />
                <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-lavender-light)' }}>das deine Tiefe ehrlich abbildet.</span>
              </h2>
              <p style={{ fontSize: 15.5, color: '#cdc8d8', lineHeight: 1.7, marginTop: 22 }}>
                Am Ende erhältst du ein privates Weiterbildungszertifikat und ein verifizierbares Open Badge. Wir sagen offen: das ist keine staatlich anerkannte Ausbildung. Es ist ein Beleg deiner ernsthaften Vertiefung.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {path.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14.5, color: '#cdc8d8' }}>
                    <Icon name="check" size={16} color="var(--color-lemon-light)" strokeWidth={2.4} />{f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220} y={48}>
              <Tilt max={6}>
                <CertificatePreview pathName={path.name} />
              </Tilt>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section style={{ padding: '96px 0', background: 'var(--color-bg)' }}>
        <Container maxW={880}>
          <Reveal>
            <SectionHead eyebrow="Häufige Fragen" title="Was Teilnehmende vor der Buchung wissen wollen." />
          </Reveal>
          <Reveal delay={120}>
            {VJ.faqs.map((f, i) => (
              <Disclosure key={i} title={f.q} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)}>{f.a}</Disclosure>
            ))}
          </Reveal>
        </Container>
      </section>
    </div>
  );
};

const CertificatePreview = ({ pathName }) => (
  <div style={{
    background: 'var(--gradient-dusk-dawn)',
    borderRadius: 20, padding: 40, color: 'var(--color-near-black)',
    boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.45)',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* subtle texture lines */}
    <div aria-hidden style={{
      position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 8px, var(--color-near-black) 8px 9px)',
    }} />
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
        <Logo size={16} />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-dark)' }}>
          Privates Weiterbildungszertifikat
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)', marginBottom: 10 }}>Hiermit wird bestätigt:</div>
      <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 8 }}>{VJ.user.name}</div>
      <div style={{ fontSize: 13.5, color: 'var(--color-dark)', marginBottom: 36, lineHeight: 1.6 }}>
        hat den Pfad <strong>{pathName}</strong> mit allen Live-Modulen und der Fallarbeit abgeschlossen.
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(48,47,56,0.20)', paddingTop: 18 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>Berlin · Mai 2026</div>
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6, fontStyle: 'italic' }}>Miriam Junge</div>
        </div>
        <div style={{ position: 'relative' }}>
          <svg viewBox="0 0 100 100" width="80" height="80" style={{ position: 'absolute', inset: 0 }} className="vj-rotate-slow">
            <defs><path id="cert-rim" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
            <text fontSize="7.5" fontWeight="800" letterSpacing="1.6" fill="var(--color-near-black)" fontFamily="Inter">
              <textPath href="#cert-rim" startOffset="0">VERIFIED · OPEN BADGE · VANJUNGE · </textPath>
            </text>
          </svg>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--color-near-black)', color: 'var(--color-lemon-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="badge" size={36} color="var(--color-lemon-light)" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Single-format detail ───────────────────────────────────
const FormatDetailPage = ({ go, formatId }) => {
  const f = VJ.singleFormats.find(x => x.id === formatId) || VJ.singleFormats[0];
  const outcomes = [
    'Du erkennst Mikrosignale in Antworten und kannst gezielt nachfragen.',
    'Du bleibst auch in zugespitzten Momenten in einer fragenden Haltung.',
    'Du nutzt drei strukturierte Frage-Schemata für unterschiedliche Konfliktphasen.',
    'Du reflektierst dein eigenes Reaktionsmuster unter Druck.',
  ];
  const materials = [
    'Methodenkarte „Klärung / Konfrontation / Ressource"',
    'Vorbereitungs-Reading (12 S., PDF), eine Woche vor Termin',
    'Aufzeichnung im Lernbereich · 14 Tage verfügbar',
    'Teilnahmebescheinigung + Open Badge',
  ];

  return (
    <div className="route-fade" style={{ paddingBottom: 96 }}>
      <section style={{ background: 'var(--color-bg-card)', padding: '72px 0 56px' }}>
        <Container>
          <Reveal>
            <button onClick={() => go('catalogue')} className="vj-link" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12.5, fontWeight: 700, color: 'var(--color-fg-secondary)', marginBottom: 24,
            }}>
              <Icon name="arrowLeft" size={14} /> Zurück zum Katalog
            </button>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'flex-start' }}>
            <div>
              <Reveal>
                <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
                  <Tag tone="lavender">{f.type}</Tag>
                  <Tag tone="neutral">{f.duration}</Tag>
                </div>
                <h1 style={{ fontSize: 'clamp(40px, 5.2vw, 64px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.02, margin: 0, maxWidth: 720 }}>{f.title}</h1>
              </Reveal>
              <Reveal delay={160}>
                <p style={{ fontSize: 18, color: 'var(--color-fg-secondary)', lineHeight: 1.6, marginTop: 24, maxWidth: 640 }}>
                  Drei Stunden live in einer kleinen Gruppe. Wir trainieren die schwierigen Momente, wenn ein Gespräch kippt, wenn eine Frage zu früh kommt, wenn Schweigen zur Methode werden muss.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 40, borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
                  {[
                    ['calendar', 'Termin', f.date],
                    ['user', 'Referentin', f.instructor],
                    ['users', 'Max. Teilnehmende', '14 · live via Zoom'],
                  ].map(([icon, label, val]) => (
                    <div key={label}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--color-lavender-oil)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                        <Icon name={icon} size={13} color="var(--color-lavender-oil)" />{label}
                      </div>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--color-near-black)' }}>{val}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={300} y={36}>
              <Tilt max={2}>
                <Card padding={32} style={{ borderRadius: 22, boxShadow: '0 24px 60px rgba(48,47,56,0.14)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                    <span className="vj-num" style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9 }}>{VJ.priceFmt(f.price)}</span>
                    <span style={{ fontSize: 13, color: 'var(--color-fg-secondary)' }}>netto</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginBottom: 26 }}>
                    Brutto inkl. 19 % MwSt.: <strong>{VJ.priceFmt(Math.round(f.price * 1.19))}</strong>
                  </div>
                  <Btn variant="primary" size="lg" full className="vj-cta-primary" onClick={() => go('checkout')}>
                    Platz reservieren <Icon name="arrow" size={14} />
                  </Btn>
                  <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--color-border)', fontSize: 12.5, color: 'var(--color-fg-secondary)', lineHeight: 1.65 }}>
                    14 Tage Widerrufsrecht · Stornofrei bis 7 Tage vor Termin · Rechnung möglich
                  </div>
                </Card>
              </Tilt>
            </Reveal>
          </div>
        </Container>
      </section>

      <section style={{ background: 'var(--color-bg)', padding: '88px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <Reveal>
              <Eyebrow style={{ marginBottom: 16 }}>Lernziele</Eyebrow>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 28px', lineHeight: 1.1 }}>Nach dem Workshop kannst du …</h2>
              <Stagger step={100} as="ul" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {outcomes.map((o, i) => (
                  <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: 'var(--color-lavender-xlight)', color: 'var(--color-near-black)',
                      fontSize: 12, fontWeight: 800, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>0{i+1}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-dark)' }}>{o}</div>
                  </li>
                ))}
              </Stagger>
            </Reveal>
            <Reveal delay={160}>
              <Eyebrow style={{ marginBottom: 16 }}>Inhalt &amp; Materialien</Eyebrow>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 28px', lineHeight: 1.1 }}>Was im Preis enthalten ist.</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {materials.map((m, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    padding: '18px 0',
                    borderBottom: i === materials.length - 1 ? 'none' : '1px solid var(--color-border)',
                  }}>
                    <Icon name="check" size={18} color="var(--color-lavender-oil)" strokeWidth={2.2} />
                    <span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--color-dark)', fontWeight: 600 }}>{m}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
};

// ─── About ──────────────────────────────────────────────────
const AboutPage = ({ go }) => (
  <div className="route-fade">
    <section style={{ background: 'var(--color-bg-card)', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
      <Container maxW={960}>
        <Reveal>
          <Eyebrow style={{ marginBottom: 18 }}>Über VanJunge</Eyebrow>
          <h1 style={{
            fontSize: 'clamp(48px, 6.4vw, 92px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 0.98, margin: 0,
          }}>
            Eine Akademie.<br />
            Eine Kuratorin.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>Eine Haltung.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 56 }}>
            <p className="vj-dropcap" style={{ fontSize: 17, color: 'var(--color-dark)', lineHeight: 1.7, margin: 0 }}>
              VanJunge ist kein Kursmarktplatz und kein Skillshare. Wir sind eine kuratierte Weiterbildung, entwickelt für Menschen, die andere Menschen begleiten und die psychologische Tiefe ohne Esoterik suchen. Miriam Junge wählt jedes Modul, jede:n Referent:in, jeden Termin selbst aus.
            </p>
            <p style={{ fontSize: 16, color: 'var(--color-fg-secondary)', lineHeight: 1.75, margin: 0 }}>
              Wir nennen unsere Programme bewusst <em>Weiterbildung</em>, nicht <em>Ausbildung</em>. Wir geben ein privates Weiterbildungszertifikat aus, keinen staatlich anerkannten Abschluss. Das ist eine bewusste Entscheidung: <span className="vj-mark">Wer sich auf einen Titel verlässt, übersieht die Substanz.</span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
    <section style={{ background: 'var(--color-bg)', padding: '112px 0' }}>
      <Container>
        <Reveal>
          <div className="vj-eyebrow-rule" style={{ marginBottom: 32 }}>Drei Prinzipien</div>
        </Reveal>
        <Stagger step={140} y={32} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            ['Psychologisch fundiert', 'Jede Methode hat einen Mechanismus. Wir benennen ihn, und seine Grenzen.'],
            ['Wissenschaftlich verantwortet', 'Studien, Kontrollfragen, Replikationen. Keine Buzzwords ohne Evidenz.'],
            ['Professionell entwickelt', 'Kuratiert wie ein Verlagsprogramm, kein Algorithmus, kein Funnel.'],
          ].map(([t, d], i) => (
            <div key={t} className="vj-card" style={{ background: 'var(--color-bg-card)', borderRadius: 18, padding: 32, border: '1px solid var(--color-border)' }}>
              <span className="vj-pin" style={{ marginBottom: 20 }}>0{i+1}</span>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 14, marginBottom: 12, letterSpacing: '-0.015em' }}>{t}</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg-secondary)', lineHeight: 1.75, margin: 0 }}>{d}</p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
    <FounderBlock go={go} />
    <TestimonialsSection />
  </div>
);

// ─── Instructors ────────────────────────────────────────────
const InstructorsPage = () => (
  <div className="route-fade">
    <section style={{ background: 'var(--color-bg-card)', padding: '96px 0 56px' }}>
      <Container>
        <Reveal>
          <Eyebrow style={{ marginBottom: 14 }}>Referent:innen</Eyebrow>
          <h1 style={{ fontSize: 'clamp(44px, 5.6vw, 72px)', fontWeight: 800, letterSpacing: '-0.035em', margin: 0, lineHeight: 1.0, maxWidth: 820 }}>
            Die Stimmen<br />
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>hinter den Modulen.</span>
          </h1>
        </Reveal>
      </Container>
    </section>
    <section style={{ padding: '64px 0 112px', background: 'var(--color-bg)' }}>
      <Container>
        {VJ.instructors.map((ins, i) => (
          <Reveal key={ins.id} delay={i * 100}>
            <div style={{
              display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, padding: '44px 0',
              borderTop: '1px solid var(--color-border)',
              borderBottom: i === VJ.instructors.length - 1 ? '1px solid var(--color-border)' : 'none',
              alignItems: 'center',
            }}>
              <Avatar name={ins.name} src={ins.img || undefined} size={160} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-lavender-oil)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>0{i+1}</div>
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.025em' }}>{ins.name}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-fg-secondary)', marginTop: 6, letterSpacing: '.01em' }}>{ins.role}</div>
                <p style={{ fontSize: 16, color: 'var(--color-dark)', lineHeight: 1.7, marginTop: 18, maxWidth: 760 }}>{ins.bio}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  </div>
);

// ─── Contact ────────────────────────────────────────────────
const ContactPage = () => {
  const [sent, setSent] = React.useState(false);
  return (
    <div className="route-fade">
      <section style={{ padding: '112px 0', background: 'var(--color-bg-card)' }}>
        <Container maxW={760}>
          <Reveal>
            <Eyebrow style={{ marginBottom: 14 }}>Kontakt</Eyebrow>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.035em', margin: 0, lineHeight: 1.04 }}>
              Eine Frage stellen,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>ein Gespräch anstoßen.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: 16, color: 'var(--color-fg-secondary)', lineHeight: 1.65, marginTop: 22 }}>
              Schreib uns direkt an <a href="mailto:miriam@vanjunge.de" className="vj-link" style={{ color: 'var(--color-lavender-oil)', fontWeight: 700, textDecoration: 'none' }}>miriam@vanjunge.de</a> oder nutze das Formular. Antwort kommt von Miriam selbst, innerhalb von zwei Werktagen.
            </p>
          </Reveal>
          {sent ? (
            <Reveal>
              <Card style={{ marginTop: 32, textAlign: 'center', background: 'var(--color-lavender-xlight)' }}>
                <Icon name="check" size={32} color="var(--color-lavender-oil)" strokeWidth={2.2} />
                <div style={{ fontSize: 20, fontWeight: 800, marginTop: 12 }}>Nachricht angekommen.</div>
                <div style={{ fontSize: 13.5, color: 'var(--color-fg-secondary)', marginTop: 8 }}>Du hörst von Miriam innerhalb von zwei Werktagen.</div>
              </Card>
            </Reveal>
          ) : (
            <Reveal delay={240}>
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ marginTop: 40, display: 'grid', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Name" required><Input placeholder="Dein Name" required /></Field>
                  <Field label="E-Mail" required><Input type="email" placeholder="du@beispiel.de" required /></Field>
                </div>
                <Field label="Berufsfeld">
                  <Select defaultValue="">
                    <option value="" disabled>Bitte wählen</option>
                    {VJ.audiences.map(a => <option key={a.key}>{a.name}</option>)}
                  </Select>
                </Field>
                <Field label="Deine Frage" required>
                  <Textarea rows={5} placeholder="Worum geht es?" required />
                </Field>
                <Magnetic strength={0.18}>
                  <Btn type="submit" variant="primary" size="lg" className="vj-cta-primary" style={{ justifySelf: 'flex-start', paddingLeft: 36, paddingRight: 36 }}>Nachricht senden <Icon name="arrow" size={14} /></Btn>
                </Magnetic>
              </form>
            </Reveal>
          )}
        </Container>
      </section>
    </div>
  );
};

// ─── FAQ ────────────────────────────────────────────────────
const FaqPage = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="route-fade">
      <section style={{ padding: '112px 0', background: 'var(--color-bg-card)' }}>
        <Container maxW={900}>
          <Reveal>
            <Eyebrow style={{ marginBottom: 14 }}>FAQ</Eyebrow>
            <h1 style={{ fontSize: 'clamp(44px, 5.6vw, 68px)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0 0 48px', lineHeight: 1.0 }}>
              Häufige Fragen.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            {VJ.faqs.map((f, i) => (
              <Disclosure key={i} title={f.q} open={open === i} onToggle={() => setOpen(open === i ? null : i)}>{f.a}</Disclosure>
            ))}
          </Reveal>
        </Container>
      </section>
    </div>
  );
};

Object.assign(window, {
  PathDetailPage, FormatDetailPage, AboutPage, InstructorsPage, ContactPage, FaqPage,
  CertificatePreview, FounderBlock, TestimonialsSection,
});
