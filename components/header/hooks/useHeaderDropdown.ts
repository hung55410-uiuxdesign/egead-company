import { useState, useRef, useEffect } from 'react';

export function useHeaderDropdown(closeDelay = 220) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearDropdownTimeout = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (id: string) => {
    clearDropdownTimeout();
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    clearDropdownTimeout();
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, closeDelay);
  };

  const closeDropdownImmediately = () => {
    clearDropdownTimeout();
    setActiveDropdown(null);
  };

  useEffect(() => {
    return () => {
      clearDropdownTimeout();
    };
  }, []);

  return {
    activeDropdown,
    handleMouseEnter,
    handleMouseLeave,
    closeDropdownImmediately,
    clearDropdownTimeout,
  };
}
