// Validation for basic email format
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates password strength based on common security requirements.
 * @param {string} p - The password string.
 * @returns {boolean} True if the password meets the strength criteria.
 */
export function passwordStrength(p) {
  if (!p) return false;
  // Criteria: >=8 chars, includes uppercase, lowercase, and a number
  return p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p);
}