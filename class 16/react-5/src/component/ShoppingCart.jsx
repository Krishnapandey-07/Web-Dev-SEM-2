import { useState, useEffect } from "react";

const ShoppingCart = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [error, setError] = useState("");
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddItem = () => {
    if (!itemName.trim()) {
      setError("Please enter an item name.");
      return;
    }
    if (!itemPrice || isNaN(itemPrice) || Number(itemPrice) <= 0) {
      setError("Please enter a valid price.");
      return;
    }
    setError("");
    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      price: parseFloat(Number(itemPrice).toFixed(2)),
      quantity: 1,
    };
    setCartItems((prev) => [...prev, newItem]);
    setItemName("");
    setItemPrice("");
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(5, Math.max(1, item.quantity + delta)) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckedOut(true);
    setTimeout(() => {
      setCartItems([]);
      setCheckedOut(false);
    }, 2500);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerIcon}>🛒</span>
        <h1 style={styles.headerTitle}>My Cart</h1>
        <span style={styles.headerCount}>
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Input Row */}
      <div style={styles.inputCard}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Item Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. Apple, Shirt…"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Price (₹)</label>
          <input
            style={styles.input}
            type="number"
            placeholder="e.g. 149"
            value={itemPrice}
            min="0"
            onChange={(e) => setItemPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
          />
        </div>
        <button style={styles.addBtn} onClick={handleAddItem}>
          + Add to Cart
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {/* Checkout success banner */}
      {checkedOut && (
        <div style={styles.successBanner}>
          ✅ Order placed successfully! Thank you for shopping.
        </div>
      )}

      {/* Cart Table */}
      {cartItems.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["#", "Item", "Price", "Quantity", "Total", "Action"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={{ ...styles.td, ...styles.tdIndex }}>{index + 1}</td>
                  <td style={{ ...styles.td, ...styles.tdName }}>{item.name}</td>
                  <td style={styles.td}>₹{item.price.toFixed(2)}</td>
                  <td style={styles.td}>
                    <div style={styles.qtyControl}>
                      <button
                        style={{
                          ...styles.qtyBtn,
                          opacity: item.quantity === 1 ? 0.35 : 1,
                        }}
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>
                      <span style={styles.qtyValue}>{item.quantity}</span>
                      <button
                        style={{
                          ...styles.qtyBtn,
                          opacity: item.quantity === 5 ? 0.35 : 1,
                        }}
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity === 5}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={{ ...styles.td, ...styles.tdTotal }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.removeBtn}
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer row */}
          <div style={styles.cartFooter}>
            <div style={styles.totalSection}>
              <span style={styles.totalLabel}>Grand Total</span>
              <span style={styles.totalValue}>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button style={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout →
            </button>
          </div>
        </div>
      ) : (
        !checkedOut && (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>🛍️</span>
            <p style={styles.emptyText}>Your cart is empty.</p>
            <p style={styles.emptySubText}>Add some items above to get started!</p>
          </div>
        )
      )}
    </div>
  );
};


const styles = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)",
    padding: "32px 16px",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "28px",
    maxWidth: "860px",
    margin: "0 auto 28px",
  },
  headerIcon: { fontSize: "32px" },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e1b4b",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  headerCount: {
    marginLeft: "auto",
    background: "#6366f1",
    color: "#fff",
    borderRadius: "999px",
    padding: "4px 14px",
    fontSize: "13px",
    fontWeight: "600",
  },
  inputCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-end",
    boxShadow: "0 4px 24px rgba(99,102,241,0.10)",
    maxWidth: "860px",
    margin: "0 auto 16px",
    flexWrap: "wrap",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: "1 1 160px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#6366f1",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    border: "2px solid #e0e7ff",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "15px",
    color: "#1e1b4b",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#f8f8ff",
  },
  addBtn: {
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "11px 24px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
    transition: "transform 0.15s, box-shadow 0.15s",
    flexShrink: 0,
  },
  error: {
    color: "#ef4444",
    fontSize: "13px",
    maxWidth: "860px",
    margin: "0 auto 8px",
    paddingLeft: "4px",
    fontWeight: "600",
  },
  successBanner: {
    background: "#d1fae5",
    border: "2px solid #6ee7b7",
    color: "#065f46",
    borderRadius: "12px",
    padding: "14px 20px",
    maxWidth: "860px",
    margin: "0 auto 16px",
    fontWeight: "700",
    fontSize: "15px",
    textAlign: "center",
  },
  tableWrapper: {
    maxWidth: "860px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(99,102,241,0.10)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "#6366f1",
    color: "#fff",
    textAlign: "left",
    padding: "14px 18px",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tr: {
    borderBottom: "1px solid #e0e7ff",
    transition: "background 0.15s",
  },
  td: {
    padding: "14px 18px",
    fontSize: "15px",
    color: "#374151",
    verticalAlign: "middle",
  },
  tdIndex: { color: "#9ca3af", fontWeight: "600", width: "40px" },
  tdName: { fontWeight: "700", color: "#1e1b4b" },
  tdTotal: { fontWeight: "700", color: "#6366f1" },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  qtyBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "2px solid #e0e7ff",
    background: "#f8f8ff",
    color: "#6366f1",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    lineHeight: 1,
    transition: "background 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyValue: {
    minWidth: "22px",
    textAlign: "center",
    fontWeight: "800",
    fontSize: "16px",
    color: "#1e1b4b",
  },
  removeBtn: {
    background: "#fff0f0",
    color: "#ef4444",
    border: "2px solid #fecaca",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  cartFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    background: "#f8f8ff",
    borderTop: "2px solid #e0e7ff",
    flexWrap: "wrap",
    gap: "16px",
  },
  totalSection: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  totalValue: {
    fontSize: "26px",
    fontWeight: "900",
    color: "#1e1b4b",
    letterSpacing: "-0.5px",
  },
  checkoutBtn: {
    background: "linear-gradient(135deg, #10b981, #34d399)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
    transition: "transform 0.15s",
    letterSpacing: "0.3px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    maxWidth: "860px",
    margin: "0 auto",
  },
  emptyIcon: { fontSize: "56px", display: "block", marginBottom: "12px" },
  emptyText: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#1e1b4b",
    margin: "0 0 6px",
  },
  emptySubText: { fontSize: "15px", color: "#9ca3af", margin: 0 },
};

export default ShoppingCart;
