import { BehaviorSubject } from 'rxjs';

export abstract class ReactiveViewModel<TProps = unknown> {
  $props = new BehaviorSubject<TProps | null>(null);

  onInit() {}

  dispose() {}
}
