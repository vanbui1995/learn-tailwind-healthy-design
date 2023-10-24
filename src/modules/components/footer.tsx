import React, { HTMLAttributes } from 'react';

const footerItemClass = 'font-light text-[11px]';

export const Footer = () => {
  return (
    <div className="bg-purple300 h-[128px] max-md:h-[auto] text-white flex justify-center max-md:justify-start max-md:p-[12px] max-md:px-[8px]]">
      <div className="flex max-md:flex-col items-center max-md:items-start justify-between gap-[45px] max-md:gap-[12px] max-w-[960px]">
        <span className={footerItemClass}>DRAMA</span>
        <span className={footerItemClass}>HORROR</span>
        <span className={footerItemClass}>ACTION</span>
        <span className={footerItemClass}>CRIME</span>
        <span className={footerItemClass}>ROMANCE</span>
        <span className={footerItemClass}>COMEDIES</span>
      </div>
    </div>
  );
};
