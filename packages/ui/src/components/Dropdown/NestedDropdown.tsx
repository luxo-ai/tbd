import keyboardKey from 'keyboard-key';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import { ChevronRightOutline } from '@rothko-ui/icons';
import { classes, isNil, map, mapReverse } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import { DefaultRenderOption } from '../../library/RenderOption';
import type { NestedOption, RenderOption, Value } from '../../library/types';
import BackButton from '../../library/BackButton';
import Typography from '../Typography/Typography';
import type { DropdownInnerProps, StackOption } from './types';
import useNestedDropdown from './useNestedDropdown';
import ItemText from '../../library/ItemText';
import LabelText from '../../library/LabelText';
import DropdownContainer from '../../library/dropdown/DropdownContainer';
import ControlButton from '../../library/dropdown/ControlButton';
import DropdownMenu from '../../library/dropdown/DropdownMenu';
import useFieldIds from '../../library/hooks/useFieldIds';
import { Direction } from '../../library/hooks/types';

type NestedDropdownProps<V extends Value> = Pick<
  DropdownInnerProps<V, undefined>,
  | 'id'
  | 'placeholder'
  | 'bordered'
  | 'menuPosition'
  | 'label'
  | 'style'
  | 'noResultsMessage'
  | 'onOpen'
  | 'error'
  | 'onFocus'
  | 'onBlur'
  | 'clearable'
  | 'className'
  | 'disabled'
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-labelledby'
  | 'aria-disabled'
  | 'aria-required'
  | 'aria-invalid'
  | 'aria-errormessage'
  | 'errorText'
  | 'onClear'
  | 'onClose'
> & {
  /** Current value of dropdown or value array if multiple */
  value?: V | null;
  /** dropdown options */
  options: NestedOption<V>[];
  /** event handler for value change */
  onChange: (v: V | null) => void;
  /** custom method for rendering option */
  renderOption?: RenderOption<V, { hasMore: boolean }>;
};

