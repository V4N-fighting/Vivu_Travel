import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { publicRoutes } from './routes';
import HeaderOnly from './layouts/HeaderOnly';
import AdminLayout from './layouts/AdminLayout';
import AdminApp from './pages/Admin/AdminApp';
import config from './config';

const layout = 'default';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path={`${config.routes.admin}/*`}
            element={
              (() => {
                const raw = localStorage.getItem('user');
                if (!raw) return <Navigate to={config.routes.login} replace />;
                
                try {
                  const user = JSON.parse(raw);
                  const role = (user?.role || '').toLowerCase();
                  if (role === 'admin') {
                    return (
                      <AdminLayout>
                        <AdminApp />
                      </AdminLayout>
                    );
                  }
                } catch (e) {
                  console.error('Auth error:', e);
                }
                
                return <Navigate to={config.routes.login} replace />;
              })()
            }
          />
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  (() => {
                    const raw = localStorage.getItem('user');
                    if (raw) {
                      try {
                        const user = JSON.parse(raw);
                        if (user?.role === 'admin') {
                          return <Navigate to={config.routes.admin_dashboard} replace />;
                        }
                      } catch (e) {}
                    }
                    return layout === route.layout ? <DefaultLayout><Page /></DefaultLayout> : <HeaderOnly><Page /></HeaderOnly>;
                  })()
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
