import { observable, computed, action } from 'mobx';

export abstract class StatefulService<TState extends {}> {
  @observable private _state?: TState;

  @computed
  get state() {
    if (!this._state) {
      throw new Error('State has not been set');
    }

    return this._state;
  }

  set state(state: TState) {
    this._state = state;
  }
}
