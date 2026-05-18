// marketing.jsx — Home, Catalogue, Path detail, Format detail, About, Instructors, Contact, FAQ
// Polished with scroll reveals, parallax, animated stats, editorial layouts, and refined motion.

// ─── Home Hero — oversized, cinematic, parallax photograph ──
const HomeHero = ({ go }) => {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; setT(window.scrollY); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--gradient-dusk-dawn)' }}>
      <BackgroundOrbs variant="light" count={3} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Container style={{ paddingTop: 96, paddingBottom: 120 }}>
          {/* Eyebrow line */}
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 38 }}>
              <span style={{ width: 36, height: 1, background: 'var(--color-near-black)', opacity: 0.4 }} />
              <Eyebrow color="var(--color-dark)" style={{ fontSize: 11.5 }}>
                VanJunge Akademie · kuratiert von Miriam Junge
              </Eyebrow>
            </div>
          </Reveal>

          {/* Hero headline — split-word reveal */}
          <h1 style={{
            fontSize: 'clamp(56px, 8vw, 116px)',
            fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.95,
            margin: 0, color: 'var(--color-near-black)', maxWidth: 1080,
          }}>
            <span style={{ display: 'block' }}>
              <WordReveal text="Besser coachen." delay={60} step={70} />
            </span>
            <span style={{ display: 'block', marginTop: 10 }}>
              <WordReveal
                text="Fundiert weiterbilden."
                delay={340}
                step={70}
                accentWords={['weiterbilden.']}
                accentStyle={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}
              />
            </span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 80, marginTop: 56, alignItems: 'flex-end' }}>
            <div>
              <Reveal delay={760}>
                <p style={{
                  fontSize: 19, fontWeight: 500, color: 'var(--color-dark)',
                  lineHeight: 1.55, maxWidth: 560, margin: 0,
                }}>
                  Live-Weiterbildung für Menschen, die andere Menschen begleiten —
                  <span className="vj-mark"> psychologisch fundiert</span>, wissenschaftlich verantwortet, professionell entwickelt.
                </p>
              </Reveal>
              <Reveal delay={900}>
                <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
                  <Magnetic strength={0.18}>
                    <Btn size="lg" variant="primary" onClick={() => go('catalogue')} style={{ paddingLeft: 36, paddingRight: 36 }}>
                      Pfade ansehen <Icon name="arrow" size={16} />
                    </Btn>
                  </Magnetic>
                  <Magnetic strength={0.18}>
                    <Btn size="lg" variant="secondary" onClick={() => go('about')}>Über die Akademie</Btn>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            {/* Hero portrait with parallax + floating data tag */}
            <div style={{ position: 'relative' }}>
              <Reveal delay={500} y={40}>
                <div style={{ position: 'relative' }}>
                  <div className="vj-vignette" style={{
                    borderRadius: 24, overflow: 'hidden',
                    boxShadow: '0 40px 100px -20px rgba(48,47,56,0.32), 0 0 0 1px rgba(255,255,255,0.5)',
                    transform: `translate3d(0, ${t * -0.05}px, 0)`,
                    willChange: 'transform',
                  }}>
                    <img src="assets/photo-miriam.jpg" alt="Miriam Junge" style={{
                      width: '100%', height: 520, objectFit: 'cover', objectPosition: 'center 25%',
                      display: 'block',
                      transform: `scale(1.06) translate3d(0, ${t * 0.04}px, 0)`,
                      willChange: 'transform',
                    }} />
                  </div>

                  {/* Floating credibility tag */}
                  <div style={{
                    position: 'absolute', bottom: -28, left: -28,
                    background: 'var(--color-near-black)', color: 'var(--color-lavender-bg)',
                    padding: '18px 22px', borderRadius: 16,
                    boxShadow: '0 18px 40px rgba(30,30,35,0.28)',
                    maxWidth: 260,
                    animation: 'vj-float 6s ease-in-out infinite',
                  }}>
                    <Eyebrow color="var(--color-lemon-light)" style={{ marginBottom: 8 }}>Kuration</Eyebrow>
                    <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.45 }}>
                      Miriam Junge — Diplom-Psychologin, approbierte Psychotherapeutin, Autorin.
                    </div>
                  </div>

                  {/* Floating stamp */}
                  <div style={{
                    position: 'absolute', top: -22, right: -22,
                    width: 96, height: 96, borderRadius: '50%',
                    background: 'var(--color-lemon-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 12px 32px rgba(30,30,35,0.18)',
                    animation: 'vj-float 5s ease-in-out -2s infinite',
                  }}>
                    <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} className="vj-rotate-slow">
                      <defs>
                        <path id="rim" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                      </defs>
                      <text fontSize="9" fontWeight="800" letterSpacing="2" fill="var(--color-near-black)" fontFamily="Inter">
                        <textPath href="#rim" startOffset="0">
                          VANJUNGE · AKADEMIE · BERLIN · 2026 ·
                        </textPath>
                      </text>
                    </svg>
                    <span style={{ fontSize: 24, fontWeight: 900, color: 'var(--color-near-black)', letterSpacing: '-0.04em' }}>VJ</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Hero footnote stats row */}
          <Reveal delay={1100}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
              marginTop: 80, paddingTop: 32, borderTop: '1px solid rgba(48,47,56,0.18)',
            }}>
              {[
                ['Live-first', 'Zoom-basierte Live-Sessions, keine vorgefertigten Kurse.'],
                ['Kuratiert', 'Jedes Modul handverlesen von Miriam Junge.'],
                ['Kleine Kohorten', 'Max. 18 Teilnehmende für persönliche Begleitung.'],
                ['Anschlussfähig', 'Privates Zertifikat samt verifizierbarem Open Badge.'],
              ].map(([t, d], i) => (
                <div key={t} style={{
                  paddingLeft: i === 0 ? 0 : 24,
                  paddingRight: i === 3 ? 0 : 24,
                  borderRight: i < 3 ? '1px solid rgba(48,47,56,0.12)' : 'none',
                }}>
                  <span className="vj-pin" style={{ marginBottom: 14, display: 'inline-flex' }}>0{i+1}</span>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-near-black)', marginTop: 12, letterSpacing: '-0.01em' }}>{t}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', lineHeight: 1.55, marginTop: 6, maxWidth: 220 }}>{d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
};

