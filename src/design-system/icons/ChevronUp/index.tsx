const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      cursor={props.cursor || 'default'}
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '18'}
      height={props.height || '18'}
      viewBox='0 0 18 18'
      fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.4425 11.5649L9 8.12244L5.5575 11.5649L4.5 10.4999L9 5.99994L13.5 10.4999L12.4425 11.5649Z'
        fill={props.fill || '#a3e7fc'}
      />
    </svg>
  );
};

export default SVGComponent;
