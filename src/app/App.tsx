import { useState } from "react";
import "./mbolo-green.css";
import logoImg from "../imports/1.png";

const SCREENS = ["1 · Accueil", "2 · Carte verte", "3 · Ressources", "4 · Défis", "5 · Profil"];

function Screen1() {
  return (
    <div>
      <div className="mg-hero">
        <div className="mg-hero-logo-wrap">
          <img src={logoImg} alt="Mbolo Green" className="mg-hero-logo-img" />
        </div>
        <div className="mg-slogan">CONSTRUIRE SANS DÉTRUIRE</div>
        <h1 className="mg-hero-title">Bienvenue sur Mbolo Green</h1>
        <p className="mg-hero-desc">
          Une plateforme qui centralise les initiatives, les ressources et les opportunités de l'économie verte afin de rendre le développement durable accessible à tous les Gabonais.
        </p>
        <div className="mg-hero-btns">
          <button className="mg-btn-primary">Explorer</button>
          <button className="mg-btn-outline">S'inscrire</button>
        </div>
      </div>

      <div className="mg-stats-strip">
        {[
          { icon: "🌳", num: "12 500", label: "Arbres plantés" },
          { icon: "♻️", num: "38 T", label: "Recyclées" },
          { icon: "👥", num: "5 000", label: "Citoyens sensibilisés" },
          { icon: "🏢", num: "150", label: "Initiatives référencées" },
        ].map((s) => (
          <div key={s.label} className="mg-stat-item">
            <div className="mg-stat-icon">{s.icon}</div>
            <div className="mg-stat-num">{s.num}</div>
            <div className="mg-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mg-services-section">
        <div className="mg-section-title">Nos services</div>
        <div className="mg-services-grid">
          {[
            { icon: "📍", name: "Carte Verte", desc: "Explorez les initiatives" },
            { icon: "📚", name: "Ressources", desc: "Guides & formations" },
            { icon: "🏆", name: "Défis", desc: "Gagnez des points" },
            { icon: "🤝", name: "Réseau Vert", desc: "Rejoignez la communauté" },
          ].map((s) => (
            <div key={s.name} className="mg-service-card">
              <div className="mg-service-icon">{s.icon}</div>
              <div>
                <div className="mg-service-name">{s.name}</div>
                <div className="mg-service-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ZoneKey = "foret" | "agriculture" | "urbain" | "cotieres" | "reboisement";

const ZONES: { key: ZoneKey; label: string; color: string; stroke: string }[] = [
  { key: "foret", label: "Forêt équatoriale", color: "#2d6a00", stroke: "#1a4000" },
  { key: "agriculture", label: "Zone agricole", color: "#f0a500", stroke: "#c07800" },
  { key: "urbain", label: "Zone urbaine", color: "#9b9b9b", stroke: "#666" },
  { key: "cotieres", label: "Zone côtière", color: "#4ab8d4", stroke: "#2a8aaa" },
  { key: "reboisement", label: "Reboisement", color: "#8BC343", stroke: "#647D00" },
];

function Screen2() {
  const [activeZones, setActiveZones] = useState<Record<ZoneKey, boolean>>({
    foret: true,
    agriculture: true,
    urbain: true,
    cotieres: true,
    reboisement: true,
  });
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const toggleZone = (key: ZoneKey) =>
    setActiveZones((z) => ({ ...z, [key]: !z[key] }));

  const pins = [
    { id: "libreville", cx: 168, cy: 88, zone: "urbain" as ZoneKey, label: "Libreville", info: "Capitale — 5 initiatives" },
    { id: "portgentil", cx: 140, cy: 178, zone: "cotieres" as ZoneKey, label: "Port-Gentil", info: "Zone côtière — 3 initiatives" },
    { id: "franceville", cx: 262, cy: 258, zone: "agriculture" as ZoneKey, label: "Franceville", info: "Agriculture — 4 initiatives" },
    { id: "oyem", cx: 218, cy: 140, zone: "foret" as ZoneKey, label: "Oyem", info: "Forêt — 6 initiatives" },
    { id: "mouila", cx: 195, cy: 225, zone: "reboisement" as ZoneKey, label: "Mouila", info: "Reboisement — 5 initiatives" },
  ];

  return (
    <div>
      <div className="mg-map-header">
        <input className="mg-map-search" type="text" placeholder="🔍  Rechercher une initiative ou une zone..." />
      </div>
      <div className="mg-map-body">
        {/* Panneau latéral */}
        <div className="mg-map-filters">
          <div className="mg-filter-title">Zones</div>
          {ZONES.map(({ key, label, color }) => (
            <label key={key} className="mg-filter-item">
              <input
                type="checkbox"
                checked={activeZones[key]}
                onChange={() => toggleZone(key)}
                className={`mg-filter-checkbox mg-zone-${key}`}
              />
              <span className="mg-filter-label">
                <span className={`mg-filter-dot mg-zone-${key}`} />
                {label}
              </span>
            </label>
          ))}

          <div className="mg-filter-group">
            <div className="mg-filter-title">Initiatives</div>
            {[
              { color: "#647D00", label: "Reboisement" },
              { color: "#8BC343", label: "Recyclage" },
              { color: "#f0a500", label: "Agriculture" },
              { color: "#4ab8d4", label: "Énergie" },
            ].map((l) => (
              <div key={l.label} className={`mg-init-item mg-init-${l.label.toLowerCase().replace(/\s+/g, "-").replace(/é/g, "e").replace(/ô/g, "o")}`}>
                <span className="mg-init-dot" />
                {l.label}
              </div>
            ))}
          </div>

          {selectedPin && (() => {
            const pin = pins.find(p => p.id === selectedPin)!;
            const zone = ZONES.find(z => z.key === pin.zone)!;
            return (
              <div className="mg-selection-group">
                <div className="mg-filter-title">Sélection</div>
                <div className="mg-selection-card">
                  <div className="mg-selection-label">{pin.label}</div>
                  <div className="mg-selection-info">{pin.info}</div>
                  <div className={`mg-selection-zone mg-zone-${zone.key}`}>● {zone.label}</div>
                  <button onClick={() => setSelectedPin(null)} className="mg-selection-close">✕ fermer</button>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Carte SVG avec zonage */}
        <div className="mg-map-area">
          <svg width="100%" height="100%" viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b3dff5" />
                <stop offset="100%" stopColor="#7ec8e3" />
              </linearGradient>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4e8a0" />
                <stop offset="100%" stopColor="#b8d96a" />
              </linearGradient>
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#fff" strokeWidth="1" opacity="0.3" />
              </pattern>
            </defs>

            {/* Fond océan */}
            <rect width="400" height="420" fill="url(#bgGrad)" />
            <rect width="145" height="420" fill="url(#oceanGrad)" opacity="0.6" />
            <text x="60" y="210" fontFamily="Poppins,sans-serif" fontSize="9" fill="#2a8aaa" textAnchor="middle" opacity="0.7" fontWeight="600">OCÉAN</text>
            <text x="60" y="222" fontFamily="Poppins,sans-serif" fontSize="9" fill="#2a8aaa" textAnchor="middle" opacity="0.7" fontWeight="600">ATLANTIQUE</text>

            {/* ── ZONES DE ZONAGE ── */}
            {/* Zone forêt équatoriale (centre-nord) */}
            {activeZones.foret && (
              <path d="M175,50 L240,42 L280,65 L295,110 L290,155 L265,170 L240,160 L215,150 L190,155 L168,140 L160,110 L162,75 Z"
                fill="#2d6a00" opacity="0.35" stroke="#1a4000" strokeWidth="1" strokeDasharray="4,2" />
            )}
            {/* Zone agricole (est) */}
            {activeZones.agriculture && (
              <path d="M265,170 L295,155 L305,200 L300,250 L280,280 L260,285 L245,265 L240,230 L248,195 Z"
                fill="#f0a500" opacity="0.3" stroke="#c07800" strokeWidth="1" strokeDasharray="4,2" />
            )}
            {/* Zone côtière (ouest) */}
            {activeZones.cotieres && (
              <path d="M145,120 L168,110 L175,140 L170,180 L155,210 L140,220 L130,200 L128,160 L132,130 Z"
                fill="#4ab8d4" opacity="0.3" stroke="#2a8aaa" strokeWidth="1" strokeDasharray="4,2" />
            )}
            {/* Zone urbaine (Libreville) */}
            {activeZones.urbain && (
              <ellipse cx="168" cy="88" rx="18" ry="14" fill="#9b9b9b" opacity="0.3" stroke="#666" strokeWidth="1" strokeDasharray="3,2" />
            )}
            {/* Zone reboisement (centre-sud) */}
            {activeZones.reboisement && (
              <path d="M185,195 L225,185 L250,205 L248,245 L230,265 L205,270 L185,255 L175,230 L178,205 Z"
                fill="#8BC343" opacity="0.3" stroke="#647D00" strokeWidth="1" strokeDasharray="4,2" />
            )}

            {/* Contour du Gabon */}
            <path
              d="M160,40 L220,35 L270,50 L290,90 L300,140 L295,190 L280,240 L260,280 L240,320 L210,340 L180,340 L155,310 L140,270 L130,220 L125,170 L130,120 L140,80 Z"
              fill="none"
              stroke="#647D00"
              strokeWidth="2"
              opacity="0.9"
            />

            {/* Grille */}
            <line x1="0" y1="210" x2="400" y2="210" stroke="#647D00" strokeWidth="0.4" opacity="0.2" />
            <line x1="200" y1="0" x2="200" y2="420" stroke="#647D00" strokeWidth="0.4" opacity="0.2" />

            {/* Labels zones */}
            {activeZones.foret && (
              <text x="235" y="105" fontFamily="Poppins,sans-serif" fontSize="9" fill="#1a4000" textAnchor="middle" fontWeight="700" opacity="0.8">FORÊT</text>
            )}
            {activeZones.agriculture && (
              <text x="275" y="220" fontFamily="Poppins,sans-serif" fontSize="9" fill="#7a5500" textAnchor="middle" fontWeight="700" opacity="0.8">AGRI.</text>
            )}
            {activeZones.cotieres && (
              <text x="150" y="168" fontFamily="Poppins,sans-serif" fontSize="8" fill="#1a6080" textAnchor="middle" fontWeight="700" opacity="0.8">CÔTIER</text>
            )}
            {activeZones.reboisement && (
              <text x="213" y="232" fontFamily="Poppins,sans-serif" fontSize="8" fill="#3d6a00" textAnchor="middle" fontWeight="700" opacity="0.8">REBOIS.</text>
            )}

            {/* Pins des villes */}
            {pins.map((pin) => {
              const zone = ZONES.find(z => z.key === pin.zone)!;
              const isSelected = selectedPin === pin.id;
              return (
                <g key={pin.id} className="mg-pin" onClick={() => setSelectedPin(isSelected ? null : pin.id)}>
                  <circle cx={pin.cx} cy={pin.cy} r={isSelected ? 11 : 8}
                    fill={zone.color} stroke="#fff" strokeWidth="2"
                    className="mg-pin-circle" />
                  {isSelected && <circle cx={pin.cx} cy={pin.cy} r="15" fill="none" stroke={zone.color} strokeWidth="1.5" opacity="0.5" />}
                  <text x={pin.cx + 14} y={pin.cy + 4}
                    fontFamily="Poppins,sans-serif" fontSize="10" fill="#1a2e00" fontWeight="700">{pin.label}</text>
                </g>
              );
            })}

            {/* Clusters initiatives */}
            <circle cx="185" cy="100" r="4" fill="#647D00" opacity="0.75" />
            <circle cx="198" cy="82" r="3" fill="#8BC343" opacity="0.75" />
            <circle cx="172" cy="95" r="3" fill="#f0a500" opacity="0.75" />
            <circle cx="252" cy="262" r="4" fill="#647D00" opacity="0.75" />
            <circle cx="143" cy="170" r="3" fill="#4ab8d4" opacity="0.75" />
            <circle cx="208" cy="240" r="3" fill="#8BC343" opacity="0.75" />
            <circle cx="230" cy="198" r="3" fill="#f0a500" opacity="0.75" />

            <text x="210" y="358" fontFamily="Poppins,sans-serif" fontSize="10" fill="#3d6a00" textAnchor="middle" fontWeight="600" opacity="0.5">GABON</text>
          </svg>

          {/* Badge info */}
          <div className="mg-map-badge">
            <div className="mg-map-badge-title">🗺 ZONAGE — GABON</div>
            <div className="mg-map-badge-info">23 initiatives actives</div>
            <div className="mg-map-badge-info-muted">{Object.values(activeZones).filter(Boolean).length} zones visibles</div>
          </div>
        </div>
      </div>
      <div className="mg-map-footer">
        Cliquez sur un marqueur pour voir les détails · Cochez/décochez les zones dans le panneau
      </div>
    </div>
  );
}

function Screen3() {
  const [search, setSearch] = useState("");
  const resources = [
    { tag: "♻️ Recyclage", title: "Guide Recyclage", desc: "Tout savoir sur le tri et la valorisation des déchets au Gabon." },
    { tag: "🌱 Économie", title: "Comprendre l'économie verte", desc: "Introduction aux principes du développement durable." },
    { tag: "🌾 Agriculture", title: "Agriculture Durable", desc: "Pratiques agricoles respectueuses de l'environnement." },
    { tag: "🗑 Déchets", title: "Gestion des Déchets", desc: "Manuel de gestion des déchets ménagers et industriels." },
    { tag: "☀️ Énergie", title: "Énergie Solaire", desc: "Installer et utiliser les panneaux solaires pour les ménages." },
    { tag: "🌳 Forêts", title: "Protection des Forêts", desc: "Rôle des forêts gabonaises dans l'équilibre climatique." },
  ];
  const filtered = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mg-resources-header">
        <h2 className="mg-resources-title">📚 Centre de Ressources</h2>
        <input
          className="mg-resources-search"
          placeholder="🔍  Rechercher une ressource..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mg-resources-body">
        <div className="mg-res-grid">
          {filtered.map((r) => (
            <div key={r.title} className="mg-res-card">
              <div className="mg-res-tag">{r.tag}</div>
              <h4 className="mg-res-card-title">{r.title}</h4>
              <p className="mg-res-card-desc">{r.desc}</p>
              <div className="mg-res-arrow">Lire →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Screen4() {
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const defis = [
    { icon: "🌳", title: "Planter un arbre", desc: "Participez à une journée de reboisement dans votre région", pts: "+50" },
    { icon: "♻️", title: "Recycler 5 kg", desc: "Déposez 5 kg de déchets dans un point de collecte agréé", pts: "+30" },
    { icon: "💧", title: "Économiser l'eau", desc: "Réduisez votre consommation d'eau de 20% ce mois", pts: "+20" },
    { icon: "☀️", title: "Passer au solaire", desc: "Documentez votre transition vers l'énergie solaire", pts: "+80" },
  ];

  return (
    <div>
      <div className="mg-defis-header">
        <h2 className="mg-defis-title">🏆 Défis Mbolo Green</h2>
        <p className="mg-defis-subtitle">Participez, gagnez des points et devenez Éco-Citoyen</p>
      </div>
      <div className="mg-defis-body">
        {defis.map((d) => (
          <div key={d.title} className="mg-defi-card">
            <div className="mg-defi-icon">{d.icon}</div>
            <div className="mg-defi-content">
              <h4 className="mg-defi-title">{d.title}</h4>
              <p className="mg-defi-desc">{d.desc}</p>
            </div>
            <div className="mg-defi-meta">
              <div className="mg-defi-points">{d.pts}</div>
              <div className="mg-defi-points-label">Points</div>
              <button
                className={joined[d.title] ? "mg-btn-participer mg-btn-participer-disabled" : "mg-btn-participer"}
                onClick={() => setJoined((j) => ({ ...j, [d.title]: true }))}
              >
                {joined[d.title] ? "Inscrit ✓" : "Participer"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Screen5() {
  const [name, setName] = useState("Rony");
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <div className="mg-profil-header">
        <div className="mg-avatar">RO</div>
        <h2 className="mg-profil-title">
          Bonjour,{" "}
          {editing ? (
            <input
              autoFocus
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setEditing(false)}
              className="mg-profile-name-input"
            />
          ) : (
            <span onClick={() => setEditing(true)} className="mg-profile-name-label">{name}</span>
          )}
        </h2>
        <p className="mg-profil-subtitle">Membre depuis Mars 2026</p>
        <div className="mg-profile-progress">
          <div className="mg-profile-progress-bar" />
        </div>
        <div className="mg-profile-score">Score écologique : 78%</div>
      </div>
      <div className="mg-profil-body">
        <div className="mg-prof-section">
          <div className="mg-prof-section-title">Mes Badges</div>
          <div className="mg-badges-list">
            {["🏆 Éco-Citoyen", "🌳 Protecteur de la forêt", "♻️ Champion du recyclage"].map((b) => (
              <div key={b} className="mg-badge">{b}</div>
            ))}
          </div>
        </div>
        <div className="mg-prof-section">
          <div className="mg-prof-section-title">Mes Activités Récentes</div>
          {[
            "Défi terminé — Planter un arbre",
            "Arbre planté à Libreville",
            "Ressource consultée — Guide Recyclage",
            "Badge obtenu — Protecteur de la forêt",
          ].map((a) => (
            <div key={a} className="mg-activity-item">
              <div className="mg-activity-check">✓</div>
              {a}
            </div>
          ))}
        </div>
        <div className="mg-prof-section">
          <div className="mg-prof-section-title">Mes Statistiques</div>
          <div className="mg-profile-stats-grid">
            {[
              { val: "3", label: "Défis terminés" },
              { val: "160", label: "Points" },
              { val: "3", label: "Badges" },
            ].map((s) => (
              <div key={s.label} className="mg-profile-stat-card">
                <div className="mg-profile-stat-value">{s.val}</div>
                <div className="mg-profile-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(0);

  return (
    <div className="mg-app-shell">
      <div className="mg-app-container">
        {/* Nav */}
        <nav className="mg-nav">
          <div className="mg-nav-logo">
            <img src={logoImg} alt="Mbolo Green" className="mg-nav-logo-img" />
            <span className="mg-nav-logo-text">
              <span className="mg-nav-logo-brand">MBOLO</span>&nbsp;GREEN
            </span>
          </div>
          <div className="mg-nav-links">
            
            
            
            
            <a href="#" className="mg-btn-connect">Connexion</a>
          </div>
        </nav>

        {/* Screen tabs */}
        <div className="mg-screen-tabs" role="tablist">
          {SCREENS.map((label, i) => (
            <button
              key={label}
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              role="tab"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Screens */}
        <div>
          {active === 0 && <Screen1 />}
          {active === 1 && <Screen2 />}
          {active === 2 && <Screen3 />}
          {active === 3 && <Screen4 />}
          {active === 4 && <Screen5 />}
        </div>
      </div>
    </div>
  );
}
