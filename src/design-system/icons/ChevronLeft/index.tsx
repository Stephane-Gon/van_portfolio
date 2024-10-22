/**
 * Chevronleft component
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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.71 7.41L11.12 12L15.71 16.59L14.29 18L8.28996 12L14.29 6L15.71 7.41Z'
        fill={props.fill || '#1A1A18'}
        className={props.className}
      />
    </svg>
  );
};

export default SVGComponent;
