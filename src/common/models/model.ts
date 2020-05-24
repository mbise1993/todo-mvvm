import { observable } from 'mobx';

export abstract class Model<TData> {
  @observable data: TData;

  constructor(data: TData) {
    this.data = data;
  }
}
