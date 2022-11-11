import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';

const SvgDownloadOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    role="img"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="download">
        <rect x={4} y={18} width={16} height={2} rx={1} ry={1} />
        <rect x={3} y={17} width={4} height={2} rx={1} ry={1} transform="rotate(-90 5 18)" />
        <rect x={17} y={17} width={4} height={2} rx={1} ry={1} transform="rotate(-90 19 18)" />
        <path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39 1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z" />
        <path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
      </g>
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgDownloadOutline);
export default ForwardRef;