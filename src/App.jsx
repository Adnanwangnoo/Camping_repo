import { useState, useEffect, useRef } from "react";

// ── Brand Colors ──────────────────────────────────────────────────────
const C = {
  cream: "#f5f0e8",
  creamDark: "#ede6d6",
  creamMid: "#ddd5c0",
  forest: "#1e3d2f",
  forestMid: "#2a5240",
  forestLight: "#3a6b50",
  gold: "#b8963e",
  goldLight: "#d4aa55",
  text: "#1a2e22",
  textMid: "#3d5a46",
  textLight: "#6b8a72",
  white: "#ffffff",
  red: "#8b3a2a",
};

// ── Inject Google Fonts + Global CSS + Mobile Responsive CSS ──────────
function injectCSS() {
  if (document.getElementById("aru-css")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700;900&display=swap";
  document.head.appendChild(link);

  const fa = document.createElement("link");
  fa.rel = "stylesheet";
  fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(fa);

  const style = document.createElement("style");
  style.id = "aru-css";
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${C.cream}; }
    ::selection { background: ${C.forest}; color: ${C.cream}; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${C.creamDark}; }
    ::-webkit-scrollbar-thumb { background: ${C.forest}; }
    input:focus, textarea:focus, select:focus { outline: none; border-color: ${C.forest} !important; }
    textarea { resize: vertical; }
    .lift { transition: transform .22s, box-shadow .22s; }
    .lift:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(30,61,47,.13); }

    /* ── Mobile Nav ── */
    .mobile-nav-overlay {
      display: none;
      position: fixed;
      top: 66px;
      left: 0; right: 0;
      background: ${C.cream};
      border-bottom: 2px solid ${C.forest};
      z-index: 99;
      padding: 1.5rem 2rem 2rem;
      flex-direction: column;
      gap: 0;
    }
    .mobile-nav-overlay.open { display: flex; }
    .mobile-nav-link {
      font-family: 'Lato', sans-serif;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${C.textMid};
      cursor: pointer;
      padding: 0.85rem 0;
      border-bottom: 1px solid ${C.creamMid};
      font-weight: 400;
    }
    .mobile-nav-link:last-child { border-bottom: none; }
    .mobile-nav-link.active { color: ${C.forest}; font-weight: 700; }
    .mobile-nav-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-top: 1.2rem;
      padding-top: 1.2rem;
      border-top: 1px solid ${C.creamMid};
    }

    /* ── Responsive Grids ── */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
    .about-img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
    .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .treks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
    .contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: start; }
    .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
    .strip-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
    .student-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: center; }
    .about-bullets { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(249,248,245,0.18); }
    .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
    .nav-desktop { display: flex; gap: 1.2rem; align-items: center; flex-wrap: wrap; }
    .hamburger-btn { display: none; background: none; border: none; cursor: pointer; padding: 0.4rem; color: ${C.forest}; font-size: 1.5rem; line-height: 1; }

    @media (max-width: 900px) {
      /* Nav */
      .nav-desktop { display: none !important; }
      .hamburger-btn { display: block; }

      /* Hero */
      .hero-stats { gap: 1.5rem; flex-wrap: wrap; }
      .hero-btns { flex-direction: column; }
      .hero-btns button { width: 100%; }

      /* About */
      .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .about-img-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
      .about-img-grid img { aspect-ratio: 4/3 !important; margin-top: 0 !important; }
      .about-bullets { grid-template-columns: 1fr; gap: 0.75rem; }

      /* Packages */
      .packages-grid { grid-template-columns: 1fr; }

      /* Gallery */
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }

      /* Treks */
      .treks-grid { grid-template-columns: 1fr; gap: 2.5rem; }

      /* Contact */
      .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }

      /* Footer */
      .footer-grid { grid-template-columns: 1fr; gap: 2rem; }

      /* Student */
      .student-grid { grid-template-columns: 1fr; gap: 2rem; }

      /* Strip */
      .strip-grid { grid-template-columns: 1fr 1fr; gap: 1.2rem; }

      /* Section padding */
      .section-padded { padding: 4rem 1.25rem !important; }
      .hero-text-pad { padding: 0 1.5rem 0 1.5rem !important; }
    }

    @media (max-width: 600px) {
      /* Gallery */
      .gallery-grid { grid-template-columns: 1fr; }

      /* Strip */
      .strip-grid { grid-template-columns: 1fr; }

      /* Hero title sizing */
      .hero-main-title { font-size: 2.8rem !important; }
      .hero-sub-title { font-size: 2rem !important; }

      /* Section title sizing */
      h2 { font-size: 1.9rem !important; }

      /* About images */
      .about-img-grid { grid-template-columns: 1fr; }
      .about-img-grid img:last-child { display: none; }
    }
  `;
  document.head.appendChild(style);
}

// ── Data ──────────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: 1,
    icon: "☀️",
    name: "Day Explorer",
    price: "₹999",
    dur: "1 Day",
    aud: "Families & Couples",
    feats: ["Valley Walk", "Picnic Lunch", "Photography Spots", "Local Guide"],
  },
  {
    id: 2,
    icon: "⛺",
    name: "Base Camp Stay",
    price: "₹2,499",
    dur: "2D / 1N",
    aud: "College Groups",
    feats: ["Swiss Tent Stay", "Bonfire Evening", "Pony Ride", "Valley Trek", "All Meals"],
    pop: true,
  },
  {
    id: 3,
    icon: "🏔️",
    name: "Glacier Expedition",
    price: "₹4,999",
    dur: "4D / 3N",
    aud: "Trek Enthusiasts",
    feats: ["Kolahai Glacier", "Alpine Lake", "Liddarwat Camp", "Expert Guide", "Full Board"],
  },
  {
    id: 4,
    icon: "🎒",
    name: "School Special",
    price: "₹799",
    dur: "Custom",
    aud: "Schools & Institutes",
    feats: ["Safety Briefing", "Nature Education", "Team Activities", "Supervised", "CCTV Camp"],
  },
];

const TREKS = [
  { name: "Aru Valley Loop", diff: "Easy", km: "6 km", time: "3 hrs", col: "#3a6b50" },
  { name: "Lidderwatt Trek", diff: "Moderate", km: "12 km", time: "6–7 hrs", col: "#b8963e" },
  { name: "Alpine Lakes", diff: "Moderate-Hard", km: "16 km", time: "8 hrs", col: "#b8963e" },
  { name: "Kolahai Glacier", diff: "Hard", km: "28 km", time: "2 days", col: "#8b3a2a" },
];

const GALLERY = [
  { url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", cap: "Aru Valley Panorama" },
  { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80", cap: "Camp Setup" },
  { url: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=800&q=80", cap: "Royal Suits" },
  { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", cap: "Alpine Meadows" },
  { url: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&q=80", cap: "Horse Riding" },
  { url: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&q=80", cap: "Swiss Tents" },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Rohan Sharma",
    date: "April 2026",
    rating: 5,
    message: "A perfect, safe, and beautiful arrangement for our university group. The in-house kitchen served incredibly fresh and hot food, and the tents were perfectly comfortable.",
  },
  {
    id: 2,
    name: "Priya V.",
    date: "March 2026",
    rating: 5,
    message: "Breathtaking views of the Kolahai Glacier trail. The local certified guide made all the difference in safety and historical knowledge of the trails. Highly recommended!",
  },
  {
    id: 3,
    name: "Principal K. L. Raina",
    date: "May 2026",
    rating: 5,
    message: "Excellent arrangement for our school kids. Very disciplined and properly supervised with CCTV. The nature walks added great academic value to our trip.",
  },
];

// ── Reusable UI Components ────────────────────────────────────────────
// function Logo({ size = 36, color = C.forest }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
//       <polygon points="24,3 38,30 10,30" fill={color} opacity="0.95" />
//       <polygon points="15,19 27,42 3,42" fill={color} opacity="0.6" />
//       <polygon points="33,19 45,42 21,42" fill={color} opacity="0.6" />
//     </svg>
//   );
// }
function Logo({ size = 36 }) {
  return (
    <img
      src="/images/aru camping logo.png"
      alt="Aru Camping Logo"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
      }}
    />
  );
}

function Divider({ center = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1rem 0", justifyContent: center ? "center" : "flex-start" }}>
      <div style={{ height: "1px", width: "36px", background: C.forest, opacity: 0.25 }} />
      <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>🌲🌲🌲</span>
      <div style={{ height: "1px", width: "36px", background: C.forest, opacity: 0.25 }} />
    </div>
  );
}

function SectionLabel({ children, center = false, light = false }) {
  return (
    <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: light ? "rgba(245,240,232,0.6)" : C.forestLight, fontWeight: 700, textAlign: center ? "center" : "left" }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, center = false, light = false }) {
  return (
    <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: light ? C.cream : C.forest, lineHeight: 1.2, textAlign: center ? "center" : "left", marginBottom: "0.5rem" }}>
      {children}
    </h2>
  );
}

function Btn({ children, onClick, v = "primary", full = false, sm = false }) {
  const base = {
    fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", cursor: "pointer", border: "2px solid",
    transition: "opacity .2s", width: full ? "100%" : "auto",
    fontSize: sm ? "0.68rem" : "0.78rem",
    padding: sm ? "0.45rem 1.1rem" : "0.8rem 1.9rem",
    display: "inline-block", textAlign: "center",
    minHeight: "44px", // touch-friendly
  };
  const vs = {
    primary: { ...base, background: C.forest, borderColor: C.forest, color: C.cream },
    outline: { ...base, background: "transparent", borderColor: C.forest, color: C.forest },
    gold: { ...base, background: C.gold, borderColor: C.gold, color: C.white },
    ghost: { ...base, background: "transparent", borderColor: C.cream, color: C.cream },
    danger: { ...base, background: C.red, borderColor: C.red, color: C.white },
  };
  return (
    <button style={vs[v]} onClick={onClick}
      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.82")}
      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, multi = false }) {
  const s = {
    width: "100%", border: `1px solid ${C.creamMid}`, padding: "0.75rem",
    fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.text,
    background: C.cream, boxSizing: "border-box", display: "block",
    minHeight: "44px", // touch-friendly
  };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLight, display: "block", marginBottom: "0.35rem" }}>{label}</label>
      {multi
        ? <textarea style={{ ...s, minHeight: "100px" }} value={value} onChange={onChange} placeholder={placeholder} />
        : <input style={s} type={type} value={value} onChange={onChange} placeholder={placeholder} />}
    </div>
  );
}

function Alert({ type, children }) {
  const colors = {
    success: { bg: "#2a524018", border: "#3a6b5040", color: C.forestMid },
    error: { bg: `${C.red}18`, border: `${C.red}30`, color: C.red },
    info: { bg: `${C.forest}12`, border: `${C.forest}30`, color: C.forest },
  };
  const c = colors[type] || colors.info;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, padding: "0.8rem", marginBottom: "1rem", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: c.color }}>
      {children}
    </div>
  );
}

// ── Navbar (with hamburger) ───────────────────────────────────────────
function Navbar({ page, setPage, setModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Packages", "Gallery", "Treks", "Student", "Feedback"];

  const navTo = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: C.cream, borderBottom: `2px solid ${C.forest}`, padding: "0 1.5rem 0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }} onClick={() => navTo("home")}>
          <Logo size={30} />
          <div>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.forest, fontWeight: 700, lineHeight: 1.1 }}>ARU CAMPING</div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: C.forestLight, textTransform: "uppercase" }}>RESORT · ARU VALLEY</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="nav-desktop">
          {links.map((l) => (
            <span key={l}
              style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.74rem", letterSpacing: "0.07em", textTransform: "uppercase", color: page === l.toLowerCase() ? C.forest : C.textMid, cursor: "pointer", fontWeight: page === l.toLowerCase() ? 700 : 400, borderBottom: page === l.toLowerCase() ? `2px solid ${C.forest}` : "2px solid transparent", paddingBottom: "2px" }}
              onClick={() => navTo(l.toLowerCase())}>
              {l}
            </span>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "0.5rem" }}>
            <a href="https://wa.me/919419000066" target="_blank" rel="noreferrer" style={{ fontSize: "1.3rem", color: C.forest, textDecoration: "none" }} title="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", color: C.forest, textDecoration: "none" }} title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <Btn sm onClick={() => navTo("contact")}>Contact Us</Btn>
          </div>
        </div>

        {/* Hamburger */}
        <button className="hamburger-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          {menuOpen
            ? <i className="fa-solid fa-xmark"></i>
            : <i className="fa-solid fa-bars"></i>}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-nav-overlay${menuOpen ? " open" : ""}`}>
        {links.map((l) => (
          <div key={l} className={`mobile-nav-link${page === l.toLowerCase() ? " active" : ""}`} onClick={() => navTo(l.toLowerCase())}>
            {l}
          </div>
        ))}
        <div className="mobile-nav-link" onClick={() => navTo("contact")}>Contact</div>
        <div className="mobile-nav-actions">
          <a href="https://wa.me/919419000066" target="_blank" rel="noreferrer" style={{ fontSize: "1.5rem", color: C.forest, textDecoration: "none" }}>
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.4rem", color: C.forest, textDecoration: "none" }}>
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────
function Hero({ setPage }) {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden", paddingBottom: "4rem" }}>
      <img
        src="/images/hero.jpeg"
        alt="Aru Valley Tents"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(22,48,36,0.85) 0%,rgba(22,48,36,0.4) 60%,rgba(22,48,36,0.85) 100%)" }} />
      <div className="hero-text-pad" style={{ position: "relative", maxWidth: "680px", padding: "0 3rem 0 5vw", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(249,248,245,0.35)", padding: "0.3rem 0.9rem", marginBottom: "2rem" }}>
          <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(249,248,245,0.75)" }}>Aru Valley · Pahalgam · Kashmir</span>
        </div>
        <Logo size={52} color={C.cream} />
        <div className="hero-main-title" style={{ marginTop: "1rem", fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", color: C.cream, lineHeight: 1.0, fontWeight: 700 }}>ARU CAMPING</div>
        <div className="hero-sub-title" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.8rem,4.5vw,3.5rem)", color: C.goldLight, lineHeight: 1.0, fontStyle: "italic", marginBottom: "1.5rem" }}>Experiences</div>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "rgba(249,248,245,0.78)", lineHeight: 1.85, maxWidth: "460px", marginBottom: "2.5rem", fontWeight: 300 }}>
          Premium camping, guided treks & unforgettable group adventures in Kashmir's most pristine valley.
        </p>
        <div className="hero-btns">
          <Btn onClick={() => setPage("packages")}>Explore Packages</Btn>
          <Btn v="ghost" onClick={() => setPage("contact")}>Book Now</Btn>
        </div>
        <div className="hero-stats">
          {[["500+", "Happy Campers"], ["12", "Trek Routes"], ["4.9★", "Rating"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.7rem", color: C.goldLight }}>{n}</div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(249,248,245,0.55)", textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features Strip ────────────────────────────────────────────────────
function Strip() {
  const items = [
    ["🛡️", "Safe & Supervised", "24/7 CCTV, trained staff, first aid on every trip."],
    ["🍽️", "Nourishing Meals", "In-house kitchen — fresh, hygienic meals for all groups."],
    ["⛺", "Swiss Tents", "Comfortable, spacious group tents for restful nights."],
    ["🏔️", "Expert Guides", "Certified local guides with years of mountain experience."],
  ];
  return (
    <div style={{ background: C.forest, padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="strip-grid">
          {items.map(([icon, title, desc]) => (
            <div key={title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ fontSize: "1.7rem", flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.cream, marginBottom: "0.25rem" }}>{title}</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="about-grid">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <Divider />
            <SectionTitle>Nature at Its Best</SectionTitle>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: C.textMid, lineHeight: 1.9, fontWeight: 300, marginBottom: "1.2rem" }}>
              Nestled in <strong style={{ color: C.forest, fontWeight: 700 }}>Aru Valley, Pahalgam</strong>, our private-land resort is framed by pine forests, alpine rivers, and snow-capped peaks — the perfect base camp for Kashmir's most iconic treks.
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: C.textMid, lineHeight: 1.9, fontWeight: 300, marginBottom: "2rem" }}>
              We specialise in <strong style={{ color: C.forest, fontWeight: 700 }}>school, college & university group camps</strong>, guided treks to Liddarwat, Kolahai Glacier and Alpine Lakes, plus pony rides, horse riding, and bonfire evenings.
            </p>
            <div className="about-bullets">
              {[["SAFE", "24/7 CCTV & staff"], ["STRUCTURED", "Planned itineraries"], ["SUPERVISED", "Expert guides always"], ["NOURISHING", "In-house kitchen"]].map(([t, d]) => (
                <div key={t} style={{ borderLeft: `3px solid ${C.forest}`, paddingLeft: "0.8rem" }}>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color: C.forest, textTransform: "uppercase" }}>{t}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.76rem", color: C.textLight, marginTop: "2px" }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-img-grid">
            <img src="/images/WhatsApp Image 2026-05-02 at 2.44.11 PM.jpeg" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} alt="Camp" />
            <img src="/images/WhatsApp Image 2026-05-02 at 4.24.36 PM.jpeg" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", marginTop: "2rem" }} alt="Trek" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Packages ──────────────────────────────────────────────────────────
function Packages({ setModal }) {
  return (
    <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel center>What We Offer</SectionLabel>
          <Divider center />
          <SectionTitle center>Our Packages</SectionTitle>
        </div>
        <div className="packages-grid">
          {PACKAGES.map((p) => (
            <div key={p.id} className="lift" style={{ background: p.pop ? C.forest : C.white, border: `2px solid ${p.pop ? C.forest : C.creamMid}`, padding: "2rem", position: "relative" }}>
              {p.pop && <div style={{ position: "absolute", top: "-1px", left: "1.5rem", background: C.gold, color: C.white, padding: "0.18rem 0.75rem", fontFamily: "'Lato', sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase" }}>Most Popular</div>}
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{p.icon}</div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.15rem", color: p.pop ? C.cream : C.forest, marginBottom: "0.2rem" }}>{p.name}</div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", color: p.pop ? "rgba(245,240,232,0.55)" : C.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.1rem" }}>{p.aud} · {p.dur}</div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.9rem", color: p.pop ? C.goldLight : C.forest, marginBottom: "1.1rem" }}>
                {p.price}<span style={{ fontSize: "0.8rem", opacity: 0.55, fontFamily: "'Lato', sans-serif" }}>/person</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.7rem" }}>
                {p.feats.map((f) => (
                  <li key={f} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: p.pop ? "rgba(245,240,232,0.78)" : C.textMid, padding: "0.38rem 0", borderBottom: `1px solid ${p.pop ? "rgba(245,240,232,0.1)" : C.creamMid}` }}>
                    <span style={{ color: p.pop ? C.goldLight : C.forest, marginRight: "0.55rem" }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Btn full v={p.pop ? "gold" : "outline"} onClick={() => setModal("contact")}>Book This Package</Btn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Student Section ───────────────────────────────────────────────────
function StudentPage({ setPage }) {
  const [activeTab, setActiveTab] = useState("schools");

  const studentPackages = [
    {
      type: "schools",
      title: "School Groups",
      age: "Classes 6 to 12",
      focus: "Nature, Team-Building & Safety",
      desc: "Supervised outdoor learning experiences. Specially planned and structured safety programs.",
      bullets: ["24/7 CCTV & Staff Supervision", "Nature Education & Basic Trekking", "In-house Hygienic Kitchen"]
    },
    {
      type: "colleges",
      title: "College & University Groups",
      age: "Undergrads / Postgrads",
      focus: "Adventure, Expedition & Exploration",
      desc: "Perfect base camp for high-energy treks, exploring Kolahai Glacier and alpine lakes.",
      bullets: ["Base Camp Setup", "Long Treks & Guided Expeditions", "Bonfire Evenings & Music"]
    }
  ];

  return (
    <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem", minHeight: "85vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel center>Student & Institution Experiences</SectionLabel>
          <Divider center />
          <SectionTitle center>Tailored Field Trips</SectionTitle>
          <p style={{ fontFamily: "'Lato', sans-serif", color: C.textLight, fontSize: "0.92rem", marginTop: "0.5rem" }}>
            The best classroom has no walls. We ensure safe, structured, and supervised academic expeditions.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {["schools", "colleges"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.82rem",
                fontWeight: activeTab === tab ? "700" : "400",
                color: activeTab === tab ? C.cream : C.forest,
                background: activeTab === tab ? C.forest : "transparent",
                border: `2px solid ${C.forest}`,
                padding: "0.6rem 1.5rem",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                minHeight: "44px",
              }}
            >
              {tab === "schools" ? "School Groups" : "Colleges / Universities"}
            </button>
          ))}
        </div>

        {studentPackages.filter(item => item.type === activeTab).map((p) => (
          <div key={p.type} style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "2rem" }}>
            <div className="student-grid">
              <div>
                <SectionLabel>{p.age}</SectionLabel>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,3vw,2.1rem)", color: C.forest, marginTop: "0.3rem", marginBottom: "1rem" }}>{p.title}</h3>
                <p style={{ fontFamily: "'Lato', sans-serif", color: C.textMid, fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  {p.desc}
                </p>
                <h4 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.05rem", color: C.forest, marginBottom: "0.8rem" }}>Why Choose Aru Camping?</h4>
                <ul style={{ listStyleType: "none", paddingLeft: 0, marginBottom: "2rem" }}>
                  {p.bullets.map((b, i) => (
                    <li key={i} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: C.textMid, marginBottom: "0.6rem" }}>
                      <span style={{ color: C.forestLight, marginRight: "0.55rem", fontWeight: "700" }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
                <Btn onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>Enquire for Institution</Btn>
              </div>

              <div style={{ background: C.creamDark, padding: "2rem", borderLeft: `4px solid ${C.forest}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontStyle: "italic", fontFamily: "'Libre Baskerville', serif", fontSize: "1.05rem", color: C.textMid, lineHeight: 1.7 }}>
                  "Discipline, safety, and leadership development in the lap of the Himalayas. Get in touch with us for customized pricing for your group."
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────
function Gallery() {
  const [sel, setSel] = useState(null);
  return (
    <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel center>Visual Journey</SectionLabel>
          <Divider center />
          <SectionTitle center>Life at Aru Camp</SectionTitle>
        </div>
        <div className="gallery-grid">
          {GALLERY.map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: i === 0 || i === 3 ? "1/1.3" : "1/1" }} onClick={() => setSel(img)}>
              <img src={img.url} alt={img.cap} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.7rem", background: "linear-gradient(to top,rgba(30,61,47,.8),transparent)", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.cream }}>{img.cap}</div>
            </div>
          ))}
        </div>
      </div>
      {sel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,14,.93)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }} onClick={() => setSel(null)}>
          <div style={{ maxWidth: "800px", width: "100%" }}>
            <img src={sel.url} alt={sel.cap} style={{ width: "100%", display: "block" }} />
            <div style={{ background: C.forest, padding: "1rem", textAlign: "center", fontFamily: "'Libre Baskerville', serif", color: C.cream }}>{sel.cap}</div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Treks ─────────────────────────────────────────────────────────────
function Treks() {
  return (
    <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="treks-grid">
          <div>
            <SectionLabel>Adventure Routes</SectionLabel>
            <Divider />
            <SectionTitle>Trek Routes</SectionTitle>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.textLight, lineHeight: 1.85, marginBottom: "2rem", fontWeight: 300 }}>
              From gentle valley walks to the mighty Kolahai Glacier — certified local guides lead every trail.
            </p>
            {TREKS.map((t) => (
              <div key={t.name} className="lift" style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "1.1rem 1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.98rem", color: C.forest, marginBottom: "0.25rem" }}>{t.name}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.72rem", color: C.textLight }}>📍 {t.km} &nbsp;·&nbsp; ⏱ {t.time}</div>
                </div>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", background: t.col + "18", color: t.col, border: `1px solid ${t.col}`, padding: "0.22rem 0.65rem", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{t.diff}</span>
              </div>
            ))}
          </div>
          <div>
            <SectionLabel>Also Available</SectionLabel>
            <Divider />
            <SectionTitle>More Experiences</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginTop: "0.5rem" }}>
              {[["🐴", "Horse Riding & Pony Rides", "Gentle pony rides for families, full trail rides through scenic Aru Valley."],
                ["🔥", "Bonfire Evenings", "Evenings under the stars with bonfires, music, and the Kashmiri night sky."],
                ["🧭", "Nature Walks", "Guided nature education walks perfect for school and college groups."],
                ["📸", "Photography Tours", "Discover the most stunning viewpoints with our local photography guides."],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", gap: "1rem", padding: "1rem", background: C.creamDark, borderLeft: `3px solid ${C.forest}` }}>
                  <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.93rem", color: C.forest, marginBottom: "0.22rem" }}>{title}</div>
                    <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.78rem", color: C.textLight, lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Feedback ──────────────────────────────────────────────────────────
function FeedbackPage() {
  return (
    <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem", minHeight: "80vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel center>Guest Reviews</SectionLabel>
          <Divider center />
          <SectionTitle center>Testimonials</SectionTitle>
          <p style={{ fontFamily: "'Lato', sans-serif", color: C.textLight, fontSize: "0.92rem", marginTop: "0.5rem" }}>
            Read what our wonderful guests have to say about their experience at Aru Valley.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem", gap: "0.5rem", flexWrap: "wrap" }}>
                <strong style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, fontSize: "1.05rem" }}>{t.name}</strong>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.textLight }}>{t.date}</span>
              </div>
              <div style={{ marginBottom: "0.6rem" }}>{"⭐".repeat(t.rating)}</div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: C.textMid, lineHeight: 1.7, margin: 0 }}>
                "{t.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "General", message: "" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!form.name || !form.email) return;
    setSent(true);
    setForm({ name: "", email: "", phone: "", type: "General", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem", minHeight: "80vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel center>Get In Touch</SectionLabel>
          <Divider center />
          <SectionTitle center>Contact & Bookings</SectionTitle>
        </div>
        <div className="contact-grid">
          <div style={{ background: C.white, padding: "2.5rem", border: `1px solid ${C.creamMid}` }}>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1.5rem" }}>Send a Message</h3>
            {sent && <Alert type="success">✓ Message sent! We'll get back to you within 24 hours.</Alert>}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLight, display: "block", marginBottom: "0.35rem" }}>Inquiry Type</label>
              <select style={{ width: "100%", border: `1px solid ${C.creamMid}`, padding: "0.75rem", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.text, background: C.cream, boxSizing: "border-box", minHeight: "44px" }} value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
                {["General", "Group Booking", "School Trip", "College Group", "Trek Inquiry", "Horse Riding"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <Input label="Full Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            <Input label="Phone Number" type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
            <Input label="Message" value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Group size, preferred dates, requirements..." multi />
            <Btn full onClick={submit}>Send Message</Btn>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1.5rem" }}>Find Us</h3>
            {[["📍", "Location", "Aru Valley, Pahalgam\nAnantnag, J&K — 192126"],
              ["📞", "Phone", "+91 9419000066\n+91 8375069287"],
              ["📧", "Email", "info@arucampingresort.com"],
              ["📸", "Instagram", "@aru_camping_resort"],
              ["🕐", "Hours", "Open Year Round\n8:00 AM – 9:00 PM IST"],
            ].map(([icon, title, info]) => (
              <div key={title} style={{ display: "flex", gap: "1rem", padding: "1.1rem 0", borderBottom: `1px solid ${C.creamMid}` }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.forest, fontWeight: 700, marginBottom: "0.25rem" }}>{title}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: C.textMid, lineHeight: 1.7, whiteSpace: "pre-line" }}>{info}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.forest, padding: "4rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "1rem" }}>
              <Logo size={30} color={C.cream} />
              <div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.cream }}>ARU CAMPING RESORT</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.55rem", letterSpacing: "0.18em", color: "rgba(245,240,232,0.45)", textTransform: "uppercase" }}>Aru Valley · Pahalgam · J&K</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.85, fontWeight: 300, maxWidth: "270px" }}>
              Premium camping & trekking experiences designed for groups, schools, colleges, and adventure seekers.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
              <a href="https://wa.me/919419000066" target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", color: C.goldLight, textDecoration: "none" }} title="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.15rem", color: C.goldLight, textDecoration: "none" }} title="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldLight, marginBottom: "1.2rem" }}>Quick Links</div>
            {["Home", "About", "Packages", "Gallery", "Treks", "Student", "Feedback"].map((l) => (
              <div key={l} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", cursor: "pointer", marginBottom: "0.5rem", padding: "0.2rem 0" }}
                onMouseOver={(e) => (e.currentTarget.style.color = C.cream)}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
                onClick={() => { setPage(l.toLowerCase()); window.scrollTo(0, 0); }}>{l}</div>
            ))}
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", cursor: "pointer", marginBottom: "0.5rem" }} onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>Contact</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldLight, marginBottom: "1.2rem" }}>Contact</div>
            {["Aru Valley, Pahalgam\nJ&K — 192126", "+91 9419000066", "info@arucampingresort.com"].map((info, i) => (
              <div key={i} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.8, marginBottom: "0.8rem", whiteSpace: "pre-line" }}>{info}</div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", color: "rgba(245,240,232,0.28)", paddingTop: "1.5rem", borderTop: "1px solid rgba(245,240,232,0.08)" }}>
          © 2025 Aru Camping Resort · All Rights Reserved · Aru Valley, Pahalgam, Jammu & Kashmir
        </div>
      </div>
    </footer>
  );
}

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(null);

  useEffect(() => { injectCSS(); }, []);

  const nav = (p) => { setPage(p); window.scrollTo(0, 0); };

  const renderPage = () => {
    switch (page) {
      case "home": return <><Hero setPage={nav} /><Strip /><About /><Packages setModal={setModal} /><Gallery /><Treks /></>;
      case "about": return <About />;
      case "packages": return <Packages setModal={setModal} />;
      case "gallery": return <Gallery />;
      case "treks": return <Treks />;
      case "student": return <StudentPage setPage={nav} />;
      case "feedback": return <FeedbackPage />;
      case "contact": return <Contact />;
      default: return <Hero setPage={nav} />;
    }
  };

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <Navbar page={page} setPage={nav} setModal={setModal} />
      <div style={{ paddingTop: page === "home" ? 0 : "66px" }}>
        {renderPage()}
      </div>
      <Footer setPage={nav} />
      {modal === "contact" && (() => { nav("contact"); setModal(null); return null; })()}
    </div>
  );
}
