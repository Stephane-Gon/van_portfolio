const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 512 512'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path d='M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z'></path>
    </svg>
  );
};

export default SVGComponent;
