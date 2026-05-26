// auth-checkout.jsx, Register, Login, Checkout

// ─── Auth shared shell ───────────────────────────────────────
const AuthShell = ({ children, side }) => (
  <div style={{ minHeight: 'calc(100vh - 72px)', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', background: 'var(--color-bg-card)' }}>
    <div style={{ padding: '88px 64px 56px', display: 'flex', flexDirection: 'column' }}>
      <Container style={{ padding: 0, maxWidth: 460, width: '100%', margin: '0 auto' }}>
        {children}
      </Container>
    </div>
    <div style={{
      background: 'var(--gradient-dusk-dawn)',
      padding: '64px 56px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      borderLeft: '1px solid var(--color-border)',
      position: 'relative', overflow: 'hidden',
    }}>
      <BackgroundOrbs variant="light" count={2} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {side || <AuthSidePanel />}
      </div>
    </div>
  </div>
);

const AuthSidePanel = () => (
  <>
    <div>
      <Reveal>
        <Eyebrow color="var(--color-dark)" style={{ marginBottom: 22 }}>VanJunge Akademie</Eyebrow>
        <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.0, margin: 0, maxWidth: 460 }}>
          Ein Konto.<br />
          Drei Pfade.<br />
          <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-dark)' }}>Alle Einzelformate.</span>
        </h2>
      </Reveal>
      <Reveal delay={180}>
        <p style={{ fontSize: 15.5, color: 'var(--color-dark)', lineHeight: 1.7, marginTop: 24, maxWidth: 400 }}>
          Mit deinem Account siehst du gebuchte Module, Live-Termine, Zertifikate und Materialien an einem Ort.
        </p>
      </Reveal>
    </div>
    <Reveal delay={340}>
      <div style={{ marginTop: 'auto' }}>
        <Card style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 40px rgba(48,47,56,0.10)' }} padding={26}>
          <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>Was Teilnehmende sagen</div>
          <p style={{ fontSize: 14.5, fontWeight: 500, fontStyle: 'italic', color: 'var(--color-dark)', lineHeight: 1.65, margin: '0 0 18px' }}>
            „Ich bin sehr froh mit dem, was ihr angeboten habt, für mich hätte noch eine zweite Session angehängt werden können."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name="Amber Schoop" size={36} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>Amber Schoop</div>
              <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)' }}>Coach im Performing-Arts-Bereich</div>
            </div>
          </div>
        </Card>
      </div>
    </Reveal>
  </>
);

// ─── Register ────────────────────────────────────────────────
const RegisterPage = ({ go, setAuthed }) => {
  const [form, setForm] = React.useState({ name: '', email: '', pw: '', field: '', accept: false });
  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const valid = form.name && form.email && form.pw.length >= 8 && form.field && form.accept;
  const submit = e => { e.preventDefault(); if (!valid) return; setAuthed(true); go('dashboard'); };

  return (
    <AuthShell>
      <button onClick={() => go('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--color-fg-secondary)', marginBottom: 28 }}>
        <Icon name="arrowLeft" size={14} /> Zurück zur Startseite
      </button>
      <Eyebrow style={{ marginBottom: 14 }}>Konto anlegen</Eyebrow>
      <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1 }}>Jetzt registrieren.</h1>
      <p style={{ fontSize: 14.5, color: 'var(--color-fg-secondary)', lineHeight: 1.6, margin: '14px 0 32px' }}>
        Du hast schon ein Konto? <InlineLink onClick={() => go('login')}>Jetzt anmelden</InlineLink>
      </p>
      <form onSubmit={submit} style={{ display: 'grid', gap: 18 }}>
        <Field label="Vor- und Nachname" required>
          <Input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Lena Albrecht" required />
        </Field>
        <Field label="E-Mail-Adresse" required>
          <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="du@beispiel.de" required />
        </Field>
        <Field label="Passwort" required hint="Min. 8 Zeichen">
          <Input type="password" value={form.pw} onChange={e => update('pw', e.target.value)} placeholder="••••••••" required />
        </Field>
        <Field label="Berufsfeld" required>
          <Select value={form.field} onChange={e => update('field', e.target.value)} required>
            <option value="" disabled>Bitte wählen</option>
            {VJ.audiences.map(a => <option key={a.key} value={a.name}>{a.name}</option>)}
          </Select>
        </Field>
        <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--color-fg-secondary)', lineHeight: 1.55, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.accept} onChange={e => update('accept', e.target.checked)} style={{ marginTop: 3, accentColor: 'var(--color-lavender-oil)' }} required />
          <span>Ich habe die <a href="#" style={{ color: 'var(--color-near-black)', fontWeight: 700 }}>Datenschutzerklärung</a> und die <a href="#" style={{ color: 'var(--color-near-black)', fontWeight: 700 }}>AGB</a> gelesen und stimme der Verarbeitung meiner Daten zu.</span>
        </label>
        <Btn type="submit" variant="primary" size="lg" full disabled={!valid}>Jetzt registrieren</Btn>
        <div style={{ fontSize: 11.5, color: 'var(--color-fg-secondary)', textAlign: 'center' }}>
          Mit der Registrierung legst du noch keine Buchung an. Du erhältst Zugang zum Bereich „Meine Weiterbildung".
        </div>
      </form>
    </AuthShell>
  );
};

