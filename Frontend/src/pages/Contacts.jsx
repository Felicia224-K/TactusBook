import { useAuth } from '../context/AuthContext';

// Placeholder only — the real contacts dashboard (list, search, forms)
// is built in a later stage. This exists now just so AuthGuard has a
// real protected page to guard, and so we can verify the auth flow
// end-to-end in the browser.
export default function Contacts() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: 600, margin: '4rem auto' }}>
      <h1>Contacts</h1>
      <p>Logged in as: {user?.name} ({user?.email})</p>
      <button onClick={logout}>Log out</button>
      <p style={{ marginTop: '2rem', color: '#888' }}>
        The real contacts dashboard (list, search, add/edit/delete) is built in a later stage.
      </p>
    </div>
  );
}