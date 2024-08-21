import { CartItem } from "@/app/components/Interfaces";
import { atom } from "recoil";

export const cartState = atom<CartItem[]>({
  key: "cart",
  default: [],
});