// ─── Press strip — refined marquee ──────────────────────────
const HomePressStrip = () => (
  <section style={{ background: 'var(--color-bg-card)', padding: '40px 0', borderBottom: '1px solid var(--color-border)' }}>
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', gap: 56, marginBottom: 24 }}>
        <div className="vj-eyebrow-rule" style={{ flexShrink: 0 }}>Bekannt aus</div>
        <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', maxWidth: 540, lineHeight: 1.55 }}>
          Beiträge und Gespräche von Miriam Junge erscheinen regelmäßig in deutschsprachigen Leitmedien.
        </div>
      </div>
    </Container>
    <Marquee speed={64} gap={72} style={{ paddingBlock: 8 }}>
      {[1,2,3,4,5,6,1,2,3,4,5,6].map((i, idx) => (
        <img key={idx} src={`assets/press-${i}.png`} alt="" style={{
          height: 30, width: 'auto', objectFit: 'contain',
          filter: 'grayscale(100%) brightness(0.55)',
          opacity: 0.7,
        }} />
      ))}
    </Marquee>
  </section>
);

// ─── Audience — editorial 5-column with hover reveal ────────
const AudienceSection = () => {
  const [hover, setHover] = React.useState(-1);
  return (
    <section style={{ background: 'var(--color-bg-card)', padding: '128px 0 112px' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 1fr', gap: 80, marginBottom: 64, alignItems: 'flex-end' }}>
          <Reveal>
            <div className="vj-eyebrow-rule" style={{ marginBottom: 20 }}>Für wen?</div>
            <h2 style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
              Für Menschen,<br />
              <OutlineText>die andere</OutlineText><br />
              Menschen begleiten.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: 16.5, fontWeight: 500, color: 'var(--color-fg-secondary)', lineHeight: 1.7, margin: 0, maxWidth: 540 }}>
              Fünf Berufsgruppen — eine geteilte Anforderung: in einer Begegnung wirksam zu sein, ohne sich selbst zu verlieren. Wir bauen die Methodik, du bringst die Praxis.
            </p>
          </Reveal>
        </div>

        <Stagger step={90} y={28} style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0,
          borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)',
        }}>
          {VJ.audiences.map((a, i) => (
            <div key={a.key}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
              style={{
                padding: '36px 24px 32px',
                borderRight: i < VJ.audiences.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: hover === i ? 'var(--color-lavender-xlight)' : 'transparent',
                transition: 'background 320ms ease',
                cursor: 'default', minHeight: 260,
                display: 'flex', flexDirection: 'column',
              }}>
              <span className="vj-pin" style={{ marginBottom: 18 }}>0{i+1}</span>
              <div style={{
                fontSize: 17, fontWeight: 800, color: 'var(--color-near-black)',
                marginBottom: 12, letterSpacing: '-0.015em', lineHeight: 1.2,
              }}>{a.name}</div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--color-fg-secondary)', lineHeight: 1.6, flex: 1 }}>{a.value}</div>
              <div style={{
                marginTop: 18, display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
                color: hover === i ? 'var(--color-lavender-oil)' : 'var(--color-fg-secondary)',
                transition: 'color 240ms ease',
              }}>
                Passende Pfade
                <Icon name="arrow" size={12} color="currentColor" />
              </div>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
};

// ─── Paths — three editorial cards with motion ──────────────
const PathsSection = ({ go }) => (
  <section style={{ background: 'var(--color-bg)', padding: '128px 0', position: 'relative', overflow: 'hidden' }}>
    <BackgroundOrbs variant="light" count={2} />
    <Container style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.55fr 1fr', gap: 80, alignItems: 'flex-end', marginBottom: 56 }}>
        <Reveal>
          <div className="vj-eyebrow-rule" style={{ marginBottom: 20 }}>Drei Pfade</div>
          <h2 style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
            Wähle die Tiefe,<br />
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>die zu dir passt.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-fg-secondary)', lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
            Jeder Pfad endet mit einem privaten Weiterbildungszertifikat und Open Badge. Wir sagen offen: dies ist keine staatlich anerkannte Ausbildung — sondern eine ernsthafte Vertiefung.
          </p>
        </Reveal>
      </div>

      <Stagger step={140} y={36} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'stretch' }}>
        {VJ.paths.map((p, i) => {
          const rec = p.recommended;
          return (
            <Tilt key={p.id} max={3}>
              <div className="vj-card" style={{
                background: rec ? 'var(--color-near-black)' : 'var(--color-bg-card)',
                color: rec ? 'var(--color-fg-on-dark)' : 'var(--color-near-black)',
                borderRadius: 22,
                padding: '38px 30px 30px',
                boxShadow: rec ? '0 28px 64px rgba(48,47,56,0.22)' : '0 4px 24px rgba(180,142,249,0.12)',
                border: rec ? '1px solid rgba(213,191,255,0.18)' : '1px solid var(--color-border)',
                display: 'flex', flexDirection: 'column',
                transform: rec ? 'translateY(-10px)' : 'none',
                position: 'relative', minHeight: 480, overflow: 'hidden',
              }}>
                {rec && (
                  <>
                    <div style={{
                      position: 'absolute', top: -100, right: -80, width: 240, height: 240,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, var(--color-lavender-oil), transparent 60%)',
                      opacity: 0.35, filter: 'blur(20px)',
                    }} />
                    <div style={{
                      position: 'absolute', top: -12, right: 24,
                      background: 'var(--color-lemon-light)', color: 'var(--color-near-black)',
                      fontSize: 10.5, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase',
                      padding: '5px 12px', borderRadius: 9999, zIndex: 2,
                      boxShadow: '0 6px 16px rgba(237,255,102,0.32)',
                    }}>Empfohlen</div>
                  </>
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Tag tone={rec ? 'dark' : 'lavender'}>{p.tier}</Tag>
                  <h3 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.025em', margin: '18px 0 6px', color: 'inherit', lineHeight: 1.1 }}>{p.name}</h3>
                  <div style={{ fontSize: 13.5, color: rec ? '#a09eac' : 'var(--color-fg-secondary)', fontStyle: 'italic', marginBottom: 22 }}>{p.tagline}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 22 }}>
                    <span className="vj-num" style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.035em' }}>{VJ.priceFmt(p.price)}</span>
                    <span style={{ fontSize: 11, color: rec ? '#a09eac' : 'var(--color-fg-secondary)' }}>netto · einmalig</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {p.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, lineHeight: 1.45, color: rec ? '#cdc8d8' : 'var(--color-dark)' }}>
                        <Icon name="check" size={15} color={rec ? 'var(--color-lemon-light)' : 'var(--color-lavender-oil)'} strokeWidth={2.4} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Btn variant={rec ? 'primaryDark' : 'primary'} full className="vj-cta-primary" onClick={() => go('path-' + p.id)}>
                    Pfad ansehen
                    <Icon name="arrow" size={14} color={rec ? 'var(--color-near-black)' : 'var(--color-near-black)'} />
                  </Btn>
                </div>
              </div>
            </Tilt>
          );
        })}
      </Stagger>
    </Container>
  </section>
);

