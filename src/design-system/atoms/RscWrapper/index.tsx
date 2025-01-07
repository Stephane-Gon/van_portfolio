'use client';

import React from 'react';

interface RscWrapperProps {
  children?: React.ReactNode;
}

const RscWrapper = ({ children }: RscWrapperProps) => {
  return <>{children}</>;
};

export default RscWrapper;
