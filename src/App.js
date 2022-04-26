import React from 'react';
import { Routes, Route } from 'react-router';
import Menu from './components/pages/Menu';
import NuevoPlato from './components/pages/NuevoPlato';
import Ordenes from './components/pages/Ordenes';
import Sidebar from './components/ui/Sidebar';

import firebase, { firebaseContext } from './firebase'

function App() {
  return (
    <firebaseContext.Provider
      value={{
        firebase
      }}
    >
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route
              path='/'
              element={<Ordenes />}
            />
            <Route
              path='/menu'
              element={<Menu />}
            />
            <Route
              path='/nuevo-plato'
              element={<NuevoPlato />}
            />
          </Routes>
        </div>
      </div>
    </firebaseContext.Provider>
  );
}

export default App;
