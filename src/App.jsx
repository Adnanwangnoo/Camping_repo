// import { useState, useEffect, useRef } from "react";

// // ── Brand Colors ──────────────────────────────────────────────────────
// const C = {
//   cream: "#f5f0e8",
//   creamDark: "#ede6d6",
//   creamMid: "#ddd5c0",
//   forest: "#1e3d2f",
//   forestMid: "#2a5240",
//   forestLight: "#3a6b50",
//   gold: "#b8963e",
//   goldLight: "#d4aa55",
//   text: "#1a2e22",
//   textMid: "#3d5a46",
//   textLight: "#6b8a72",
//   white: "#ffffff",
//   red: "#8b3a2a",
// };

// // ── Inject Google Fonts + Global CSS + Mobile Responsive CSS ──────────
// function injectCSS() {
//   if (document.getElementById("aru-css")) return;
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href =
//     "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700;900&display=swap";
//   document.head.appendChild(link);

//   const fa = document.createElement("link");
//   fa.rel = "stylesheet";
//   fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
//   document.head.appendChild(fa);

//   const style = document.createElement("style");
//   style.id = "aru-css";
//   style.textContent = `
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     body { background: ${C.cream}; }
//     ::selection { background: ${C.forest}; color: ${C.cream}; }
//     ::-webkit-scrollbar { width: 5px; }
//     ::-webkit-scrollbar-track { background: ${C.creamDark}; }
//     ::-webkit-scrollbar-thumb { background: ${C.forest}; }
//     input:focus, textarea:focus, select:focus { outline: none; border-color: ${C.forest} !important; }
//     textarea { resize: vertical; }
//     .lift { transition: transform .22s, box-shadow .22s; }
//     .lift:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(30,61,47,.13); }

//     /* ── Mobile Nav ── */
//     .mobile-nav-overlay {
//       display: none;
//       position: fixed;
//       top: 66px;
//       left: 0; right: 0;
//       background: ${C.cream};
//       border-bottom: 2px solid ${C.forest};
//       z-index: 99;
//       padding: 1.5rem 2rem 2rem;
//       flex-direction: column;
//       gap: 0;
//     }
//     .mobile-nav-overlay.open { display: flex; }
//     .mobile-nav-link {
//       font-family: 'Lato', sans-serif;
//       font-size: 0.85rem;
//       letter-spacing: 0.1em;
//       text-transform: uppercase;
//       color: ${C.textMid};
//       cursor: pointer;
//       padding: 0.85rem 0;
//       border-bottom: 1px solid ${C.creamMid};
//       font-weight: 400;
//     }
//     .mobile-nav-link:last-child { border-bottom: none; }
//     .mobile-nav-link.active { color: ${C.forest}; font-weight: 700; }
//     .mobile-nav-actions {
//       display: flex;
//       align-items: center;
//       gap: 1.2rem;
//       margin-top: 1.2rem;
//       padding-top: 1.2rem;
//       border-top: 1px solid ${C.creamMid};
//     }

//     /* ── Responsive Grids ── */
//     .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
//     .about-img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//     .packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
//     .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
//     .treks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
//     .contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: start; }
//     .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
//     .strip-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
//     .student-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: center; }
//     .takebacks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
//     .safety-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 3rem; align-items: center; }
//     .about-bullets { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
//     .hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(249,248,245,0.18); }
//     .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
//     .nav-desktop { display: flex; gap: 1.2rem; align-items: center; flex-wrap: wrap; }
//     .hamburger-btn { display: none; background: none; border: none; cursor: pointer; padding: 0.4rem; color: ${C.forest}; font-size: 1.5rem; line-height: 1; }

//     @media (max-width: 900px) {
//       .nav-desktop { display: none !important; }
//       .hamburger-btn { display: block; }
//       .hero-stats { gap: 1.5rem; flex-wrap: wrap; }
//       .hero-btns { flex-direction: column; }
//       .hero-btns button { width: 100%; }
//       .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
//       .about-img-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
//       .about-img-grid img { aspect-ratio: 4/3 !important; margin-top: 0 !important; }
//       .about-bullets { grid-template-columns: 1fr; gap: 0.75rem; }
//       .packages-grid { grid-template-columns: 1fr; }
//       .gallery-grid { grid-template-columns: repeat(2, 1fr); }
//       .treks-grid { grid-template-columns: 1fr; gap: 2.5rem; }
//       .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
//       .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
//       .student-grid { grid-template-columns: 1fr; gap: 2rem; }
//       .takebacks-grid { grid-template-columns: 1fr 1fr; }
//       .safety-grid { grid-template-columns: 1fr; gap: 1.5rem; }
//       .safety-divider { display: none; }
//       .strip-grid { grid-template-columns: 1fr 1fr; gap: 1.2rem; }
//       .section-padded { padding: 4rem 1.25rem !important; }
//       .hero-text-pad { padding: 0 1.5rem 0 1.5rem !important; }
//     }

//     @media (max-width: 600px) {
//       .gallery-grid { grid-template-columns: 1fr; }
//       .strip-grid { grid-template-columns: 1fr; }
//       .takebacks-grid { grid-template-columns: 1fr; }
//       .hero-main-title { font-size: 2.8rem !important; }
//       .hero-sub-title { font-size: 2rem !important; }
//       h2 { font-size: 1.9rem !important; }
//       .about-img-grid { grid-template-columns: 1fr; }
//       .about-img-grid img:last-child { display: none; }
//     }
//   `;
//   document.head.appendChild(style);
// }

// // ── Data ──────────────────────────────────────────────────────────────
// const PACKAGES = [
//   {
//     id: 1,
//     icon: "☀️",
//     name: "Day Explorer",
//     dur: "1 Day",
//     aud: "Families & Couples",
//     feats: ["Valley Walk", "Picnic Lunch", "Photography Spots", "Local Guide"],
//   },
//   {
//     id: 2,
//     icon: "⛺",
//     name: "Base Camp Stay",
//     dur: "2D / 1N",
//     aud: "College Groups",
//     feats: ["Swiss Tent Stay", "Bonfire Evening", "Pony Ride", "Valley Trek", "All Meals"],
//     pop: true,
//   },
//   {
//     id: 3,
//     icon: "🏔️",
//     name: "Glacier Expedition",
//     dur: "4D / 3N",
//     aud: "Trek Enthusiasts",
//     feats: ["Kolahai Glacier", "Alpine Lake", "Liddarwat Camp", "Expert Guide", "Full Board"],
//   },
//   {
//     id: 4,
//     icon: "🎒",
//     name: "School Special",
//     dur: "Custom",
//     aud: "Schools & Institutes",
//     feats: ["Safety Briefing", "Nature Education", "Team Activities", "Supervised", "CCTV Camp"],
//   },
// ];

// const TREKS = [
//   { name: "Aru Valley Loop", diff: "Easy", km: "6 km", time: "3 hrs", col: "#3a6b50" },
//   { name: "Lidderwatt Trek", diff: "Moderate", km: "12 km", time: "6–7 hrs", col: "#b8963e" },
//   { name: "Alpine Lakes", diff: "Moderate-Hard", km: "16 km", time: "8 hrs", col: "#b8963e" },
//   { name: "Kolahai Glacier", diff: "Hard", km: "28 km", time: "2 days", col: "#8b3a2a" },
// ];

// const GALLERY = [
//   { url: "/images/s2.jpeg", cap: "Aru Valley Panorama" },
//   { url: "/images/t2.jpeg", cap: "Camp Setup" },
//   { url: "/images/royalsuits.jpeg", cap: "Royal Suits" },
//   { url: "/images/ph.jpeg", cap: "Alpine Meadows" },
//   { url: "/images/hourse.jpeg", cap: "Horse Riding" },
//   { url: "/images/hero.jpeg", cap: "Swiss Tents" },
// ];

