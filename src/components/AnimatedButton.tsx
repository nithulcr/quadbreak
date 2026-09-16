"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

type AnimatedButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
};

export default function AnimatedButton({
  label,
  className = "",
  onClick,
  href,
  type,
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const outline = outlineRef.current;

    if (!button || !outline) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = Math.min(Math.max(e.clientX - centerX, -10), 10);
      const offsetY = Math.min(Math.max(e.clientY - centerY, -10), 10);
      outline.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const handleMouseLeave = () => {
      if (outlineRef.current) {
        outlineRef.current.style.transform = "translate(0, 0)";
      }
    };

    button.addEventListener("mousemove", handleMouseMove as EventListener);
    button.addEventListener("mouseleave", handleMouseLeave as EventListener);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove as EventListener);
      button.removeEventListener("mouseleave", handleMouseLeave as EventListener);
    };
  }, []);

  const isExternal = href && /^https?:\/\//i.test(href);

  if (type) {
    return (
      <button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={onClick}
        type={type}
        className={clsx("button", className)}
      >
        <div ref={outlineRef} className="button-outline"></div>
        <div className="button-text">{label}</div>
      </button>
    );
  }

  if (isExternal) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx("button", className)}
      >
        <div ref={outlineRef} className="button-outline"></div>
        <div className="button-text">{label}</div>
      </a>
    );
  }

  if (href?.endsWith(".pdf")) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        download
        className={clsx("button", className)}
      >
        <div ref={outlineRef} className="button-outline"></div>
        <div className="button-text">{label}</div>
      </a>
    );
  }

  return (
    <Link
      ref={buttonRef as React.RefObject<HTMLAnchorElement>}
      onClick={onClick}
      href={href ?? "/"}
      className={clsx("button", className)}
    >
      <div ref={outlineRef} className="button-outline"></div>
      <div className="button-text">{label}</div>
    </Link>
  );
}
