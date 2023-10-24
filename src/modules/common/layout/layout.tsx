import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/modules/components';

export const Layout = () => {
  return (
    <div className="max-w-[1280px] mx-auto my-0 relative w-full">
      <Header />
      <Suspense fallback={<div />}>
        <div className="w-full mx-auto my-0 min-h-[calc(100vh-192px)]">
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
};
