import React from 'react';
import { Container } from 'inversify';

const ContainerContext = React.createContext<Container | null>(null);

export interface ContainerProviderProps {
  container: Container;
}

export const ContainerProvider: React.FC<ContainerProviderProps> = ({ container, children }) => {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};

export const useContainer = () => {
  const container = React.useContext(ContainerContext);
  if (!container) {
    throw new Error(`${useContainer.name} must be called from within a ${ContainerProvider.name}`);
  }

  return container;
};
