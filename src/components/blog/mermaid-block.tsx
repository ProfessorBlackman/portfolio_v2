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

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        themeVariables: {
          fontSize: "15px",
          fontFamily: "var(--font-manrope), sans-serif",
          background: "#ffffff",
          primaryColor: "#f5f3ee",
          primaryBorderColor: "#20211f",
          primaryTextColor: "#20211f",
          secondaryColor: "#e9e7e0",
          tertiaryColor: "#ffffff",
          lineColor: "#85847d",
          noteBkgColor: "#b9e36a",
          noteBorderColor: "#4f6f1f",
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
    background: fullscreen ? "var(--color-paper)" : "var(--color-surface)",
    padding: fullscreen ? "3rem 2rem 2rem" : "3rem 1rem 1rem",
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
    <div ref={wrapperRef} style={wrapperStyle} className="my-8">
      {/* Toolbar */}
      <div className="absolute right-2 top-2 flex gap-1 z-10">
        <button
          type="button"
          onClick={copySource}
          className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 text-ink/60 hover:text-ink hover:bg-wash transition-colors"
        >
          Copy
        </button>

        <button
          type="button"
          onClick={zoomOut}
          className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 text-ink/60 hover:text-ink hover:bg-wash transition-colors"
          aria-label="Zoom out"
        >
          -
        </button>

        <button
          type="button"
          onClick={zoomIn}
          className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 text-ink/60 hover:text-ink hover:bg-wash transition-colors"
          aria-label="Zoom in"
        >
          +
        </button>

        <button
          type="button"
          onClick={resetZoom}
          className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 text-ink/60 hover:text-ink hover:bg-wash transition-colors"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 text-ink/60 hover:text-ink hover:bg-wash transition-colors"
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
        <div className="mt-3 p-3 text-sm bg-wash text-ink/80">
          {error}
          <pre className="whitespace-pre-wrap mt-2">{code}</pre>
        </div>
      )}
    </div>
  );
}