// ─── Single formats teaser — editorial cards w/ hover reveal ─
const SingleFormatsTeaser = ({ go }) => (
  <section style={{ background: 'var(--color-bg-card)', padding: '128px 0' }}>
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 24, flexWrap: 'wrap' }}>
        <Reveal>
          <div className="vj-eyebrow-rule" style={{ marginBottom: 18 }}>Einzelformate</div>
          <h2 style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05, maxWidth: 580 }}>
            Lieber <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>einzeln</span> einsteigen.
          </h2>
          <p style={{ fontSize: 15.5, color: 'var(--color-fg-secondary)', lineHeight: 1.65, marginTop: 16, maxWidth: 540 }}>
            Webinare (90 Min., 149&nbsp;€), Workshops (3 Std., 329&nbsp;€) und Halbtag-Intensive (4 Std., 499&nbsp;€) — als separater Baustein oder zur Probe.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <Magnetic strength={0.2}>
            <Btn variant="secondary" size="lg" onClick={() => go('catalogue')}>Zum Katalog <Icon name="arrow" size={14} /></Btn>
          </Magnetic>
        </Reveal>
      </div>
      <Stagger step={120} y={28} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {VJ.singleFormats.slice(0, 3).map(f => (
          <FormatTeaserCard key={f.id} f={f} go={go} />
        ))}
      </Stagger>
    </Container>
  </section>
);

