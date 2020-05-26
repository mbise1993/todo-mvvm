import { Container, ContainerModule, injectable } from 'inversify';

@injectable()
export class ModuleService {
  constructor(private readonly container: Container) {}

  load(module: ContainerModule) {
    this.container.load(module);
  }
}
