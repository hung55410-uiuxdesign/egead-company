'use client';

import React from 'react';
import { useNewsletter } from '../hooks/useNewsletter';
import { useT } from '@/components/providers/LocaleProvider';
import type { FooterNewsletterData } from '@/lib/services/footer-config.service';

interface NewsletterFormProps {
  newsletter?: FooterNewsletterData;
}

export default function NewsletterForm({ newsletter }: NewsletterFormProps) {
  const t = useT();
  const { email, setEmail, handleSubscribe } = useNewsletter();

  const title = newsletter?.title || t.footer.newsletter;
  const placeholder = newsletter?.placeholder || 'name@youremail.com';
  const privacyPolicyHref =
    newsletter?.privacyPolicyHref || 'https://policies.google.com/privacy?hl=en';
  const termsHref =
    newsletter?.termsHref || 'https://policies.google.com/terms?hl=en';

  return (
    <div className="lg:col-span-4">
      <span className="text-xs font-bold text-black block mb-5">
        {title}
      </span>

      <form onSubmit={handleSubscribe} className="relative">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-300 rounded-full px-5 py-3.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#10E774] pr-14 transition shadow-sm"
        />
        <button
          type="submit"
          aria-label={t.footer.subscribe}
          className="absolute right-1.5 top-1.5 bottom-1.5 w-10 h-10 rounded-full bg-[#10E774] hover:bg-[#0ecb66] text-black flex items-center justify-center transition cursor-pointer"
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.79487 2.43379e-07L5.65756 1.0575L10.1584 5.25L0.342041 5.25L0.342041 6.75L10.1584 6.75L5.65756 10.9425L6.79487 12L13.2477 6L6.79487 2.43379e-07Z"
              fill="white"
            />
          </svg>
        </button>
      </form>

      <p className="text-sm text-gray-800 mt-4 leading-relaxed">
        {newsletter?.disclaimerText ? (
          <span>{newsletter.disclaimerText}</span>
        ) : (
          <>
            {t.footer.recaptchaPrefix}{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={privacyPolicyHref}
              className="underline hover:text-black"
            >
              {t.footer.privacyPolicy}
            </a>{' '}
            {t.footer.and}{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={termsHref}
              className="underline hover:text-black"
            >
              {t.footer.terms}
            </a>
            {t.footer.recaptchaSuffix}
          </>
        )}
      </p>
    </div>
  );
}
