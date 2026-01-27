import Image from "next/image";
import Roadmap from "@/components/Roadmap";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        overflow: "hidden",
      }}
    >
      {/* Hero */}
      <div
        className="fade-in"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "64px",
        }}
      >
        <Image
          src="/logo-wordmark.png"
          alt="[bldrs]"
          width={160}
          height={48}
          priority
          style={{
            width: "160px",
            height: "auto",
            marginBottom: "20px",
          }}
        />
        <p style={{ fontSize: "18px", letterSpacing: "0.01em" }}>
          ecosystem for the next wave of builders.
        </p>
      </div>

      {/* Roadmap */}
      <div style={{ marginBottom: "64px" }}>
        <Roadmap />
      </div>

      {/* CTA */}
      <div
        className="fade-in"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          opacity: 0,
          animationDelay: "0.2s",
        }}
      >
        <p style={{ fontSize: "13px", color: "#666666" }}>stay in the loop_</p>
        <WaitlistForm />
        <a
          href="https://www.linkedin.com/company/bldrs-pl/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "13px",
            color: "#666666",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          linkedin <span style={{ fontSize: "11px" }}>→</span>
        </a>
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: "20px",
          color: "#444444",
          fontSize: "11px",
        }}
      >
        © 2025 bldrs
      </footer>
    </main>
  );
}
