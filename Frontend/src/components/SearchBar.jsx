const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'lead', label: 'Lead' },
  { value: 'prospect', label: 'Prospect' },
  { value: 'client', label: 'Client' },
  { value: 'inactif', label: 'Inactif' },
];

export default function SearchBar({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Search by name or company..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: 1, minWidth: 220, padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 6 }}
      />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 6 }}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}