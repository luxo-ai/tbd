import * as React from 'react';
import type { SVGProps, Ref } from 'react';
import { forwardRef } from 'react';
const SvgBluetooth = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="m13.63 12 4-3.79a1.14 1.14 0 0 0-.13-1.77l-4.67-3.23a1.17 1.17 0 0 0-1.21-.08 1.15 1.15 0 0 0-.62 1v6.2l-3.19-4a1 1 0 0 0-1.56 1.3L9.72 12l-3.5 4.43a1 1 0 0 0 .16 1.4A1 1 0 0 0 7 18a1 1 0 0 0 .78-.38L11 13.56v6.29A1.16 1.16 0 0 0 12.16 21a1.16 1.16 0 0 0 .67-.21l4.64-3.18a1.17 1.17 0 0 0 .49-.85 1.15 1.15 0 0 0-.34-.91zM13 5.76l2.5 1.73L13 9.85zm0 12.49v-4.07l2.47 2.38z"
        data-name="bluetooth"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgBluetooth);
export default ForwardRef;
