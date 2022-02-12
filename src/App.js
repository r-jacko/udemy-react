import React from "react";

import StoreProvider from "./store/StoreProvider";

import "./App.scss";

const App = () => {
  return (
    <StoreProvider>
      <p>Siema mordeczki</p>
    </StoreProvider>
  );
};

export default App;
