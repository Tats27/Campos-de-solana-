import { useState } from "react";

export default function WineCard({
  wine,
  onAddToCart,
  onBuy,
  showToast,
  currentUser,
  setPage
}) {
  const [hover, setHover] = useState(false);

  const handleCart = () => {
    if (!currentUser) { showToast("Inicia sesión para agregar al carrito.", "error"); setPage("login"); return; }
    onAddToCart(wine);
    showToast(`${wine.name} añadido al carrito.`, "success");
  };

  const handleBuy = () => {
    if (!currentUser) { showToast("Inicia sesión para comprar.", "error"); setPage("login"); return; }
    onBuy(wine);
    showToast(`¡Compra de ${wine.name} realizada!`, "success");
  };

  return (
    <div
      className="card"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column", transform: hover ? "translateY(-4px)" : "none", transition: "var(--trans)", boxShadow: hover ? "var(--shadow-lg)" : "none" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image area */}
      <div style={{
        background: `linear-gradient(135deg, var(--wine-dark) 0%, var(--wine) 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "36px 24px", position: "relative", minHeight: 220,
      }}>
        <div style={{ position: "absolute", top: 12, right: 14 }}>
          <span className="badge" style={{ background: "rgba(196,151,74,0.25)", color: "var(--gold-soft)", fontSize: 9, letterSpacing: 1.5 }}>
            {wine.year}
          </span>
        </div>
        <img
          src={wine.image} alt={wine.name}
          style={{ height: 160, objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))", transition: "var(--trans)", transform: hover ? "scale(1.05)" : "scale(1)" }}
          onError={e => { e.currentTarget.src = `https://via.placeholder.com/90x160/4A1219/EDD9A3?text=${wine.year}`; }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          <span className="badge badge-wine">{wine.category}</span>
          <span className="badge badge-gold">{wine.region}</span>
        </div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, lineHeight: 1.25, marginBottom: 8 }}>{wine.name}</h3>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.75, flex: 1, marginBottom: 16 }}>
          {wine.description.substring(0, 130)}…
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {wine.tags.map(t => (
            <span key={t} style={{ fontSize: 10, background: "var(--ivory)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "3px 8px", color: "var(--muted)", letterSpacing: 0.5 }}>{t}</span>
          ))}
        </div>

        {/* Price + actions */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: 30, color: "var(--wine)", fontWeight: 400 }}>{wine.price.toFixed(2)}€</span>
            <span style={{ fontSize: 11, color: wine.stock < 30 ? "var(--wine)" : "var(--muted)" }}>
              {wine.stock < 30 ? `⚠ Solo ${wine.stock} ud.` : `${wine.stock} disponibles`}
            </span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={handleCart}>
              🛒 Carrito
            </button>
            <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleBuy}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

