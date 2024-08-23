import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import React from "react";

const LanguageSelector = () => {
  return (
    <div className="flex grow flex-row items-center justify-center rounded-[2rem] bg-secondary backdrop-blur-xl">
      <Menu>
        <MenuButton className="flex items-center justify-center gap-3 font-medium text-white">
          <Image
            alt="فارسی"
            src="/images/icons/iran-flag.svg"
            width={30}
            height={30}
          />
          فارسی (IR)
        </MenuButton>
        <MenuItems
          className="right-0 z-50 mr-6 mt-2 flex origin-top-right scale-100 transform items-center justify-center rounded-[2rem] bg-secondary text-white opacity-100"
          anchor="bottom"
        >
          <MenuItem>
            <div className="mb-2 flex cursor-pointer items-center gap-2 rounded-full bg-white/20 px-4 py-2 font-medium">
              <Image
                alt="english"
                src="/images/icons/united-states-flag.svg"
                width={30}
                height={30}
              />
              English (US)
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
