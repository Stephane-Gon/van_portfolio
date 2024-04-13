const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '16'}
      height={props.height || '16'}
      viewBox='0 0 16 16'
      fill='none'>
      <g clipPath='url(#clip0_1894_4880)'>
        <path
          d='M1.3335 12.0003V8.66699H2.66683V12.0003H13.3335V8.66699H14.6668V12.0003C14.6668 12.7367 14.0699 13.3337 13.3335 13.3337H2.66683C1.93045 13.3337 1.3335 12.7367 1.3335 12.0003Z'
          fill={props.fill || '#a3e7fc'}
        />
        <path
          d='M5.60683 6.94033L7.3335 5.22033V10.667H8.66683V5.22033L10.3935 6.94033L11.3335 6.00033L8.00016 2.66699L4.66683 6.00033L5.60683 6.94033Z'
          fill={props.fill || '#a3e7fc'}
        />
      </g>
      <defs>
        <clipPath id='clip0_1894_4880'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SVGComponent;
