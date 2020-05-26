import { Container, injectable } from 'inversify';

import { Type } from '../utils';

export interface IScope {
  onAttach(container: Container): void;
  onDetach(container: Container): void;
}

@injectable()
export class ScopeService {
  constructor(private readonly container: Container) {}

  attach(scopeType: Type<IScope>) {
    const scope = this.container.get<IScope>(scopeType);
    scope.onAttach(this.container);
  }

  detach(scope: IScope) {
    scope.onDetach(this.container);
  }
}
