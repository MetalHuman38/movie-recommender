/**
 * Generates a simple hash using a custom algorithm for a given string.
 * @param str - The input string to hash.
 * @returns A pseudo-hash for the input string.
 */
export function generateHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16); // Convert to hex string
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