// const TESTIMONIALS = [
//   {
//     id: 1,
//     name: "Dr. Rohan Sharma",
//     date: "April 2026",
//     rating: 5,
//     message: "A perfect, safe, and beautiful arrangement for our university group. The in-house kitchen served incredibly fresh and hot food, and the tents were perfectly comfortable.",
//   },
//   {
//     id: 2,
//     name: "Priya V.",
//     date: "March 2026",
//     rating: 5,
//     message: "Breathtaking views of the Kolahai Glacier trail. The local certified guide made all the difference in safety and historical knowledge of the trails. Highly recommended!",
//   },
//   {
//     id: 3,
//     name: "Principal K. L. Raina",
//     date: "May 2026",
//     rating: 5,
//     message: "Excellent arrangement for our school kids. Very disciplined and properly supervised with CCTV. The nature walks added great academic value to our trip.",
//   },
// ];

// const SCHOOL_ITINERARIES = [
//   {
//     id: 1,
//     icon: "☀️",
//     name: "Summer School Camp",
//     dur: "1N / 2D Package",
//     feats: ["Arrival & Briefing", "Welcome Ice-breakers", "Guided Trek to Trail", "Group Feedback Session"],
//   },
//   {
//     id: 2,
//     icon: "⛺",
//     name: "Adventure & Exploration",
//     dur: "2N / 3D Package",
//     feats: ["Scenic Drive to Camp", "Nature Trail Trek", "Campfire & Games", "Morning Learning Session"],
//     pop: true,
//   },
//   {
//     id: 3,
//     icon: "🏔️",
//     name: "Lidderwatt Expedition",
//     dur: "3N / 4D Package",
//     feats: ["Trek to Lidderwatt Valley", "Village Life Interaction", "Shepherd Mud-House Visit", "Farewell Campfire"],
//   },
//   {
//     id: 4,
//     icon: "🎒",
//     name: "Institutional Special",
//     dur: "Custom Package",
//     feats: ["Expedition Leadership", "Glacier Exploration", "Outdoor Survival Basics", "CCTV Monitored Camp"],
//   },
// ];

// const TAKE_BACKS = [
//   { icon: "🧭", title: "Leadership", desc: "Inspiring others and leading with purpose." },
//   { icon: "✨", title: "Confidence", desc: "Building self-belief and embracing new challenges." },
//   { icon: "🤝", title: "Teamwork", desc: "Working together, respecting diverse strengths." },
//   { icon: "🧩", title: "Problem Solving", desc: "Thinking critically and finding creative solutions." },
// ];

// const MENU_TIMELINE = [
//   { time: "Breakfast", icon: "🍳", items: "Tea, Boiled Eggs, Bread Butter & Jam, Choice of Poha / Upma / Halwa / Aloo Paratha" }, 
//   { time: "Packed Lunch", icon: "🍱", items: "Veg Pulav / Fried Rice, Fruit Juice, Fresh Fruit" }, 
//   { time: "Afternoon Tea", icon: "☕", items: "Hot Tea & Biscuits upon returning to camp" }, 
//   { time: "Dinner", icon: "🍲", items: "1 Non-Veg & 1 Veg Dish, Lentils / Beans / Cheese Curry, Rice, Fresh Salad" } 
// ];

// const MEAL_VALUES = [
//   { title: "Balanced Nutrition", desc: "Nutritious meals for active young minds", icon: "🥗" }, 
//   { title: "Hygienic & Safe", desc: "Prepared with quality ingredients in a hygienic environment", icon: "✨" }, 
//   { title: "Variety & Taste", desc: "Delicious meals with a mix of vegetarian and non-vegetarian", icon: "🥘" }, 
//   { title: "Energy for Adventures", desc: "Meals designed to keep students active and energized", icon: "⚡" } 
// ];

// // ── EmailLink ─────────────────────────────────────────────────────────
// function EmailLink({ email }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = (e) => {
//     e.preventDefault();
//     navigator.clipboard.writeText(email);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
//       <a href={`mailto:${email}`} style={{ color: "inherit", textDecoration: "underline", cursor: "pointer" }}>
//         {email}
//       </a>
//       <button
//         onClick={handleCopy}
//         style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.7rem", color: C.forestLight }}
//         title="Copy to clipboard"
//       >
//         <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
//         {copied && <span style={{ marginLeft: "4px", fontSize: "0.6rem" }}>Copied!</span>}
//       </button>
//     </div>
//   );
// }

// // ── Logo ──────────────────────────────────────────────────────────────
// function Logo({ size = 36, color }) {
//   return (
//     <img
//       src="/images/arulogo.png"
//       alt="Aru Camping Logo"
//       style={{ width: size, height: size, objectFit: "contain",objectPosition: "bottom",borderRadius: "50%" }}
//     />
//   );
// }

// function Divider({ center = false }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1rem 0", justifyContent: center ? "center" : "flex-start" }}>
//       <div style={{ height: "1px", width: "36px", background: C.forest, opacity: 0.25 }} />
//       <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>🌲🌲🌲</span>
//       <div style={{ height: "1px", width: "36px", background: C.forest, opacity: 0.25 }} />
//     </div>
//   );
// }

// function SectionLabel({ children, center = false, light = false }) {
//   return (
//     <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: light ? "rgba(245,240,232,0.6)" : C.forestLight, fontWeight: 700, textAlign: center ? "center" : "left" }}>
//       {children}
//     </div>
//   );
// }

// function SectionTitle({ children, center = false, light = false }) {
//   return (
//     <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: light ? C.cream : C.forest, lineHeight: 1.2, textAlign: center ? "center" : "left", marginBottom: "0.5rem" }}>
//       {children}
//     </h2>
//   );
// }

// function Btn({ children, onClick, v = "primary", full = false, sm = false }) {
//   const base = {
//     fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: "0.1em",
//     textTransform: "uppercase", cursor: "pointer", border: "2px solid",
//     transition: "opacity .2s", width: full ? "100%" : "auto",
//     fontSize: sm ? "0.68rem" : "0.78rem",
//     padding: sm ? "0.45rem 1.1rem" : "0.8rem 1.9rem",
//     display: "inline-block", textAlign: "center",
//     minHeight: "44px",
//   };
//   const vs = {
//     primary: { ...base, background: C.forest, borderColor: C.forest, color: C.cream },
//     outline: { ...base, background: "transparent", borderColor: C.forest, color: C.forest },
//     gold: { ...base, background: C.gold, borderColor: C.gold, color: C.white },
//     ghost: { ...base, background: "transparent", borderColor: C.cream, color: C.cream },
//     danger: { ...base, background: C.red, borderColor: C.red, color: C.white },
//   };
//   return (
//     <button style={vs[v]} onClick={onClick}
//       onMouseOver={(e) => (e.currentTarget.style.opacity = "0.82")}
//       onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}>
//       {children}
//     </button>
//   );
// }

// function Input({ label, value, onChange, type = "text", placeholder, multi = false }) {
//   const s = {
//     width: "100%", border: `1px solid ${C.creamMid}`, padding: "0.75rem",
//     fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.text,
//     background: C.cream, boxSizing: "border-box", display: "block",
//     minHeight: "44px",
//   };
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLight, display: "block", marginBottom: "0.35rem" }}>{label}</label>
//       {multi
//         ? <textarea style={{ ...s, minHeight: "100px" }} value={value} onChange={onChange} placeholder={placeholder} />
//         : <input style={s} type={type} value={value} onChange={onChange} placeholder={placeholder} />}
//     </div>
//   );
// }

// function Alert({ type, children }) {
//   const colors = {
//     success: { bg: "#2a524018", border: "#3a6b5040", color: C.forestMid },
//     error: { bg: `${C.red}18`, border: `${C.red}30`, color: C.red },
//     info: { bg: `${C.forest}12`, border: `${C.forest}30`, color: C.forest },
//   };
//   const c = colors[type] || colors.info;
//   return (
//     <div style={{ background: c.bg, border: `1px solid ${c.border}`, padding: "0.8rem", marginBottom: "1rem", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: c.color }}>
//       {children}
//     </div>
//   );
// }

// // ── Navbar ────────────────────────────────────────────────────────────
// function Navbar({ page, setPage, setModal }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const links = ["Home", "About", "Packages", "Gallery", "Treks", "Student", "Feedback"];

//   const navTo = (p) => {
//     setPage(p);
//     setMenuOpen(false);
//     window.scrollTo(0, 0);
//   };