// ─── Login ───────────────────────────────────────────────────
const LoginPage = ({ go, setAuthed }) => {
  const [email, setEmail] = React.useState(VJ.user.email);
  const [pw, setPw] = React.useState('demo-password');
  const submit = e => { e.preventDefault(); setAuthed(true); go('dashboard'); };
  return (
    <AuthShell>
      <button onClick={() => go('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--color-fg-secondary)', marginBottom: 28 }}>
        <Icon name="arrowLeft" size={14} /> Zurück zur Startseite
      </button>
      <Eyebrow style={{ marginBottom: 14 }}>Anmelden</Eyebrow>
      <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1 }}>Willkommen zurück.</h1>
      <p style={{ fontSize: 14.5, color: 'var(--color-fg-secondary)', lineHeight: 1.6, margin: '14px 0 32px' }}>
        Neu hier? <InlineLink onClick={() => go('register')}>Konto erstellen</InlineLink>
      </p>
      <form onSubmit={submit} style={{ display: 'grid', gap: 18 }}>
        <Field label="E-Mail-Adresse" required>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="du@beispiel.de" required />
        </Field>
        <Field label="Passwort" hint={<InlineLink color="var(--color-fg-secondary)">Passwort vergessen?</InlineLink>} required>
          <Input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" required />
        </Field>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, color: 'var(--color-fg-secondary)' }}>
          <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-lavender-oil)' }} /> Auf diesem Gerät angemeldet bleiben
        </label>
        <Btn type="submit" variant="primary" size="lg" full>Anmelden</Btn>
        <div style={{
          marginTop: 16, padding: '14px 16px',
          background: 'var(--color-lavender-xlight)', borderRadius: 10,
          fontSize: 12, color: 'var(--color-near-black)', lineHeight: 1.55,
        }}>
          <strong>Prototyp-Hinweis:</strong> Klicke einfach „Anmelden", du landest direkt im Lernbereich.
        </div>
      </form>
    </AuthShell>
  );
};

