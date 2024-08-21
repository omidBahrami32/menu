"use client";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Type } from "./Interfaces";

const CollapsibleMenu = ({ data }: { data: Type[] }) => {
  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="mb-4 rounded-[2rem] border-b border-none bg-secondary px-2 py-4"
        >
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton className="group flex w-full items-center justify-between px-3 hover:underline">
                  <h3 className="font-medium">{item.title}</h3>
                  <span className="transition-all duration-200 group-data-[open]:rotate-180">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </span>
                </DisclosureButton>
                <AnimatePresence>
                  {open && (
                    <DisclosurePanel static>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4"
                      >
                        {item.categories.map((category) => (
                          <Link
                            href={`/menu?categoryId=${category.id}&typeId=${item.id}`}
                            key={category.id}
                            className="mx-auto flex aspect-square h-28 flex-col items-center justify-center gap-2 rounded-[1.2rem] bg-primary-forground p-2"
                          >
                            <Image
                              alt={category.title}
                              src={category.icon}
                              width={50}
                              height={50}
                              className="h-12 w-16 bg-transparent brightness-0 invert saturate-100 sepia-0"
                            />
                            <div className="mt-2 flex w-full max-w-full items-center justify-center">
                              <p className="line-clamp-2 text-xs font-medium">
                                {category.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    </DisclosurePanel>
                  )}
                </AnimatePresence>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </>
  );
};

export default CollapsibleMenu;