//   return (
//     <>
//       <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: C.cream, borderBottom: `2px solid ${C.forest}`, padding: "0 1.5rem 0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}>
//         {/* Logo */}
//         <div style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }} onClick={() => navTo("home")}>
//           <Logo size={48} />
//           <div>
//             <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.forest, fontWeight: 700, lineHeight: 1.1 }}>ARU CAMPING</div>
//             <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: C.forestLight, textTransform: "uppercase" }}>RESORT · ARU VALLEY</div>
//           </div>
//         </div>

//         {/* Desktop Nav */}
//         <div className="nav-desktop">
//           {links.map((l) => (
//             <span key={l}
//               style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.74rem", letterSpacing: "0.07em", textTransform: "uppercase", color: page === l.toLowerCase() ? C.forest : C.textMid, cursor: "pointer", fontWeight: page === l.toLowerCase() ? 700 : 400, borderBottom: page === l.toLowerCase() ? `2px solid ${C.forest}` : "2px solid transparent", paddingBottom: "2px" }}
//               onClick={() => navTo(l.toLowerCase())}>
//               {l}
//             </span>
//           ))}
//           <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "0.5rem" }}>
//             <a
//               href="https://maps.app.goo.gl/ybndetDAMhMxX2o98"
//               target="_blank"
//               rel="noreferrer"
//               style={{ fontSize: "1.2rem", color: C.forest, textDecoration: "none" }}
//               title="View on Google Maps"
//             >
//               <i className="fa-solid fa-location-dot"></i>
//             </a>
//             <a href="https://wa.me/918375069287" target="_blank" rel="noreferrer" style={{ fontSize: "1.3rem", color: C.forest, textDecoration: "none" }} title="WhatsApp">
//               <i className="fa-brands fa-whatsapp"></i>
//             </a>
//             <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", color: C.forest, textDecoration: "none" }} title="Instagram">
//               <i className="fa-brands fa-instagram"></i>
//             </a>
//             <Btn sm onClick={() => navTo("contact")}>Contact Us</Btn>
//           </div>
//         </div>

//         {/* Hamburger */}
//         <button className="hamburger-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
//           {menuOpen
//             ? <i className="fa-solid fa-xmark"></i>
//             : <i className="fa-solid fa-bars"></i>}
//         </button>
//       </nav>

//       {/* Mobile dropdown */}
//       <div className={`mobile-nav-overlay${menuOpen ? " open" : ""}`}>
//         {links.map((l) => (
//           <div key={l} className={`mobile-nav-link${page === l.toLowerCase() ? " active" : ""}`} onClick={() => navTo(l.toLowerCase())}>
//             {l}
//           </div>
//         ))}
//         <div className="mobile-nav-link" onClick={() => navTo("contact")}>Contact</div>
//         <div className="mobile-nav-actions">
//           <a
//             href="https://maps.app.goo.gl/ybndetDAMhMxX2o98"
//             target="_blank"
//             rel="noreferrer"
//             style={{ fontSize: "1.5rem", color: C.forest, textDecoration: "none" }}
//             title="View on Google Maps"
//           >
//             <i className="fa-solid fa-location-dot"></i>
//           </a>
//           <a href="https://wa.me/918375069287" target="_blank" rel="noreferrer" style={{ fontSize: "1.5rem", color: C.forest, textDecoration: "none" }}>
//             <i className="fa-brands fa-whatsapp"></i>
//           </a>
//           <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.4rem", color: C.forest, textDecoration: "none" }}>
//             <i className="fa-brands fa-instagram"></i>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }

// // ── Hero Section ──────────────────────────────────────────────────────
// function Hero({ setPage }) {
//   return (
//     <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden", paddingBottom: "4rem" }}>
//       <img
//         src="/images/hero.jpeg"
//         alt="Aru Valley Tents"
//         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" }}
//       />
//       <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(22,48,36,0.85) 0%,rgba(22,48,36,0.4) 60%,rgba(22,48,36,0.85) 100%)" }} />
//       <div className="hero-text-pad" style={{ position: "relative", maxWidth: "680px", padding: "0 3rem 0 5vw", zIndex: 2 }}>
//         <Logo size={52} color={C.cream} />
//         <div className="hero-main-title" style={{ marginTop: "1rem", fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", color: C.cream, lineHeight: 1.0, fontWeight: 700 }}>ARU CAMPING</div>
//         <div className="hero-sub-title" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.8rem,4.5vw,3.5rem)", color: C.goldLight, lineHeight: 1.0, fontStyle: "italic", marginBottom: "1.5rem" }}>Experiences</div>
//         <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "rgba(249,248,245,0.78)", lineHeight: 1.85, maxWidth: "460px", marginBottom: "2.5rem", fontWeight: 300 }}>
//           Premium camping, guided treks & unforgettable group adventures in Kashmir's most pristine valley.
//         </p>
//         <div className="hero-btns">
//           <Btn onClick={() => setPage("packages")}>Explore Packages</Btn>
//           <Btn v="ghost" onClick={() => setPage("contact")}>Book Now</Btn>
//         </div>
//         <div className="hero-stats">
//           {[["500+", "Happy Campers"], ["12", "Trek Routes"], ["4.9★", "Rating"]].map(([n, l]) => (
//             <div key={l}>
//               <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.7rem", color: C.goldLight }}>{n}</div>
//               <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(249,248,245,0.55)", textTransform: "uppercase" }}>{l}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── Features Strip ────────────────────────────────────────────────────
// function Strip() {
//   const items = [
//     ["🛡️", "Safe & Supervised", "24/7 CCTV, trained staff, first aid on every trip."],
//     ["🍽️", "Nourishing Meals", "In-house kitchen — fresh, hygienic meals for all groups."],
//     ["⛺", "Swiss Tents", "Comfortable, spacious group tents for restful nights."],
//     ["🏔️", "Expert Guides", "Certified local guides with years of mountain experience."],
//   ];
//   return (
//     <div style={{ background: C.forest, padding: "2.5rem 1.5rem" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div className="strip-grid">
//           {items.map(([icon, title, desc]) => (
//             <div key={title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
//               <div style={{ fontSize: "1.7rem", flexShrink: 0 }}>{icon}</div>
//               <div>
//                 <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.cream, marginBottom: "0.25rem" }}>{title}</div>
//                 <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── About ─────────────────────────────────────────────────────────────
// function About() {
//   return (
//     <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div className="about-grid">
//           <div>
//             <SectionLabel>Our Story</SectionLabel>
//             <Divider />
//             <SectionTitle>Nature at Its Best</SectionTitle>
//             <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: C.textMid, lineHeight: 1.9, fontWeight: 300, marginBottom: "1.2rem" }}>
//               Nestled in <strong style={{ color: C.forest, fontWeight: 700 }}>Aru Valley, Pahalgam</strong>, our private-land resort is framed by pine forests, alpine rivers, and snow-capped peaks — the perfect base camp for Kashmir's most iconic treks.
//             </p>
//             <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: C.textMid, lineHeight: 1.9, fontWeight: 300, marginBottom: "2rem" }}>
//               We specialise in <strong style={{ color: C.forest, fontWeight: 700 }}>school, college & university group camps</strong>, guided treks to Liddarwat, Kolahai Glacier and Alpine Lakes, plus pony rides, horse riding, and bonfire evenings.
//             </p>
//             <div className="about-bullets">
//               {[["SAFE", "24/7 CCTV & staff"], ["STRUCTURED", "Planned itineraries"], ["SUPERVISED", "Expert guides always"], ["NOURISHING", "In-house kitchen"]].map(([t, d]) => (
//                 <div key={t} style={{ borderLeft: `3px solid ${C.forest}`, paddingLeft: "0.8rem" }}>
//                   <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color: C.forest, textTransform: "uppercase" }}>{t}</div>
//                   <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.76rem", color: C.textLight, marginTop: "2px" }}>{d}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="about-img-grid">
//             <img src="/images/tt.jpeg" style={{ width: "125%", aspectRatio: "3/4", objectFit: "cover" }} alt="Camp" />
//             <img src="/images/fish.jpeg" style={{ width: "125%", aspectRatio: "3/4", objectFit: "", marginTop: "3rem" }} alt="Trek" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── Packages ──────────────────────────────────────────────────────────
// function Packages({ setModal }) {
//   return (
//     <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
//           <SectionLabel center>What We Offer</SectionLabel>
//           <Divider center />
//           <SectionTitle center>Our Packages</SectionTitle>
//         </div>
//         <div className="packages-grid">
//           {PACKAGES.map((p) => (
//             <div key={p.id} className="lift" style={{ background: p.pop ? C.forest : C.white, border: `2px solid ${p.pop ? C.forest : C.creamMid}`, padding: "2rem", position: "relative" }}>
//               {p.pop && <div style={{ position: "absolute", top: "-1px", left: "1.5rem", background: C.gold, color: C.white, padding: "0.18rem 0.75rem", fontFamily: "'Lato', sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase" }}>Most Popular</div>}
//               <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{p.icon}</div>
//               <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.15rem", color: p.pop ? C.cream : C.forest, marginBottom: "0.2rem" }}>{p.name}</div>
//               <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", color: p.pop ? "rgba(245,240,232,0.55)" : C.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>{p.aud} · {p.dur}</div>
//               <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.7rem" }}>
//                 {p.feats.map((f) => (
//                   <li key={f} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: p.pop ? "rgba(245,240,232,0.78)" : C.textMid, padding: "0.38rem 0", borderBottom: `1px solid ${p.pop ? "rgba(245,240,232,0.1)" : C.creamMid}` }}>
//                     <span style={{ color: p.pop ? C.goldLight : C.forest, marginRight: "0.55rem" }}>✓</span>{f}
//                   </li>
//                 ))}
//               </ul>
//               <Btn full v={p.pop ? "gold" : "outline"} onClick={() => setModal("contact")}>Book This Package</Btn>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── Student Section ───────────────────────────────────────────────────
// function StudentPage({ setPage }) {
//   return (
//     <div style={{ background: C.cream, paddingBottom: "0" }}>
      
