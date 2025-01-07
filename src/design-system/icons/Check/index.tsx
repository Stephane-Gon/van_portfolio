const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || '10'}
      height={props.width || '8'}
      viewBox='0 0 10 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.86323 0.174805L10 1.20364L4.09118 7.67449C3.9456 7.83391 3.73922 7.9248 3.52279 7.9248C3.30637 7.9248 3.09999 7.83391 2.95441 7.67449L0 4.43906L1.13677 3.41023L3.52279 6.02321L8.86323 0.174805Z'
        fill={props.fill || '#a3e7fc'}
      />
    </svg>
  );
};

export default SVGComponent;
