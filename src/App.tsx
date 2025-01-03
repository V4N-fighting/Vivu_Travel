import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { publicRoutes } from './routes';
import HeaderOnly from './layouts/HeaderOnly';

const layout = 'default';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  layout === route.layout ? <DefaultLayout><Page /></DefaultLayout> : <HeaderOnly><Page /></HeaderOnly>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
