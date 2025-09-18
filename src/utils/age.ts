// Convert 'BBY' to full number
export function estimateAge(birthYear: string): number | null {
  if (!birthYear || !birthYear.includes("BBY")) return null;
  const numeric = parseFloat(birthYear.replace("BBY", ""));
  return Math.round(numeric);
}