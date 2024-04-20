import { Set as ImSet } from 'immutable';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { asNonNilArray, isNil } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import type { FocusHandler, Option, Value } from '../../library/types';
import useOptions from '../../library/hooks/useOptions';
import useScrollIntoView from '../../library/hooks/useScrollIntoView';

type HookArgs<V, T> = {
  disabled?: boolean;
  multiple?: boolean;
  onChange: (v: V | V[] | null) => void;
  onClear?: () => void;
  onDelete?: (v: V) => void;
  onFocus?: FocusHandler;
  onBlur?: FocusHandler;
  onOpen?: () => void;
  onClose?: () => void;
  options: Option<V, T>[];
  value?: V | V[] | null;
};

const useSelect = <V extends Value, T = undefined>({
  multiple,
  onChange,
  onDelete,
  onBlur,
  onFocus,
  onOpen,
  onClose,
  onClear,
  value,
  disabled,
  options: opts,
}: HookArgs<V, T>) => {
  const debug = useDebuggerContext('useSelect');

  const timeoutId = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollIntoView, scrollElRef: menuRef } = useScrollIntoView();

  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const { optIdx, moveOptionIdx, options, resetOptionIdx, setOptions } = useOptions(opts);

  // important to useMemo here because otherwise the useEffect below will go into
  // an infinite loop...
  const selectedValues = useMemo(() => ImSet(asNonNilArray(value)), [value]);

  const closeMenu = () => {
    if (!open) return;
    debug('closeMenu');
    setOpen(false);
    setFocus(false);
    onClose?.();
    containerRef.current?.blur();
    menuRef.current?.blur();
  };

  const openMenu = () => {
    if (open || disabled) return;
    debug('openMenu');
    if (isNil(value)) {
      // i think this will be problematic if the options are not the same as the original options
      // also maybe the useOptions should be responsible for this? Also wait
      // useOptions should be reseting this on setOptions....No?
      // maybe we want to maintain it then. Like set the option index for a value.
      // setOptionIndexFor(value)...
      resetOptionIdx();
    }
    onOpen?.();
    setOpen(true);
  };

  const clearValue = useCallback(() => {
    if (disabled) return;
    debug('clearValue');
    onChange(null);
    onClear?.();
  }, [onChange, onClear, disabled, debug]);

  const onFocusHandler = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      debug('focus');
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      onFocus?.(e);
      setFocus(true);
    },
    [onFocus, setFocus, timeoutId, debug]
  );

  const onBlurHandler = useCallback(
    // close on blur
    (e: React.FocusEvent<HTMLElement>) => {
      const { currentTarget } = e;
      // Check the newly focused element in the next tick of the event loop
      timeoutId.current = setTimeout(() => {
        // Check if the new activeElement is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          debug('onBlur');
          onBlur?.(e);
          onClose?.();
          setFocus(false);
          setOpen(false);
        }
      }, 0);
    },
    [onBlur, setFocus, setOpen, onClose, timeoutId, debug]
  );

  const selectOne = useCallback(
    (selectedOpt: Option<V, T>) => {
      if (disabled) return;
      debug('selectOne');
      const selectedId: V = selectedOpt.id;
      onChange(multiple ? [...selectedValues, selectedId] : selectedId);
    },
    [selectedValues, multiple, disabled, onChange, debug]
  );

  const deleteOne = useCallback(
    (toDelete: V) => {
      if (disabled) return;
      debug('deleteOne');
      onChange(multiple ? [...selectedValues].filter(v => v !== toDelete) : null);
      onDelete?.(toDelete);
    },
    [onChange, onDelete, multiple, selectedValues, disabled, debug]
  );

  const optionLookup = useMemo(
    () => opts.reduce((acc, o) => ({ ...acc, [o.id]: o }), {} as Record<V, Option<V, T>>),
    [opts]
  );

  useEffect(() => {
    if (!multiple) return;
    setOptions(
      opts.filter(o => !selectedValues.has(o.id)),
      { resetIdx: false }
    );
  }, [selectedValues, multiple, setOptions, opts]);

  return {
    deleteOne,
    moveOptionIdx,
    optIdx,
    optionLookup,
    options,
    selectOne,
    containerRef,
    menuRef,
    open,
    focus,
    onBlurHandler,
    onFocusHandler,
    closeMenu,
    openMenu,
    scrollIntoView,
    clearValue,
  };
};

export default useSelect;
