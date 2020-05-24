import React from 'react';

import { Type } from '../utils';
import { useContainer } from '../components';
import { ViewModel } from '../viewModels';

const isShallowEqual = (a: any, b: any) => {
  if (a === b) return true;
  if (!(a instanceof Object) || !(b instanceof Object)) return false;

  const keys = Object.keys(a);
  const length = keys.length;

  for (let i = 0; i < length; i++) {
    if (!(keys[i] in b)) {
      return false;
    }
  }

  for (let i = 0; i < length; i++) {
    if (a[keys[i]] !== b[keys[i]]) {
      return false;
    }
  }

  return length === Object.keys(b).length;
};

export const useViewModel = <T extends ViewModel<any>>(type: Type<T>, props: T['props']): T => {
  const container = useContainer();
  const previousProps = React.useRef<T['props']>();

  if (!previousProps.current || !isShallowEqual(previousProps.current, props)) {
    previousProps.current = props;
  }

  return React.useMemo(() => {
    const vm = container.get(type);
    vm.props = props;
    return vm;
  }, [previousProps.current]);
};
