export abstract class ViewModel<TProps = unknown> {
  private _props!: TProps;

  get props() {
    return this._props;
  }

  set props(props: TProps) {
    this._props = props;
    this.onDidReceiveProps();
  }

  onDidUnmount() {}

  protected onDidReceiveProps() {}
}
