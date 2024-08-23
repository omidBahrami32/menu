"use client";
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import React, { useState } from "react";
import { Item, Option } from "./Interfaces";
import { useRouter } from "next/navigation";
import { toFarsiNumber } from "@/utils/tools";
import { useRecoilState } from "recoil";
import { cartState } from "@/atoms/states";
import { v4 as uuidv4 } from "uuid";

const SelectModal = ({ data }: { data: Item }) => {
  const router = useRouter();
  const [carts, setCarts] = useRecoilState(cartState);
  const [selected, setSelected] = useState<Option | null>(null);

  const currentItem = carts.find((cart) => cart.item_id == data.id);
  const choice = data.choice_text ? true : false;
  const items = choice ? data.choices : data.options;

  const addToCart = () => {
    // update existing cart
    if (selected &&currentItem?.selected?.id == selected?.id) {
      const cartIndex = carts.findIndex((cart) => cart == currentItem);
      setCarts((prev) =>
        [
          ...prev.filter((cart) => cart.item_id !== data.id),
          {
            id: prev[cartIndex].id,
            item_id: prev[cartIndex].item_id,
            title: prev[cartIndex].title,
            price: prev[cartIndex].price,
            image: prev[cartIndex].image,
            selected: prev[cartIndex].selected,
            count: prev[cartIndex].count + 1,
            option: prev[cartIndex].option,
          },
        ].sort((a, b) => a.item_id - b.item_id),
      );
    }
    else if (currentItem && !currentItem.selected) {
      const cartIndex = carts.findIndex((cart) => cart == currentItem);
      setCarts((prev) =>
        [
          ...prev.filter((cart) => cart.item_id !== data.id),
          {
            id: prev[cartIndex].id,
            item_id: prev[cartIndex].item_id,
            title: prev[cartIndex].title,
            price: prev[cartIndex].price,
            image: prev[cartIndex].image,
            selected: prev[cartIndex].selected,
            count: prev[cartIndex].count + 1,
            option: prev[cartIndex].option,
          },
        ].sort((a, b) => a.item_id - b.item_id),
      );
    }
    // create new cart
    else {
      setCarts((prev) =>
        [
          ...prev,
          {
            id: uuidv4(),
            item_id: data.id,
            title: data.title,
            price: data.price,
            image: data.images[0].image_url,
            selected: selected!,
            count: 1,
            option: !choice,
          },
        ].sort((a, b) => a.item_id - b.item_id),
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: easeInOut }}
        className="fixed inset-0 z-[60] flex h-screen w-full bg-white/90 backdrop-blur-sm"
      >
        <div className="flex h-full max-h-screen w-full flex-col gap-4 overflow-y-scroll rounded-t-xl p-6 shadow-lg">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <button onClick={router.back}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  color="black"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="18" x2="6" y1="6" y2="18"></line>
                  <line x1="6" x2="18" y1="6" y2="18"></line>
                </svg>
              </button>
              <h2 className="text-lg font-semibold text-black">{data.title}</h2>
            </div>
            <div className="divider"></div>
          </div>
          <div className="mb-8 mt-4 flex flex-col gap-8">
            <div className="text-center">
              <p>
                {choice ? data.choice_text : data.option_text} را انتخاب کنید:
              </p>
            </div>
            <div className="flex flex-col gap-6 overflow-scroll">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row justify-between rounded-xl border border-secondary bg-white px-3 py-2"
                >
                  <div className="flex flex-col">
                    <div>{item.title}</div>
                    <div className="flex items-center gap-2">
                      <p>
                        {toFarsiNumber(item.price)}
                        {!choice && "+"}
                      </p>
                      <div className="flex flex-col items-center text-xs font-light leading-3">
                        {item.price < 1000 ? (
                          <p>
                            هزار <br /> تومان
                          </p>
                        ) : (
                          <p>
                            میلیون <br /> تومان
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row items-center justify-around gap-2 rounded-xl">
                      <button
                        onClick={() => {
                          setSelected(null);
                        }}
                        className={`btn ${selected?.id != item.id && "invisible"} ${selected?.id == item.id && "!visible"} btn-circle btn-sm !bg-secondary !text-white`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="h-7 w-7 p-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          ></path>
                        </svg>
                      </button>
                      <div className="flex h-full w-20 items-center justify-center rounded-xl bg-secondary text-white">
                        {selected?.id == item.id ? 1 : 0}
                      </div>
                      <button
                        onClick={() => {
                          setSelected({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                          });
                        }}
                        className={`btn ${selected && "invisible"} btn-circle btn-sm !bg-secondary text-white`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="h-7 w-7 p-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <div className="flex items-center justify-center">
                {choice ? (
                  <button
                    onClick={() => {
                      addToCart();
                      router.back();
                    }}
                    className={`btn ${selected ? "bg-secondary text-white" : "btn-disabled"} w-40`}
                  >
                    افزودن به یادداشت
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCart();
                      router.back();
                    }}
                    className={`btn w-40 bg-secondary text-white`}
                  >
                    {selected ? "افزودن به یادداشت" : "افزودن بدون تغییر"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SelectModal;
