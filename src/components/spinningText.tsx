
"use client";

import { useEffect, useState } from "react";

interface SpinningTextProps {
  text: string;
  image?: string;
  size?: number;
  mobileSize?: number;
  duration?: number;
}

export default function SpinningText({
  text,
  image = "/logo-icon.png",
  size = 300,
  mobileSize,
  duration = 10,
}: SpinningTextProps) {
  const [currentSize, setCurrentSize] = useState(size);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const updateSize = () => {
      setCurrentSize(
        media.matches && mobileSize ? mobileSize : size
      );
    };

    updateSize();
    media.addEventListener("change", updateSize);

    return () => media.removeEventListener("change", updateSize);
  }, [size, mobileSize]);

  const center = currentSize / 2;
  const radius = currentSize * 0.32;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: currentSize,
        height: currentSize,
      }}
    >
      {/* Center Logo */}
      <div
        className="hero-spinn bg-cover bg-center"
        style={{
          width: currentSize * 0.55,
          height: currentSize * 0.55,
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Circular Text */}
      <svg
        className="absolute inset-0 animate-spin overflow-visible"
        viewBox={`0 0 ${currentSize} ${currentSize}`}
        style={{
          width: currentSize,
          height: currentSize,
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <defs>
          <path
            id="circularTextPath"
            d={`
              M ${center} ${center - radius}
              A ${radius} ${radius} 0 1 1
              ${center - 0.01} ${center - radius}
            `}
          />
        </defs>

        <text
          fill="white"
          fontSize={currentSize / 14.5}
          fontWeight="500"
          fontFamily="Arial, sans-serif"
          letterSpacing={currentSize * 0.004}
          textAnchor="start"
          textLength={circumference * 0.98}
          lengthAdjust="spacing"
        >
          <textPath
            href="#circularTextPath"
            startOffset="0%"
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
