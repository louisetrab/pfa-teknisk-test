// Checks if age falls into one of the chosen options
export function matchesAgeRange(age: number | null, selectedRanges: string[]): boolean {
  if (selectedRanges.length === 0) return true;  // ingen filter => alt tilladt
  if (age === null) return false;                // ukendt alder
  return selectedRanges.some((range) => {
    if (range === "0to20") return age <= 20;
    if (range === "20to40") return age > 20 && age <= 40;
    if (range === "40to60") return age > 40 && age <= 60;
    if (range === "60to80") return age > 60 && age <= 80;
    if (range === "80plus") return age > 80;
    return false;
  });
}