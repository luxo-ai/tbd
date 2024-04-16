import type { RothkoKind } from '../../theme';

export type TypographyProps = {
  bold?: boolean;
  italic?: boolean;
  kind?: RothkoKind;
  light?: boolean;
  underline?: boolean;
};

export type LinkProps = TypographyProps & {
  underline?: boolean;
};