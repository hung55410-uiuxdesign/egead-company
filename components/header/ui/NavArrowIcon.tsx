import React from 'react';

interface NavArrowIconProps {
  className?: string;
  size?: number;
}

export default function NavArrowIcon({ className = 'fill-current text-gray-700', size = 15 }: NavArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
        fill="currentColor"
      />
    </svg>
  );
}
