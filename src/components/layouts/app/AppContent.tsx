import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// import { rootStore } from '@states/root.store';

// routes config
import routes from '../../../routes/route';

const AppContent = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, idx) =>
            route.element ? <Route key={idx} path={route.path} element={<route.element />} /> : null,
          )}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppContent;
