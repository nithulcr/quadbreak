export interface GameArtService {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const GAME_ART_SERVICES: GameArtService[] = [
  {
    id: 1,
    title: "3D Vehicle Modeling",
    description:
      "Game-ready vehicles built with accurate hard-surface forms, clean topology, and PBR materials for AAA games and simulation projects.",
    image: "/images/works/1.png",
    alt: "Realistic game-ready 3D vehicle model by Quadbreak Studios",
  },
  {
    id: 2,
    title: "3D Weapon Modeling",
    description:
      "High-detail weapons modeled and textured to production standards, with optimized geometry that holds up in real-time engines.",
    image: "/images/works/2.png",
    alt: "Detailed 3D weapon asset modeled for a game production pipeline",
  },
  {
    id: 3,
    title: "3D Environment Art",
    description:
      "Immersive environment art, modular kits, and set dressing that give game worlds a clear sense of place and scale.",
    image: "/images/environments.png",
    alt: "3D environment art created for an immersive game world",
  },
  {
    id: 4,
    title: "Hard-Surface 3D Modeling",
    description:
      "Mechanical, industrial, and hero prop assets with precise panel logic, believable wear, and game-ready optimization.",
    image: "/images/works/3.png",
    alt: "Hard-surface 3D model with detailed mechanical forms",
  },
  {
    id: 5,
    title: "Game-Ready Props & Assets",
    description:
      "Props, set dressing, and hero assets produced to your technical standards and ready to plug into your production pipeline.",
    image: "/images/works/4.png",
    alt: "Game-ready 3D props and assets produced by Quadbreak Studios",
  },
  {
    id: 6,
    title: "VR & Simulator Art",
    description:
      "Real-time optimized environments and assets for VR, training, and simulator applications across industries.",
    image: "/images/works/5.png",
    alt: "Real-time 3D simulator environment art",
  },
];
