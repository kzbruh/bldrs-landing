"use client";

import { useEffect, useState } from "react";

interface RoadmapItem {
  status: "done" | "progress" | "todo";
  text: string;
  link?: { text: string; url: string };
}

const roadmapItems: RoadmapItem[] = [
  {
    status: "progress",
    text: "gather builders across Poland — 20+ events and counting",
  },
  {
    status: "progress",
    text: "connect them with early-stage startups via ",
    link: { text: "five.degrees", url: "https://joinfivedegrees.com/" },
  },
  {
    status: "todo",
    text: "launch an angel syndicate — builders backing builders",
  },
  {
    status: "todo",
    text: "open a hacker house in Warsaw — where builders build",
  },
];

const getStatusStyle = (status: RoadmapItem["status"]) => {
  switch (status) {
    case "done":
      return { symbol: "[x]", color: "#FFFFFF" };
    case "progress":
      return { symbol: "[>]", color: "#FFFFFF" };
    case "todo":
      return { symbol: "[ ]", color: "#555555" };
  }
};

export default function Roadmap() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);

  const getLineText = (item: RoadmapItem) => {
    return item.link ? item.text + item.link.text : item.text;
  };

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;

    if (currentLine < roadmapItems.length) {
      const lineText = getLineText(roadmapItems[currentLine]);
      if (currentChar < lineText.length) {
        const timer = setTimeout(() => {
          setCurrentChar((c) => c + 1);
        }, 18);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [started, currentChar, currentLine]);

  const renderLine = (item: RoadmapItem, index: number) => {
    const { symbol, color } = getStatusStyle(item.status);
    const fullText = getLineText(item);

    let charsToShow = 0;
    if (index < currentLine) {
      charsToShow = fullText.length;
    } else if (index === currentLine && started) {
      charsToShow = currentChar;
    }

    const visibleText = fullText.slice(0, charsToShow);

    let mainPart = visibleText;
    let linkPart = "";

    if (item.link && charsToShow > item.text.length) {
      mainPart = item.text;
      linkPart = visibleText.slice(item.text.length);
    }

    const textColor = item.status === "todo" ? "#555555" : "#FFFFFF";
    const isVisible = index <= currentLine;

    return (
      <div
        key={index}
        style={{
          display: "flex",
          gap: "12px",
          lineHeight: 1.9,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        <span style={{ color, flexShrink: 0, opacity: 0.6 }}>{symbol}</span>
        <span style={{ color: textColor }}>
          {mainPart}
          {linkPart && (
            <a
              href={item.link!.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#AAAAAA", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              {linkPart}
            </a>
          )}
        </span>
      </div>
    );
  };

  return (
    <div
      style={{
        background: "#0D0D0D",
        border: "1px solid #2A2A2A",
        borderRadius: "8px",
        width: "560px",
        overflow: "hidden",
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 16px",
          borderBottom: "1px solid #2A2A2A",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27CA40" }} />
        </div>
        <span style={{ color: "#666666", fontSize: "12px", marginLeft: "8px" }}>roadmap.sh</span>
      </div>

      {/* Terminal content */}
      <div style={{ padding: "20px 24px", fontSize: "13px", minHeight: "160px" }}>
        {roadmapItems.map((item, index) => renderLine(item, index))}
      </div>
    </div>
  );
}
