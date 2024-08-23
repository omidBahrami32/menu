import { UUID } from "crypto";

interface Category {
  id: number;
  title: string;
  icon: string;
}
export interface Image {
  id: number;
  image_url: string;
}
export interface Option {
  id: number;
  title: string;
  price: number;
}
interface Choice {
  id: number;
  title: string;
  price: number;
}
export interface Type {
  id: number;
  title: string;
  categories: Category[];
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  category: number;
  type_id: number;
  count: number;
  images: Image[];
  video: string | null;
  option_text: string | null;
  choice_text: string | null;
  options: Option[];
  choices: Choice[];
}
export interface CategoryWithItems {
  id: number;
  title: string;
  icon: string;
  items: Item[];
}

export interface CartItem {
  id: string;
  item_id: number;
  title: string;
  price: number;
  count: number;
  image: string;
  selected: Option | null;
  option: boolean
}
