export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function passwordStrength(p) {
  if (!p) return false;
  return p.length >= 8 && /[A-Z]/.test(p) && /[0-9]/.test(p);
}
