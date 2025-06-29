import React, { useState, useEffect } from "react";
import axios from "axios";

type InvoiceItem = {
  name: string;
  price: number | "";
  quantity: number | "";
};

export default function InvoiceForm() {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { name: "", price: "", quantity: 1 },
  ]);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => {
    const updatedItems = [...items];
    if (field === "price" || field === "quantity") {
      if (value === "") {
        updatedItems[index][field] = "";
      } else {
        const num = Number(value);
        if (field === "price") {
          updatedItems[index][field] = Math.max(0, num);
        } else if (field === "quantity") {
          updatedItems[index][field] = Math.max(1, num);
        }
      }
    } else {
      updatedItems[index][field] = value;
    }
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: "", quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        email,
        items: items.map((item) => ({
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      };
      await axios.post("http://localhost:3000/invoice", payload);

      setNotification({
        type: "success",
        message: "Invoice sent successfully!",
      });

      setEmail("");
      setItems([{ name: "", price: "", quantity: 1 }]);
    } catch (err) {
      console.error("Send error:", err);
      setNotification({ type: "error", message: "Failed to send invoice." });
    }
  };

  const total = items.reduce((sum, item) => {
    const price = Number(item.price);
    const qty = Number(item.quantity);
    if (!isNaN(price) && !isNaN(qty)) {
      return sum + price * qty;
    }
    return sum;
  }, 0);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold z-50
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {notification.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Create Invoice</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Client Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Services</h3>

          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3 relative"
            >
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                >
                  ✖ Remove
                </button>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Service Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  required
                  placeholder="e.g. Website Design"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Price (USD)
                </label>
                <input
                  type="number"
                  value={item.price}
                  min="0"
                  placeholder="0"
                  step="0.01"
                  onWheel={(e) => e.currentTarget.blur()}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Quantity
                </label>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  placeholder="1"
                  onWheel={(e) => e.currentTarget.blur()}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="w-full py-2 text-sm font-medium text-blue-700 border border-blue-500 rounded-lg hover:bg-blue-50"
          >
            ➕ Add Service
          </button>
        </div>

        <div className="text-right text-lg font-semibold text-gray-700">
          Total: <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
        >
          📤 Send Invoice
        </button>
      </form>
    </>
  );
}
