import * as React from 'react';
import type { SVGProps, Ref } from 'react';
import { forwardRef } from 'react';
const SvgMenu = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="menu">
        <rect x={3} y={11} width={18} height={2} rx={0.95} ry={0.95} />
        <rect x={3} y={16} width={18} height={2} rx={0.95} ry={0.95} />
        <rect x={3} y={6} width={18} height={2} rx={0.95} ry={0.95} />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgMenu);
export default ForwardRef;
