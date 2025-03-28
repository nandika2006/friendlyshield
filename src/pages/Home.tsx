
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeatureSection />
    </div>
  );
};

export default Home;
