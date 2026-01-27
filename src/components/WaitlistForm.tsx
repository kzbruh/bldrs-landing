"use client";

import { useState, FormEvent } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ color: "#00FF00", fontSize: "14px" }}>
        ✓ you&apos;re on the list
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
        disabled={status === "loading"}
        style={{
          background: "transparent",
          border: "1px solid #444",
          color: "#FFF",
          fontFamily: "inherit",
          fontSize: "13px",
          padding: "10px 14px",
          width: "200px",
          outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "transparent",
          border: "1px solid #444",
          color: "#FFF",
          fontFamily: "inherit",
          fontSize: "13px",
          padding: "10px 18px",
          cursor: "pointer",
        }}
      >
        {status === "loading" ? "..." : "join"}
      </button>
      {status === "error" && (
        <span style={{ color: "#FF5555", fontSize: "12px", alignSelf: "center" }}>
          error
        </span>
      )}
    </form>
  );
}
