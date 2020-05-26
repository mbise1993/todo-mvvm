import { Container, injectable } from 'inversify';

import { Type } from '../utils';

export interface IScope {
  onAttach(container: Container): void;
  onDetach(container: Container): void;
}

@injectable()
export class ScopeService {
  private readonly attachedScopes = new Map<Type<IScope>, IScope>();

  constructor(private readonly container: Container) {}

  attach(scopeType: Type<IScope>) {
    const scope = this.container.get<IScope>(scopeType);
    scope.onAttach(this.container);
    this.attachedScopes.set(scopeType, scope);
  }

  detach(scopeType: Type<IScope>) {
    const scope = this.attachedScopes.get(scopeType);
    if (!scope) {
      throw new Error(`Scope "${scopeType.name}" is not attached`);
    }

    scope.onDetach(this.container);
    this.attachedScopes.delete(scopeType);
  }
}
