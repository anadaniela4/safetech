import React from 'react';
import { Provider } from './Store/Provider'
import Router from './Componentes/Router/router'
import './App.css';

const App: React.FC = function() {
  return (
    <Provider>
      <Router/>
    </Provider>
  );
}

export default App;
