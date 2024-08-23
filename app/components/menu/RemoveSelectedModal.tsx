"use client";
import { cartState } from "@/atoms/states";
import { toFarsiNumber } from "@/utils/tools";
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

const RemoveSelectedModal = ({ id }: { id: number }) => {
  const router = useRouter();
  const [carts, setCarts] = useRecoilState(cartState);
  const cartItems = carts.filter((cart) => cart.item_id == id);

  const handleChange = (increase: boolean, id: string) => {
    const cartIndex = carts.findIndex((cart) => cart.id == id);
    const temp = increase ? 1 : -1;
    const count = carts[cartIndex].count + temp;
    //   the count is zero so remove the cart item
    if (count == 0) {
      setCarts((prev) =>
        [...prev.filter((cart) => cart.id !== id)].sort(
          (a, b) => a.item_id - b.item_id,
        ),
      );
    }
    //   update count of cart item
    else {
      setCarts((prev) =>
        [
          ...prev.filter((cart) => cart.id !== id),

          {
            id: prev[cartIndex].id,
            item_id: prev[cartIndex].item_id,
            title: prev[cartIndex].title,
            price: prev[cartIndex].price,
            image: prev[cartIndex].image,
            selected: prev[cartIndex].selected,
            count: prev[cartIndex].count + temp,
            option:prev[cartIndex].option
          },
        ].sort((a, b) => a.item_id - b.item_id),
      );
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: easeInOut }}
        className="fixed inset-0 z-[60] flex h-screen w-full bg-white/20 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: easeInOut }}
          className="fixed bottom-0 z-[60] max-h-screen w-full gap-4 overflow-y-scroll rounded-t-2xl bg-secondary/90 p-6 text-secondary-foreground shadow-lg"
        >
          <div className="flex flex-col space-y-2 text-center sm:text-left">
            <button onClick={router.back}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="white"
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
            <div className="divider"></div>
            <div className="mb-8 mt-4 flex flex-col gap-6">
              {cartItems.length == 0 && (
                <div className="text-center text-white">
                  <p>هیچ انتخابی برای حذف یا اضافه وجود ندارد.</p>
                </div>
              )}
              {cartItems.map((cart) => (
                <div key={cart.id}>
                  <div className="flex flex-row items-center justify-between gap-4 text-white">
                    <div className="flex flex-row items-center gap-1">
                      {/* buttons */}
                      <div className="flex flex-row items-center">
                        <div className="flex flex-row items-center justify-around gap-1 rounded-xl border border-primary-forground ltr:flex-row-reverse">
                          <button
                            onClick={() => handleChange(false, cart.id)}
                            className="btn btn-circle btn-xs bg-white text-primary-forground"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-5 w-5 p-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 12h-15"
                              ></path>
                            </svg>
                          </button>
                          <div className="text-primary-foreground flex h-full w-8 items-center justify-center rounded-xl bg-white text-black">
                            {cart.count}
                          </div>
                          <button
                            onClick={() => handleChange(true, cart.id)}
                            className="text-primary-foreground bg-whtie btn btn-circle btn-xs"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-5 w-5 p-1"
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
                      <div className="w-24 text-center">
                        <p>{cart.selected!.title} </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* just for choices */}
                      <p>{toFarsiNumber(cart.selected!.price)}</p>
                      <div className="flex flex-col items-center text-xs font-light leading-3">
                        {cart.selected!.price < 1000 ? (
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
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RemoveSelectedModal;
