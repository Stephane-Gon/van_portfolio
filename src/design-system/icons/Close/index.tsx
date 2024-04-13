/**
 * Close component
 *
 */

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      onClick={props.onClick}
      cursor={props.cursor || 'default'}
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '24'}
      height={props.height || '25'}
      viewBox='0 0 24 25'
      fill='none'>
      <path
        d='M19 6.91L17.59 5.5L12 11.09L6.41 5.5L5 6.91L10.59 12.5L5 18.09L6.41 19.5L12 13.91L17.59 19.5L19 18.09L13.41 12.5L19 6.91Z'
        fill={props.fill || '#212529'}
      />
    </svg>
  );
};

export default SVGComponent;
