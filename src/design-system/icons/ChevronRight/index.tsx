/**
 * Chevronright component
 *
 */

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '24'}
      height={props.height || '24'}
      viewBox='0 0 24 24'
      {...props}
      fill='none'>
      <path
        d='M9.00003 16.59L10.41 18L16.41 12L10.41 6L9.00004 7.41L13.58 12L9.00003 16.59Z'
        fill={props.fill || '#1A1A18'}
        className={props.className}
      />
    </svg>
  );
};

export default SVGComponent;
