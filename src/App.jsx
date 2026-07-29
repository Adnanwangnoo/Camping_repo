import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

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
    html, body { max-width: 100%; overflow-x: hidden; background: ${C.cream}; }
    ::selection { background: ${C.forest}; color: ${C.cream}; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${C.creamDark}; }
    ::-webkit-scrollbar-thumb { background: ${C.forest}; }
    input:focus, textarea:focus, select:focus { outline: none; border-color: ${C.forest} !important; }
    textarea { resize: vertical; }
    .lift { transition: transform .22s, box-shadow .22s; }
    .lift:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(30,61,47,.13); }
    img, iframe { max-width: 100%; height: auto; display: block; }

    /* ── Mobile Nav ── */
    .mobile-nav-overlay {
      display: none; position: fixed; top: 66px; left: 0; right: 0;
      background: ${C.cream}; border-bottom: 2px solid ${C.forest}; z-index: 99;
      padding: 1.5rem 2rem 2rem; flex-direction: column; gap: 0;
      max-height: calc(100vh - 66px); overflow-y: auto;
    }
    .mobile-nav-overlay.open { display: flex; }
    .mobile-nav-link {
      font-family: 'Lato', sans-serif; font-size: 0.85rem; letter-spacing: 0.1em;
      text-transform: uppercase; color: ${C.textMid}; cursor: pointer;
      padding: 0.85rem 0; border-bottom: 1px solid ${C.creamMid};
      font-weight: 400; min-height: 48px; display: flex; align-items: center;
    }
    .mobile-nav-link:last-child { border-bottom: none; }
    .mobile-nav-link.active { color: ${C.forest}; font-weight: 700; }
    .mobile-nav-actions { display: flex; align-items: center; gap: 1.2rem; margin-top: 1.2rem; padding-top: 1.2rem; border-top: 1px solid ${C.creamMid}; }

    /* ── Responsive Grids ── */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .about-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2.5rem; }
    .packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .treks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
    .contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: start; }
    .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
    .strip-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
    .student-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: center; }
    .takebacks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
    .hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(249,248,245,0.18); }
    .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
    .nav-desktop { display: flex; gap: 1.2rem; align-items: center; flex-wrap: wrap; }
    .hamburger-btn { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; color: ${C.forest}; font-size: 1.5rem; line-height: 1; min-height: 48px; min-width: 48px; }
    .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1.5rem; }

    /* ── Detailed Itinerary Styles ── */
    .day-card { background: ${C.white}; border: 1px solid ${C.creamMid}; padding: 2rem; display: flex; gap: 1.5rem; }
    .day-number { background: ${C.forest}; color: ${C.cream}; font-family: 'Libre Baskerville', serif; width: 60px; height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
    .day-number span { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'Lato', sans-serif; }
    .day-number strong { font-size: 1.5rem; line-height: 1; }
    .itinerary-list { list-style: none; padding: 0; margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
    .itinerary-list li { font-family: 'Lato', sans-serif; font-size: 0.9rem; color: ${C.textMid}; display: flex; gap: 0.75rem; align-items: flex-start; }
    .itinerary-list li i { color: ${C.goldLight}; font-size: 0.8rem; margin-top: 0.2rem; }

    @media (max-width: 900px) {
      .nav-desktop { display: none !important; }
      .hamburger-btn { display: block; }
      .hero-stats { gap: 1.5rem; flex-wrap: wrap; }
      .hero-btns { flex-direction: column; }
      .hero-btns button { width: 100%; }
      .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .about-cards-grid { grid-template-columns: 1fr; gap: 1rem; }
      .packages-grid { grid-template-columns: 1fr; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .treks-grid, .contact-grid, .footer-grid, .student-grid, .admin-grid { grid-template-columns: 1fr; }
      .strip-grid { grid-template-columns: 1fr 1fr; gap: 1.2rem; }
      .section-padded { padding: 4rem 1.25rem !important; }
      .hero-text-pad { padding: 0 1.5rem 0 1.5rem !important; }
      .day-card { flex-direction: column; gap: 1rem; padding: 1.5rem; }
    }
    @media (max-width: 600px) {
      .gallery-grid, .strip-grid, .takebacks-grid { grid-template-columns: 1fr; }
      .hero-main-title { font-size: 2.8rem !important; }
      .hero-sub-title { font-size: 2rem !important; }
      h2 { font-size: 1.9rem !important; }
    }
  `;
  document.head.appendChild(style);
}

// ── Fallback Defaults ─────────────────────────────────────────────────
const DEFAULT_OFFERINGS = [
  { id: 1, icon: "☀️", name: "Day Explorer", dur: "1 Day", aud: "Families & Couples", feats: ["Valley Walk", "Picnic Lunch", "Photography Spots", "Local Guide"] },
  { id: 2, icon: "⛺", name: "Base Camp Stay", dur: "2D / 1N", aud: "College Groups", feats: ["Swiss Tent Stay", "Bonfire Evening", "Pony Ride", "Valley Trek", "All Meals"], pop: true },
  { id: 4, icon: "🎒", name: "School Special", dur: "Custom", aud: "Schools & Institutes", feats: ["Safety Briefing", "Nature Education", "Team Activities", "Supervised", "CCTV Camp"] },
];

const DEFAULT_GALLERY = [
  { id: 102, type: "image", url: "/images/s2.jpeg", cap: "Aru Valley Panorama" },
  { id: 103, type: "image", url: "/images/t2.jpeg", cap: "Camp Setup" },
  { id: 104, type: "image", url: "/images/royalsuits.jpeg", cap: "The Alp Tents" },
  { id: 105, type: "image", url: "/images/ph.jpeg", cap: "Alpine Meadows" },
  { id: 106, type: "image", url: "/images/hourse.jpeg", cap: "Horse Riding" },
  { id: 107, type: "image", url: "/images/hero.jpeg", cap: "The Swiss Tents" },
  { id: 108, type: "image", url: "/images/IMG_4424.JPG", cap: "Fresh Camp Meals" },
];

const TREKS = [
  { name: "Aru Valley Loop", diff: "Easy", km: "6 km", time: "3 hrs", col: "#3a6b50" },
  { name: "Lidderwatt Trek", diff: "Moderate", km: "12 km", time: "6–7 hrs", col: "#b8963e" },
  { name: "Alpine Lakes", diff: "Moderate-Hard", km: "16 km", time: "8 hrs", col: "#b8963e" },
  { name: "Kolahai Glacier", diff: "Hard", km: "28 km", time: "2 days", col: "#8b3a2a" },
];

const TESTIMONIALS = [
  { id: 1, name: "Dr. Rohan Sharma", date: "April 2026", rating: 5, message: "A perfect, safe, and beautiful arrangement for our university group. The in-house kitchen served incredibly fresh and hot food, and the tents were perfectly comfortable." },
  { id: 2, name: "Priya V.", date: "March 2026", rating: 5, message: "Breathtaking views of the Kolahai Glacier trail. The local certified guide made all the difference in safety and historical knowledge of the trails. Highly recommended!" },
  { id: 3, name: "Principal K. L. Raina", date: "May 2026", rating: 5, message: "Excellent arrangement for our school kids. Very disciplined and properly supervised with CCTV. The nature walks added great academic value to our trip." },
];

const SCHOOL_ITINERARIES = [
  { id: 1, icon: "☀️", name: "Summer School Camp", dur: "1N / 2D Package", feats: ["Arrival & Briefing", "Welcome Ice-breakers", "Guided Trek to Trail", "Group Feedback Session"] },
  { id: 2, icon: "⛺", name: "Adventure & Exploration", dur: "2N / 3D Package", feats: ["Scenic Drive to Camp", "Nature Trail Trek", "Campfire & Games", "Morning Learning Session"], pop: true },
  { id: 3, icon: "🏔️", name: "Lidderwatt Expedition", dur: "3N / 4D Package", feats: ["Trek to Lidderwatt Valley", "Village Life Interaction", "Shepherd Mud-House Visit", "Farewell Campfire"] },
  { id: 4, icon: "🎒", name: "Institutional Special", dur: "Custom Package", feats: ["Expedition Leadership", "Glacier Exploration", "Outdoor Survival Basics", "CCTV Monitored Camp"] },
];

const DETAILED_PLANS = {
  1: {
    title: "Summer School Camp", subtitle: "Adventure. Learning. Memories that last.", duration: "1 Night / 2 Days",
    days: [
      { day: 1, title: "Arrival & Orientation", activities: ["Scenic drive to camp", "Camp check-in & tent allocation", "Welcome briefing & ice-breaker activities", "Afternoon tea", "Dinner & overnight stay at the camp"] },
      { day: 2, title: "Adventure & Departure", activities: ["Morning activities & learning session", "Breakfast", "Guided trek to nearby trail", "Rest, group photo & feedback", "Lunch", "Depart for home with memories to cherish forever"] }
    ],
    inclusions: ["All Meals (Veg)", "Guided Activities", "Trained Staff & Supervision", "First Aid Support", "Hydration & Care"],
    carry: ["Comfortable Clothing", "Sports Shoes", "Water Bottle", "Personal Toiletries", "Raincoat (If needed)"]
  },
  2: {
    title: "Adventure & Exploration", subtitle: "Explore nature. Build friendships. Grow together.", duration: "2 Nights / 3 Days",
    days: [
      { day: 1, title: "Arrival & Orientation", activities: ["Scenic drive to camp", "Camp check-in & tent allocation", "Welcome briefing & ice-breaker activities", "Afternoon tea", "Dinner & overnight stay at the camp"] },
      { day: 2, title: "Adventure & Exploration", activities: ["Breakfast & trek briefing", "Trek to scenic spot / nearby trail", "Packed lunch amidst nature", "Afternoon sports & fun activities", "Campfire, games & sharing", "Dinner & overnight stay at the camp"] },
      { day: 3, title: "Learn, Engage & Depart", activities: ["Morning activities & learning session", "Breakfast", "Group photo & feedback", "Lunch", "Depart for home with memories to cherish forever"] }
    ],
    inclusions: ["All Meals (Veg)", "Guided Activities", "Trained Staff & Supervision", "First Aid Support", "Hydration & Care"],
    carry: ["Comfortable Clothing", "Sports Shoes", "Water Bottle", "Personal Toiletries", "Raincoat (If needed)"]
  },
  3: {
    title: "Lidderwatt Expedition", subtitle: "A journey of adventure, culture, and engagement.", duration: "3 Nights / 4 Days",
    days: [
      { day: 1, title: "Arrival & Orientation (Srinagar → Pahalgam → Aru)", activities: ["Scenic drive to Pahalgam (96 Kms / 2-3 hrs)", "Drive to Aru (11 Kms / 30 mins) along Lidder Stream", "Camp check-in & tent allocation", "Welcome briefing & afternoon tea", "Dinner and overnight stay at the resort"] },
      { day: 2, title: "Adventure & Exploration (Trek to Lidderwatt)", activities: ["Breakfast & trek briefing", "Short trek to Lidderwatt (11 Kms/3000 M) through forests & rivers", "Packed lunch amidst Himalayan landscapes", "Trek back to camp", "Afternoon tea & sports activities (Badminton, Volleyball, Cricket)", "Dinner and overnight stay at the resort"] },
      { day: 3, title: "Culture & Engagement (Village Experience)", activities: ["Breakfast", "Short trek to local Aru village", "Interact with locals & experience their lifestyle", "Visit shepherd families & mud houses, walk along stream", "Return to camp for lunch & afternoon tea", "Outdoor activities, team games & farewell campfire", "Dinner and overnight stay at the resort"] },
      { day: 4, title: "Wrap-up & Departure", activities: ["Breakfast", "Morning sports & light activities", "Closing session, group photographs & feedback", "Lunch", "Depart for Srinagar with a heart full of memories"] }
    ],
    inclusions: ["Tented Accommodation", "All Meals", "Guided Activities & Treks", "On-site Support & Supervision", "First Aid Support"],
    carry: ["Sleeping Bag", "Warm Clothing", "Torch", "Personal Medication", "Water Bottle", "Personal Toiletries"]
  }
};

const TAKE_BACKS = [
  { icon: "🧭", title: "Leadership", desc: "Inspiring others and leading with purpose." },
  { icon: "✨", title: "Confidence", desc: "Building self-belief and embracing new challenges." },
  { icon: "🤝", title: "Teamwork", desc: "Working together, respecting diverse strengths." },
  { icon: "🧩", title: "Problem Solving", desc: "Thinking critically and finding creative solutions." },
];

const MENU_TIMELINE = [
  { time: "Breakfast", icon: "🍳", items: "Tea, Boiled Eggs, Bread Butter & Jam, Choice of Poha / Upma / Halwa / Aloo Paratha" }, 
  { time: "Packed Lunch", icon: "🍱", items: "Veg Pulav / Fried Rice, Fruit Juice, Fresh Fruit" }, 
  { time: "Afternoon Tea", icon: "☕", items: "Hot Tea & Biscuits upon returning to camp" }, 
  { time: "Dinner", icon: "🍲", items: "1 Non-Veg & 1 Veg Dish, Lentils / Beans / Cheese Curry, Rice, Fresh Salad" } 
];

const MEAL_VALUES = [
  { title: "Balanced Nutrition", desc: "Nutritious meals for active young minds", icon: "🥗" }, 
  { title: "Hygienic & Safe", desc: "Prepared with quality ingredients in a hygienic environment", icon: "✨" }, 
  { title: "Variety & Taste", desc: "Delicious meals with a mix of vegetarian and non-vegetarian", icon: "🥘" }, 
  { title: "Energy for Adventures", desc: "Meals designed to keep students active and energized", icon: "⚡" } 
];

// ── Reusable Components ───────────────────────────────────────────────
function EmailLink({ email }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.preventDefault(); navigator.clipboard.writeText(email);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <a href={`mailto:${email}`} style={{ color: "inherit", textDecoration: "underline", cursor: "pointer" }}>{email}</a>
      <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.7rem", color: C.forestLight, minHeight: "32px", minWidth: "32px" }} title="Copy to clipboard">
        <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
        {copied && <span style={{ marginLeft: "4px", fontSize: "0.6rem" }}>Copied!</span>}
      </button>
    </div>
  );
}

function Logo({ size = 36 }) {
  return (
    <img src="/images/arulogo.png" alt="Aru Camping Logo" style={{ width: size, height: size, objectFit: "contain", borderRadius: "50%" }} />
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

function Btn({ children, onClick, v = "primary", full = false, sm = false, type = "button", style = {}, disabled = false }) {
  const base = {
    fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", border: "2px solid",
    transition: "opacity .2s", width: full ? "100%" : "auto",
    fontSize: sm ? "0.68rem" : "0.78rem", padding: sm ? "0.45rem 1.1rem" : "0.8rem 1.9rem",
    display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "48px",
    borderRadius: "4px", opacity: disabled ? 0.6 : 1,
    ...style
  };
  const vs = {
    primary: { ...base, background: C.forest, borderColor: C.forest, color: C.cream },
    outline: { ...base, background: "transparent", borderColor: C.forest, color: C.forest },
    gold: { ...base, background: C.gold, borderColor: C.gold, color: C.white },
    ghost: { ...base, background: "transparent", borderColor: C.cream, color: C.cream },
    danger: { ...base, background: C.red, borderColor: C.red, color: C.white },
  };
  return (
    <button type={type} disabled={disabled} style={vs[v]} onClick={onClick}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, multi = false }) {
  const s = { width: "100%", border: `1px solid ${C.creamMid}`, padding: "0.75rem", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.text, background: C.cream, boxSizing: "border-box", display: "block", minHeight: "48px", borderRadius: "4px" };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLight, display: "block", marginBottom: "0.35rem" }}>{label}</label>
      {multi ? <textarea style={{ ...s, minHeight: "100px" }} value={value} onChange={onChange} placeholder={placeholder} /> : <input style={s} type={type} value={value} onChange={onChange} placeholder={placeholder} />}
    </div>
  );
}

// ── Navbar (Auto-locks Admin Session when navigating away) ────────────
function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Offerings", "Gallery", "Treks", "Student", "Feedback", "Admin"];

  const navTo = (p) => { 
    if (page === "admin" && p !== "admin") {
      sessionStorage.removeItem("aru_admin_auth");
    }
    setPage(p); 
    setMenuOpen(false); 
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: C.cream, borderBottom: `2px solid ${C.forest}`, padding: "0 1.5rem 0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }} onClick={() => navTo("home")}>
          <Logo size={48} />
          <div>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.forest, fontWeight: 700, lineHeight: 1.1 }}>ARU CAMPING</div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: C.forestLight, textTransform: "uppercase" }}>RESORT · ARU VALLEY</div>
          </div>
        </div>
        <div className="nav-desktop">
          {links.map((l) => (
            <span key={l} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.74rem", letterSpacing: "0.07em", textTransform: "uppercase", color: page === l.toLowerCase() ? C.forest : C.textMid, cursor: "pointer", fontWeight: page === l.toLowerCase() ? 700 : 400, borderBottom: page === l.toLowerCase() ? `2px solid ${C.forest}` : "2px solid transparent", paddingBottom: "2px", minHeight: "32px", display: "flex", alignItems: "center" }} onClick={() => navTo(l.toLowerCase())}>{l}</span>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "0.5rem" }}>
            <a href="https://maps.app.goo.gl/ybndetDAMhMxX2o98" target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", color: C.forest, textDecoration: "none" }} title="View on Google Maps"><i className="fa-solid fa-location-dot"></i></a>
            <a href="https://wa.me/918375069287" target="_blank" rel="noreferrer" style={{ fontSize: "1.3rem", color: C.forest, textDecoration: "none" }} title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", color: C.forest, textDecoration: "none" }} title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <Btn sm onClick={() => navTo("contact")}>Contact Us</Btn>
          </div>
        </div>
        <button className="hamburger-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          {menuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
        </button>
      </nav>
      <div className={`mobile-nav-overlay${menuOpen ? " open" : ""}`}>
        {links.map((l) => (
          <div key={l} className={`mobile-nav-link${page === l.toLowerCase() ? " active" : ""}`} onClick={() => navTo(l.toLowerCase())}>{l}</div>
        ))}
        <div className="mobile-nav-link" onClick={() => navTo("contact")}>Book Now</div>
        <div className="mobile-nav-actions">
          <a href="https://maps.app.goo.gl/ybndetDAMhMxX2o98" target="_blank" rel="noreferrer" style={{ fontSize: "1.5rem", color: C.forest, textDecoration: "none" }} title="View on Google Maps"><i className="fa-solid fa-location-dot"></i></a>
          <a href="https://wa.me/918375069287" target="_blank" rel="noreferrer" style={{ fontSize: "1.5rem", color: C.forest, textDecoration: "none" }}><i className="fa-brands fa-whatsapp"></i></a>
          <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.4rem", color: C.forest, textDecoration: "none" }}><i className="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────
function Hero({ setPage }) {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", paddingBottom: "4rem", paddingTop: "100px" }}>
      <img src="/images/hero.jpeg" alt="Aru Valley Tents" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(22,48,36,0.85) 0%,rgba(22,48,36,0.4) 60%,rgba(22,48,36,0.85) 100%)" }} />
      <div className="hero-text-pad" style={{ position: "relative", maxWidth: "680px", padding: "0 3rem 0 5vw", zIndex: 2 }}>
        <div className="hero-main-title" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", color: C.cream, lineHeight: 1.0, fontWeight: 700 }}>ARU CAMPING</div>
        <div className="hero-sub-title" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.8rem,4.5vw,3.5rem)", color: C.goldLight, lineHeight: 1.0, fontStyle: "italic", marginBottom: "1.5rem" }}>Experiences</div>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "rgba(249,248,245,0.78)", lineHeight: 1.85, maxWidth: "460px", marginBottom: "2.5rem", fontWeight: 300 }}>
          Premium camping, guided treks & unforgettable group adventures in Kashmir's most pristine valley.
        </p>
        <div className="hero-btns">
          <Btn onClick={() => setPage("offerings")}>Explore Offerings</Btn>
          <Btn v="ghost" onClick={() => setPage("contact")}>Book via WhatsApp</Btn>
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

// ── Mobile About Section (Story -> Logos -> Cards) ────────────────────
function About() {
  const schools = [
    { name: "Kashmir Harvard", sub: "Educational Institute", logo: "/images/Screenshot 2026-07-28 225712.png" },
    { name: "Bilaliya", sub: "Educational Institute", logo: "/images/Screenshot 2026-07-28 225854.png" },
    { name: "Foundation School", sub: "World School", logo: "/images/Screenshot 2026-07-28 225755.png" },
  ];

  return (
    <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* ── 1. STARTING PARAGRAPH: STORY & EXPERTISE ── */}
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionLabel>Our Story & Expertise</SectionLabel>
          <Divider />
          <SectionTitle>Nature at Its Best</SectionTitle>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", color: C.textMid, lineHeight: 1.8, fontWeight: 300, maxWidth: "850px" }}>
            Nestled beside the Lidder River in <strong style={{ color: C.forest, fontWeight: 700 }}>Aru Valley, Pahalgam</strong>, our private campsite combines authentic Kashmiri hospitality with Himalayan wilderness adventures. We have specialized expertise in organizing structured, highly supervised, and memorable expeditions for <strong style={{ color: C.forest, fontWeight: 700 }}>school, college, and university groups</strong>.
          </p>
        </div>

        {/* ── 2. TRUSTED BY LEADING EDUCATIONAL INSTITUTIONS (LOGOS ROW) ── */}
        <div style={{ marginBottom: "4.5rem", paddingBottom: "3.5rem", borderBottom: `1px solid ${C.creamMid}`, textAlign: "center" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.forestLight, fontWeight: 700, marginBottom: "1.5rem" }}>
            Trusted by Leading Educational Institutions
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", alignItems: "center", justifyContent: "center" }}>
            {schools.map((s, i) => (
              <div key={i} className="lift" style={{ background: C.white, padding: "1.5rem 1rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "110px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <img 
                  src={s.logo} 
                  alt={s.name} 
                  style={{ maxHeight: "75px", maxWidth: "160px", objectFit: "contain", marginBottom: "8px" }} 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'block';
                  }} 
                />
                <div style={{ display: "none", fontSize: "1.6rem", marginBottom: "4px" }}>🎓</div>
                <strong style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, fontSize: "1.05rem" }}>{s.name}</strong>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", color: C.textLight, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "3px", fontWeight: 700 }}>{s.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. SCANNABLE UX CARDS BELOW LOGOS ── */}
        <div className="about-cards-grid" style={{ marginTop: "0" }}>
          <div className="lift" style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📍</div>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, fontSize: "1.2rem", marginBottom: "0.5rem" }}>Prime Location</h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.textMid, lineHeight: 1.7 }}>
              Sitting at 2,414 meters, our base camp offers panoramic alpine meadow views and direct trailheads for iconic Kashmir treks.
            </p>
          </div>
          
          <div className="lift" style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔥</div>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, fontSize: "1.2rem", marginBottom: "0.5rem" }}>Authentic Culture</h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.textMid, lineHeight: 1.7 }}>
              Enjoy traditional Kashmiri Kehwa around nightly bonfires, fresh organic meals, and stargazing under pristine skies.
            </p>
          </div>

          <div className="lift" style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🛡️</div>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, fontSize: "1.2rem", marginBottom: "0.5rem" }}>Safety & Comfort</h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.textMid, lineHeight: 1.7 }}>
              Weather-proof insulated Swiss tents, clean sanitary facilities, and certified local guides trained in mountain safety.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Offerings Component (Reads from Supabase) ─────────────────────────
function OfferingsPage({ setPage, offerings }) {
  const list = Array.isArray(offerings) ? offerings : DEFAULT_OFFERINGS;
  return (
    <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel center>What We Offer</SectionLabel>
          <Divider center />
          <SectionTitle center>Camping Packages</SectionTitle>
        </div>
        <div className="packages-grid">
          {list.map((p) => (
            <div key={p.id} className="lift" style={{ background: p.pop ? C.forest : C.white, border: `2px solid ${p.pop ? C.forest : C.creamMid}`, padding: "2rem", position: "relative", borderRadius: "8px" }}>
              {p.pop && <div style={{ position: "absolute", top: "-1px", left: "1.5rem", background: C.gold, color: C.white, padding: "0.18rem 0.75rem", fontFamily: "'Lato', sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase", borderRadius: "0 0 4px 4px" }}>Most Popular</div>}
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{p.icon || "⛺"}</div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.15rem", color: p.pop ? C.cream : C.forest, marginBottom: "0.2rem" }}>{p.name}</div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", color: p.pop ? "rgba(245,240,232,0.55)" : C.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>{p.aud} · {p.dur}</div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.7rem" }}>
                {Array.isArray(p.feats) && p.feats.map((f, i) => (
                  <li key={i} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: p.pop ? "rgba(245,240,232,0.78)" : C.textMid, padding: "0.38rem 0", borderBottom: `1px solid ${p.pop ? "rgba(245,240,232,0.1)" : C.creamMid}` }}>
                    <span style={{ color: p.pop ? C.goldLight : C.forest, marginRight: "0.55rem" }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Btn full v={p.pop ? "gold" : "outline"} onClick={() => {
                if (p.name === "School Special") {
                  setPage("student");
                } else {
                  setPage("contact");
                }
              }}>
                {p.name === "School Special" ? "View Details" : "Book This Offering"}
              </Btn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Student Section ───────────────────────────────────────────────────
function StudentPage({ setPage }) {
  return (
    <div style={{ background: C.cream, paddingBottom: "0" }}>
      <section className="section-padded" style={{ padding: "6rem 2rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel center>Flexible Programs</SectionLabel>
            <SectionTitle center>School Camp Itineraries</SectionTitle>
          </div>
          <div className="packages-grid">
            {SCHOOL_ITINERARIES.map((p) => (
              <div key={p.id} className="lift" style={{ background: p.pop ? C.forest : C.white, border: `1px solid ${p.pop ? C.forest : C.creamMid}`, padding: "2rem", display: "flex", flexDirection: "column", borderRadius: "8px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{p.icon}</div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.25rem", color: p.pop ? C.cream : C.forest, marginBottom: "0.4rem", lineHeight: 1.2 }}>{p.name}</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: p.pop ? "rgba(245,240,232,0.6)" : C.textLight, marginBottom: "1.5rem" }}>{p.dur}</div>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", flexGrow: 1 }}>
                  {p.feats.map((f) => (
                    <li key={f} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: p.pop ? "rgba(245,240,232,0.85)" : C.textMid, padding: "0.45rem 0" }}>
                      <span style={{ color: p.pop ? C.cream : C.textMid, marginRight: "0.5rem" }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Btn full v={p.pop ? "gold" : "primary"} onClick={() => { 
                  if (p.id === 4) { setPage("contact"); } else { setPage(`plan-${p.id}`); }
                }}>
                  {p.id === 4 ? "Contact Us" : "View Plan"}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padded" style={{ padding: "2rem 2rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel center>Student Development</SectionLabel>
            <SectionTitle center>What Students Take Back</SectionTitle>
            <p style={{ fontFamily: "'Lato', sans-serif", color: C.textMid, fontSize: "0.95rem", marginTop: "0.5rem" }}>
              Experiences that shape students beyond academics.
            </p>
          </div>
          <div className="takebacks-grid">
            {TAKE_BACKS.map((t) => (
              <div key={t.title} className="lift" style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "2.5rem 1.5rem", textAlign: "center", borderRadius: "8px" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{t.icon}</div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.1rem", color: C.forest, marginBottom: "0.75rem", fontWeight: 700 }}>{t.title}</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: C.textMid, lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padded" style={{ background: C.creamDark, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="student-grid" style={{ alignItems: "start" }}>
            <div>
              <SectionLabel>Camp Nutrition</SectionLabel>
              <SectionTitle>Sample Daily Menu</SectionTitle>
              <p style={{ fontFamily: "'Lato', sans-serif", color: C.textMid, fontSize: "0.95rem", marginBottom: "2.5rem" }}>
                Nutritious, wholesome, and tasty meals to keep students energized through every adventure.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {MENU_TIMELINE.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: "1.2rem", background: C.white, padding: "1.2rem", border: `1px solid ${C.creamMid}`, borderRadius: "6px" }}>
                    <div style={{ fontSize: "2rem", flexShrink: 0 }}>{m.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1rem", color: C.forest, marginBottom: "0.3rem" }}>{m.time}</div>
                      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: C.textMid, lineHeight: 1.5 }}>{m.items}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignContent: "center", height: "100%" }}>
              {MEAL_VALUES.map((v, i) => (
                <div key={i} style={{ background: C.forest, padding: "1.8rem", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "6px" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{v.icon}</div>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.goldLight, marginBottom: "0.5rem" }}>{v.title}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: C.cream, lineHeight: 1.5, fontWeight: 300 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0" }}>
        <div style={{ background: C.forest, padding: "4rem 2rem", textAlign: "center" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛡️</div>
            <SectionLabel center light>Our Highest Priority</SectionLabel>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.cream, marginTop: "0.5rem", marginBottom: "1.5rem" }}>Safety & Supervision</h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.8)", lineHeight: 1.8, marginBottom: "1rem", fontWeight: 300 }}>
              24/7 staff supervision, restricted entry points, and complete first-aid support.
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.8)", lineHeight: 1.8, fontWeight: 300 }}>
              Every aspect of the experience is thoughtfully managed to ensure comfort, discipline, and peace of mind for schools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Detailed Itinerary Component ──────────────────────────────────────
function ItineraryDetail({ id, setPage }) {
  const plan = DETAILED_PLANS[id];
  if (!plan) return null;

  return (
    <section style={{ background: C.creamDark, paddingBottom: "4rem" }}>
      <div style={{ background: C.forest, padding: "4rem 2rem", textAlign: "center", color: C.cream }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "1.5rem" }}>
             <Btn sm v="outline" onClick={() => setPage("student")} style={{ borderColor: "rgba(255,255,255,0.3)", color: C.cream }}>
               <i className="fa-solid fa-arrow-left" style={{ marginRight: "8px" }}></i> Back to Plans
             </Btn>
          </div>
          <SectionLabel center light>Detailed Itinerary</SectionLabel>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", marginTop: "0.5rem", marginBottom: "1rem" }}>{plan.title}</h1>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", color: C.goldLight, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>{plan.duration}</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginTop: "1rem", fontStyle: "italic" }}>{plan.subtitle}</p>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "-2rem auto 0", position: "relative", zIndex: 10, padding: "0 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
          {plan.days.map((d, index) => (
            <div key={index} className="day-card lift" style={{ borderRadius: "8px" }}>
              <div className="day-number" style={{ borderRadius: "6px" }}>
                <span>Day</span>
                <strong>0{d.day}</strong>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.3rem", color: C.forest }}>{d.title}</h3>
                <ul className="itinerary-list">
                  {d.activities.map((act, i) => (
                    <li key={i}>
                      <i className="fa-solid fa-circle-check"></i>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px" }}>
            <SectionLabel>What's Included</SectionLabel>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", color: C.forest, marginBottom: "1rem", marginTop: "0.5rem" }}>Camp Inclusions</h3>
            <ul className="itinerary-list">
              {plan.inclusions.map((inc, i) => (
                <li key={i}><i className="fa-solid fa-plus" style={{ color: C.forestLight }}></i> {inc}</li>
              ))}
            </ul>
          </div>
          
          <div style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px" }}>
            <SectionLabel>Preparation</SectionLabel>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", color: C.forest, marginBottom: "1rem", marginTop: "0.5rem" }}>Things To Carry</h3>
            <ul className="itinerary-list">
              {plan.carry.map((item, i) => (
                <li key={i}><i className="fa-solid fa-suitcase-rolling" style={{ color: C.textMid }}></i> {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "3rem", background: C.forest, border: `1px solid ${C.forestMid}`, borderRadius: "8px" }}>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.8rem", color: C.cream, marginBottom: "1.5rem" }}>Ready to plan this trip?</h3>
          <Btn v="gold" onClick={() => setPage("contact")}>Enquire About This Package</Btn>
        </div>
      </div>
    </section>
  );
}

// ── Gallery Component (Reads from Supabase - Images Only) ───────────────
function Gallery({ gallery }) {
  const list = Array.isArray(gallery) ? gallery : DEFAULT_GALLERY;
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
          {list.map((media, i) => (
            <div key={media.id || i} style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "1/1", borderRadius: "6px" }} onClick={() => setSel(media)}>
              <img src={media.url} alt={media.cap} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.7rem", background: "linear-gradient(to top,rgba(30,61,47,.8),transparent)", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.cream }}>{media.cap}</div>
            </div>
          ))}
        </div>
      </div>

      {sel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,14,.93)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }} onClick={() => setSel(null)}>
          <div style={{ maxWidth: "800px", width: "100%" }} onClick={(e) => e.stopPropagation()}>
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
              From gentle valley walks to alpine lakes — certified local guides lead every trail.
            </p>
            {TREKS.map((t) => (
              <div key={t.name} className="lift" style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "1.1rem 1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", gap: "0.5rem", borderRadius: "6px" }}>
                <div>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.98rem", color: C.forest, marginBottom: "0.25rem" }}>{t.name}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.72rem", color: C.textLight }}>📍 {t.km}  ·  ⏱ {t.time}</div>
                </div>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", background: t.col + "18", color: t.col, border: `1px solid ${t.col}`, padding: "0.22rem 0.65rem", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0, borderRadius: "4px" }}>{t.diff}</span>
              </div>
            ))}
          </div>
          <div>
            <SectionLabel>Also Available</SectionLabel>
            <Divider />
            <SectionTitle>More Experiences</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginTop: "0.5rem" }}>
              {[
                ["🐴", "Horse Riding & Pony Rides", "Gentle pony rides for families, full trail rides through scenic Aru Valley."],
                ["🔥", "Bonfire Evenings", "Evenings under the stars with bonfires, music, and the Kashmiri night sky."],
                ["🧭", "Nature Walks", "Guided nature education walks perfect for school and college groups."],
                ["📸", "Photography Tours", "Discover the most stunning viewpoints with our local photography guides."],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", gap: "1rem", padding: "1rem", background: C.creamDark, borderLeft: `3px solid ${C.forest}`, borderRadius: "0 6px 6px 0" }}>
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
            <div key={t.id} style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "2rem", borderRadius: "8px" }}>
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

// ── WhatsApp Booking Engine ───────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", dates: "", guests: "2", pkg: "Base Camp Stay", message: "" });

  const sendToWhatsApp = async (e) => {
    e.preventDefault();
    if (!form.name || !form.dates) return alert("Please fill in your Name and Travel Dates!");

    await supabase.from("inquiries").insert([{
      name: form.name,
      dates: form.dates,
      guests: form.guests,
      pkg: form.pkg,
      message: form.message || ""
    }]);

    const phoneNumber = "918375069287"; 
    const text = `*New Camping Booking Request* 🏕️\n\n` +
                 `*Name:* ${form.name}\n` +
                 `*Travel Dates:* ${form.dates}\n` +
                 `*Campers:* ${form.guests}\n` +
                 `*Offering:* ${form.pkg}\n` +
                 `*Message:* ${form.message || "None"}\n\n` +
                 `_Sent via Aru Camping Website_`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem", minHeight: "80vh" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel center>Instant Reservation</SectionLabel>
          <Divider center />
          <SectionTitle center>Book Via WhatsApp</SectionTitle>
        </div>
        <form onSubmit={sendToWhatsApp} style={{ background: C.white, padding: "2.5rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px" }}>
          <Input label="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., Adnan Shafi" />
          <Input label="Travel Dates & Duration *" value={form.dates} onChange={(e) => setForm({ ...form, dates: e.target.value })} placeholder="e.g., Oct 15 - Oct 17" />
          <Input label="Number of Campers" type="number" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
          <Input label="Special Requests" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Vegetarian meals, pony rides, extra tents..." multi />
          <button type="submit" style={{ width: "100%", minHeight: "52px", background: "#25D366", color: "#fff", border: "none", borderRadius: "4px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "1rem" }}>
            <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.3rem" }}></i> Complete Booking on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Protected Admin Panel (Email/Password & Safe Null Checks) ─────────
function AdminPage({ offerings, fetchOfferings, gallery, fetchGallery }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem("aru_admin_auth") === "true");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("offerings");
  const [inquiries, setInquiries] = useState([]);

  const [offForm, setOffForm] = useState({ name: "", dur: "", aud: "", icon: "⛺", feats: "" });
  const [galForm, setGalForm] = useState({ cap: "" });
  const [fileToUpload, setFileToUpload] = useState(null);

  // Secure Admin Credentials
  const ADMIN_EMAIL = "adshwa1234@gmail.com";
  const ADMIN_PASSWORD = "aru2026";

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailInput.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("aru_admin_auth", "true");
      setError(false);
      fetchInquiries();
    } else {
      setError(true);
    }
  };

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) {
        setInquiries(data);
      } else {
        setInquiries([]);
      }
    } catch (e) {
      setInquiries([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchInquiries();
  }, [isAuthenticated]);

  const addOffering = async (e) => {
    e.preventDefault();
    if (!offForm.name || !offForm.dur) return;

    const { error } = await supabase.from("offerings").insert([{
      name: offForm.name,
      dur: offForm.dur,
      aud: offForm.aud || "All Campers",
      icon: offForm.icon || "⛺",
      feats: (offForm.feats || "").split(",").map(f => f.trim()).filter(f => f)
    }]);

    if (error) alert("Error adding offering: " + error.message);
    else {
      setOffForm({ name: "", dur: "", aud: "", icon: "⛺", feats: "" });
      fetchOfferings();
    }
  };

  const deleteOffering = async (id) => {
    const { error } = await supabase.from("offerings").delete().eq("id", id);
    if (!error) fetchOfferings();
  };

  const addGalleryItem = async (e) => {
    e.preventDefault();
    if (!fileToUpload || !galForm.cap) return alert("Please select an image file and caption!");

    try {
      setUploading(true);
      const fileExt = fileToUpload.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('aru-media').upload(filePath, fileToUpload);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('aru-media').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      const { error: dbError } = await supabase.from('gallery').insert([{
        type: "image",
        url: publicUrl,
        cap: galForm.cap
      }]);

      if (dbError) throw dbError;

      setGalForm({ cap: "" });
      setFileToUpload(null);
      fetchGallery();
      alert("Image uploaded successfully!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const deleteGalleryItem = async (id) => {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (!error) fetchGallery();
  };

  const deleteInquiry = async (id) => {
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (!error) fetchInquiries();
  };

  if (!isAuthenticated) {
    return (
      <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 1.5rem", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: "420px", width: "100%", background: C.white, padding: "2.5rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>🔒</div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "0.5rem" }}>Admin Security Gate</h2>
          {error && <div style={{ color: C.red, marginBottom: "1rem", fontWeight: 700 }}>⚠️ Invalid Email or Password</div>}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Admin Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", marginBottom: "0.8rem", borderRadius: "4px", border: `1px solid ${C.creamMid}`, boxSizing: "border-box" }} required />
            <input type="password" placeholder="Admin Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", marginBottom: "1.2rem", borderRadius: "4px", border: `1px solid ${C.creamMid}`, boxSizing: "border-box" }} required />
            <Btn full type="submit" v="primary">Unlock Panel</Btn>
          </form>
        </div>
      </section>
    );
  }

  const offeringsList = Array.isArray(offerings) ? offerings : [];
  const galleryList = Array.isArray(gallery) ? gallery : [];
  const inquiriesList = Array.isArray(inquiries) ? inquiries : [];

  return (
    <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem", minHeight: "85vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <SectionTitle>Supabase Admin Portal</SectionTitle>
          <Btn sm v="danger" onClick={() => { sessionStorage.removeItem("aru_admin_auth"); setIsAuthenticated(false); }}>Lock Session Now</Btn>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          <Btn v={activeTab === "offerings" ? "primary" : "outline"} onClick={() => setActiveTab("offerings")}>Manage Offerings ({offeringsList.length})</Btn>
          <Btn v={activeTab === "gallery" ? "primary" : "outline"} onClick={() => setActiveTab("gallery")}>Manage Gallery ({galleryList.length})</Btn>
          <Btn v={activeTab === "inquiries" ? "primary" : "outline"} onClick={() => { setActiveTab("inquiries"); fetchInquiries(); }}>Customer Inquiries / Emails ({inquiriesList.length})</Btn>
        </div>

        {/* TAB 1: OFFERINGS */}
        {activeTab === "offerings" && (
          <div className="admin-grid">
            <form onSubmit={addOffering} style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px" }}>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1.0rem" }}>+ Add Offering</h3>
              <Input label="Title *" value={offForm.name} onChange={e => setOffForm({ ...offForm, name: e.target.value })} />
              <Input label="Duration *" value={offForm.dur} onChange={e => setOffForm({ ...offForm, dur: e.target.value })} />
              <Input label="Features (comma separated)" value={offForm.feats} onChange={e => setOffForm({ ...offForm, feats: e.target.value })} multi />
              <Btn full type="submit" v="gold">Save to Database</Btn>
            </form>
            <div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1rem" }}>Active Offerings</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {offeringsList.map((o) => (
                  <div key={o.id} style={{ background: C.white, padding: "1.5rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                    <div>
                      <strong style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, fontSize: "1.1rem" }}>{o.icon} {o.name}</strong>
                      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: C.textLight, marginTop: "4px" }}>⏳ {o.dur} | 🎯 {o.aud}</div>
                    </div>
                    <Btn sm v="danger" onClick={() => deleteOffering(o.id)}>Delete</Btn>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY */}
        {activeTab === "gallery" && (
          <div className="admin-grid">
            <form onSubmit={addGalleryItem} style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px" }}>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1.0rem" }}>+ Upload Photo</h3>
              
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.7rem", textTransform: "uppercase", color: C.textLight }}>Select Image File *</label>
                <input type="file" accept="image/*" onChange={(e) => setFileToUpload(e.target.files[0])} style={{ display: "block", marginTop: "6px" }} />
              </div>

              <Input label="Caption *" value={galForm.cap} onChange={e => setGalForm({ ...galForm, cap: e.target.value })} placeholder="e.g., Evening Campfire" />
              <Btn full type="submit" v="gold" disabled={uploading}>
                {uploading ? "Uploading to Cloud..." : "Upload Image to Supabase"}
              </Btn>
            </form>
            <div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1rem" }}>Live Gallery Photos ({galleryList.length})</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "500px", overflowY: "auto", paddingRight: "5px" }}>
                {galleryList.map((g) => (
                  <div key={g.id} style={{ background: C.white, padding: "1rem", border: `1px solid ${C.creamMid}`, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
                      <img src={g.url} alt={g.cap} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                      <span style={{ fontSize: "0.85rem", color: C.forest, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.cap}</span>
                    </div>
                    <Btn sm v="danger" onClick={() => deleteGalleryItem(g.id)}>Delete</Btn>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER INQUIRIES / EMAILS */}
        {activeTab === "inquiries" && (
          <div>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1.5rem" }}>Customer Booking Inquiries ({inquiriesList.length})</h3>
            {inquiriesList.length === 0 ? (
              <p style={{ fontFamily: "'Lato', sans-serif", color: C.textLight }}>No inquiries received yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {inquiriesList.map((inq) => (
                  <div key={inq.id} style={{ background: C.white, padding: "1.5rem", border: `1px solid ${C.creamMid}`, borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, fontSize: "1.1rem", marginBottom: "0.3rem" }}>{inq.name}</div>
                      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: C.textMid, marginBottom: "0.2rem" }}>📅 <strong>Dates:</strong> {inq.dates} | 🏕️ <strong>Campers:</strong> {inq.guests} | 🏷️ <strong>Package:</strong> {inq.pkg}</div>
                      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: C.text, background: C.cream, padding: "0.75rem", borderRadius: "4px", marginTop: "0.5rem" }}>💬 "{inq.message || 'No additional notes'}"</div>
                      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.7rem", color: C.textLight, marginTop: "0.5rem" }}>Received: {inq.created_at ? new Date(inq.created_at).toLocaleString() : "Recently"}</div>
                    </div>
                    <Btn sm v="danger" onClick={() => deleteInquiry(inq.id)}>Delete</Btn>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
              <Logo size={30} />
              <div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.cream }}>ARU CAMPING RESORT</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.55rem", letterSpacing: "0.18em", color: "rgba(245,240,232,0.45)", textTransform: "uppercase" }}>Aru Valley · Pahalgam · J&K</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.85, fontWeight: 300, maxWidth: "270px" }}>
              Premium camping & trekking experiences designed for groups, schools, colleges, and adventure seekers.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
              <a href="https://wa.me/918375069287" target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", color: C.goldLight, textDecoration: "none" }} title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.15rem", color: C.goldLight, textDecoration: "none" }} title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldLight, marginBottom: "1.2rem" }}>Quick Links</div>
            {["Home", "About", "Offerings", "Gallery", "Treks", "Student", "Feedback", "Admin"].map((l) => (
              <div key={l} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", cursor: "pointer", marginBottom: "0.5rem", padding: "0.2rem 0" }}
                onMouseOver={(e) => (e.currentTarget.style.color = C.cream)} onMouseOut={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
                onClick={() => { setPage(l.toLowerCase()); }}>{l}</div>
            ))}
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", cursor: "pointer", marginBottom: "0.5rem" }} onClick={() => { setPage("contact"); }}>Contact</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldLight, marginBottom: "1.2rem" }}>Contact</div>
            {["Aru Valley, Pahalgam\nJ&K — 192126", "+91 8375069287", "adshwa1234@gmail.com"].map((info, i) => (
              <div key={i} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.8, marginBottom: "0.8rem", whiteSpace: "pre-line" }}>
                {i === 2 ? <EmailLink email="adshwa1234@gmail.com" /> : info}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", color: "rgba(245,240,232,0.28)", paddingTop: "1.5rem", borderTop: "1px solid rgba(245,240,232,0.08)" }}>
          © 2026 Aru Camping Resort · All Rights Reserved · Aru Valley, Pahalgam, Jammu & Kashmir
        </div>
      </div>
    </footer>
  );
}

// ── Main App (Fetches Real-Time Data from Supabase) ───────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [offerings, setOfferings] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Fetch Offerings from Supabase DB
  const fetchOfferings = async () => {
    try {
      const { data, error } = await supabase.from("offerings").select("*").order("created_at", { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) setOfferings(data);
      else setOfferings(DEFAULT_OFFERINGS);
    } catch (e) {
      setOfferings(DEFAULT_OFFERINGS);
    }
  };

  // Fetch Gallery Assets from Supabase DB
  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) setGallery(data);
      else setGallery(DEFAULT_GALLERY);
    } catch (e) {
      setGallery(DEFAULT_GALLERY);
    }
  };

  useEffect(() => {
    injectCSS();
    fetchOfferings();
    fetchGallery();
  }, []);

  const nav = (p) => { setPage(p); window.scrollTo(0, 0); };

  const renderPage = () => {
    switch (page) {
      case "home": return <><Hero setPage={nav} /><About /><OfferingsPage setPage={nav} offerings={offerings} /><Gallery gallery={gallery} /><Treks /></>;
      case "about": return <About />;
      case "offerings": return <OfferingsPage setPage={nav} offerings={offerings} />;
      case "gallery": return <Gallery gallery={gallery} />;
      case "treks": return <Treks />;
      case "student": return <StudentPage setPage={nav} />;
      case "feedback": return <FeedbackPage />;
      case "contact": return <Contact />;
      case "admin": return <AdminPage offerings={offerings} fetchOfferings={fetchOfferings} gallery={gallery} fetchGallery={fetchGallery} />;
      
      // Dynamic Itinerary Pages
      case "plan-1": return <ItineraryDetail id={1} setPage={nav} />;
      case "plan-2": return <ItineraryDetail id={2} setPage={nav} />;
      case "plan-3": return <ItineraryDetail id={3} setPage={nav} />;
      
      default: return <Hero setPage={nav} />;
    }
  };

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <Navbar page={page} setPage={nav} />
      <div style={{ paddingTop: page === "home" ? 0 : "66px" }}>
        {renderPage()}
      </div>
      <Footer setPage={nav} />
    </div>
  );
}