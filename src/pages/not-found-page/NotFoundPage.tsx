import { Helmet } from 'react-helmet-async';

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div
        className={'h-full flex items-center justify-center flex-col min-h-[320px] w-full bg-light-Bg dark:bg-dark-Bg'}
      >
        <div className={'font-bold text-[3.375rem]'}>
          4
          <span role="img" aria-label="Crying Face" className={'text-[3.123rem]'}>
            😢
          </span>
          4
        </div>
        <p className={'text-[1rem] mx-0 mt-[0.625rem] mb-[1.5rem]'}>Page not found.</p>
      </div>
    </>
  );
}
export default NotFoundPage;
