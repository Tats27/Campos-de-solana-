// ─── CATALOG ─────────────────────────────────────────────────────────────────
import { useState } from "react";
import WineCard from "../components/WineCard";

export default function CatalogPage({
  wines,
  onAddToCart,
  onBuy,
  showToast,
  currentUser,
  setPage
}) {

  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const categories = ["Todos", ...Array.from(new Set(wines.map(w => w.category)))];
  const filtered = wines.filter(w =>
    (filter === "Todos" || w.category === filter) &&
    (w.name.toLowerCase().includes(search.toLowerCase()) || w.region.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-enter" style={{ padding: "56px 40px", maxWidth: 1280, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 9, letterSpacing: 5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 10 }}>Nuestra selección</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 48, fontWeight: 300, color: "var(--black)" }}>Catálogo de Vinos</h1>
        <div style={{ width: 60, height: 1, background: "var(--gold)", margin: "16px auto 0" }} />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "8px 20px", border: "1px solid", borderRadius: "var(--radius)",
            fontFamily: "var(--sans)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
            cursor: "pointer", transition: "var(--trans)",
            background: filter === c ? "var(--wine)" : "transparent",
            borderColor: filter === c ? "var(--wine)" : "var(--border)",
            color: filter === c ? "var(--gold-pale)" : "var(--muted)",
          }}>{c}</button>
        ))}
      </div>

      {/* Search */}
      <div style={{ maxWidth: 380, margin: "0 auto 48px", position: "relative" }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: 14 }}>🔍</span>
        <input
          placeholder="Buscar por nombre o región…"
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "11px 14px 11px 38px",
            border: "1px solid var(--border)", borderRadius: "var(--radius-md)",
            fontFamily: "var(--sans)", fontSize: 14, outline: "none", transition: "var(--trans)",
          }}
          onFocus={e => e.target.style.borderColor = "var(--gold)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)", fontFamily: "var(--serif)", fontSize: 22, fontStyle: "italic" }}>
          No se encontraron vinos con ese criterio.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
          {filtered.map(wine => (
            <WineCard key={wine.id} wine={wine} onAddToCart={onAddToCart} onBuy={onBuy} showToast={showToast} currentUser={currentUser} setPage={setPage} />
          ))}
        </div>
      )}
    </div>
  );
}
