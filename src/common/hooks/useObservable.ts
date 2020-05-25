import React from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(observable: Observable<T>, defaultValue: T): T => {
  const [currentValue, setCurrentValue] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    const subscription = observable.subscribe(value => setCurrentValue(value));
    return () => subscription.unsubscribe();
  }, [observable]);

  return currentValue!;
};
