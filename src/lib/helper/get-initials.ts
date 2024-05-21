export function getInitials(fullName: string) {
  const names = fullName.split(" "); // Split the full name into an array of names
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join(""); // Get the first character of each name, convert to uppercase, and join them
  return initials;
}