const FormatTeaserCard = ({ f, go }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={() => go('format-' + f.id)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="vj-card" style={{
        textAlign: 'left',
        background: hover ? 'var(--color-near-black)' : 'var(--color-bg)',
        color: hover ? 'var(--color-lavender-bg)' : 'var(--color-near-black)',
        border: '1px solid var(--color-border)',
        borderRadius: 18, padding: 28, cursor: 'pointer', fontFamily: 'inherit',
        minHeight: 220, position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Tag tone={hover ? 'dark' : 'lavender'}>{f.type} · {f.duration}</Tag>
        <span className="vj-num" style={{ fontSize: 18, fontWeight: 900, transition: 'color 240ms ease' }}>{VJ.priceFmt(f.price)}</span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25, marginBottom: 14, color: 'inherit', flex: 1 }}>{f.title}</div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, color: hover ? '#a09eac' : 'var(--color-fg-secondary)',
        paddingTop: 14, borderTop: hover ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--color-border)',
      }}>
        <span>{f.date.split(' · ')[0]} · {f.instructor}</span>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: hover ? 'var(--color-lemon-light)' : 'var(--color-lavender-xlight)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 240ms ease, transform 320ms cubic-bezier(.2,.8,.2,1)',
          transform: hover ? 'translateX(4px)' : 'translateX(0)',
        }}>
          <Icon name="arrow" size={12} color="var(--color-near-black)" strokeWidth={2.2} />
        </span>
      </div>
    </button>
  );
};

