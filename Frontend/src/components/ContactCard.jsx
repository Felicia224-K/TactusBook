import { useState } from 'react';



const STATUS_COLORS = {
  lead: '#fa507b',
  prospect: '#3b82f6',
  client: '#968ccf',
  inactif: '#FFF4F4',
};




export default function ContactCard({ contact, onEdit, onDelete, isDeleting }) {
const [isEditHovered, setIsEditHovered ] = useState(false);
const [isDeleteHovered, setIsDeleteHovered ] = useState(false);

  return (
    <div style={{
            border: '1px solid #182e5a', 
            borderRadius: 8, 
            padding: '1rem', 
            marginBottom: '0.75rem'
        }}>
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
        <button
            type="button" 
            onClick={() => onEdit(contact)}
            onMouseEnter={() => setIsEditHovered(true)}
            onMouseLeave={() => setIsEditHovered(false)}
            style= {{
                backgroundColor: isEditHovered? '#04aa6d' : '#6ecba9',
                boxShadow: isEditHovered ? '1px 1px 5px rgba(0,0,0,0.3)' : '2px 2px 10px rgba(0,0,0,0.2)',
                transform: isEditHovered ? 'scale(1.05)' : 'scale(1)',
                border: 'none',
                borderRadius: '10px',
                height: '25px',
                width: '150px'
            }}
            >
          Edit
        </button>

        <button 
            type="button" 
            onClick={() => 
            onDelete(contact)} 
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            style={{
                backgroundColor: isDeleteHovered? '#ff0000' : '#f1d4d4',
                boxShadow: isDeleteHovered ? '1px 1px 5px rgba(0,0,0,0.3)' : '2px 2px 10px rgba(0,0,0,0.2)',
                transform: isDeleteHovered ? 'scale(1.05)' : 'scale(1)',
                marginLeft: '28rem',
                border: 'none',
                borderRadius: '10px',
                height: '25px',
                width: '80px',
            }}
            
            disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}