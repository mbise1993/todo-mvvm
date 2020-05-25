import { BehaviorSubject } from 'rxjs';

export abstract class ReactiveViewModel<TProps = void> {
  $props = new BehaviorSubject<TProps>({} as TProps);

  onInit() {}

  dispose() {}
}