// ─── Founder block — full-bleed editorial w/ parallax ───────
const FounderBlock = ({ go }) => (
  <section style={{ background: 'var(--color-near-black)', color: 'var(--color-fg-on-dark)', padding: '128px 0', position: 'relative', overflow: 'hidden' }}>
    <BackgroundOrbs variant="dark" count={3} />
    <Container style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 72, alignItems: 'center' }}>
        <Reveal y={32}>
          <Parallax speed={0.08}>
            <div className="vj-vignette" style={{
              borderRadius: 22, overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <img src="assets/photo-miriam-2.jpg" alt="Miriam Junge" style={{
                width: '100%', height: 540, objectFit: 'cover', display: 'block',
              }} />
            </div>
          </Parallax>
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow color="var(--color-lemon-light)" style={{ marginBottom: 16 }}>Die Kuratorin</Eyebrow>
            <h2 style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.02, margin: 0, color: 'var(--color-lavender-bg)' }}>
              Miriam<br />Junge.
            </h2>
            <div style={{ marginTop: 12, fontSize: 17, fontStyle: 'italic', color: 'var(--color-lavender-light)', fontWeight: 400 }}>
              Psychologin · Therapeutin · Autorin
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p style={{ fontSize: 16, fontWeight: 500, color: '#cdc8d8', lineHeight: 1.7, marginTop: 28, maxWidth: 560 }}>
              Diplom-Psychologin (Berlin), approbierte Psychotherapeutin, über zwei Jahrzehnte Praxis mit Führungskräften, Teams und Privatpersonen. Regelmäßige Beiträge in Zeit, Handelsblatt und Deutschlandfunk Nova. VanJunge ist ihr persönliches Kuratorat — kein Marktplatz, kein Skillshare.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 40, maxWidth: 520 }}>
              {[
                [20, '+', 'Jahre Praxis'],
                [7, '',  'Fachbücher'],
                [1, '',  'Kuratorin'],
              ].map(([n, suffix, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 52, fontWeight: 900, color: 'var(--color-lemon-light)', letterSpacing: '-0.04em', lineHeight: 0.9 }}>
                    <AnimatedNumber to={n} suffix={suffix} />
                  </div>
                  <div style={{ fontSize: 11.5, color: '#a09eac', marginTop: 8, letterSpacing: '.04em' }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={460}>
            <div style={{ marginTop: 40 }}>
              <Magnetic strength={0.2}>
                <Btn variant="primaryDark" size="md" onClick={() => go('about')}>Mehr über die Akademie <Icon name="arrow" size={14} /></Btn>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </Container>
  </section>
);

// ─── Testimonials — editorial layout ────────────────────────
const TestimonialsSection = () => (
  <section style={{ background: '#26252c', padding: '128px 0', color: 'var(--color-fg-on-dark)', position: 'relative', overflow: 'hidden' }}>
    <Container>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Eyebrow color="var(--color-lemon-light)" style={{ marginBottom: 16 }}>Stimmen aus der Praxis</Eyebrow>
          <h2 style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: 'var(--color-lavender-bg)' }}>
            Echte Worte.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-lavender-light)' }}>Keine Marketing-Sprache.</span>
          </h2>
        </div>
      </Reveal>
      <Stagger step={160} y={36} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {VJ.testimonials.map((t, i) => (
          <div key={i} className="vj-card" style={{
            background: 'rgba(255,255,255,0.035)',
            border: '1px solid rgba(213,191,255,0.10)',
            borderRadius: 18, padding: '34px 30px',
            display: 'flex', flexDirection: 'column',
            backdropFilter: 'blur(4px)',
          }}>
            <svg width="40" height="32" viewBox="0 0 40 32" style={{ color: 'var(--color-lemon-light)', marginBottom: 18 }}>
              <path d="M0 32V20C0 10 7 2 18 0v6c-6 2-10 7-10 14h10v12H0zm22 0V20c0-10 7-18 18-20v6c-6 2-10 7-10 14h10v12H22z" fill="currentColor" />
            </svg>
            <p style={{ fontSize: 16, fontWeight: 500, color: '#e6d9ff', lineHeight: 1.65, fontStyle: 'italic', flex: 1, margin: '0 0 26px' }}>
              {t.quote}
            </p>
            <div style={{ paddingTop: 18, borderTop: '1px solid rgba(213,191,255,0.10)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-lavender-bg)' }}>{t.name}</div>
              <div style={{ fontSize: 12, color: '#a09eac', marginTop: 4 }}>{t.role}</div>
            </div>
          </div>
        ))}
      </Stagger>
    </Container>
  </section>
);

