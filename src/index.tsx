import 'mobx-react/batchingForReactDom';
import 'reflect-metadata';

// import * as mobx from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { AppView } from './app/views/App.view';
import { configureContainer } from './container.config';
import { ContainerProvider } from './common/components';

// mobx.configure({ enforceActions: 'observed' });

const container = configureContainer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ContainerProvider container={container}>
        <AppView />
      </ContainerProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
