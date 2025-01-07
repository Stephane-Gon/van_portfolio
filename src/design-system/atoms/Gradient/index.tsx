import React from 'react';

interface GradientProps {
  extraClasses?: string;
  children: React.ReactNode;
  styles?: React.CSSProperties;
}

const Gradient = ({ extraClasses, children, styles }: GradientProps) => {
  return (
    <div style={styles} className={`bg-gradient-to-r from-secondary via-tertiary to-primary ${extraClasses}`}>
      {children}
    </div>
  );
};

export default Gradient;
