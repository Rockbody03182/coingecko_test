import React from 'react';

// 가상자산 시세 목록(KRW/USD) 페이지
const virtual = React.lazy(() => import('../components/pages/virtual/assetlist'));

// 북마크 목록 페이지
const bookmark = React.lazy(() => import('../components/pages/bookmark/list'));

// 코인 디테일 페이지
const detail = React.lazy(() => import('../components/pages/coin/detail'));

const routes = [
  { path: '/virtual', name: 'Virtual', element: virtual }, // 가상자산 시세 목록(KRW/USD) 페이지
  { path: '/bookmark', name: 'Bookmark', element: bookmark }, // 북마크 목록 페이지
  { path: '/detail', name: 'Detail', element: detail }, // 코인 디테일 페이지
];

export default routes;