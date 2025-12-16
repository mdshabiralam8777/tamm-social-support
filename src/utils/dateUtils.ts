/**
 * Date/Time Utilities
 * Common date formatting functions used across the application
 */

/**
 * Format a date string for display
 * @param dateString - ISO date string or Date object
 * @param locale - Language locale (e.g., "en", "ar")
 * @returns Formatted date like "December 16, 2025"
 */
export function formatDate(
  dateString: string | Date,
  locale: string = "en"
): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return date.toLocaleDateString(locale === "ar" ? "ar-AE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date for time display
 * @param date - Date object
 * @param locale - Language locale
 * @returns Formatted time like "10:30 PM"
 */
export function formatTime(date: Date, locale: string = "en"): string {
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get relative time string (e.g., "2 hours ago", "3 days ago")
 * @param dateString - ISO date string
 * @param t - Translation function for localized strings
 * @returns Relative time string
 */
export function getTimeAgo(
  dateString: string,
  t: (key: string, options?: { count: number }) => string
): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return t("dashboard.justNow");
  if (diffInHours < 24) return t("dashboard.hoursAgo", { count: diffInHours });

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return t("dashboard.daysAgo", { count: diffInDays });

  const diffInWeeks = Math.floor(diffInDays / 7);
  return t("dashboard.weeksAgo", { count: diffInWeeks });
}

/**
 * Get a short date format
 * @param dateString - ISO date string
 * @param locale - Language locale
 * @returns Short date like "Dec 16, 2025"
 */
export function formatShortDate(
  dateString: string | Date,
  locale: string = "en"
): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return date.toLocaleDateString(locale === "ar" ? "ar-AE" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Check if a date is in the past
 */
export function isPast(dateString: string | Date): boolean {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return date.getTime() < Date.now();
}

/**
 * Check if a date is today
 */
export function isToday(dateString: string | Date): boolean {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
