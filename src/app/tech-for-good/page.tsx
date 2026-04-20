"use client";

import { useEffect, useState } from "react";
import attendees from "./attendees.json";

type Experience = { company: string; role: string; dates: string };
type Education = { school: string; degree: string };

type Attendee = {
  name: string;
  initials: string;
  role: string;
  domain: "climate" | "health" | "education" | "ai" | "other" | string;
  headline?: string;
  about?: string;
  current_role?: string;
  current_company?: string;
  past_ex?: string[];
  edu_tags?: string[];
  experiences?: Experience[];
  educations?: Education[];
  avatar?: string;
  linkedin?: string;
  username?: string;
  is_host?: boolean;
};

const PASSWORD = "tfg2026";
const STORAGE_KEY = "tfg-unlocked";

export default function TechForGoodPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
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
    } else setErr(true);
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
        <div style={{ fontSize: "15px", textAlign: "center", lineHeight: 1.5, marginBottom: "8px" }}>
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
        {err && <div style={{ fontSize: "12px", color: "#cc3333" }}>wrong password</div>}
      </form>
    </main>
  );
}

function Attendees({ data }: { data: Attendee[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          [bldrs] · Warsaw · April 21, 2026
        </div>
        <h1
          style={{
            fontSize: "clamp(22px, 2.6vw, 28px)",
            fontWeight: 500,
            lineHeight: 1.3,
            margin: "0 0 14px",
            color: "#fff",
          }}
        >
          Tech For Good
          <span style={{ color: "#3a4a36" }}> / </span>
          <span style={{ color: "#8FA883", fontWeight: 400 }}>dinner attendee list</span>
        </h1>
        <p
          style={{
            fontSize: "12.5px",
            color: "#666",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          For people building what matters — climate, education, health &amp; adjacent problems worth solving.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "16px",
        }}
      >
        {data.map((a) => (
          <Card
            key={a.username || a.name}
            a={a}
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
          />
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
        <div>kontakt wino &amp; bistro · warszawa · 7:00 pm → 11:00 pm</div>
      </div>
    </main>
  );
}

function Card({
  a,
  expanded,
  onToggle,
}: {
  a: Attendee;
  expanded: boolean;
  onToggle: () => void;
}) {
  const headline = a.headline || "";
  const about = (a.about || "").trim();

  const hasMore = Boolean(
    about ||
      (a.experiences && a.experiences.length > 0) ||
      (a.educations && a.educations.length > 0)
  );

  return (
    <div
      className="tfg-card"
      onClick={() => hasMore && onToggle()}
      style={{
        border: "1px solid #1a1a1a",
        background: "#050505",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative",
        cursor: hasMore ? "pointer" : "default",
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      {a.is_host && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            fontSize: "10px",
            letterSpacing: "0.08em",
            color: "#8FA883",
          }}
        >
          host
        </div>
      )}

      {/* Top row */}
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
              paddingRight: a.is_host ? "28px" : "0",
            }}
          >
            {a.name}
          </div>
          {(a.current_role || a.current_company) && (
            <div
              style={{
                fontSize: "12px",
                color: "#999",
                lineHeight: 1.4,
                marginTop: "3px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {a.current_role}
              {a.current_role && a.current_company && (
                <span style={{ color: "#555" }}> @ </span>
              )}
              <span style={{ color: "#ddd" }}>{a.current_company}</span>
            </div>
          )}
        </div>
      </div>

      {/* Headline */}
      {headline && (
        <div
          style={{
            fontSize: "12.5px",
            color: "#aaa",
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {headline}
        </div>
      )}

      {/* Expanded content */}
      {expanded && (
        <div
          style={{
            marginTop: "4px",
            paddingTop: "12px",
            borderTop: "1px solid #1a1a1a",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "#555",
                marginBottom: "6px",
              }}
            >
              About (from LinkedIn)
            </div>
            {about ? (
              <div
                style={{
                  fontSize: "12.5px",
                  color: "#aaa",
                  lineHeight: 1.55,
                  whiteSpace: "pre-wrap",
                }}
              >
                {about}
              </div>
            ) : (
              <div
                style={{
                  fontSize: "12px",
                  color: "#444",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                — no about section on LinkedIn —
              </div>
            )}
          </div>
          {a.experiences && a.experiences.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "#555",
                  marginBottom: "6px",
                }}
              >
                EXPERIENCE
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {a.experiences.map((e, i) => (
                  <div key={i} style={{ fontSize: "12px", lineHeight: 1.4 }}>
                    <span style={{ color: "#ddd" }}>{e.role || "—"}</span>
                    {e.company && (
                      <>
                        <span style={{ color: "#555" }}> @ </span>
                        <span style={{ color: "#fff" }}>{e.company}</span>
                      </>
                    )}
                    {e.dates && (
                      <div style={{ color: "#555", fontSize: "10px", marginTop: "1px" }}>
                        {e.dates}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {a.educations && a.educations.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "#555",
                  marginBottom: "6px",
                }}
              >
                EDUCATION
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {a.educations.map((e, i) => (
                  <div key={i} style={{ fontSize: "12px", lineHeight: 1.4 }}>
                    <span style={{ color: "#ddd" }}>{e.school}</span>
                    {e.degree && (
                      <div style={{ color: "#777", fontSize: "11px", marginTop: "1px" }}>
                        {e.degree}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom bar: expand hint + LI icon */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "10px",
          borderTop: "1px solid #121212",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {hasMore ? (
          <span style={{ fontSize: "10px", color: "#444", letterSpacing: "0.05em" }}>
            {expanded ? "click to collapse all" : "click to expand all"}
          </span>
        ) : (
          <span />
        )}
        {a.linkedin && (
          <a
            href={a.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="tfg-li"
            style={{
              fontSize: "10px",
              color: "#888",
              textDecoration: "none",
              border: "1px solid #222",
              padding: "3px 8px",
              letterSpacing: "0.05em",
            }}
          >
            linkedin ↗
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
