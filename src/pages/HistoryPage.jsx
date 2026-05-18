export default function HistoryPage({ orders }) {
  if (orders.length === 0) return (
    <div className="page-enter" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 52, opacity: 0.12 }}>📦</div>
      <p style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 300, color: "var(--muted)", fontStyle: "italic" }}>Aún no has realizado ninguna compra</p>
    </div>
  );

  return (
    <div className="page-enter" style={{ padding: "56px 40px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 9, letterSpacing: 5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 8 }}>Historial</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 42, fontWeight: 300 }}>Mis Compras</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {orders.slice().reverse().map(order => (
          <div key={order.id} className="card" style={{ padding: "24px 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase" }}>Pedido #{order.id}</p>
                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{new Date(order.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="badge badge-green">Entregado</span>
                <p style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--wine)", marginTop: 6 }}>{order.total.toFixed(2)}€</p>
              </div>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {order.items.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--charcoal)" }}>
                  <span>{item.name} <span style={{ color: "var(--muted)" }}>×{item.qty}</span></span>
                  <span>{(item.price * item.qty).toFixed(2)}€</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
