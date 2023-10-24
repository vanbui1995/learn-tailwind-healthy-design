import { Suspense, useEffect } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { useScrollbarContext } from '@/modules/scrollbar';
import { ToastContainer } from 'react-toastify';
import { ROUTE_PATH } from '@/enums';
import { Layout } from '../modules/common';
import { MyPage } from '@/pages/my-page';
import { ScrollToTopButton } from '@/modules/components';
import { AuthGuard } from '@/modules/common';

import 'react-toastify/dist/ReactToastify.css';

export const ScrollToTop = (props: { children: JSX.Element }) => {
  const { scrollToTop } = useScrollbarContext();

  useEffect(() => {
    scrollToTop(0);
  }, [scrollToTop]);

  return props.children;
};

const Routes = () => {
  return (
    <ScrollToTop>
      <>
        <ToastContainer />
        <ScrollToTopButton />
        <AuthGuard fallback={<div />}>
          <Suspense fallback={<div />}>
            <ReactRouterRoutes>
              <Route path={ROUTE_PATH.MY_PAGE} element={<Layout />}>
                <Route index element={<MyPage />} />
              </Route>
            </ReactRouterRoutes>
          </Suspense>
        </AuthGuard>
      </>
    </ScrollToTop>
  );
};

export default Routes;
