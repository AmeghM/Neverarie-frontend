import { useEffect, useState } from "react";

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't use custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleOver = (e) => {
      setHovering(!!e.target.closest("button, a, [role='button']"));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex
          items-center justify-center rounded-full
          transition-all duration-200
          ${hovering ? "h-10 w-10 bg-violet-400/20" : "h-6 w-6"}`}
      >
        <span
          className={`text-[#C4B5FD] transition-all duration-200
            ${hovering ? "text-3xl" : "text-xl"}`}
          style={{
            filter: "drop-shadow(0 0 8px #C4B5FD)",
          }}
        >
          ✦
        </span>
      </div>
    </div>
  );
}

export default Cursor;
