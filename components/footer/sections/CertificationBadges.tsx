import React from 'react';
import type { FooterCertificationData } from '@/lib/services/footer-config.service';

interface CertificationBadgesProps {
  certification?: FooterCertificationData;
}

export default function CertificationBadges({
  certification,
}: CertificationBadgesProps) {
  const badgeImage = certification?.badgeImage;
  if (!badgeImage || !badgeImage.trim()) {
    return null;
  }
  const badgeAlt = certification?.badgeAlt || 'Badges SOC';
  const badgeHref = certification?.badgeHref;

  const content = (
    <img
      src={badgeImage}
      alt={badgeAlt}
      className="h-10 w-auto object-contain"
    />
  );

  return (
    <div className="pt-6 pb-4">
      {badgeHref ? (
        <a
          href={badgeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-opacity hover:opacity-80"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
