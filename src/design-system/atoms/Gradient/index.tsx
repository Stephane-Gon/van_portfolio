import React from 'react';

interface GradientProps {
  extraClasses?: string;
  children: React.ReactNode;
}

const Gradient = ({ extraClasses, children }: GradientProps) => {
  return <div className={`bg-gradient-to-r from-secondary via-tertiary to-primary ${extraClasses}`}>{children}</div>;
};

export default Gradient;
