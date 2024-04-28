import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 10000,
    },
  },
});

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// react lazy 코드 스플리팅
const AppContent = React.lazy(() => import('./components/layouts/app/AppContent'));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="*" element={<AppContent />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
          </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default App;
