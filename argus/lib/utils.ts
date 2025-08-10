// Utility function to join class names conditionally
export function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}
