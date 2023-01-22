import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import client from '../api/client';
import usePlantsStore from '../store/plantsStore';

export default useSearch = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { setSearchResult } = usePlantsStore();

  const searchPlants = useMutation({
    mutationKey: ['searchPlants'],
    mutationFn: async () => {
      const response = await client.post('/Plants/SearchPlant', {
        plantName: search,
      });
      console.log('res', response.data);
      return response.data;
    },
    onSuccess: data => {
      setSearchResults(data);
      setSearchResult(data);
    },
  });

  return { search, setSearch, searchResults, searchPlants };
};
