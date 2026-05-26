/* Shared mock data for the VanJunge prototype.
   Plain globals so every Babel script can read them. */

window.VJ = window.VJ || {};

VJ.user = {
  name: 'Lena Albrecht',
  firstName: 'Lena',
  email: 'lena.albrecht@coachingpraxis.de',
  field: 'Coaches',
};

VJ.audiences = [
  { key: 'coaches',   name: 'Coaches',                       value: 'Schärfe Methodik und Haltung, über die Standardausbildung hinaus.' },
  { key: 'hr',        name: 'HR-Professionals',              value: 'Begleite Menschen in Veränderung mit psychologischer Tiefe.' },
  { key: 'fuehrung',  name: 'Führungskräfte',                value: 'Führe mit klarem Kopf und ruhiger Hand, wissenschaftlich gestützt.' },
  { key: 'psych',     name: 'Psycholog:innen & Therapeut:innen', value: 'Erweitere dein Repertoire um lösungs- und ressourcenorientierte Methoden.' },
  { key: 'consult',   name: 'Beratende',                     value: 'Setze Coaching-Werkzeuge gezielt in Strategie- und Beratungsmandaten ein.' },
];

VJ.paths = [
  {
    id: 'essential',
    name: 'VanJunge Essential',
    tier: 'Essential',
    tagline: 'Der fundierte Einstieg.',
    price: 590,
    hours: 6,
    webinars: 4,
    workshops: 0,
    supervision: false,
    description:
      'Vier kuratierte Live-Webinare zu den Grundlagen einer psychologisch fundierten Begleitung. Für alle, die zuerst Substanz prüfen wollen, bevor sie weiter investieren.',
    features: [
      '4 Live-Webinare · je 90 Min.',
      'Begleitendes Lesematerial pro Modul',
      'Aufzeichnungen verfügbar',
      'Privates Weiterbildungszertifikat + Open Badge',
    ],
    audience: ['coaches', 'hr', 'consult'],
  },
  {
    id: 'professional',
    name: 'VanJunge Professional',
    tier: 'Professional',
    tagline: 'Die kuratierte Vertiefung.',
    price: 1390,
    hours: 15,
    webinars: 8,
    workshops: 1,
    supervision: false,
    recommended: true,
    description:
      'Acht Live-Webinare und ein dreistündiger Praxis-Workshop. Du arbeitest in einer überschaubaren Kohorte an realen Fällen, übst in Kleingruppen und entwickelst deinen eigenen Stil weiter.',
    features: [
      '8 Live-Webinare · je 90 Min.',
      '1 Praxis-Workshop · 3 Std.',
      'Fallarbeit in fester Kohorte (max. 18 TN)',
      'Begleitmaterial und Methodenkarten',
      'Privates Weiterbildungszertifikat + Open Badge',
    ],
    audience: ['coaches', 'hr', 'fuehrung', 'psych', 'consult'],
  },
  {
    id: 'expert',
    name: 'VanJunge Expert',
    tier: 'Expert',
    tagline: 'Für die nächste Stufe deiner Praxis.',
    price: 2490,
    hours: 25,
    webinars: 12,
    workshops: 2,
    supervision: true,
    description:
      'Zwölf Live-Webinare, zwei Workshops und persönliche Supervision. Du spezialisierst dich, präsentierst eigene Fallarbeiten und wirst in den VanJunge Expert Pool aufgenommen.',
    features: [
      '12 Live-Webinare · je 90 Min.',
      '2 Praxis-Workshops · je 3 Std.',
      '3 Supervisionseinheiten · je 60 Min.',
      'Spezialisierung in einem Schwerpunktthema',
      'Aufnahme in den VanJunge Expert Pool',
      'Privates Weiterbildungszertifikat + Open Badge',
    ],
    audience: ['coaches', 'fuehrung', 'psych'],
  },
];

VJ.singleFormats = [
  { id: 'fragetechniken', type: 'Workshop', duration: '3 Std.', price: 329, title: 'Fragetechniken in schwierigen Gesprächen', audience: ['coaches', 'hr', 'fuehrung'], date: '14. Juni 2026 · 14:00–17:00', instructor: 'Miriam Junge' },
  { id: 'widerstand',     type: 'Webinar',  duration: '90 Min.', price: 149, title: 'Umgang mit Widerstand und Krisen',        audience: ['coaches', 'psych', 'consult'], date: '04. Juni 2026 · 19:00–20:30', instructor: 'Dr. Theresa Hoff' },
  { id: 'systemisch',     type: 'Webinar',  duration: '90 Min.', price: 149, title: 'Systemisches Denken im Coaching',         audience: ['coaches', 'consult'], date: '18. Juni 2026 · 19:00–20:30', instructor: 'Miriam Junge' },
  { id: 'fallarbeit',     type: 'Intensiv', duration: '4 Std.',  price: 499, title: 'Halbtag Intensiv: Fallarbeit & Supervision', audience: ['coaches', 'psych'], date: '28. Juni 2026 · 09:00–13:00', instructor: 'Miriam Junge + Gast' },
  { id: 'fuehrungspsych', type: 'Webinar',  duration: '90 Min.', price: 149, title: 'Führungspsychologie im Alltag',           audience: ['fuehrung', 'hr'], date: '02. Juli 2026 · 18:30–20:00', instructor: 'Dr. Theresa Hoff' },
  { id: 'team',           type: 'Workshop', duration: '3 Std.',  price: 329, title: 'Konflikte im Team konstruktiv klären',    audience: ['hr', 'fuehrung', 'consult'], date: '09. Juli 2026 · 14:00–17:00', instructor: 'Miriam Junge' },
];

