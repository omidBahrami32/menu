"use client";
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import React from "react";
import { Item } from "./Interfaces";
import AlbumSlider from "./AlbumSlider";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { cartState } from "@/atoms/states";
import { toFarsiNumber } from "@/utils/tools";
import { v4 as uuidv4 } from "uuid";

const ProductModal = ({ data }: { data: Item }) => {
  const router = useRouter();
  const searchParams = useSearchParams().toString();

  const [carts, setCarts] = useRecoilState(cartState);
  const cartItems = carts.filter((cart) => cart.item_id == data.id);
  // calculating the count
  let count = 0;
  if (cartItems.length > 1) {
    const arr = cartItems.map((cart) => cart.count);
    count = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
  } else if (cartItems.length == 1) {
    count = cartItems[0].count;
  }

  // a function to increase or decrease count
  const handleChange = (increase: boolean) => {
    const cartIndex = carts.findIndex((cart) => cart.id == cartItems[0].id);

    // the item doesn't have a choice or option
    if (!carts[cartIndex].selected) {
      const temp = increase ? 1 : -1;
      setCarts((prev) => [
        ...prev.filter((cart) => cart.item_id !== data.id),
        {
          id: prev[cartIndex].id,
          item_id: prev[cartIndex].item_id,
          title: prev[cartIndex].title,
          price: prev[cartIndex].price,
          image: prev[cartIndex].image,
          selected: prev[cartIndex].selected,
          count: prev[cartIndex].count + temp,
          option: prev[cartIndex].option,
        },
      ]);
    }
    // item has a choice or option
    else if (increase) {
      router.push(`/menu?${searchParams}&productSId=${data.id}`);
    } else {
      router.push(`/menu?${searchParams}&removePId=${data.id}`);
    }
  };

  // just for create
  const addToCart = () => {
    // the item has option or choice
    if (data.choice_text || data.option_text) {
      router.push(`/menu?${searchParams}&productSId=${data.id}`);
    } else {
      setCarts((prev) =>
        [
          ...prev,
          {
            id: uuidv4(),
            item_id: data.id,
            title: data.title,
            price: data.price,
            image: data.images[0].image_url,
            selected: null,
            count: 1,
            option: false,
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
        transition={{ duration: 0.2, ease: easeInOut }}
        className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-[60] flex h-screen w-full flex-col bg-white/30 backdrop-blur-sm"
      >
        <div className="z-50 flex h-screen w-full justify-start">
          <button
            onClick={router.back}
            className="btn btn-circle btn-ghost -right-2 z-50 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-10 w-10 p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="max-h-[60vh] w-full">
          <AlbumSlider images={data.images} video={data.video} />
        </div>
        <div className="z-10 mx-2 flex h-full min-h-[100vh] flex-col gap-2 overflow-y-scroll rounded-t-xl border border-primary-forground/10 bg-white px-4 pb-32 pt-2">
          <div className="mt-6">
            <p className="text-lg">{data.title}</p>
          </div>
          <div className="divider"></div>
          <div className="text-sm">{data.description}</div>
        </div>
        {data.price > 0 && (
          <div className="fixed bottom-8 z-[60] flex w-full items-start justify-center gap-2">
            <div className="flex items-start justify-center bg-white text-primary-forground">
              {count == 0 && (
                <button
                  onClick={addToCart}
                  className="!text-primary-foreground btn btn-outline btn-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-7 w-7 ltr:pr-1 rtl:pl-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    ></path>
                  </svg>
                  <p className="mt-1">یادداشت سفارش</p>
                </button>
              )}
              {count > 0 && (
                <div className="flex flex-row items-center justify-around gap-2 rounded-xl">
                  <button
                    onClick={() => handleChange(false)}
                    className="btn btn-circle btn-sm bg-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      color="white"
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
                    {toFarsiNumber(count)}
                  </div>
                  <button
                    onClick={() => handleChange(true)}
                    className="btn btn-circle btn-sm bg-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      color="white"
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
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
