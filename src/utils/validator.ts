export function isName(name: string): string | false {
  // Basic check for name. Only alphabetical and space
  const regex = new RegExp("^[a-zA-Z ]*$");

  if (!name) return false;

  if (!regex.test(name)) return false;

  return name;
}
