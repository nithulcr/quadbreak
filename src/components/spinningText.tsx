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

  const textRadius = currentSize * 0.38;
  const characters = text.split("");

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
        className="bg-cover bg-center"
        style={{
          width: currentSize * 0.33,
          height: currentSize * 0.33,
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Rotating Text */}
      <div
        className="absolute inset-0 animate-spin"
        style={{
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 text-white font-medium whitespace-pre"
            style={{
              transform: `rotate(${
                (360 / characters.length) * index
              }deg) translateY(-${textRadius}px)`,
              transformOrigin: "0 0",
              fontSize: `${currentSize / 16}px`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}