//       {/* --- Section 1: Itineraries --- */}
//       <section className="section-padded" style={{ padding: "6rem 2rem 4rem" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
//             <SectionLabel center>Flexible Programs</SectionLabel>
//             <SectionTitle center>School Camp Itineraries</SectionTitle>
//           </div>
          
//           <div className="packages-grid">
//             {SCHOOL_ITINERARIES.map((p) => (
//               <div key={p.id} className="lift" style={{ background: p.pop ? C.forest : C.white, border: `1px solid ${p.pop ? C.forest : C.creamMid}`, padding: "2rem", display: "flex", flexDirection: "column" }}>
//                 <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{p.icon}</div>
//                 <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.25rem", color: p.pop ? C.cream : C.forest, marginBottom: "0.4rem", lineHeight: 1.2 }}>{p.name}</div>
//                 <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: p.pop ? "rgba(245,240,232,0.6)" : C.textLight, marginBottom: "1.5rem" }}>{p.dur}</div>
                
//                 <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", flexGrow: 1 }}>
//                   {p.feats.map((f) => (
//                     <li key={f} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: p.pop ? "rgba(245,240,232,0.85)" : C.textMid, padding: "0.45rem 0" }}>
//                       <span style={{ color: p.pop ? C.cream : C.textMid, marginRight: "0.5rem" }}>✓</span>{f}
//                     </li>
//                   ))}
//                 </ul>
//                 <Btn full v={p.pop ? "gold" : "primary"} onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>View Plan</Btn>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- Section 2: What Students Take Back --- */}
//       <section className="section-padded" style={{ padding: "2rem 2rem 4rem" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//             <SectionLabel center>Student Development</SectionLabel>
//             <SectionTitle center>What Students Take Back</SectionTitle>
//             <p style={{ fontFamily: "'Lato', sans-serif", color: C.textMid, fontSize: "0.95rem", marginTop: "0.5rem" }}>
//               Experiences that shape students beyond academics.
//             </p>
//           </div>
          
//           <div className="takebacks-grid">
//             {TAKE_BACKS.map((t) => (
//               <div key={t.title} className="lift" style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "2.5rem 1.5rem", textAlign: "center" }}>
//                 <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{t.icon}</div>
//                 <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.1rem", color: C.forest, marginBottom: "0.75rem", fontWeight: 700 }}>{t.title}</div>
//                 <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: C.textMid, lineHeight: 1.6 }}>{t.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- Section 3: Meal Plan (NEW) --- */}
//       <section className="section-padded" style={{ background: C.creamDark, padding: "5rem 2rem" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div className="student-grid" style={{ alignItems: "start" }}>
            
//             {/* Left: Menu Timeline */}
//             <div>
//               <SectionLabel>Camp Nutrition</SectionLabel>
//               <SectionTitle>Sample Daily Menu</SectionTitle>
//               <p style={{ fontFamily: "'Lato', sans-serif", color: C.textMid, fontSize: "0.95rem", marginBottom: "2.5rem" }}>
//                 Nutritious, wholesome, and tasty meals to keep students energized through every adventure.
//               </p>
              
//               <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
//                 {MENU_TIMELINE.map((m, i) => (
//                   <div key={i} style={{ display: "flex", gap: "1.2rem", background: C.white, padding: "1.2rem", border: `1px solid ${C.creamMid}` }}>
//                     <div style={{ fontSize: "2rem", flexShrink: 0 }}>{m.icon}</div>
//                     <div>
//                       <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1rem", color: C.forest, marginBottom: "0.3rem" }}>{m.time}</div>
//                       <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: C.textMid, lineHeight: 1.5 }}>{m.items}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right: Values Grid */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignContent: "center", height: "100%" }}>
//               {MEAL_VALUES.map((v, i) => (
//                 <div key={i} style={{ background: C.forest, padding: "1.8rem", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
//                   <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{v.icon}</div>
//                   <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.goldLight, marginBottom: "0.5rem" }}>{v.title}</div>
//                   <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: C.cream, lineHeight: 1.5, fontWeight: 300 }}>{v.desc}</div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* --- Section 4: Safety Banner --- */}
//       <section style={{ padding: "0" }}>
//         <div style={{ background: C.forest, padding: "4rem 2rem", textAlign: "center" }}>
//           <div style={{ maxWidth: "800px", margin: "0 auto" }}>
//             <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛡️</div>
//             <SectionLabel center light>Our Highest Priority</SectionLabel>
//             <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.cream, marginTop: "0.5rem", marginBottom: "1.5rem" }}>Safety & Supervision</h3>
//             <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.8)", lineHeight: 1.8, marginBottom: "1rem", fontWeight: 300 }}>
//               24/7 staff supervision, restricted entry points, and complete first-aid support.
//             </p>
//             <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.8)", lineHeight: 1.8, fontWeight: 300 }}>
//               Every aspect of the experience is thoughtfully managed to ensure comfort, discipline, and peace of mind for schools.
//             </p>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }

