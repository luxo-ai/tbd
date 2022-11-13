import React from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';

type GridProps = Omit<CSSProperties, 'display'> & {
  children: React.ReactNode;
  className?: string;
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, ...style }, ref) => {
    return (
      <StyledGrid ref={ref} className={className} style={style}>
        {children}
      </StyledGrid>
    );
  }
);

Grid.displayName = 'Grid';

const StyledGrid = styled.div`
  display: grid;
`;

export default Grid;