// ─── Checkout ────────────────────────────────────────────────
const CheckoutPage = ({ go, setAuthed }) => {
  const path = VJ.paths.find(p => p.id === 'professional');
  const price = VJ.priceWithMwSt(path.price);
  const [billing, setBilling] = React.useState({ company: '', name: VJ.user.name, vat: '', street: '', plz: '', city: '', country: 'Deutschland' });
  const [method, setMethod] = React.useState('card');
  const [done, setDone] = React.useState(false);

  const onPay = () => {
    setDone(true);
    setAuthed(true);
    setTimeout(() => go('dashboard'), 1400);
  };

  if (done) return (
    <div style={{
      minHeight: '100vh', background: 'var(--gradient-dusk-dawn)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <BackgroundOrbs variant="light" count={3} />
      {/* Confetti-ish radiating petals */}
      <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 8, height: 8, borderRadius: '50%',
            background: i % 2 ? 'var(--color-lavender-oil)' : 'var(--color-lemon-light)',
            transform: `rotate(${i * 30}deg) translateY(-120px)`,
            transformOrigin: '50% 120px',
            opacity: 0.7,
            animation: `vj-float ${3 + (i % 4)}s ease-in-out ${i * 0.12}s infinite`,
          }} />
        ))}
      </div>
      <Card padding={56} style={{
        textAlign: 'center', maxWidth: 500, position: 'relative', zIndex: 2,
        animation: 'vj-route 720ms cubic-bezier(.2,.8,.2,1)',
        boxShadow: '0 40px 100px rgba(48,47,56,0.18)',
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: 'var(--color-lavender-xlight)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 0 0 8px rgba(180,142,249,0.12), 0 0 0 16px rgba(180,142,249,0.06)',
        }}>
          <Icon name="check" size={44} color="var(--color-lavender-oil)" strokeWidth={2.4} />
        </div>
        <Eyebrow style={{ marginBottom: 10 }}>Willkommen in der Akademie</Eyebrow>
        <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.1 }}>Buchung bestätigt.</h2>
        <p style={{ fontSize: 15, color: 'var(--color-fg-secondary)', lineHeight: 1.7, margin: '16px 0 0' }}>
          Du wirst gleich zu deinem Lernbereich weitergeleitet.
        </p>
      </Card>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Slim chrome */}
      <div style={{ background: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border)', padding: '18px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo onClick={() => go('home')} />
        <div style={{ fontSize: 12, color: 'var(--color-fg-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="lock" size={14} color="var(--color-lavender-oil)" /> Sichere Zahlung über Stripe · SSL-verschlüsselt
        </div>
      </div>

      <Container style={{ padding: '48px 32px 96px' }}>
        <button onClick={() => go('path-professional')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--color-fg-secondary)', marginBottom: 22 }}>
          <Icon name="arrowLeft" size={14} /> Zurück zum Pfad
        </button>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 36px' }}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 36, alignItems: 'flex-start' }}>
          {/* Order summary */}
          <div>
            <Card padding={28} style={{ position: 'sticky', top: 88 }}>
              <Eyebrow style={{ marginBottom: 16 }}>Bestellung</Eyebrow>

              <div style={{
                background: 'var(--color-bg)', borderRadius: 12,
                padding: '20px 22px', marginBottom: 22, border: '1px solid var(--color-border)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <Tag tone="lavender">{path.tier}</Tag>
                    <div style={{ fontSize: 17, fontWeight: 800, marginTop: 10 }}>{path.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--color-fg-secondary)', marginTop: 6 }}>{path.webinars} Webinare + {path.workshops} Workshop · {path.hours} Std.</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{VJ.priceFmt(path.price)}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: 12 }}>
                  Kohorte „Sommer 2026" · Start 14. Mai · 18 Plätze
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5 }}>
                <SummaryRow label="Zwischensumme (netto)" value={VJ.priceFmt(price.netto)} />
                <SummaryRow label="MwSt. (19 %)" value={VJ.priceFmt(price.mwst)} />
                <div style={{ height: 1, background: 'var(--color-border)', margin: '6px 0' }} />
                <SummaryRow label={<strong>Gesamt (brutto)</strong>} value={<strong style={{ fontSize: 22 }}>{VJ.priceFmt(price.brutto)}</strong>} />
              </div>

              <div style={{ marginTop: 22, padding: 14, background: 'var(--color-lavender-xlight)', borderRadius: 10, fontSize: 12, color: 'var(--color-near-black)', lineHeight: 1.55 }}>
                Einmalige Zahlung. Keine wiederkehrende Abbuchung. Auf Wunsch Ratenzahlung in 3 × oder 6 ×, schreib uns vor dem Kauf an.
              </div>

              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: 'var(--color-fg-secondary)' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon name="check" size={14} color="var(--color-lavender-oil)" />14 Tage Widerrufsrecht ab Buchung</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon name="check" size={14} color="var(--color-lavender-oil)" />Sichere Zahlung über Stripe</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon name="check" size={14} color="var(--color-lavender-oil)" />Rechnung mit ausgewiesener MwSt.</div>
              </div>
            </Card>
          </div>

          {/* Payment form */}
          <Card padding={32}>
            <Eyebrow style={{ marginBottom: 22 }}>Zahlung</Eyebrow>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Zahlungsmethode</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  ['card', 'Kreditkarte', 'card'],
                  ['sepa', 'SEPA-Lastschrift', 'sepa'],
                  ['invoice', 'Rechnung (14 T.)', 'invoice'],
                ].map(([k, label]) => (
                  <button key={k} onClick={() => setMethod(k)} style={{
                    background: method === k ? 'var(--color-near-black)' : 'var(--color-bg)',
                    color: method === k ? 'var(--color-lavender-bg)' : 'var(--color-dark)',
                    border: method === k ? 'none' : '1px solid var(--color-border)',
                    borderRadius: 10, padding: '14px 12px',
                    fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  }}>{label}</button>
                ))}
              </div>
            </div>

            {method === 'card' && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Kartendaten</div>
                {/* Stripe Elements placeholder slot */}
                <div style={{
                  border: '1.5px dashed var(--color-lavender-light)',
                  background: 'var(--color-lavender-xlight)',
                  borderRadius: 12, padding: '18px 18px',
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', top: -10, left: 16, background: 'var(--color-bg-card)', padding: '0 10px', fontSize: 10.5, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-lavender-oil)' }}>Stripe Elements</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--color-bg-card)', borderRadius: 8 }}>
                    <span style={{ fontSize: 14, color: 'var(--color-fg-secondary)', fontFamily: 'monospace', letterSpacing: '.04em' }}>1234 1234 1234 1234</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ width: 26, height: 16, background: 'var(--color-near-black)', borderRadius: 3, display: 'inline-block' }} />
                      <span style={{ width: 26, height: 16, background: 'var(--color-lavender-oil)', borderRadius: 3, display: 'inline-block' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                    <div style={{ padding: '12px 14px', background: 'var(--color-bg-card)', borderRadius: 8, fontSize: 14, color: 'var(--color-fg-secondary)', fontFamily: 'monospace' }}>MM / JJ</div>
                    <div style={{ padding: '12px 14px', background: 'var(--color-bg-card)', borderRadius: 8, fontSize: 14, color: 'var(--color-fg-secondary)', fontFamily: 'monospace' }}>CVC</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-fg-secondary)', marginTop: 10, lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="lock" size={12} /> Wird im Produktiv-Build durch Stripe Elements ersetzt, Daten gehen niemals durch den VanJunge-Server.
                  </div>
                </div>
              </div>
            )}

            {method === 'sepa' && (
              <div style={{ marginBottom: 28, display: 'grid', gap: 14 }}>
                <Field label="IBAN" required><Input placeholder="DE00 0000 0000 0000 0000 00" /></Field>
                <Field label="Kontoinhaber:in" required><Input placeholder={VJ.user.name} /></Field>
              </div>
            )}

            {method === 'invoice' && (
              <div style={{
                marginBottom: 28, padding: '18px 18px',
                background: 'var(--color-bg)', borderRadius: 12, border: '1px solid var(--color-border)',
                fontSize: 13.5, lineHeight: 1.65, color: 'var(--color-dark)',
              }}>
                Wir senden dir eine Rechnung per E-Mail. Zahlungsziel <strong>14 Tage</strong>. Der Zugang wird nach Zahlungseingang freigeschaltet.
              </div>
            )}

            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Rechnungsadresse</div>
            <div style={{ display: 'grid', gap: 14, marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="Firma (optional)"><Input value={billing.company} onChange={e => setBilling({ ...billing, company: e.target.value })} placeholder="Coaching-Praxis Albrecht" /></Field>
                <Field label="USt-IdNr. (optional)"><Input value={billing.vat} onChange={e => setBilling({ ...billing, vat: e.target.value })} placeholder="DE…" /></Field>
              </div>
              <Field label="Vor- und Nachname" required><Input value={billing.name} onChange={e => setBilling({ ...billing, name: e.target.value })} /></Field>
              <Field label="Straße &amp; Hausnummer" required><Input value={billing.street} onChange={e => setBilling({ ...billing, street: e.target.value })} placeholder="Musterstraße 12" required /></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 0.6fr 0.6fr', gap: 10 }}>
                <Field label="PLZ" required><Input value={billing.plz} onChange={e => setBilling({ ...billing, plz: e.target.value })} placeholder="10115" required /></Field>
                <Field label="Stadt" required><Input value={billing.city} onChange={e => setBilling({ ...billing, city: e.target.value })} placeholder="Berlin" required /></Field>
                <Field label="Land">
                  <Select value={billing.country} onChange={e => setBilling({ ...billing, country: e.target.value })}>
                    <option>Deutschland</option><option>Österreich</option><option>Schweiz</option>
                  </Select>
                </Field>
              </div>
            </div>

            <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--color-fg-secondary)', lineHeight: 1.55, marginBottom: 20 }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 3, accentColor: 'var(--color-lavender-oil)' }} required />
              <span>
                Ich willige ein, dass mit der Erbringung der Dienstleistung vor Ablauf der Widerrufsfrist begonnen wird. Mit Beginn verliere ich mein Widerrufsrecht.
              </span>
            </label>

            <Magnetic strength={0.14}>
              <Btn variant="primary" size="lg" full className="vj-cta-primary" onClick={onPay}>
                <Icon name="lock" size={14} color="var(--color-near-black)" />
                Zahlungspflichtig buchen, {VJ.priceFmt(price.brutto)}
              </Btn>
            </Magnetic>

            <div style={{ marginTop: 14, fontSize: 11.5, color: 'var(--color-fg-secondary)', textAlign: 'center' }}>
              Mit „Zahlungspflichtig buchen" akzeptierst du unsere AGB und die Widerrufsbelehrung.
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

const SummaryRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ color: 'var(--color-fg-secondary)' }}>{label}</span>
    <span style={{ color: 'var(--color-near-black)', fontWeight: 600 }}>{value}</span>
  </div>
);

Object.assign(window, { RegisterPage, LoginPage, CheckoutPage });
