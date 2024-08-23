"use client";
import { cartState } from "@/atoms/states";
import { toFarsiNumber } from "@/utils/tools";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { CartItem } from "./Interfaces";

const CartModal = () => {
  const router = useRouter();
  const [carts, setCarts] = useRecoilState(cartState);

  const findPrice = (cart: CartItem): number => {
    let price: number;
    // if item has option
    if (cart.option) {
      price = cart.selected!.price + cart.price;
    }
    // if item has choice
    else if (cart.selected && !cart.option) {
      price = cart.selected!.price;
    }
    // if item doesn't have option or choice
    else {
      price = cart.price;
    }
    return cart.count * price;
  };
  // calculate total price with tax
  const calculateTotal = () => {
    const arr = carts.map((cart) => findPrice(cart));
    const total = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const tax = (total * 9) / 100;
    const totalWithTax = total + tax;
    return [total, tax, totalWithTax];
  };
  const [total, tax, totalWithTax] = calculateTotal();
  // handle count increase and decrease
  const handleChange = (increase: boolean, id: string) => {
    const cartIndex = carts.findIndex((cart) => cart.id == id);
    const temp = increase ? 1 : -1;
    const count = carts[cartIndex].count + temp;
    // delete cart
    if (count == 0) {
      setCarts((prev) =>
        [...prev.filter((cart) => cart.id !== id)].sort(
          (a, b) => a.item_id - b.item_id,
        ),
      );
    }
    // update cart count
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
            option: prev[cartIndex].option,
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
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: easeOut }}
      >
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-primary/20 backdrop-blur-sm">
          <div className="fixed z-50 flex h-full w-full flex-col justify-start gap-4 rounded-b-lg bg-transparent p-6 shadow-lg sm:max-w-lg sm:rounded-lg">
            <div className="mt-0 flex h-[calc(100%-3.5rem)] w-full flex-col gap-4 overflow-y-scroll rounded-3xl border-2 border-secondary/40 bg-white/70 p-4 lg:mt-4 lg:h-[calc(100%-1.5rem)]">
              <div className="sticky top-0 w-full text-center">
                یادداشت سفارش من
              </div>
              {/* cart items */}
              <div className="no-scrollbar flex h-3/4 flex-col gap-2 overflow-y-scroll pt-8">
                {carts.length == 0 ? (
                  <p className="text-center text-sm">
                    هیچ آیتمی در یادداشت سفارش شما وجود ندارد.
                  </p>
                ) : (
                  carts.map((cart) => (
                    <div
                      key={cart.id}
                      className={`relative flex cursor-pointer ${cart.selected && "mb-10"} gap-2 rounded-xl border-2 border-secondary/50 bg-white p-2`}
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          alt={cart.title}
                          src={cart.image}
                          width={64}
                          height={64}
                          className="max-h-[4rem] min-h-[4rem] max-w-[4rem] rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex grow flex-col justify-between">
                        <div>
                          <p className="line-clamp-1">{cart.title}</p>
                        </div>
                        <div className="flex justify-between">
                          <div className="min-h-6">
                            <div className="flex items-center gap-2">
                              <p className="font-bold">
                                {toFarsiNumber(findPrice(cart))}
                              </p>

                              <div className="flex flex-col items-center text-xs font-light leading-3">
                                {cart.price * cart.count < 1000 ? (
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
                          <div className="flex min-w-[5rem] flex-row items-center justify-around gap-1 rounded-full border border-primary-forground bg-primary-forground/30">
                            {/* minus button */}
                            <button
                              className="btn btn-circle btn-xs bg-white text-primary-forground"
                              onClick={() => handleChange(false, cart.id)}
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
                            {/* count */}
                            <div className="flex h-full w-8 items-center justify-center rounded-xl bg-white text-primary-forground">
                              {toFarsiNumber(cart.count)}
                            </div>
                            {/* plus button */}
                            <button
                              className="btn btn-circle btn-xs bg-white text-primary-forground"
                              onClick={() => handleChange(true, cart.id)}
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
                      </div>
                      {cart.selected && (
                        <div className="absolute top-[80%] right-0 -z-10 w-full bg-secondary rounded-xl px-2 pb-[4%] pt-6">
                          <p className="line-clamp-1 text-sm font-bold text-white ">
                            {cart.selected.title}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              {/* total */}
              <div className="sticky bottom-0 z-50 flex w-full flex-col justify-center gap-4 rounded-xl bg-secondary px-4 py-6 lg:px-24">
                <div className="w-full">
                  <div className="flex flex-row justify-between text-white/80">
                    <p className="text-sm">جمع:</p>
                    <div className="flex gap-2 text-sm">
                      <p className="font-medium">{toFarsiNumber(total)}</p>
                      {total < 1000 ? <p>هزار تومان</p> : <p>میلیون تومان</p>}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between text-white/80">
                    <p className="text-sm">مالیات:</p>
                    <div className="flex gap-2 text-sm">
                      <p className="font-medium">{toFarsiNumber(tax)}</p>
                      {tax < 1000 ? <p>هزار تومان</p> : <p>میلیون تومان</p>}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between text-white">
                    <p className="mt-2 text-center">مبلغ کل: </p>
                    <div className="mt-2 flex gap-2 text-center">
                      <p>{toFarsiNumber(totalWithTax)}</p>
                      {totalWithTax < 1000 ? (
                        <p>هزار تومان</p>
                      ) : (
                        <p>میلیون تومان</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* close icon */}
          <button
            className="fixed bottom-6 left-10 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-primary/20 bg-secondary/80 text-white"
            onClick={router.back}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;
