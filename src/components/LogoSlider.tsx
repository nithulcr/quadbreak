"use client";

const topLogos = [
  "HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind", "TypeScript", "jQuery",  "React", "Next.js",  "MongoDB", "WordPress", "Shopify", "Wix", "Strapi", "Photoshop", "Illustrator"
];


const LogoSlider = () => {
  return (
    <div className="grid   z-50 relative">
      {/* Top Marquee */}
      <div className="overflow-hidden whitespace-nowrap 
">
        <div className="flex animate-marquee">
          {[...topLogos, ...topLogos].map((logo, i) => (
            <span
              key={`top-${i}`}
              className="logo-slide"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default LogoSlider;
