import { getOwnerTeam, OWNER_TEAMS } from './owner';

describe('getOwnerTeam', () => {
  it.each([
    { uid: 'node-exporter', team: 'Platform Engineering' },
    { uid: 'payments-overview', team: 'Payments' },
    { uid: 'k8s-cluster-health', team: 'Observability' },
    { uid: 'checkout-latency', team: 'Developer Experience' },
  ])('assigns $uid to $team', ({ uid, team }) => {
    expect(getOwnerTeam(uid)).toBe(team);
  });

  it('returns the same team for the same dashboard on every call', () => {
    expect(getOwnerTeam('payments-overview')).toBe(getOwnerTeam('payments-overview'));
  });

  it('only returns one of the known teams', () => {
    for (const uid of ['', 'a', 'some-very-long-dashboard-uid-0123456789', 'ÄÖÜ']) {
      expect(OWNER_TEAMS).toContain(getOwnerTeam(uid));
    }
  });
});
