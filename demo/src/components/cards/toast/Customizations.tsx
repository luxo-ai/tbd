import type { RothkoKind } from '@rothko-ui/ui';
import { Checkbox } from '@rothko-ui/ui';
import { Flex, MaxWidth, RadioGroup, Toggle } from '@rothko-ui/ui';
import AccordionOrBox from '../../AccordionOrBox';
import { kindOptions } from '../../rothkoOptions';

type CutomizationState = {
  kind: RothkoKind;
  withKind: boolean;
  withLife: boolean;
};

type CustomizationAction =
  | { type: 'SET_KIND'; kind: RothkoKind }
  | { type: 'TOGGLE_WITH_LIFE' }
  | { type: 'CHECK_WITH_KIND' };

export const customizationsReducer = (state: CutomizationState, action: CustomizationAction) => {
  switch (action.type) {
    case 'SET_KIND':
      return { ...state, kind: action.kind };
    case 'TOGGLE_WITH_LIFE':
      return { ...state, withLife: !state.withLife };
    case 'CHECK_WITH_KIND':
      return { ...state, withKind: !state.withKind };
    default:
      return state;
  }
};

type ToastCustomizationsProps = {
  dispatch: React.Dispatch<CustomizationAction>;
  state: CutomizationState;
};

const ToastCustomizations = ({ state, dispatch }: ToastCustomizationsProps) => {
  const { kind, withLife, withKind } = state;
  return (
    <AccordionOrBox boxTitleVariant="h3" title="Customizations">
      <Flex
        padding="0.2rem"
        marginBottom="0.3rem"
        flexWrap="wrap"
        columnGap="10rem"
        rowGap="1.75rem"
      >
        <MaxWidth maxW="15rem">
          <Checkbox onChange={() => dispatch({ type: 'CHECK_WITH_KIND' })} checked={withKind}>
            with kind
          </Checkbox>
          <RadioGroup
            disabled={!withKind}
            kind="secondary"
            maxCol={2}
            columnGap="1.5rem"
            label="kind"
            value={kind}
            onChange={v => dispatch({ type: 'SET_KIND', kind: v })}
            options={kindOptions}
            style={{ marginTop: '1.5rem' }}
          />
        </MaxWidth>
        <MaxWidth maxW="10rem">
          <Toggle
            kind="secondary"
            onChange={() => dispatch({ type: 'TOGGLE_WITH_LIFE' })}
            toggled={withLife}
          >
            withLife
          </Toggle>
        </MaxWidth>
      </Flex>
    </AccordionOrBox>
  );
};

export default ToastCustomizations;