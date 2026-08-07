"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Svg = styled.svg`
  width: 100%;
  overflow: visible;
  display: block;
  user-select: none;

  font-size: 8rem;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  line-height: 1;



  @media (max-width: 768px) {
    font-size: 12rem;
    letter-spacing: 2px;
  }
`;

const Wrapper = styled.section`
  width: 100%;
  min-height: 200px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

interface CurvedMarqueeProps {
  text?: string;
  speed?: number;
  color?: string;
}

export default function CurvedMarquee({
  text = "DESIGN ✦ BRANDING ✦ DEVELOPMENT ✦ ",
  speed = 1,
  color = "#f3f3f3",
}: CurvedMarqueeProps) {
  const pathId = "curve-path";

  const pathRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

  const [pathLength, setPathLength] = useState(0);

  // Create one long string
  const marqueeText = Array(30).fill(text).join("");

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    if (!textPathRef.current || !pathLength) return;

    let frame: number;
    let offset = 0;

    const animate = () => {
      offset -= speed;

      // Reset after one full loop
      if (Math.abs(offset) > pathLength) {
        offset = 0;
      }

      textPathRef.current?.setAttribute(
        "startOffset",
        `${offset}px`
      );

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [speed, pathLength]);

  return (
    <section className="py-14 md:py-20">
      <Svg viewBox="0 0 1440 140">
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d="M-150,50 Q720,250 1590,50"
            fill="none"
          />
        </defs>

        <text fill={color}>
          <textPath
            ref={textPathRef}
            href={`#${pathId}`}
            startOffset="0"
          >
            {marqueeText}
          </textPath>
        </text>
      </Svg>
    </section>
  );
}