import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// react lazy 코드 스플리팅
const AppContent = React.lazy(() => import('./components/layouts/app/AppContent'));

const App = () => {
  return (
      <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="*" element={<AppContent />} />
            </Routes>
          </Suspense>
      </BrowserRouter>
  );
};
export default App;
