import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContacts } from '../hooks/useContacts';
import api from "../services/api";
import SearchBar from '../components/SearchBar';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';

export default function Contacts() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const { contacts, isLoading, error, refetch  } = useContacts({ search, status });

  // formMode: null (hidden) | 'create' | the contact object being edited
  const [formMode, setFormMode] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function handleSave(formValues) {
    if (formMode === 'create') {
      await api.post('/contacts', formValues);
    } else {
      await api.put(`/contacts/${formMode.id}`, formValues);
    }
    await refetch();
    setFormMode(null);
  }

  async function handleDelete(contact) {
    const confirmed = window.confirm(`Delete "${contact.name}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(contact.id);
    try {
      await api.delete(`/contacts/${contact.id}`);
      await refetch();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete contact.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={{ 
                maxWidth: 700, 
                margin: '2rem auto', 
                padding: '0 1rem',
                    
            }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>My Contacts</h1>
          <p style={{ margin: 0, color: '#666' }}>Hey {user?.name} Enjoy TactusBook</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
                 style={{
                    backgroundColor: 'green',
                    border: '1px solid black',
                    borderRadius: '10px',
                    boxShadow: '1px 1px 5px',
                    height: '25px',
                }}
                onClick={() => setFormMode('create')}>+ Add Contact</button>
          <button 
                 style={{
                    backgroundColor: 'red',
                    border: '1px solid black',
                    borderRadius: '10px',
                    height:'25px',
                    boxShadow: '1px 1px 5px'
                }}
                onClick={logout}>Log out</button>
        </div>
      </div>

      {formMode && (
        <ContactForm
          initialContact={formMode === 'create' ? null : formMode}
          onSave={handleSave}
          onCancel={() => setFormMode(null)}
        />
      )}

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
          {contacts.map((contact) => (
            <ContactCard
                key={contact.id} 
                contact={contact}
                onEdit={setFormMode}
                onDelete={handleDelete}
                isDeleting={deletingId === contact.id}
            />
        ))}
        </div>
      )}
    </div>
  );
}