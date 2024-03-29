import React from 'react';

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 16 16'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      stroke='currentColor'>
      <path
        stroke={props.stroke || 'currentColor'}
        d='M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z'></path>
      <path
        stroke={props.stroke || 'currentColor'}
        d='M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h2zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5V1z'></path>
    </svg>
  );
};

export default SVGComponent;