// // ── Gallery ───────────────────────────────────────────────────────────
// function Gallery() {
//   const [sel, setSel] = useState(null);
//   return (
//     <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//           <SectionLabel center>Visual Journey</SectionLabel>
//           <Divider center />
//           <SectionTitle center>Life at Aru Camp</SectionTitle>
//         </div>
//         <div className="gallery-grid">
//           {GALLERY.map((img, i) => (
//             <div key={i} style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: i === 0 || i === 3 ? "1/1.3" : "1/1" }} onClick={() => setSel(img)}>
//               <img src={img.url} alt={img.cap} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }}
//                 onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
//                 onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")} />
//               <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.7rem", background: "linear-gradient(to top,rgba(30,61,47,.8),transparent)", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.cream }}>{img.cap}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {sel && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,14,.93)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }} onClick={() => setSel(null)}>
//           <div style={{ maxWidth: "800px", width: "100%" }}>
//             <img src={sel.url} alt={sel.cap} style={{ width: "100%", display: "block" }} />
//             <div style={{ background: C.forest, padding: "1rem", textAlign: "center", fontFamily: "'Libre Baskerville', serif", color: C.cream }}>{sel.cap}</div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// // ── Treks ─────────────────────────────────────────────────────────────
// function Treks() {
//   return (
//     <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div className="treks-grid">
//           <div>
//             <SectionLabel>Adventure Routes</SectionLabel>
//             <Divider />
//             <SectionTitle>Trek Routes</SectionTitle>
//             <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.textLight, lineHeight: 1.85, marginBottom: "2rem", fontWeight: 300 }}>
//               From gentle valley walks to the mighty Kolahai Glacier — certified local guides lead every trail.
//             </p>
//             {TREKS.map((t) => (
//               <div key={t.name} className="lift" style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "1.1rem 1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", gap: "0.5rem" }}>
//                 <div>
//                   <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.98rem", color: C.forest, marginBottom: "0.25rem" }}>{t.name}</div>
//                   <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.72rem", color: C.textLight }}>📍 {t.km}  ·  ⏱ {t.time}</div>
//                 </div>
//                 <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", background: t.col + "18", color: t.col, border: `1px solid ${t.col}`, padding: "0.22rem 0.65rem", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{t.diff}</span>
//               </div>
//             ))}
//           </div>
//           <div>
//             <SectionLabel>Also Available</SectionLabel>
//             <Divider />
//             <SectionTitle>More Experiences</SectionTitle>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginTop: "0.5rem" }}>
//               {[
//                 ["🐴", "Horse Riding & Pony Rides", "Gentle pony rides for families, full trail rides through scenic Aru Valley."],
//                 ["🔥", "Bonfire Evenings", "Evenings under the stars with bonfires, music, and the Kashmiri night sky."],
//                 ["🧭", "Nature Walks", "Guided nature education walks perfect for school and college groups."],
//                 ["📸", "Photography Tours", "Discover the most stunning viewpoints with our local photography guides."],
//               ].map(([icon, title, desc]) => (
//                 <div key={title} style={{ display: "flex", gap: "1rem", padding: "1rem", background: C.creamDark, borderLeft: `3px solid ${C.forest}` }}>
//                   <span style={{ fontSize: "1.5rem" }}>{icon}</span>
//                   <div>
//                     <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.93rem", color: C.forest, marginBottom: "0.22rem" }}>{title}</div>
//                     <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.78rem", color: C.textLight, lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── Feedback ──────────────────────────────────────────────────────────
// function FeedbackPage() {
//   return (
//     <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem", minHeight: "80vh" }}>
//       <div style={{ maxWidth: "800px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
//           <SectionLabel center>Guest Reviews</SectionLabel>
//           <Divider center />
//           <SectionTitle center>Testimonials</SectionTitle>
//           <p style={{ fontFamily: "'Lato', sans-serif", color: C.textLight, fontSize: "0.92rem", marginTop: "0.5rem" }}>
//             Read what our wonderful guests have to say about their experience at Aru Valley.
//           </p>
//         </div>
//         <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
//           {TESTIMONIALS.map((t) => (
//             <div key={t.id} style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "2rem" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem", gap: "0.5rem", flexWrap: "wrap" }}>
//                 <strong style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, fontSize: "1.05rem" }}>{t.name}</strong>
//                 <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.textLight }}>{t.date}</span>
//               </div>
//               <div style={{ marginBottom: "0.6rem" }}>{"⭐".repeat(t.rating)}</div>
//               <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: C.textMid, lineHeight: 1.7, margin: 0 }}>
//                 "{t.message}"
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── Contact ───────────────────────────────────────────────────────────
// function Contact() {
//   const [form, setForm] = useState({ name: "", email: "", phone: "", type: "General", message: "" });
//   const [sent, setSent] = useState(false);

//   const submit = () => {
//     if (!form.name || !form.email) return;
//     setSent(true);
//     setForm({ name: "", email: "", phone: "", type: "General", message: "" });
//     setTimeout(() => setSent(false), 4000);
//   };

//   return (
//     <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem", minHeight: "80vh" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
//           <SectionLabel center>Get In Touch</SectionLabel>
//           <Divider center />
//           <SectionTitle center>Contact & Bookings</SectionTitle>
//         </div>
//         <div className="contact-grid">
//           <div style={{ background: C.white, padding: "2.5rem", border: `1px solid ${C.creamMid}` }}>
//             <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1.5rem" }}>Send a Message</h3>
//             {sent && <Alert type="success">✓ Message sent! We'll get back to you within 24 hours.</Alert>}
//             <div style={{ marginBottom: "1rem" }}>
//               <label style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLight, display: "block", marginBottom: "0.35rem" }}>Inquiry Type</label>
//               <select style={{ width: "100%", border: `1px solid ${C.creamMid}`, padding: "0.75rem", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.text, background: C.cream, boxSizing: "border-box", minHeight: "44px" }} value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
//                 {["General", "Group Booking", "School Trip", "College Group", "Trek Inquiry", "Horse Riding"].map((t) => <option key={t}>{t}</option>)}
//               </select>
//             </div>
//             <Input label="Full Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
//             <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
//             <Input label="Phone Number" type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
//             <Input label="Message" value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Group size, preferred dates, requirements..." multi />
//             <Btn full onClick={submit}>Send Message</Btn>
//           </div>
//           <div>
//             <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: C.forest, marginBottom: "1.5rem" }}>Find Us</h3>
//             {[
//               [<i className="fa-solid fa-location-dot" style={{ color: "#EA4335" }}></i>, "Location", (
//                 <a href="https://maps.app.goo.gl/ybndetDAMhMxX2o98" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
//                   Aru Valley, Pahalgam{"\n"}Anantnag, J&K — 192126
//                 </a>
//               )],
//               [<i className="fa-solid fa-phone" style={{ color: C.forest }}></i>, "Phone", "+91 8375069287\n+91 9419000066"],
//               [<i className="fa-solid fa-envelope" style={{ color: "#4285F4" }}></i>, "Email", <EmailLink email="info@arucampingresort.com" />],
//               [<i className="fa-brands fa-instagram" style={{ color: "#E4405F" }}></i>, "Instagram", (
//                 <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
//                   @aru_camping_resort
//                 </a>
//               )],
//               [<i className="fa-solid fa-clock" style={{ color: C.textLight }}></i>, "Hours", "Open Year Round\n8:00 AM – 9:00 PM IST"],
//             ].map(([icon, title, info]) => (
//               <div key={title} style={{ display: "flex", gap: "1rem", padding: "1.1rem 0", borderBottom: `1px solid ${C.creamMid}` }}>
//                 <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{icon}</span>
//                 <div>
//                   <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.forest, fontWeight: 700, marginBottom: "0.25rem" }}>{title}</div>
//                   <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: C.textMid, lineHeight: 1.7, whiteSpace: "pre-line" }}>{info}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── Footer ────────────────────────────────────────────────────────────
// function Footer({ setPage }) {
//   return (
//     <footer style={{ background: C.forest, padding: "4rem 1.5rem 2rem" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div className="footer-grid">
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "1rem" }}>
//               <Logo size={30} color={C.cream} />
//               <div>
//                 <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: C.cream }}>ARU CAMPING RESORT</div>
//                 <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.55rem", letterSpacing: "0.18em", color: "rgba(245,240,232,0.45)", textTransform: "uppercase" }}>Aru Valley · Pahalgam · J&K</div>
//               </div>
//             </div>
//             <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.85, fontWeight: 300, maxWidth: "270px" }}>
//               Premium camping & trekking experiences designed for groups, schools, colleges, and adventure seekers.
//             </p>
//             <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
//               <a href="https://wa.me/918375069287" target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", color: C.goldLight, textDecoration: "none" }} title="WhatsApp">
//                 <i className="fa-brands fa-whatsapp"></i>
//               </a>
//               <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.15rem", color: C.goldLight, textDecoration: "none" }} title="Instagram">
//                 <i className="fa-brands fa-instagram"></i>
//               </a>
//             </div>
//           </div>
//           <div>
//             <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldLight, marginBottom: "1.2rem" }}>Quick Links</div>
//             {["Home", "About", "Packages", "Gallery", "Treks", "Student", "Feedback"].map((l) => (
//               <div key={l}
//                 style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", cursor: "pointer", marginBottom: "0.5rem", padding: "0.2rem 0" }}
//                 onMouseOver={(e) => (e.currentTarget.style.color = C.cream)}
//                 onMouseOut={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
//                 onClick={() => { setPage(l.toLowerCase()); window.scrollTo(0, 0); }}>
//                 {l}
//               </div>
//             ))}
//             <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", cursor: "pointer", marginBottom: "0.5rem" }} onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>Contact</div>
//           </div>
//           <div>
//             <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldLight, marginBottom: "1.2rem" }}>Contact</div>
//             {["Aru Valley, Pahalgam\nJ&K — 192126", "+91 8375069287", "info@arucampingresort.com"].map((info, i) => (
//               <div key={i} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.8, marginBottom: "0.8rem", whiteSpace: "pre-line" }}>{info}</div>
//             ))}
//           </div>
//         </div>
//         <div style={{ textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", color: "rgba(245,240,232,0.28)", paddingTop: "1.5rem", borderTop: "1px solid rgba(245,240,232,0.08)" }}>
//           © 2025 Aru Camping Resort · All Rights Reserved · Aru Valley, Pahalgam, Jammu & Kashmir
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ── Main App ──────────────────────────────────────────────────────────
// export default function App() {
//   const [page, setPage] = useState("home");
//   const [modal, setModal] = useState(null);

