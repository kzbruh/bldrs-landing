"use client";

import { useEffect, useState } from "react";
import attendees from "./attendees.json";

type Attendee = {
  name: string;
  initials: string;
  role: "founder" | "operator" | "investor" | "student" | string;
  title?: string;
  company?: string;
  headline?: string;
  location?: string;
  avatar?: string;
  linkedin?: string;
  username?: string;
  is_host?: boolean;
};

const PASSWORD = "tfg2026";
const STORAGE_KEY = "tfg-unlocked";

const ROLE_LABEL: Record<string, string> = {
  founder: "founder",
  operator: "operator",
  investor: "investor",
  student: "student/talent",
};

const ROLE_COLOR: Record<string, string> = {
  founder: "#E8B64C",
  operator: "#8EC3F0",
  investor: "#A0E8A0",
  student: "#D9A0E8",
};

export default function TechForGoodPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {}
  }, []);

  return unlocked ? (
    <Attendees data={attendees as Attendee[]} />
  ) : (
    <Gate onUnlock={() => setUnlocked(true)} />
  );
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val.trim().toLowerCase() === PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      onUnlock();
    } else {
      setErr(true);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
          maxWidth: "360px",
          width: "100%",
        }}
      >
        <div style={{ fontSize: "13px", color: "#666" }}>
          [bldrs] · tech for good · warsaw
        </div>
        <div
          style={{
            fontSize: "15px",
            textAlign: "center",
            lineHeight: 1.5,
            marginBottom: "8px",
          }}
        >
          enter password to view attendee list_
        </div>
        <input
          type="password"
          autoFocus
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setErr(false);
          }}
          placeholder="password"
          style={{
            width: "100%",
            padding: "10px 14px",
            background: "transparent",
            border: `1px solid ${err ? "#cc3333" : "#333"}`,
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 14px",
            background: "#fff",
            color: "#000",
            border: "none",
            fontFamily: "inherit",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          unlock →
        </button>
        {err && (
          <div style={{ fontSize: "12px", color: "#cc3333" }}>
            wrong password
          </div>
        )}
      </form>
    </main>
  );
}

function Attendees({ data }: { data: Attendee[] }) {
  const [filter, setFilter] = useState<string>("all");

  const filters = [
    { key: "all", label: "all" },
    { key: "founder", label: "founders" },
    { key: "operator", label: "operators" },
    { key: "investor", label: "investors" },
    { key: "student", label: "students" },
  ];

  const visible = filter === "all" ? data : data.filter((a) => a.role === filter);
  const counts: Record<string, number> = { all: data.length };
  for (const a of data) counts[a.role] = (counts[a.role] || 0) + 1;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px 80px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            letterSpacing: "0.05em",
            marginBottom: "8px",
          }}
        >
          [bldrs] · warsaw · april 21, 2026
        </div>
        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            margin: "0 0 16px",
          }}
        >
          TECH FOR GOOD
          <span style={{ color: "#666" }}> / </span>
          <span style={{ color: "#E8B64C" }}>dinner</span>
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#999",
            maxWidth: "620px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          a private dinner for people building what matters —
          climate, education, health &amp; adjacent problems worth solving.
          one long table. no panels, no pitches.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "24px",
          paddingBottom: "16px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        {filters.map((f) => {
          const active = filter === f.key;
          const count = counts[f.key] || 0;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "6px 12px",
                background: active ? "#fff" : "transparent",
                color: active ? "#000" : "#999",
                border: `1px solid ${active ? "#fff" : "#333"}`,
                fontFamily: "inherit",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {f.label}
              <span
                style={{
                  fontSize: "11px",
                  color: active ? "#666" : "#555",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {visible.map((a) => (
          <Card key={a.username || a.name} a={a} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "64px",
          paddingTop: "24px",
          borderTop: "1px solid #1a1a1a",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          fontSize: "12px",
          color: "#555",
        }}
      >
        <div style={{ letterSpacing: "0.05em" }}>
          hosted by · [bldrs] · tilia impact ventures · sigma² · portfolion
        </div>
        <div>
          kontakt wino &amp; bistro · warszawa · 7:00 pm → 11:00 pm
        </div>
      </div>
    </main>
  );
}

function Card({ a }: { a: Attendee }) {
  const color = ROLE_COLOR[a.role] || "#999";
  return (
    <div
      style={{
        border: "1px solid #1a1a1a",
        background: "#050505",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        position: "relative",
      }}
    >
      {a.is_host && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontSize: "10px",
            letterSpacing: "0.05em",
            color: "#E8B64C",
          }}
        >
          host
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Avatar a={a} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {a.name}
          </div>
          <div
            style={{
              fontSize: "11px",
              color,
              letterSpacing: "0.05em",
              marginTop: "2px",
            }}
          >
            {ROLE_LABEL[a.role] || a.role}
          </div>
        </div>
      </div>
      {a.headline && (
        <div
          style={{
            fontSize: "13px",
            color: "#bbb",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {a.headline}
        </div>
      )}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "12px",
          borderTop: "1px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "11px", color: "#555" }}>
          {a.location || "\u00a0"}
        </span>
        {a.linkedin && (
          <a
            href={a.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              color: "#999",
              textDecoration: "none",
              border: "1px solid #333",
              padding: "4px 10px",
            }}
          >
            linkedin →
          </a>
        )}
      </div>
    </div>
  );
}

function Avatar({ a }: { a: Attendee }) {
  const [failed, setFailed] = useState(false);
  if (a.avatar && !failed) {
    return (
      <img
        src={a.avatar}
        alt={a.name}
        onError={() => setFailed(true)}
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          objectFit: "cover",
          background: "#1a1a1a",
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        color: "#999",
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {a.initials}
    </div>
  );
}
