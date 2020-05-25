import React from 'react';
import { Observable } from 'rxjs';

export const useObserve = <T>(observable: Observable<T>) => {
  const [, setCurrentValue] = React.useState<T>();

  React.useEffect(() => {
    const subscription = observable.subscribe(value => {
      setCurrentValue(value);
    });

    return () => subscription.unsubscribe();
  }, [observable]);
};
