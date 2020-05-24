import React from 'react';

import { Type } from '../utils';
import { useContainer } from '../components';
import { ViewModel } from '../viewModels';

export const useViewModel = <T extends ViewModel<any>>(type: Type<T>, props: T['props']) => {
  const container = useContainer();

  return React.useMemo(() => {
    const vm = container.resolve(type);
    vm.props = props;
    return vm;
  }, []);
};
