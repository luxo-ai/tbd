import * as React from 'react';
import type { SVGProps, Ref } from 'react';
import { forwardRef } from 'react';
const SvgBackspace = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M20.14 4h-9.77a3 3 0 0 0-2 .78l-.1.11-6 7.48a1 1 0 0 0 .11 1.37l6 5.48a3 3 0 0 0 2 .78h9.77A1.84 1.84 0 0 0 22 18.18V5.82A1.84 1.84 0 0 0 20.14 4zm-3.43 9.29a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0L14 13.41l-1.29 1.3a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l1.3-1.29-1.3-1.29a1 1 0 0 1 1.42-1.42l1.29 1.3 1.29-1.3a1 1 0 0 1 1.42 1.42L15.41 12z"
        data-name="backspace"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgBackspace);
export default ForwardRef;
