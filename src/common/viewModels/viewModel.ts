export abstract class ViewModel<TProps = unknown> {
  private _isInitialized = false;
  private _props!: TProps;

  get props() {
    return this._props;
  }

  set props(props: TProps) {
    const previousProps = this._props;
    this._props = props;

    if (!this._isInitialized) {
      this.onInit();
      this._isInitialized = true;
    } else {
      this.onPropsChanged(previousProps);
    }
  }

  onUnmount() {}

  protected onInit() {}

  protected onPropsChanged(previousProps: TProps) {}
}
