/**
 * Input Utilities for Form Validation
 * Production-ready formatting, masking, and sanitization utilities
 */

/**
 * Format Emirates ID as user types
 * Converts input to: 784-XXXX-XXXXXXX-X
 */
export function formatEmiratesId(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");

  // Limit to 15 digits
  const limited = digits.slice(0, 15);

  // Format as 784-XXXX-XXXXXXX-X
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 7) {
    return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  } else if (limited.length <= 14) {
    return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`;
  } else {
    return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(
      7,
      14
    )}-${limited.slice(14)}`;
  }
}

/**
 * Format UAE phone number as user types
 * Accepts: +971, 00971, 0 prefixes or raw 9-digit number
 * Displays with spaces for readability
 */
export function formatPhone(value: string): string {
  // Remove all non-digits and non-plus
  let cleaned = value.replace(/[^\d+]/g, "");

  // If starts with 00971, convert to +971
  if (cleaned.startsWith("00971")) {
    cleaned = "+971" + cleaned.slice(5);
  }

  // If starts with 0 (local format), keep as is
  // If starts with +971, keep as is
  // Otherwise just show digits

  return cleaned;
}

/**
 * Normalize phone number to +971XXXXXXXXX format for storage
 */
export function normalizePhone(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");

  // Handle different formats
  if (digits.startsWith("971") && digits.length === 12) {
    return `+${digits}`;
  }
  if (digits.startsWith("0") && digits.length === 10) {
    return `+971${digits.slice(1)}`;
  }
  if (digits.length === 9) {
    return `+971${digits}`;
  }

  return value; // Return original if can't normalize
}

/**
 * Sanitize text input to prevent XSS
 * Removes HTML tags and potentially dangerous characters
 */
export function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, "") // Remove any remaining angle brackets
    .trim();
}

/**
 * Validate name contains only allowed characters
 * Allows: letters (including Arabic), spaces, hyphens, apostrophes
 */
export function isValidName(value: string): boolean {
  // Allow letters (Latin and Arabic), spaces, hyphens, apostrophes
  const nameRegex = /^[\p{L}\s'-]+$/u;
  return nameRegex.test(value.trim());
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

/**
 * Get the maximum date of birth for 18+ requirement
 */
export function getMaxDobFor18Plus(): string {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return maxDate.toISOString().split("T")[0];
}

/**
 * Validate Emirates ID format
 * Format: 784-XXXX-XXXXXXX-X (with or without dashes)
 */
export function isValidEmiratesId(value: string): boolean {
  const withDashes = /^784-\d{4}-\d{7}-\d$/;
  const withoutDashes = /^784\d{4}\d{7}\d$/;
  return withDashes.test(value) || withoutDashes.test(value);
}

/**
 * Validate UAE phone number
 * Accepts: +971XXXXXXXXX, 00971XXXXXXXXX, 0XXXXXXXXX, XXXXXXXXX
 */
export function isValidUAEPhone(value: string): boolean {
  const phoneRegex = /^(\+971|00971|0)?[0-9]{9}$/;
  return phoneRegex.test(value.replace(/\s/g, ""));
}
