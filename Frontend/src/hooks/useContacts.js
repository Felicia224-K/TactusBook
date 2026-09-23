import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export function useContacts({ search = '', status = '' } = {}) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;

      const response = await api.get('/contacts', { params });
      setContacts(response.data.contacts);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load contacts.');
    } finally {
      setIsLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return { contacts, isLoading, error, refetch: fetchContacts };
}