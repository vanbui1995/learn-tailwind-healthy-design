import { Suspense, useEffect } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { useScrollbarContext } from '@/modules/scrollbar';
import { ToastContainer } from 'react-toastify';
import { ROUTE_PATH } from '@/enums';
import ProtectedRoutesLayout from '../modules/common/layout/layout';
import MyRecordPage from '@/pages/my-record/my-record';
import ColumnPage from '@/pages/column/column';
import MyPage from '@/pages/my-page/my-page';
import ScrollToTopButton from '@/modules/components/scroll-to-top-btn';
import { AuthGuard } from '@/modules/common/firebase/authGuard';

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
              <Route path={ROUTE_PATH.MY_PAGE} element={<ProtectedRoutesLayout />}>
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
