import React from 'react';
import { Subject } from 'rxjs';

export const useBind = <T>(subject: Subject<T>): [T, (value: T) => void] => {
  const [currentValue, setCurrentValue] = React.useState<T>();

  React.useEffect(() => {
    const subscription = subject.subscribe(value => setCurrentValue(value));
    return () => subscription.unsubscribe();
  }, [subject]);

  const setValue = (value: T) => {
    subject.next(value);
  };

  return [currentValue!, setValue];
};
