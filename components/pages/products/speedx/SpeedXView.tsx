import React from 'react';
import {
  SpeedXHeroSection,
  SpeedXWhySection,
  SpeedXHowSection,
  SpeedXExpectationsSection,
} from './index';

export default function SpeedXView() {
  return (
    <div
      id="main-home"
      className="speedx w-full bg-[#000000] text-white pt-24 sm:pt-28 font-montserrat"
    >
      <SpeedXHeroSection />
      <SpeedXWhySection />
      <SpeedXHowSection />
      <SpeedXExpectationsSection />
    </div>
  );
}