// ─── Newsletter — full-bleed dusk-dawn ──────────────────────
const NewsletterSection = () => {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  return (
    <section style={{ padding: '128px 0', background: 'var(--gradient-dusk-dawn)', position: 'relative', overflow: 'hidden' }}>
      <BackgroundOrbs variant="light" count={2} />
      <Container maxW={720} style={{ position: 'relative', zIndex: 2 }}>
        <Reveal>
          <div style={{ textAlign: 'center' }}>
            <Eyebrow color="var(--color-dark)" style={{ marginBottom: 18 }}>Briefing</Eyebrow>
            <h2 style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 22px' }}>
              Drei mal im Jahr<br /><span style={{ fontStyle: 'italic', fontWeight: 500 }}>ein Brief.</span>
            </h2>
            <p style={{ fontSize: 16.5, color: 'var(--color-dark)', lineHeight: 1.65, margin: '0 0 36px', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
              Eine kuratierte Lese-Empfehlung von Miriam, ein Modulrückblick, ein Termin. Drei Mal pro Jahr — sonst nichts.
            </p>
            {sent ? (
              <div style={{
                background: 'var(--color-bg-card)', borderRadius: 16,
                padding: '20px 32px', display: 'inline-flex', alignItems: 'center', gap: 12,
                fontSize: 14, fontWeight: 700,
                boxShadow: '0 12px 32px rgba(48,47,56,0.12)',
                animation: 'vj-route 480ms ease',
              }}>
                <Icon name="check" size={18} color="var(--color-lavender-oil)" strokeWidth={2.4} />
                Danke, dein Briefing ist eingerichtet.
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSent(true); }} style={{ display: 'flex', gap: 10, maxWidth: 520, margin: '0 auto', flexWrap: 'wrap' }}>
                <input type="email" placeholder="deine@adresse.de" value={email} onChange={e => setEmail(e.target.value)} required style={{
                  flex: 1, minWidth: 240, border: 'none', background: 'var(--color-bg-card)',
                  borderRadius: 9999, padding: '16px 24px', fontSize: 14.5, fontWeight: 500, fontFamily: 'inherit',
                  boxShadow: '0 4px 14px rgba(48,47,56,0.08)',
                }} />
                <Magnetic strength={0.18}>
                  <Btn variant="dark" size="lg" type="submit" className="vj-cta-primary" style={{ paddingLeft: 32, paddingRight: 32 }}>
                    Brief abonnieren
                  </Btn>
                </Magnetic>
              </form>
            )}
            <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', marginTop: 20 }}>
              Mit der Anmeldung stimmst du der Verarbeitung gemäß <a href="#" style={{ color: 'var(--color-near-black)', fontWeight: 700 }}>Datenschutzerklärung</a> zu.
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

// ─── Pull-quote section — bridges narrative ─────────────────
const PullQuote = () => (
  <section style={{ padding: '112px 0', background: 'var(--color-bg-card)' }}>
    <Container maxW={920}>
      <Reveal>
        <div className="vj-eyebrow-rule" style={{ marginBottom: 32 }}>Haltung</div>
        <p style={{
          fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 500,
          letterSpacing: '-0.02em', lineHeight: 1.25, margin: 0,
          color: 'var(--color-near-black)',
        }}>
          <span style={{ fontStyle: 'italic', color: 'var(--color-lavender-oil)' }}>„</span>
          Wer Menschen ernsthaft begleiten will, braucht <span className="vj-mark">Methodik mit Mechanismus</span> — kein Repertoire aus Buzzwords. Was wir tun, soll erklärbar sein, replizierbar, und seine Grenzen kennen.<span style={{ fontStyle: 'italic', color: 'var(--color-lavender-oil)' }}>"</span>
        </p>
        <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name="Miriam Junge" src="assets/photo-miriam.jpg" size={48} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Miriam Junge</div>
            <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)' }}>Gründerin · Kuratorin</div>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

const HomePage = ({ go }) => (
  <div className="route-fade">
    <HomeHero go={go} />
    <HomePressStrip />
    <AudienceSection />
    <PullQuote />
    <PathsSection go={go} />
    <SingleFormatsTeaser go={go} />
    <FounderBlock go={go} />
    <TestimonialsSection />
    <NewsletterSection />
  </div>
);

// ─── Catalogue ──────────────────────────────────────────────
const ComparisonMatrix = ({ go }) => {
  const rows = [
    ['Live-Webinare',            p => p.webinars + ' × 90 Min.'],
    ['Praxis-Workshops',         p => p.workshops > 0 ? p.workshops + ' × 3 Std.' : '—'],
    ['Supervision',              p => p.supervision ? '3 × 60 Min.' : '—'],
    ['Begleitmaterialien',       p => 'Methodenkarten, Lesematerial'],
    ['Kohorten-Community',       p => p.tier !== 'Essential' ? 'Geschlossene Kohorte' : 'Sammel-Termine'],
    ['Eigene Fallarbeit',        p => p.tier === 'Essential' ? '—' : (p.tier === 'Professional' ? 'In Kleingruppen' : 'Individuell + Plenum')],
    ['Spezialisierung',          p => p.tier === 'Expert' ? 'Schwerpunktthema' : '—'],
    ['Aufnahme in Expert Pool',  p => p.tier === 'Expert' ? 'Ja' : '—'],
    ['Zeitlicher Umfang',        p => '≈ ' + p.hours + ' Std.'],
    ['Preis',                    p => VJ.priceFmt(p.price) + ' netto'],
  ];
  return (
    <div style={{
      background: 'var(--color-bg-card)', borderRadius: 22, overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(180,142,249,0.10)', border: '1px solid var(--color-border)',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr' }}>
        <div style={{ padding: '32px 28px', borderBottom: '1px solid var(--color-border)' }}>
          <Eyebrow style={{ marginBottom: 8 }}>Vergleich</Eyebrow>
          <div style={{ fontSize: 14, color: 'var(--color-fg-secondary)', lineHeight: 1.55 }}>Wähle den Pfad, der zu deiner Tiefe passt.</div>
        </div>
        {VJ.paths.map(p => (
          <div key={p.id} style={{
            padding: '32px 24px', borderBottom: '1px solid var(--color-border)',
            borderLeft: '1px solid var(--color-border)',
            background: p.recommended ? 'var(--color-near-black)' : 'transparent',
            color: p.recommended ? 'var(--color-fg-on-dark)' : 'inherit', position: 'relative',
          }}>
            {p.recommended && (
              <div style={{
                position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                background: 'var(--color-lemon-light)', color: 'var(--color-near-black)',
                fontSize: 10, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: 9999,
              }}>Empfohlen</div>
            )}
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: p.recommended ? 'var(--color-lavender-light)' : 'var(--color-lavender-oil)', marginBottom: 8 }}>{p.tier}</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.015em', marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 12.5, color: p.recommended ? '#a09eac' : 'var(--color-fg-secondary)' }}>{p.tagline}</div>
          </div>
        ))}
        {rows.map(([label, fn], i) => (
          <React.Fragment key={i}>
            <div style={{ padding: '18px 28px', borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--color-border)', fontSize: 13, fontWeight: 600, color: 'var(--color-dark)', display: 'flex', alignItems: 'center' }}>{label}</div>
            {VJ.paths.map(p => (
              <div key={p.id} style={{
                padding: '18px 24px', borderLeft: '1px solid var(--color-border)',
                borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--color-border)',
                fontSize: 13.5, fontWeight: 500,
                background: p.recommended ? 'var(--color-near-black)' : 'transparent',
                color: p.recommended ? 'var(--color-lavender-bg)' : 'var(--color-near-black)',
              }}>{fn(p)}</div>
            ))}
          </React.Fragment>
        ))}
        <div style={{ padding: '22px 28px', fontSize: 12, color: 'var(--color-fg-secondary)', display: 'flex', alignItems: 'center' }}>Alle Pfade mit Zertifikat + Open Badge</div>
        {VJ.paths.map(p => (
          <div key={p.id} style={{ padding: '22px 24px', borderLeft: '1px solid var(--color-border)', background: p.recommended ? 'var(--color-near-black)' : 'transparent' }}>
            <Btn variant={p.recommended ? 'primaryDark' : 'primary'} full size="md" onClick={() => go('path-' + p.id)}>Details</Btn>
          </div>
        ))}
      </div>
    </div>
  );
};

