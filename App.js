import React from 'react';
import { Router } from './src/routes';
import { Provider } from "mobx-react";
import mainStore from "./src/stores/mainStore";
import optionsStore from "./src/stores/optionsStore";

const stores = {
  mainStore,
  optionsStore,
  AppStore : mainStore.AppStore,
};

const App = () => {
  return (
    <Provider {...stores}>
      <Router/>
    </Provider>
  );
};

export default App;
