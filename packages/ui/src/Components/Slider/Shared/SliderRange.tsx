import styled from 'styled-components';
import type { KindProps } from '../../../Theme/types';

const SliderRangeDiv = styled.div<KindProps>`
  position: absolute;
  height: 0.25rem;
  margin: 0;
  border-radius: 2px;
  background: ${({ kind }) =>
    kind
      ? `var(--rothko-${kind}-500, --rothko-slider-range-background, #3e4e94)`
      : `var(--rothko-slider-range-background, #3e4e94)`};
  overflow: hidden;
  user-select: none;
  z-index: 2;
`;

export default SliderRangeDiv;