VJ.professionalModules = [
  { id: 'm1', n: 1, title: 'Haltung und Methodik im psychologisch fundierten Coaching', type: 'Live-Webinar', duration: '90 Min.', date: '14. Mai 2026 · 19:00', instructor: 'Miriam Junge', status: 'done' },
  { id: 'm2', n: 2, title: 'Systemisches Coaching & Aufstellungsarbeit', type: 'Live-Webinar', duration: '90 Min.', date: '21. Mai 2026 · 19:00', instructor: 'Miriam Junge', status: 'done' },
  { id: 'm3', n: 3, title: 'Fragetechniken: Klärung, Konfrontation, Ressource', type: 'Live-Webinar', duration: '90 Min.', date: '28. Mai 2026 · 19:00', instructor: 'Dr. Theresa Hoff', status: 'done' },
  { id: 'm4', n: 4, title: 'Umgang mit Widerstand und Krisen', type: 'Live-Webinar', duration: '90 Min.', date: '04. Juni 2026 · 19:00', instructor: 'Miriam Junge', status: 'current' },
  { id: 'm5', n: 5, title: 'Praxis-Workshop: Fallarbeit in Kleingruppen', type: 'Workshop', duration: '3 Std.', date: '14. Juni 2026 · 14:00', instructor: 'Miriam Junge', status: 'upcoming' },
  { id: 'm6', n: 6, title: 'Persönlichkeit, Werte und Sinn', type: 'Live-Webinar', duration: '90 Min.', date: '18. Juni 2026 · 19:00', instructor: 'Prof. Dr. Anke Liedtke', status: 'upcoming' },
  { id: 'm7', n: 7, title: 'Psychopathologie: Grenzen erkennen', type: 'Live-Webinar', duration: '90 Min.', date: '25. Juni 2026 · 19:00', instructor: 'Miriam Junge', status: 'upcoming' },
  { id: 'm8', n: 8, title: 'Coaching in Veränderung: Übergänge begleiten', type: 'Live-Webinar', duration: '90 Min.', date: '02. Juli 2026 · 19:00', instructor: 'Dr. Theresa Hoff', status: 'upcoming' },
  { id: 'm9', n: 9, title: 'Abschluss: Eigene Fallarbeit & Reflexion', type: 'Live-Webinar', duration: '90 Min.', date: '09. Juli 2026 · 19:00', instructor: 'Miriam Junge', status: 'upcoming' },
];

VJ.instructors = [
  { id: 'miriam', name: 'Miriam Junge', role: 'Gründerin · Diplom-Psychologin · Approb. Psychotherapeutin', img: 'assets/photo-miriam.jpg', bio: 'Miriam Junge leitet die kuratorische Arbeit bei VanJunge. Über zwanzig Jahre Praxis in Psychotherapie und Coaching, Autorin mehrerer Fachbücher, regelmäßige Beiträge in Zeit, Handelsblatt und Deutschlandfunk Nova.' },
  { id: 'hoff',   name: 'Dr. Theresa Hoff', role: 'Psychologin (M.Sc.) · Systemische Coachin (DGfC)', img: '', bio: 'Schwerpunkt systemisches Coaching, Krisen- und Konfliktmoderation in Organisationen.' },
  { id: 'liedtke',name: 'Prof. Dr. Anke Liedtke', role: 'Persönlichkeitspsychologin · Universität Heidelberg', img: '', bio: 'Forschung zu Werten, Sinn und Selbstkonkordanz in beruflichen Übergangsphasen.' },
];

VJ.testimonials = [
  { quote: 'Vielen Dank für den Workshop! Euer Fachwissen, Praxisbeispiele und euer persönlicher Einsatz haben für eine harmonische, lehrreiche und angenehme Atmosphäre gesorgt.', name: 'Anna Kohlhund', role: 'Sozialpädagogin & Coach' },
  { quote: 'Ein großartiger Workshop zu Fragetechniken. In 3 Stunden voller Praxiswissen konnten wir direkt in kleinen Gruppen üben.', name: 'Julia Bauer-Triebke', role: 'Lektorin & Coach' },
  { quote: 'Ich bin sehr froh mit dem, was ihr angeboten habt, für mich hätte noch eine zweite Session angehängt werden können.', name: 'Amber Schoop', role: 'Coach im Performing-Arts-Bereich' },
];

