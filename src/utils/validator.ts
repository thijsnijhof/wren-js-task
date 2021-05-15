export function isName(name: string): boolean {
  // Basic check for name. Only alphabetical and space
  const regex = new RegExp("^[a-zA-Z ]*$");

  if (!name) return false;

  return regex.test(name);
}
