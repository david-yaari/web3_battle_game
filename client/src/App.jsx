import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, CreateBatte, JoinBattle, Battle } from './page';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/create-battle'
        element={<CreateBatte />}
      />
      <Route
        path='/join-battle'
        element={<JoinBattle />}
      />
      <Route
        path='/battle/:battleName'
        element={<Battle />}
      />
    </Routes>
  );
};

export default App;
