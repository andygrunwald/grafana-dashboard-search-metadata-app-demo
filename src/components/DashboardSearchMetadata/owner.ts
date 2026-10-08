export const OWNER_TEAMS = ['Platform Engineering', 'Payments', 'Observability', 'Developer Experience'];

// Stand-in for a real ownership lookup. The team is derived from the dashboard UID instead of
// Math.random() so a dashboard keeps its owner while the user types, moves through results or
// reloads the page.
export function getOwnerTeam(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) {
    hash = (hash * 31 + uid.charCodeAt(i)) >>> 0;
  }
  return OWNER_TEAMS[hash % OWNER_TEAMS.length];
}
