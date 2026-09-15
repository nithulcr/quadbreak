export const CATEGORY_LABELS: Record<string, string> = {
  "3d-art": "3D Art",
  "game-art": "Game Art",
  environment: "Environment",
  character: "Character",
  props: "Props",
  vehicles: "Vehicles",
  weapons: "Weapons",
  animation: "Animation",
  vfx: "VFX",
  "concept-art": "Concept Art",
};

export function getCategoryLabel(category: string): string {
  if (typeof category === "string" && category.trim() && CATEGORY_LABELS[category]) {
    return CATEGORY_LABELS[category];
  }

  if (typeof category !== "string" || !category.trim()) {
    return "Uncategorized";
  }

  return category
    .replace(/[-_]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}