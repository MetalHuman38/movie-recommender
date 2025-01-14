import crypto from "crypto";

/**
 * Generates an MD5 hash for the given string.
 * @param str - The input string to hash.
 * @returns The generated MD5 hash.
 */
export function generateHash(str: string): string {
  return crypto.createHash("md5").update(str).digest("hex");
}

/**
 * Generates a URL for a user avatar using the first name and last name.
 * @param first_name - The user's first name.
 * @param last_name - The user's last name.
 * @returns The generated avatar URL.
 */
export function generateAvatarUrl(first_name: string, last_name: string): string {
  const initials = `${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`; // Generate initials.

  const size = 200;
  const background = "random";
  const textColor = "fff";
  const font = "arial";

  const baseUrl = `https://ui-avatars.com/api/?name=${initials}&size=${size}&background=${background}&color=${textColor}&font=${font}`;
  return baseUrl;
}