const CataloguePage = ({ go }) => {
  const [fmt, setFmt] = React.useState('Alle');
  const [aud, setAud] = React.useState('Alle');
  const filtered = VJ.singleFormats.filter(f =>
    (fmt === 'Alle' || f.type === fmt) &&
    (aud === 'Alle' || f.audience.includes(aud))
  );
  return (
    <div className="route-fade">
      <section style={{ background: 'var(--color-bg-card)', padding: '96px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <Container>
          <Reveal>
            <Eyebrow style={{ marginBottom: 18 }}>Katalog 2026</Eyebrow>
            <h1 style={{ fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.98, margin: 0, maxWidth: 900 }}>
              Drei Pfade,<br />
              ein Dutzend Einzelformate,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>eine kuratorische Linie.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p style={{ fontSize: 17, color: 'var(--color-fg-secondary)', lineHeight: 1.65, marginTop: 28, maxWidth: 620 }}>
              Alle Formate sind live, alle Preise netto. Wähle einen Pfad für die strukturierte Vertiefung — oder ein Einzelformat als Probe.
            </p>
          </Reveal>
        </Container>
      </section>

      <section style={{ background: 'var(--color-bg)', padding: '64px 0' }}>
        <Container>
          <Reveal><ComparisonMatrix go={go} /></Reveal>
        </Container>
      </section>

      <section style={{ background: 'var(--color-bg-card)', padding: '88px 0 128px' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
            <Reveal>
              <Eyebrow style={{ marginBottom: 12 }}>Einzelformate</Eyebrow>
              <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.025em', margin: 0 }}>Webinare, Workshops, Halbtage</h2>
            </Reveal>
            <Reveal delay={140}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--color-fg-secondary)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>Format</div>
                  <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--color-bg)', borderRadius: 9999, border: '1px solid var(--color-border)' }}>
                    {['Alle', 'Webinar', 'Workshop', 'Intensiv'].map(o => (
                      <button key={o} onClick={() => setFmt(o)} style={{
                        background: fmt === o ? 'var(--color-near-black)' : 'transparent',
                        color: fmt === o ? 'var(--color-lavender-bg)' : 'var(--color-fg-secondary)',
                        border: 'none', borderRadius: 9999, padding: '7px 14px',
                        fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        transition: 'all 240ms ease',
                      }}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--color-fg-secondary)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>Zielgruppe</div>
                  <Select value={aud} onChange={e => setAud(e.target.value)} style={{ padding: '9px 14px', fontSize: 12.5, fontWeight: 600 }}>
                    <option value="Alle">Alle Zielgruppen</option>
                    {VJ.audiences.map(a => <option key={a.key} value={a.key}>{a.name}</option>)}
                  </Select>
                </div>
              </div>
            </Reveal>
          </div>
          <Stagger step={80} y={24} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {filtered.map(f => <FormatTeaserCard key={f.id} f={f} go={go} />)}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: 64, textAlign: 'center', fontSize: 14, color: 'var(--color-fg-secondary)' }}>
                Keine Formate in dieser Kombination. <InlineLink onClick={() => { setFmt('Alle'); setAud('Alle'); }}>Filter zurücksetzen</InlineLink>
              </div>
            )}
          </Stagger>
        </Container>
      </section>
    </div>
  );
};

Object.assign(window, {
  HomePage, CataloguePage, FormatTeaserCard, ComparisonMatrix,
});
