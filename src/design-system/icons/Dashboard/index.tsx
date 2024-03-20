import React from 'react'

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      height="1em" 
      width="1em" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none" 
      {...props}
      stroke="currentColor" 
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path stroke={props.stroke ?? 'black'} d="M4 4h6v8h-6z"></path>
      <path stroke={props.stroke ?? 'black'} d="M4 16h6v4h-6z"></path>
      <path stroke={props.stroke ?? 'black'} d="M14 12h6v8h-6z"></path>
      <path stroke={props.stroke ?? 'black'} d="M14 4h6v4h-6z"></path>
    </svg>

  )
}

export default SVGComponent