//   useEffect(() => { injectCSS(); }, []);

//   const nav = (p) => { setPage(p); window.scrollTo(0, 0); };

//   const renderPage = () => {
//     switch (page) {
//       case "home": return <><Hero setPage={nav} /><Strip /><About /><Packages setModal={setModal} /><Gallery /><Treks /></>;
//       case "about": return <About />;
//       case "packages": return <Packages setModal={setModal} />;
//       case "gallery": return <Gallery />;
//       case "treks": return <Treks />;
//       case "student": return <StudentPage setPage={nav} />;
//       case "feedback": return <FeedbackPage />;
//       case "contact": return <Contact />;
//       default: return <Hero setPage={nav} />;
//     }
//   };

//   return (
//     <div style={{ background: C.cream, minHeight: "100vh" }}>
//       <Navbar page={page} setPage={nav} setModal={setModal} />
//       <div style={{ paddingTop: page === "home" ? 0 : "66px" }}>
//         {renderPage()}
//       </div>
//       <Footer setPage={nav} />
//       {modal === "contact" && (() => { nav("contact"); setModal(null); return null; })()}
//     </div>
//   );
// }

import { useState, useEffect } from "react";

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
    .takebacks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
    .safety-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 3rem; align-items: center; }
    .about-bullets { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(249,248,245,0.18); }
    .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
    .nav-desktop { display: flex; gap: 1.2rem; align-items: center; flex-wrap: wrap; }
    .hamburger-btn { display: none; background: none; border: none; cursor: pointer; padding: 0.4rem; color: ${C.forest}; font-size: 1.5rem; line-height: 1; }

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
      .hero-logo-wrap { display: none; } /* Hides large logo on mobile */
      .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .about-img-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
      .about-img-grid img { aspect-ratio: 4/3 !important; margin-top: 0 !important; }
      .about-bullets { grid-template-columns: 1fr; gap: 0.75rem; }
      .packages-grid { grid-template-columns: 1fr; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .treks-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
      .student-grid { grid-template-columns: 1fr; gap: 2rem; }
      .takebacks-grid { grid-template-columns: 1fr 1fr; }
      .safety-grid { grid-template-columns: 1fr; gap: 1.5rem; }
      .strip-grid { grid-template-columns: 1fr 1fr; gap: 1.2rem; }
      .section-padded { padding: 4rem 1.25rem !important; }
      .hero-text-pad { padding: 0 1.5rem 0 1.5rem !important; }
      .day-card { flex-direction: column; gap: 1rem; padding: 1.5rem; }
    }

    @media (max-width: 600px) {
      .gallery-grid { grid-template-columns: 1fr; }
      .strip-grid { grid-template-columns: 1fr; }
      .takebacks-grid { grid-template-columns: 1fr; }
      .hero-main-title { font-size: 2.8rem !important; }
      .hero-sub-title { font-size: 2rem !important; }
      h2 { font-size: 1.9rem !important; }
      .about-img-grid { grid-template-columns: 1fr; }
      .about-img-grid img:last-child { display: none; }
    }
  `;
  document.head.appendChild(style);
}

// ── Data ──────────────────────────────────────────────────────────────
const OFFERINGS = [
  {
    id: 1,
    icon: "☀️",
    name: "Day Explorer",
    dur: "1 Day",
    aud: "Families & Couples",
    feats: ["Valley Walk", "Picnic Lunch", "Photography Spots", "Local Guide"],
  },
  {
    id: 2,
    icon: "⛺",
    name: "Base Camp Stay",
    dur: "2D / 1N",
    aud: "College Groups",
    feats: ["Swiss Tent Stay", "Bonfire Evening", "Pony Ride", "Valley Trek", "All Meals"],
    pop: true,
  },
  {
    id: 4,
    icon: "🎒",
    name: "School Special",
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
  { type: "video", url: "/videoes/IMG_4377.MOV", cap: "Aru Camp Tour" },
  { type: "image", url: "/images/s2.jpeg", cap: "Aru Valley Panorama" },
  { type: "image", url: "/images/t2.jpeg", cap: "Camp Setup" },
  { type: "image", url: "/images/royalsuits.jpeg", cap: "The Alp Tents" },
  { type: "image", url: "/images/ph.jpeg", cap: "Alpine Meadows" },
  { type: "image", url: "/images/hourse.jpeg", cap: "Horse Riding" },
  { type: "image", url: "/images/hero.jpeg", cap: "The Swiss Tents" },
  
  { type: "image", url: "/images/IMG_4424.JPG", cap: "meals" },
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

// Extracted from PDFs
const DETAILED_PLANS = {
  1: {
    title: "Summer School Camp",
    subtitle: "Adventure. Learning. Memories that last.",
    duration: "1 Night / 2 Days",
    days: [
      {
        day: 1,
        title: "Arrival & Orientation",
        activities: [
          "Scenic drive to camp",
          "Camp check-in & tent allocation",
          "Welcome briefing & ice-breaker activities",
          "Afternoon tea",
          "Dinner & overnight stay at the camp"
        ]
      },
      {
        day: 2,
        title: "Adventure & Departure",
        activities: [
          "Morning activities & learning session",
          "Breakfast",
          "Guided trek to nearby trail",
          "Rest, group photo & feedback",
          "Lunch",
          "Depart for home with memories to cherish forever"
        ]
      }
    ],
    inclusions: ["All Meals (Veg)", "Guided Activities", "Trained Staff & Supervision", "First Aid Support", "Hydration & Care"],
    carry: ["Comfortable Clothing", "Sports Shoes", "Water Bottle", "Personal Toiletries", "Raincoat (If needed)"]
  },
  2: {
    title: "Adventure & Exploration",
    subtitle: "Explore nature. Build friendships. Grow together.",
    duration: "2 Nights / 3 Days",
    days: [
      {
        day: 1,
        title: "Arrival & Orientation",
        activities: [
          "Scenic drive to camp",
          "Camp check-in & tent allocation",
          "Welcome briefing & ice-breaker activities",
          "Afternoon tea",
          "Dinner & overnight stay at the camp"
        ]
      },
      {
        day: 2,
        title: "Adventure & Exploration",
        activities: [
          "Breakfast & trek briefing",
          "Trek to scenic spot / nearby trail",
          "Packed lunch amidst nature",
          "Afternoon sports & fun activities",
          "Campfire, games & sharing",
          "Dinner & overnight stay at the camp"
        ]
      },
      {
        day: 3,
        title: "Learn, Engage & Depart",
        activities: [
          "Morning activities & learning session",
          "Breakfast",
          "Group photo & feedback",
          "Lunch",
          "Depart for home with memories to cherish forever"
        ]
      }
    ],
    inclusions: ["All Meals (Veg)", "Guided Activities", "Trained Staff & Supervision", "First Aid Support", "Hydration & Care"],
    carry: ["Comfortable Clothing", "Sports Shoes", "Water Bottle", "Personal Toiletries", "Raincoat (If needed)"]
  },
  3: {
    title: "Lidderwatt Expedition",
    subtitle: "A journey of adventure, culture, and engagement.",
    duration: "3 Nights / 4 Days",
    days: [
      {
        day: 1,
        title: "Arrival & Orientation (Srinagar → Pahalgam → Aru)",
        activities: [
          "Scenic drive to Pahalgam (96 Kms / 2-3 hrs)",
          "Drive to Aru (11 Kms / 30 mins) along Lidder Stream",
          "Camp check-in & tent allocation",
          "Welcome briefing & afternoon tea",
          "Dinner and overnight stay at the resort"
        ]
      },
      {
        day: 2,
        title: "Adventure & Exploration (Trek to Lidderwatt)",
        activities: [
          "Breakfast & trek briefing",
          "Short trek to Lidderwatt (11 Kms/3000 M) through forests & rivers",
          "Packed lunch amidst Himalayan landscapes",
          "Trek back to camp",
          "Afternoon tea & sports activities (Badminton, Volleyball, Cricket)",
          "Dinner and overnight stay at the resort"
        ]
      },
      {
        day: 3,
        title: "Culture & Engagement (Village Experience)",
        activities: [
          "Breakfast",
          "Short trek to local Aru village",
          "Interact with locals & experience their lifestyle",
          "Visit shepherd families & mud houses, walk along stream",
          "Return to camp for lunch & afternoon tea",
          "Outdoor activities, team games & farewell campfire",
          "Dinner and overnight stay at the resort"
        ]
      },
      {
        day: 4,
        title: "Wrap-up & Departure",
        activities: [
          "Breakfast",
          "Morning sports & light activities",
          "Closing session, group photographs & feedback",
          "Lunch",
          "Depart for Srinagar with a heart full of memories"
        ]
      }
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
      <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.7rem", color: C.forestLight }} title="Copy to clipboard">
        <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
        {copied && <span style={{ marginLeft: "4px", fontSize: "0.6rem" }}>Copied!</span>}
      </button>
    </div>
  );
}

function Logo({ size = 36, color }) {
  return (
    <img
      src="/images/arulogo.png"
      alt="Aru Camping Logo"
      style={{ width: size, height: size, objectFit: "contain", objectPosition: "bottom", borderRadius: "50%" }}
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
    fontSize: sm ? "0.68rem" : "0.78rem", padding: sm ? "0.45rem 1.1rem" : "0.8rem 1.9rem",
    display: "inline-block", textAlign: "center", minHeight: "44px",
  };
  const vs = {
    primary: { ...base, background: C.forest, borderColor: C.forest, color: C.cream },
    outline: { ...base, background: "transparent", borderColor: C.forest, color: C.forest },
    gold: { ...base, background: C.gold, borderColor: C.gold, color: C.white },
    ghost: { ...base, background: "transparent", borderColor: C.cream, color: C.cream },
    danger: { ...base, background: C.red, borderColor: C.red, color: C.white },
  };
  return (
    <button style={vs[v]} onClick={onClick} onMouseOver={(e) => (e.currentTarget.style.opacity = "0.82")} onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, multi = false }) {
  const s = { width: "100%", border: `1px solid ${C.creamMid}`, padding: "0.75rem", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: C.text, background: C.cream, boxSizing: "border-box", display: "block", minHeight: "44px" };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textLight, display: "block", marginBottom: "0.35rem" }}>{label}</label>
      {multi ? <textarea style={{ ...s, minHeight: "100px" }} value={value} onChange={onChange} placeholder={placeholder} /> : <input style={s} type={type} value={value} onChange={onChange} placeholder={placeholder} />}
    </div>
  );
}

function Alert({ type, children }) {
  const colors = { success: { bg: "#2a524018", border: "#3a6b5040", color: C.forestMid }, info: { bg: `${C.forest}12`, border: `${C.forest}30`, color: C.forest } };
  const c = colors[type] || colors.info;
  return <div style={{ background: c.bg, border: `1px solid ${c.border}`, padding: "0.8rem", marginBottom: "1rem", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: c.color }}>{children}</div>;
}

// ── Navbar ────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Offerings", "Gallery", "Treks", "Student", "Feedback"];

  const navTo = (p) => { setPage(p); setMenuOpen(false); };

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
            <span key={l} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.74rem", letterSpacing: "0.07em", textTransform: "uppercase", color: page === l.toLowerCase() ? C.forest : C.textMid, cursor: "pointer", fontWeight: page === l.toLowerCase() ? 700 : 400, borderBottom: page === l.toLowerCase() ? `2px solid ${C.forest}` : "2px solid transparent", paddingBottom: "2px" }} onClick={() => navTo(l.toLowerCase())}>{l}</span>
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
        <div className="mobile-nav-link" onClick={() => navTo("contact")}>Contact</div>
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
    <section style={{ 
      position: "relative", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "flex-end",
      overflow: "hidden", 
      paddingBottom: "4rem",
      paddingTop: "100px" 
    }}>
      <img src="/images/hero.jpeg" alt="Aru Valley Tents" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(22,48,36,0.85) 0%,rgba(22,48,36,0.4) 60%,rgba(22,48,36,0.85) 100%)" }} />
      <div className="hero-text-pad" style={{ position: "relative", maxWidth: "680px", padding: "0 3rem 0 5vw", zIndex: 2 }}>
        
        {/* Logo has been completely removed from here */}
        
        <div className="hero-main-title" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", color: C.cream, lineHeight: 1.0, fontWeight: 700 }}>ARU CAMPING</div>
        <div className="hero-sub-title" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.8rem,4.5vw,3.5rem)", color: C.goldLight, lineHeight: 1.0, fontStyle: "italic", marginBottom: "1.5rem" }}>Experiences</div>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "rgba(249,248,245,0.78)", lineHeight: 1.85, maxWidth: "460px", marginBottom: "2.5rem", fontWeight: 300 }}>
          Premium camping, guided treks & unforgettable group adventures in Kashmir's most pristine valley.
        </p>
        <div className="hero-btns">
          <Btn onClick={() => setPage("offerings")}>Explore Offerings</Btn>
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
              We specialise in <strong style={{ color: C.forest, fontWeight: 700 }}>school, college & university group camps</strong>, guided treks to Liddarwat, and Alpine Lakes, plus pony rides, horse riding, and bonfire evenings.
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
            <img src="/images/tt.jpeg" style={{ width: "125%", aspectRatio: "3/4", objectFit: "cover" }} alt="Camp" />
            <img src="/images/fish.jpeg" style={{ width: "125%", aspectRatio: "3/4", objectFit: "", marginTop: "3rem" }} alt="Trek" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Offerings ─────────────────────────────────────────────────────────
function OfferingsPage({ setPage, setModal }) {
  return (
    <section className="section-padded" style={{ background: C.cream, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel center>What We Offer</SectionLabel>
          <Divider center />
          <SectionTitle center>Our Offerings</SectionTitle>
        </div>
        <div className="packages-grid">
          {OFFERINGS.map((p) => (
            <div key={p.id} className="lift" style={{ background: p.pop ? C.forest : C.white, border: `2px solid ${p.pop ? C.forest : C.creamMid}`, padding: "2rem", position: "relative" }}>
              {p.pop && <div style={{ position: "absolute", top: "-1px", left: "1.5rem", background: C.gold, color: C.white, padding: "0.18rem 0.75rem", fontFamily: "'Lato', sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase" }}>Most Popular</div>}
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{p.icon}</div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.15rem", color: p.pop ? C.cream : C.forest, marginBottom: "0.2rem" }}>{p.name}</div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", color: p.pop ? "rgba(245,240,232,0.55)" : C.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>{p.aud} · {p.dur}</div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.7rem" }}>
                {p.feats.map((f) => (
                  <li key={f} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: p.pop ? "rgba(245,240,232,0.78)" : C.textMid, padding: "0.38rem 0", borderBottom: `1px solid ${p.pop ? "rgba(245,240,232,0.1)" : C.creamMid}` }}>
                    <span style={{ color: p.pop ? C.goldLight : C.forest, marginRight: "0.55rem" }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Btn full v={p.pop ? "gold" : "outline"} onClick={() => {
                if (p.name === "School Special") {
                  setPage("student");
                } else {
                  setModal("contact");
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
              <div key={p.id} className="lift" style={{ background: p.pop ? C.forest : C.white, border: `1px solid ${p.pop ? C.forest : C.creamMid}`, padding: "2rem", display: "flex", flexDirection: "column" }}>
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
              <div key={t.title} className="lift" style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "2.5rem 1.5rem", textAlign: "center" }}>
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
                  <div key={i} style={{ display: "flex", gap: "1.2rem", background: C.white, padding: "1.2rem", border: `1px solid ${C.creamMid}` }}>
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
                <div key={i} style={{ background: C.forest, padding: "1.8rem", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
      {/* Header */}
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
        
        {/* Timeline Days */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
          {plan.days.map((d, index) => (
            <div key={index} className="day-card lift">
              <div className="day-number">
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

        {/* Inclusions & Carry Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}` }}>
            <SectionLabel>What's Included</SectionLabel>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", color: C.forest, marginBottom: "1rem", marginTop: "0.5rem" }}>Camp Inclusions</h3>
            <ul className="itinerary-list">
              {plan.inclusions.map((inc, i) => (
                <li key={i}><i className="fa-solid fa-plus" style={{ color: C.forestLight }}></i> {inc}</li>
              ))}
            </ul>
          </div>
          
          <div style={{ background: C.white, padding: "2rem", border: `1px solid ${C.creamMid}` }}>
            <SectionLabel>Preparation</SectionLabel>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", color: C.forest, marginBottom: "1rem", marginTop: "0.5rem" }}>Things To Carry</h3>
            <ul className="itinerary-list">
              {plan.carry.map((item, i) => (
                <li key={i}><i className="fa-solid fa-suitcase-rolling" style={{ color: C.textMid }}></i> {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "3rem", background: C.forest, border: `1px solid ${C.forestMid}` }}>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.8rem", color: C.cream, marginBottom: "1.5rem" }}>Ready to plan this trip?</h3>
          <Btn v="gold" onClick={() => setPage("contact")}>Enquire About This Package</Btn>
        </div>

      </div>
    </section>
  );
}

