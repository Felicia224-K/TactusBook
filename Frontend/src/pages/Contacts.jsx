import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContacts } from '../hooks/useContacts';
import SearchBar from '../components/SearchBar';
import ContactCard from '../components/ContactCard';

export default function Contacts() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const { contacts, isLoading, error } = useContacts({ search, status });

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>My Contacts</h1>
          <p style={{ margin: 0, color: '#666' }}>Logged in as {user?.name}</p>
        </div>
        <button onClick={logout}>Log out</button>
      </div>

      <SearchBar search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} />

      {isLoading && <p>Loading contacts...</p>}
      {!isLoading && error && <p style={{ color: '#dc2626' }}>{error}</p>}
      {!isLoading && !error && contacts.length === 0 && (
        <p style={{ color: '#888' }}>
          {search || status ? 'No contacts match your search.' : 'You have no contacts yet. Add your first one to get started.'}
        </p>
      )}
      {!isLoading && !error && contacts.length > 0 && (
        <div>
          {contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)}
        </div>
      )}
    </div>
  );
}