import React from 'react';
import { Observable, Subject } from 'rxjs';

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

export const useBindReadonly = <T>(observable: Observable<T>): T => {
  const [currentValue, setCurrentValue] = React.useState<T>();

  React.useEffect(() => {
    const subscription = observable.subscribe(value => setCurrentValue(value));
    return () => subscription.unsubscribe();
  }, [observable]);

  return currentValue!;
};
