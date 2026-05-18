import "./styles/global.css";
import { useState, useRef } from "react";

import initialWines from "./data/wines";
import ADMIN from "./data/admin";

import useLocalStorage from "./hooks/useLocalStorage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [page, setPage] = useState("home");

  const [currentUser, setCurrentUser] = useLocalStorage("cs_user", null);
  const [users, setUsers] = useLocalStorage("cs_users", [ADMIN]);
  const [wines, setWines] = useLocalStorage("cs_wines", initialWines);
  const [cart, setCart] = useLocalStorage("cs_cart", []);
  const [orders, setOrders] = useLocalStorage("cs_orders", []);

  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });

    clearTimeout(toastRef.current);

    toastRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);

    if (user.role === "admin") {
      setPage("admin");
    } else {
      setPage("catalog");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setPage("home");
  };

  const handleRegister = (user) => {
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
    setPage("catalog");
  };

  const addToCart = (wine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === wine.id);

      if (existing) {
        return prev.map((item) =>
          item.id === wine.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...wine, qty: 1 }];
    });

    showToast("Producto agregado al carrito");
  };

  const buyNow = (wine) => {
    if (!currentUser) {
      setPage("login");
      return;
    }

    const order = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      items: [{ ...wine, qty: 1 }],
      total: wine.price,
      date: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, order]);

    showToast("Compra realizada con éxito");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty }
          : item
      )
    );
  };

  const checkout = () => {
    if (!currentUser) {
      setPage("login");
      return;
    }

    if (cart.length === 0) return;

    const order = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      ),
      date: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, order]);

    setCart([]);

    setPage("history");

    showToast("Pedido realizado");
  };

  const renderPage = () => {
    if (currentUser?.role === "admin") {
      return (
        <AdminDashboard
          wines={wines}
          setWines={setWines}
          users={users}
          orders={orders}
          showToast={showToast}
        />
      );
    }

    switch (page) {
      case "home":
        return (
          <HomePage
            setPage={setPage}
            wines={wines}
          />
        );

      case "catalog":
        return (
          <CatalogPage
            wines={wines}
            onAddToCart={addToCart}
            onBuy={buyNow}
            showToast={showToast}
            currentUser={currentUser}
            setPage={setPage}
          />
        );

      case "cart":
        return (
          <CartPage
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQty={updateQty}
            onCheckout={checkout}
            showToast={showToast}
          />
        );

      case "history":
        return (
          <HistoryPage
            orders={orders.filter(
              (o) => o.userId === currentUser?.id
            )}
          />
        );

      case "login":
        return (
          <LoginPage
            onLogin={handleLogin}
            setPage={setPage}
            users={users}
            showToast={showToast}
          />
        );

      case "register":
        return (
          <RegisterPage
            onRegister={handleRegister}
            setPage={setPage}
            users={users}
            showToast={showToast}
          />
        );

      default:
        return (
          <HomePage
            setPage={setPage}
            wines={wines}
          />
        );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar
          page={page}
          setPage={setPage}
          currentUser={currentUser}
          onLogout={handleLogout}
          cartCount={cart.reduce(
            (sum, item) => sum + item.qty,
            0
          )}
        />

        <main style={{ flex: 1 }}>
          {renderPage()}
        </main>

        {(!currentUser || currentUser.role !== "admin") && (
          <Footer />
        )}
      </div>
    </>
  );
}