import { useScrollbarContext } from '@/modules/scrollbar';

const ScrollToTopButton = () => {
  const { scrollToTop } = useScrollbarContext();
  return (
    <div className="z-30 bg-white rounded-full w-[48px] h-[48px] fixed top-[70vh] right-[96px] max-lg:right-[16px]">
      <div
        role="button"
        onClick={() => {
          scrollToTop(0);
        }}
        className="w-[48px] h-[48px]  cursor-pointer"
        style={{ backgroundImage: 'url(/image/icons/component_scroll.svg)' }}
      ></div>
    </div>
  );
};

export default ScrollToTopButton;
