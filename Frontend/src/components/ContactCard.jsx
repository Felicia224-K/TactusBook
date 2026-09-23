const STATUS_COLORS = {
  lead: '#f59e0b',
  prospect: '#3b82f6',
  client: '#10b981',
  inactif: '#9ca3af',
};

export default function ContactCard({ contact, onEdit, onDelete, isDeleting }) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{contact.name}</h3>
        <span style={{
          backgroundColor: STATUS_COLORS[contact.status] || '#9ca3af',
          color: 'white', padding: '0.15rem 0.6rem', borderRadius: 999,
          fontSize: '0.75rem', textTransform: 'capitalize',
        }}>
          {contact.status}
        </span>
      </div>
      {contact.company && <p style={{ margin: '0.35rem 0 0', color: '#4b5563' }}>{contact.company}</p>}
      {contact.email && <p style={{ margin: '0.2rem 0 0' }}>{contact.email}</p>}
      {contact.phone && <p style={{ margin: '0.2rem 0 0' }}>{contact.phone}</p>}
      {contact.notes && (<p style={{ margin: '0.5rem 0 0', fontStyle: 'italic', color: '#6b7280' }}>{contact.notes}</p>)}
       <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
        <button type="button" onClick={() => onEdit(contact)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(contact)} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}