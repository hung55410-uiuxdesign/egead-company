import { useState } from 'react';

export function useNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return {
    email,
    setEmail,
    handleSubscribe,
  };
}