VJ.faqs = [
  { q: 'Ist das eine staatlich anerkannte Ausbildung?', a: 'Nein. VanJunge vergibt ein privates Weiterbildungszertifikat samt Open Badge. Es ist bewusst keine staatlich anerkannte Ausbildung und kein Abschluss im juristischen Sinne. Wir nennen es deshalb Weiterbildung, nicht Ausbildung.' },
  { q: 'Wie viele Teilnehmende pro Kohorte?', a: 'Maximal 18 Personen. Klein genug für persönliche Begleitung, groß genug für vielfältige Perspektiven in der Fallarbeit.' },
  { q: 'Sind Aufzeichnungen verfügbar?', a: 'Ja, alle Live-Webinare werden aufgezeichnet und stehen im internen Bereich zur Verfügung. Der primäre Modus bleibt aber live, die Diskussion und Fallarbeit findet synchron statt.' },
  { q: 'Was passiert, wenn ich einen Termin verpasse?', a: 'Du sichtest die Aufzeichnung und arbeitest die Vorbereitung selbstständig nach. Bei längerer Abwesenheit sprich uns direkt an.' },
  { q: 'Kann ich auf Rechnung zahlen?', a: 'Ja. Wähle im Checkout „Rechnung". Du erhältst eine Rechnung mit 14 Tagen Zahlungsziel. Der Zugang wird nach Zahlungseingang freigeschaltet.' },
  { q: 'Wird Umsatzsteuer ausgewiesen?', a: 'Alle Preise sind netto. Auf der Rechnung wird die gesetzliche Mehrwertsteuer (19 %) separat ausgewiesen.' },
];

VJ.adminCourses = [
  { id: 'professional', title: 'VanJunge Professional',                  type: 'Pfad',       price: 1390, status: 'Veröffentlicht', tn: 16, updated: '06. Mai 2026' },
  { id: 'essential',    title: 'VanJunge Essential',                     type: 'Pfad',       price:  590, status: 'Veröffentlicht', tn: 24, updated: '04. Mai 2026' },
  { id: 'expert',       title: 'VanJunge Expert',                        type: 'Pfad',       price: 2490, status: 'Veröffentlicht', tn:  9, updated: '02. Mai 2026' },
  { id: 'fragetechniken',title:'Fragetechniken in schwierigen Gesprächen',type: 'Einzelformat', price: 329,  status: 'Veröffentlicht', tn: 12, updated: '01. Mai 2026' },
  { id: 'widerstand',   title: 'Umgang mit Widerstand und Krisen',       type: 'Einzelformat', price: 149,  status: 'Veröffentlicht', tn: 31, updated: '28. Apr 2026' },
  { id: 'systemisch',   title: 'Systemisches Denken im Coaching',        type: 'Einzelformat', price: 149,  status: 'Veröffentlicht', tn: 22, updated: '24. Apr 2026' },
  { id: 'fallarbeit',   title: 'Halbtag Intensiv: Fallarbeit & Supervision', type: 'Einzelformat', price: 499, status: 'Veröffentlicht', tn:  8, updated: '22. Apr 2026' },
  { id: 'team',         title: 'Konflikte im Team konstruktiv klären',   type: 'Einzelformat', price: 329,  status: 'Entwurf',        tn:  0, updated: '20. Apr 2026' },
  { id: 'fuehrungspsych',title:'Führungspsychologie im Alltag',          type: 'Einzelformat', price: 149,  status: 'Entwurf',        tn:  0, updated: '18. Apr 2026' },
];

VJ.adminActivity = [
  { time: 'vor 4 Min.',  type: 'signup',   text: 'Mara Schenk hat sich für VanJunge Professional eingeschrieben.' },
  { time: 'vor 18 Min.', type: 'payment',  text: 'Zahlung über 329 € · Workshop „Fragetechniken" · Tobias Reiß.' },
  { time: 'vor 1 Std.',  type: 'session',  text: 'Live-Session „Umgang mit Widerstand" gestartet · 14 Teilnehmende.' },
  { time: 'vor 3 Std.',  type: 'message',  text: 'Neue Nachricht von Lena Albrecht (Kohorte 06/26) im Forum.' },
  { time: 'gestern',     type: 'signup',   text: '3 neue Anmeldungen für „Halbtag Intensiv: Fallarbeit & Supervision".' },
  { time: 'gestern',     type: 'payment',  text: 'Zahlung über 1.390 € · VanJunge Professional · Henrike Bertram.' },
  { time: 'vor 2 Tagen', type: 'publish',  text: 'Modul „Persönlichkeit, Werte und Sinn" veröffentlicht.' },
];

VJ.priceFmt = (n) => new Intl.NumberFormat('de-DE').format(n) + ' €';
VJ.priceWithMwSt = (n) => ({ netto: n, mwst: Math.round(n * 0.19), brutto: Math.round(n * 1.19) });
