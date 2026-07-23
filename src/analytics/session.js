export function getSessionId() {
  const KEY = "portfolio_session";

  let session = sessionStorage.getItem(KEY);

  if (session) return session;

  session = crypto.randomUUID();

  sessionStorage.setItem(KEY, session);

  return session;
}