// // ── Gallery ───────────────────────────────────────────────────────────
// function Gallery() {
//   const [sel, setSel] = useState(null);
//   return (
//     <section className="section-padded" style={{ background: C.creamDark, padding: "6rem 2rem" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//           <SectionLabel center>Visual Journey</SectionLabel>
//           <Divider center />
//           <SectionTitle center>Life at Aru Camp</SectionTitle>
//         </div>
//         <div className="gallery-grid">
//           {GALLERY.map((img, i) => (
//             <div key={i} style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: i === 0 || i === 3 ? "1/1.3" : "1/1" }} onClick={() => setSel(img)}>
//               <img src={img.url} alt={img.cap} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }}
//                 onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
//                 onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")} />
//               <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.7rem", background: "linear-gradient(to top,rgba(30,61,47,.8),transparent)", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.cream }}>{img.cap}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {sel && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,14,.93)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }} onClick={() => setSel(null)}>
//           <div style={{ maxWidth: "800px", width: "100%" }}>
//             <img src={sel.url} alt={sel.cap} style={{ width: "100%", display: "block" }} />
//             <div style={{ background: C.forest, padding: "1rem", textAlign: "center", fontFamily: "'Libre Baskerville', serif", color: C.cream }}>{sel.cap}</div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

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
          {GALLERY.map((media, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: i === 0 || i === 3 ? "1/1.3" : "1/1" }} onClick={() => setSel(media)}>
              
              {media.type === "video" ? (
                <video 
                  src={media.url} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }}
                  muted 
                  loop 
                  playsInline
                  onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.07)"; e.currentTarget.play(); }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.pause(); }}
                />
              ) : (
                <img 
                  src={media.url} 
                  alt={media.cap} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")} 
                />
              )}

              {/* Play Button Overlay for Videos */}
              {media.type === "video" && (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "2.5rem", color: C.cream, opacity: 0.8, pointerEvents: "none" }}>
                  <i className="fa-solid fa-play"></i>
                </div>
              )}

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.7rem", background: "linear-gradient(to top,rgba(30,61,47,.8),transparent)", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.cream }}>{media.cap}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Fullscreen Modal Viewer */}
      {sel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,14,.93)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }} onClick={() => setSel(null)}>
          {/* Use stopPropagation so clicking the video controls doesn't close the modal */}
          <div style={{ maxWidth: "800px", width: "100%" }} onClick={(e) => e.stopPropagation()}>
            
            {sel.type === "video" ? (
              <video src={sel.url} controls autoPlay style={{ width: "100%", display: "block" }} />
            ) : (
              <img src={sel.url} alt={sel.cap} style={{ width: "100%", display: "block" }} />
            )}

            <div style={{ background: C.forest, padding: "1rem", textAlign: "center", fontFamily: "'Libre Baskerville', serif", color: C.cream }}>{sel.cap}</div>
          </div>
          
          {/* Close Button */}
          <button style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: C.cream, fontSize: "2rem", cursor: "pointer" }} onClick={() => setSel(null)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
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
              <div key={t.name} className="lift" style={{ background: C.white, border: `1px solid ${C.creamMid}`, padding: "1.1rem 1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.98rem", color: C.forest, marginBottom: "0.25rem" }}>{t.name}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.72rem", color: C.textLight }}>📍 {t.km}  ·  ⏱ {t.time}</div>
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
              {[
                ["🐴", "Horse Riding & Pony Rides", "Gentle pony rides for families, full trail rides through scenic Aru Valley."],
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
            {[
              [<i className="fa-solid fa-location-dot" style={{ color: "#EA4335" }}></i>, "Location", (<a href="https://maps.app.goo.gl/ybndetDAMhMxX2o98" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>Aru Valley, Pahalgam{"\n"}Anantnag, J&K — 192126</a>)],
              [<i className="fa-solid fa-phone" style={{ color: C.forest }}></i>, "Phone", "+91 8375069287\n+91 9419000066"],
              [<i className="fa-solid fa-envelope" style={{ color: "#4285F4" }}></i>, "Email", <EmailLink email="info@arucampingresort.com" />],
              [<i className="fa-brands fa-instagram" style={{ color: "#E4405F" }}></i>, "Instagram", (<a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>@aru_camping_resort</a>)],
              [<i className="fa-solid fa-clock" style={{ color: C.textLight }}></i>, "Hours", "Open Year Round\n8:00 AM – 9:00 PM IST"],
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
              <a href="https://wa.me/918375069287" target="_blank" rel="noreferrer" style={{ fontSize: "1.2rem", color: C.goldLight, textDecoration: "none" }} title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="https://instagram.com/aru_camping_resort" target="_blank" rel="noreferrer" style={{ fontSize: "1.15rem", color: C.goldLight, textDecoration: "none" }} title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldLight, marginBottom: "1.2rem" }}>Quick Links</div>
            {["Home", "About", "Offerings", "Gallery", "Treks", "Student", "Feedback"].map((l) => (
              <div key={l} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", cursor: "pointer", marginBottom: "0.5rem", padding: "0.2rem 0" }}
                onMouseOver={(e) => (e.currentTarget.style.color = C.cream)} onMouseOut={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
                onClick={() => { setPage(l.toLowerCase()); }}>{l}</div>
            ))}
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", cursor: "pointer", marginBottom: "0.5rem" }} onClick={() => { setPage("contact"); }}>Contact</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldLight, marginBottom: "1.2rem" }}>Contact</div>
            {["Aru Valley, Pahalgam\nJ&K — 192126", "+91 8375069287", "info@arucampingresort.com"].map((info, i) => (
              <div key={i} style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.8, marginBottom: "0.8rem", whiteSpace: "pre-line" }}>{info}</div>
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

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(null);

  useEffect(() => { 
    injectCSS(); 
    
    // Set initial history state to fix browser Back button behavior
    window.history.replaceState({ page: "home" }, "", "");

    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        setPage(e.state.page);
      } else {
        setPage("home");
      }
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const nav = (p) => { 
    window.history.pushState({ page: p }, "", "");
    setPage(p); 
    window.scrollTo(0, 0); 
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <><Hero setPage={nav} /><Strip /><About /><OfferingsPage setPage={nav} setModal={setModal} /><Gallery /><Treks /></>;
      case "about": return <About />;
      case "offerings": return <OfferingsPage setPage={nav} setModal={setModal} />;
      case "gallery": return <Gallery />;
      case "treks": return <Treks />;
      case "student": return <StudentPage setPage={nav} />;
      case "feedback": return <FeedbackPage />;
      case "contact": return <Contact />;
      
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
      {modal === "contact" && (() => { nav("contact"); setModal(null); return null; })()}
    </div>
  );
}