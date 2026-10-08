import { useState, useEffect } from 'react';
import type { CategoryItem } from '@/types/category';
import { DEFAULT_INSIGHTS_CATEGORIES } from '../config/default-categories';

export function useHeaderCategories(initialCategories: CategoryItem[] = []) {
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    if (initialCategories && initialCategories.length > 0) return initialCategories;
    return DEFAULT_INSIGHTS_CATEGORIES;
  });

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
      return;
    }

    fetch('/api/categories')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          setCategories(resData.data);
        }
      })
      .catch(() => {
        // Fallback already in state
      });
  }, [initialCategories]);

  return categories;
}
