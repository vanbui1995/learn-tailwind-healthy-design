import React, { HTMLAttributes } from 'react';

const footerItemClass = 'font-light text-[11px]';

const Footer = () => {
  return (
    <div className="bg-dark600 h-[128px] max-md:h-[auto] text-white flex justify-center max-md:justify-start max-md:p-[12px] max-md:px-[8px]]">
      <div className="flex max-md:flex-col items-center max-md:items-start justify-between gap-[45px] max-md:gap-[12px] max-w-[960px]">
        <span className={footerItemClass}>会員登録</span>
        <span className={footerItemClass}>運営会社</span>
        <span className={footerItemClass}>利用規約</span>
        <span className={footerItemClass}>個人情報の取扱について</span>
        <span className={footerItemClass}>特定商取引法に基づく表記</span>
        <span className={footerItemClass}>お問い合わせ</span>
      </div>
    </div>
  );
};

export default Footer;
