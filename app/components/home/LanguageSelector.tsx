"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";

const LanguageSelector = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={`flex grow flex-row items-center justify-center ${open ? "rounded-t-[2rem]" : "rounded-[2rem]"} rounded-t-[2rem] bg-secondary backdrop-blur-xl`}
    >
      <Menu>
        <MenuButton
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="flex items-center justify-center gap-3 font-medium text-white"
        >
          <Image
            alt="فارسی"
            src="/images/icons/iran-flag.svg"
            width={30}
            height={30}
          />
          فارسی (IR)
        </MenuButton>
        <MenuItems
          className="absolute right-4 z-50 mt-2 flex w-[92.7vw] origin-top-right scale-100 transform items-center justify-center rounded-b-[2rem] bg-secondary text-white opacity-100"
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
