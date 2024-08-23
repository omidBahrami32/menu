"use client";
import { cartState } from "@/atoms/states";
import { toFarsiNumber } from "@/utils/tools";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { Item } from "./Interfaces";

const MenuItem = ({ data }: { data: Item }) => {
  const router = useRouter();
  // get current url
  const searchParams = useSearchParams().toString();

  const [carts, setCarts] = useRecoilState(cartState);
  // calculating the count
  const cartArray = carts.filter((cart) => cart.item_id == data.id);
  let count = 0;
  if (cartArray.length > 1) {
    const arr = cartArray.map((cart) => cart.count);
    count = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
  } else if (cartArray.length == 1) {
    count = cartArray[0].count;
  }

  // a function to increase or decrease count
  const handleChange = (increase: boolean) => {
    // the item doesn't have a choice or option
    const cartIndex = carts.findIndex((cart) => cart.id == cartArray[0].id);
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
  return (
    <div
      key={data.id}
      id={`item-${data.id}`}
      className={`relative flex max-h-[10rem] grow flex-row overflow-visible ${data.choice_text || data.option_text ? "rounded-b-none" : "rounded-b-xl"} rounded-t-xl bg-foreground px-2 after:rounded-b-xl ${count > 0 && "bg-foreground/10 bg-gradient-to-l from-secondary via-secondary/30 to-secondary/10"} ${(data.choice_text || data.option_text) && "mb-8 rounded-b-none"}`}
    >
      {/* not available */}
      {data.count == 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="z-20 h-16 w-32 rotate-45 items-center justify-center border-4 border-double border-black shadow-2xl drop-shadow-lg">
            <div className="mt-5 items-center px-7 drop-shadow-lg">تمام شد</div>
          </div>
        </div>
      )}
      {/* badge */}
      {count > 0 && (
        <div className="absolute -right-2 -top-2 z-10">
          <div className="flex flex-col gap-1">
            <span className="badge h-8 w-8 bg-secondary">
              <button
                className="btn btn-circle btn-outline btn-sm text-white"
                onClick={() => handleChange(true)}
              >
                {toFarsiNumber(count)}
              </button>
            </span>
            <span className="badge h-8 w-8 bg-secondary">
              <button
                className="btn btn-circle btn-outline btn-sm text-white"
                onClick={() => handleChange(false)}
              >
                {count > 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    color="white"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    ></path>
                  </svg>
                )}
              </button>
            </span>
          </div>
        </div>
      )}
      {/* content */}
      <Link
        href={`/menu?${searchParams}&productId=${data.id}`}
        className={`flex h-full w-full items-center ${data.count == 0 && "pointer-events-none opacity-50"}`}
      >
        {data.images.length > 0 && (
          <div className="flex w-full max-w-[8rem] items-center">
            <Image
              alt={data.title}
              src={data.images[0].image_url}
              width={112}
              height={128}
              className="h-[8rem] min-w-[7rem] max-w-[7rem] rounded-b-xl rounded-t-xl object-cover opacity-100 transition-opacity duration-300"
            />
          </div>
        )}

        <div className="flex h-full max-h-36 flex-col content-around justify-between gap-1 overflow-hidden rounded-b-xl p-2 text-black">
          <div>
            <p className="line-clamp-3 break-words text-base font-bold">
              {data.title}
            </p>
          </div>
          <div className="max-h-[4.75rem] overflow-hidden bg-gradient-to-t from-transparent via-black to-black bg-clip-text text-xs leading-5 text-transparent">
            <p>{data.description}</p>
          </div>
          {data.price > 0 && (
            <div className="min-h-6">
              <div className="flex items-center gap-2">
                <p className="font-bold">{toFarsiNumber(data.price)}</p>

                <div className="flex flex-col items-center text-xs font-light leading-3">
                  {data.price < 1000 ? (
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
          )}
        </div>
      </Link>

      {/* choices & options */}
      {data.choice_text && (
        <Link
          href={`/menu?${searchParams}&productSId=${data.id}`}
          className="absolute -bottom-[40px] right-0 w-full"
        >
          <div className="rounded-b-xl bg-primary/40 px-3 py-2">
            <div className="cursor-pointer text-base font-medium">
              امکان انتخاب:{" "}
              <span className="text-secondary">«{data.choice_text}»</span>
            </div>
          </div>
        </Link>
      )}
      {data.option_text && (
        <Link
          href={`/menu?${searchParams}&productSId=${data.id}`}
          className="absolute -bottom-[40px] right-0 w-full"
        >
          <div className="rounded-b-xl bg-primary/40 px-3 py-2">
            <div className="cursor-pointer text-base font-medium">
              انتخاب اختیاری:{" "}
              <span className="text-secondary">«{data.option_text}»</span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
