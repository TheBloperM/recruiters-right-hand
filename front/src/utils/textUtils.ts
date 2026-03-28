export function camelToTitleCase(text: string): string {
  if (!text) return "";

  const spacedText = text.replace(/([A-Z])/g, " $1");

  return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
}
