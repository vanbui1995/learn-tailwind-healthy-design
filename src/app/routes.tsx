import { Suspense, useEffect } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { useScrollbarContext } from '@/scrollbarContext/useScrollBar';
import { ROUTE_PATH } from '@/enums';
import ProtectedRoutesLayout from '../modules/common/layout/layout';
import MyRecordPage from '@/pages/my-record/my-record';
import ColumnPage from '@/pages/column/column';
import MyPage from '@/pages/my-page/my-page';
import ScrollToTopButton from '@/modules/components/scroll-to-top-btn';

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
        <ScrollToTopButton />
        <Suspense fallback={<div />}>
          <ReactRouterRoutes>
            <Route path={ROUTE_PATH.MY_PAGE} element={<ProtectedRoutesLayout />}>
              <Route index element={<MyPage />} />
              <Route path={ROUTE_PATH.MY_RECORD} element={<MyRecordPage />} />
              <Route path={ROUTE_PATH.COLUMN} element={<ColumnPage />} />
            </Route>
          </ReactRouterRoutes>
        </Suspense>
      </>
    </ScrollToTop>
  );
};

export default Routes;
