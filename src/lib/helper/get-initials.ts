/**
 * 
 * @param {string} fullName - Full name of Admin that is currently signed In
 * @returns {string}
 */
export const getInitials = (fullName: string): string => {
  const names = fullName.split(" "); // Splits the full name into an array of names
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join(""); // Get the first character of each name, convert to uppercase, and join them
  return initials;
}
