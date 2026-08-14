import { useState, useCallback } from 'react';

export const useSearch = (items, searchKey = 'name') => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');

  const filteredItems = useCallback(() => {
    if (!searchQuery.trim()) return items;

    return items.filter((item) => {
      const value = item[searchType] || '';
      return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [items, searchQuery, searchType]);

  const handleSearch = (query, type) => {
    setSearchQuery(query);
    if (type) setSearchType(type);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    searchType,
    filteredItems: filteredItems(),
    handleSearch,
    clearSearch,
    setSearchType,
  };
};
