import Image from "next/image";
import React from "react";

const BrandBox = () => {
  return (
    <div className="mx-auto mb-2 flex h-16 w-full flex-col items-center justify-center pt-2 max-sm:w-3/4 max-sm:px-8 sm:w-7/12 md:w-8/12 md:px-36 lg:w-8/12">
      <div className="flex w-full cursor-pointer flex-row items-center justify-between overflow-hidden rounded-full border-2 border-secondary-foreground/80 bg-secondary text-secondary-foreground backdrop-blur-xl ltr:pr-4 rtl:pl-4">
        <div className="relative m-1 flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <Image
            alt="brand icon"
            src="/images/icons/brand.webp"
            width={50}
            height={50}
            className="h-full w-full"
          />
        </div>
        <div className="m-1 flex w-full flex-col gap-2 overflow-hidden p-1 text-center">
          <span className="inline-block text-sm font-bold uppercase text-white">
            Your brand
          </span>
          <span className="inline-block text-xs text-white">
            Not The Way You KNeW
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandBox;
