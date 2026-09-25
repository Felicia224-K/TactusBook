import { useState } from 'react';

const STATUS_OPTIONS = ['lead', 'prospect', 'client', 'inactif'];

const EMPTY_FORM = { name: '', email: '', phone: '', company: '', status: 'client', notes: '' };

const inputStyle = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid #dfe8f5',
  borderRadius: 6,
  boxSizing: 'border-box',
  boxShadow: '1px 1px 1px'
};

export default function ContactForm({ initialContact, onSave, onCancel }) {
  const [form, setForm] = useState(() =>
    initialContact
      ? {
          name: initialContact.name || '',
          email: initialContact.email || '',
          phone: initialContact.phone || '',
          company: initialContact.company || '',
          status: initialContact.status || 'lead',
          notes: initialContact.notes || '',
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      await onSave(form);
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      const apiError = err.response?.data?.error;

      if (apiErrors && apiErrors.length > 0) {
        setErrors(apiErrors.map((e) => e.msg));
      } else if (apiError) {
        setErrors([apiError]);
      } else {
        setErrors(['Something went wrong. Please try again.']);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ 
            border: '1px solid #0f5bcd', 
            borderRadius: 8, padding: '1rem', 
            boxShadow: '1px 1px 5px',
            marginBottom: '1.5rem',
        }}
    >
      <h2 style={{ marginTop: 0 }}>{initialContact ? 'Edit Contact' : 'Add Contact'}</h2>

      <div>
        <label htmlFor="name" >Name *</label>
        <br />
        <input id="name" type="text" value={form.name} onChange={handleChange('name')} required style={inputStyle} />
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <label htmlFor="email">Email</label>
        <br />
        <input id="email" type="email" value={form.email} onChange={handleChange('email')} style={inputStyle} />
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <label htmlFor="phone">Phone</label>
        <br />
        <input id="phone" type="text" value={form.phone} onChange={handleChange('phone')} style={inputStyle} />
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <label htmlFor="company">Company</label>
        <br />
        <input id="company" type="text" value={form.company} onChange={handleChange('company')} style={inputStyle} />
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <label htmlFor="status">Status</label>
        <br />
        <select id="status" value={form.status} onChange={handleChange('status')} style={inputStyle}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <label htmlFor="notes">Notes</label>
        <br />
        <textarea
          id="notes"
          value={form.notes}
          onChange={handleChange('notes')}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {errors.length > 0 && (
        <ul style={{ color: '#dc2626', marginTop: '0.75rem', paddingLeft: '1.2rem' }}>
          {errors.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button 
                type="submit" 
                disabled={isSubmitting} 
                style={{
                    backgroundColor: 'green',
                    border: '1px solid black',
                    borderRadius: '10px',
                    boxShadow: '1px 1px 5px'
                }}>
          {isSubmitting ? 'Saving...' : initialContact ? 'Save Changes' : 'Add Contact'}
        </button>
        <button 
                type="button" 
                onClick={onCancel}
                disabled={isSubmitting}
                style={{
                    backgroundColor: 'red',
                    height: '25px',
                    border: '1px solid black',
                    borderRadius: '10px',
                    marginLeft: '23rem',
                    boxShadow: '1px 1px 5px #a50b0b'
                }}>
          Cancel
        </button>
      </div>
    </form>
  );
}