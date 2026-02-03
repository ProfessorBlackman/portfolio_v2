"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

export function MermaidBlock({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // -------------------------
  // Mermaid Init
  // -------------------------
  const renderDiagram = async () => {
    if (!containerRef.current) return;

    try {
      setError(null);

      // Pick theme based on OS & Next.js theme attribute
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = document.documentElement.classList.contains("dark") || prefersDark;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: isDark ? "dark" : "default",
        themeVariables: {
          fontSize: "16px",
          lineColor: isDark ? "#b4b4b4" : "#333",
          primaryColor: isDark ? "#1e1e1e" : "#fff",
        },
      });

      const { svg } = await mermaid.render(
        "mermaid-" + Math.random().toString(36).substring(2),
        code
      );

      containerRef.current.innerHTML = svg;
    } catch (err: any) {
      console.error("Mermaid render error:", err);
      setError("Could not render diagram.");
      containerRef.current.innerHTML = "";
    }
  };

  // -------------------------
  // Effects
  // -------------------------
  useEffect(() => {
    renderDiagram();
  }, [code, fullscreen, zoom]);

  // Sync theme changes
  useEffect(() => {
    const observer = new MutationObserver(renderDiagram);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Add/remove class to body when fullscreen changes
  useEffect(() => {
    if (fullscreen) {
      document.body.classList.add("mermaid-fullscreen");
    } else {
      document.body.classList.remove("mermaid-fullscreen");
    }

    return () => {
      document.body.classList.remove("mermaid-fullscreen");
    };
  }, [fullscreen]);

  // Add wheel event listener for zoom
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          setZoom((z) => Math.min(z + 0.2, 3));
        } else {
          setZoom((z) => Math.max(z - 0.2, 0.4));
        }
      }
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Add panning event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseDown = (e: MouseEvent) => {
      isPanning.current = true;
      startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
      container.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isPanning.current) return;
      setPosition({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      });
    };

    const onMouseUp = () => {
      isPanning.current = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseleave", onMouseUp);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseleave", onMouseUp);
    };
  }, [position]);


  // -------------------------
  // Handlers
  // -------------------------
  const copySource = async () => {
    await navigator.clipboard.writeText(code);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.4));

  // -------------------------
  // Styles
  // -------------------------
  const wrapperStyle: React.CSSProperties = {
    position: fullscreen ? "fixed" : "relative",
    top: fullscreen ? 0 : undefined,
    left: fullscreen ? 0 : undefined,
    width: fullscreen ? "100vw" : "100%",
    height: fullscreen ? "100vh" : "auto",
    background: fullscreen ? "var(--translucent-background)" : "transparent",
    padding: fullscreen ? "2rem" : "0",
    zIndex: fullscreen ? 9999 : "auto",
    overflow: "auto",
    transition: "all 0.3s ease-in-out",
  };

  const zoomStyle: React.CSSProperties = {
    transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
    transformOrigin: "top left",
    transition: "transform 0.25s ease",
    cursor: "grab",
  };

  return (
    <div ref={wrapperRef} style={wrapperStyle} className="rounded-lg shadow relative border border-neutral-300 dark:border-neutral-700">
      {/* Toolbar */}
      <div className="absolute right-3 top-3 flex gap-2 z-10">
        <button
          onClick={copySource}
          className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 shadow text-sm"
        >
          Copy
        </button>

        <button
          onClick={zoomOut}
          className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 shadow text-sm"
        >
          -
        </button>

        <button
          onClick={zoomIn}
          className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 shadow text-sm"
        >
          +
        </button>

        <button
          onClick={resetZoom}
          className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 shadow text-sm"
        >
          Reset
        </button>

        <button
          onClick={toggleFullscreen}
          className="px-2 py-1 rounded bg-white border-[1px] border-neutral-300 dark:bg-neutral-800 dark:text-white text-black shadow text-sm"
        >
          {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>

      {/* Diagram Container */}
      <div className="overflow-hidden" style={zoomStyle}>
        <div ref={containerRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-red-600 dark:text-red-400 mt-3 p-3 text-sm border border-red-400 rounded">
          {error}
          <pre className="whitespace-pre-wrap mt-2">{code}</pre>
        </div>
      )}
    </div>
  );
}
