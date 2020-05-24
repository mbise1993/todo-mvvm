import React from 'react';

import { Type } from '../utils/types';
import { useContainer } from '../components/ContainerProvider';

export const useInject = <T>(type: Type<T>) => {
  const container = useContainer();
  const instanceRef = React.useRef(container.get(type));

  return instanceRef.current;
};
