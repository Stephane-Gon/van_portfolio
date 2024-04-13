const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      cursor={props.cursor || 'default'}
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '24'}
      height={props.height || '24'}
      viewBox='0 0 24 24'
      fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.41 8L12 12.59L16.59 8L18 9.42L12 15.42L6 9.42L7.41 8Z'
        fill={props.fill || '#a3e7fc'}
      />
    </svg>
  );
};

export default SVGComponent;