function NestedDropdown<V extends Value>({
  id,
  className,
  clearable,
  disabled,
  error,
  errorText = 'Invalid',
  label,
  menuPosition = 'bottom',
  bordered = true,
  onBlur,
  onChange,
  onFocus,
  onOpen,
  onClear,
  onClose,
  options: optionsRaw,
  placeholder = 'Select',
  renderOption: RenderOpt = DefaultRenderOption,
  value,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-disabled': ariaDisabled,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-errormessage': ariaErrorMessage,
}: NestedDropdownProps<V>) {
  const openReverse = menuPosition === 'top';
  const debug = useDebuggerContext('<NestedDropdown />');

  const { elementId: dropdownMenuId, labelId, errorMessageId } = useFieldIds();

  const {
    options,
    canGoToPrevCategory,
    optIdx,
    title,
    selectOne,
    goToPrevCategory,
    moveOptionIdx,
    containerRef,
    menuRef,
    focus,
    open,
    openMenu,
    closeMenu,
    scrollIntoView,
    onBlurHandler,
    onFocusHandler,
    clearValue,
    pathToCurrentOption,
  } = useNestedDropdown({
    options: optionsRaw,
    onChange,
    onFocus,
    onBlur,
    onOpen,
    disabled,
    onClose,
    onClear,
    value,
  });

  const hasOptions = Boolean(options.length);
  const hasValue = !isNil(value);
  const canClear = clearable && hasValue && !disabled;
  const mapper = openReverse ? mapReverse : map;

  const toggleMenu = () => {
    debug('toggleMenu');
    return open ? closeMenu() : openMenu();
  };

  const onSelectHandler = (option: StackOption<V>) => {
    selectOne(option);
    if (!option.data.hasMore) {
      closeMenu();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    debug('onKeydown');
    const code = keyboardKey.getCode(e);
    if (!code) return;

    if (code === keyboardKey.Spacebar) {
      e.preventDefault();
      if (!open) openMenu();
      return;
    }

    // these events only happen when the menu is open
    if (!open) {
      return;
    }

    if (code === keyboardKey.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectHandler(option);
    }
    if (code === keyboardKey.Escape) {
      e.preventDefault();
      return closeMenu();
    }

    if (code === keyboardKey.ArrowUp) {
      e.preventDefault();
      moveOptionIdx(openReverse ? Direction.INCR : Direction.DECR);
    }

    if (code === keyboardKey.ArrowDown) {
      e.preventDefault();
      moveOptionIdx(openReverse ? Direction.DECR : Direction.INCR);
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    if (optIdx < 0 && openReverse) {
      scrollIntoView(`#${dropdownMenuId}-opt-0`);
      return;
    }
    if (optIdx >= 0) {
      scrollIntoView(`#${dropdownMenuId}-opt-${optIdx}`);
      return;
    }
  }, [optIdx, openReverse, open, scrollIntoView, options.length, dropdownMenuId]);

  const containerClasses = classes({
    error,
    disabled,
    focus,
    minimal: !bordered,
    empty: !hasOptions,
  });

  return (
    <div className={className}>
      {label && <LabelText id={labelId}>{label}</LabelText>}
      <DropdownContainer
        id={id}
        aria-invalid={ariaInvalid || error}
        aria-required={ariaRequired}
        aria-disabled={ariaDisabled}
        aria-errormessage={
          !ariaErrorMessage && error && errorText ? errorMessageId : ariaErrorMessage
        }
        aria-controls={open ? dropdownMenuId : undefined}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-expanded={open}
        ref={containerRef}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onClick={() => openMenu()}
        onKeyDown={onKeyDown}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        className={containerClasses}
        tabIndex={0}
      >
        {isNil(value) && <ItemText $placeHolder>{placeholder}</ItemText>}
        {!isNil(value) && <ItemText>{pathToCurrentOption.map(o => o.label).join(' / ')}</ItemText>}
        {!canClear ? (
          <ControlButton
            open={open}
            rotateOnOpen
            disabled={disabled}
            onClick={toggleMenu}
            type="indicator"
          />
        ) : (
          <ControlButton disabled={disabled} onClick={() => clearValue()} type="clear" />
        )}
        {open && (
          <DropdownMenu id={dropdownMenuId} ref={menuRef} reverse={openReverse}>
            {/* Maaybe use flexbox */}
            {!openReverse && canGoToPrevCategory && (
              <ButtonContainerDiv>
                <BackButton
                  onClick={() => {
                    goToPrevCategory();
                    containerRef.current?.focus();
                  }}
                />
              </ButtonContainerDiv>
            )}
            {!openReverse && title && <TitleText>{title}</TitleText>}
            <ul
              aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
              role="listbox"
              tabIndex={-1}
            >
              {mapper(options, (option, idx) => {
                const optionDisabled = option.disabled || disabled;
                const selected = optIdx === idx;
                return (
                  <li
                    aria-disabled={optionDisabled}
                    aria-label={option.label}
                    aria-selected={selected}
                    className={classes('option', {
                      selected,
                      disabled: optionDisabled,
                    })}
                    id={`${dropdownMenuId}-opt-${idx}`}
                    key={option.id}
                    role="option"
                    tabIndex={-1}
                    onClick={e => {
                      if (optionDisabled) return;
                      e.preventDefault();
                      onSelectHandler(option);
                      containerRef.current?.blur();
                    }}
                  >
                    <NestedOptionContainerDiv>
                      <RenderOpt option={option} />
                      {option.data.hasMore && <ChevronRightOutline width="1rem" height="1rem" />}
                    </NestedOptionContainerDiv>
                  </li>
                );
              })}
            </ul>
            {openReverse && title && <TitleText $reverse>{title}</TitleText>}
            {openReverse && canGoToPrevCategory && (
              <ButtonContainerDiv $reverse>
                <BackButton
                  onClick={() => {
                    goToPrevCategory();
                    containerRef.current?.focus();
                  }}
                />
              </ButtonContainerDiv>
            )}
          </DropdownMenu>
        )}
      </DropdownContainer>
      {error && errorText && <Typography.body id={errorMessageId}>{errorText}</Typography.body>}
    </div>
  );
}

const menuItemHPadding = css`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ButtonContainerDiv = styled.div<{ $reverse?: boolean }>`
  padding-left: 0.5rem;
  cursor: default;
  ${({ $reverse }) => {
    return $reverse
      ? css`
          padding-bottom: 0.5rem;
          padding-top: 0.125rem;
        `
      : css`
          padding-top: 0.5rem;
          padding-bottom: 0.125rem;
        `;
  }}
`;

const TitleText = styled(Typography.label)<{ $reverse?: boolean }>`
  ${menuItemHPadding};
  opacity: 0.75;
  cursor: default;
  ${({ $reverse }) => {
    return $reverse
      ? css`
          padding-bottom: 0.5rem;
          padding-top: 0.5rem;
        `
      : css`
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        `;
  }}
`;

const NestedOptionContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default NestedDropdown;
