import React from "react";
import { CategoryWithItems, Item } from "../Interfaces";
import MenuItem from "./MenuItem";
import { axiosInstance } from "@/services/api";
import SelectModal from "./SelectModal";
import RemoveSelectedModal from "./RemoveSelectedModal";
import ProductModal from "./ProductModal";

interface Props {
  data: CategoryWithItems[];
  productId: number;
  productSId: number;
  removePId: number;
}

const Menu = async ({ data, productId, productSId, removePId }: Props) => {
  // api call to get single item
  let item: Item;
  const id = productId ? productId : productSId;
  if (id) {
    const res = await axiosInstance<Item>(`/api/item/${id}`);
    item = res.data;
  }

  return (
    <div className="my-6 h-full w-full">
      {data.map((category) => (
        <section id={String(category.id)} key={category.id} className="w-full">
          {/* category title */}
          <div className="my-4 flex items-center justify-center px-2 text-center">
            <div className="h-px grow bg-secondary opacity-15"></div>
            <div className="mx-4 text-center font-bold text-brown/100">
              {category.title}
            </div>
            <div className="h-px grow bg-secondary-foreground opacity-15"></div>
          </div>
          <div className="grid grid-cols-1 gap-x-3 gap-y-6 lg:grid-cols-3">
            {category.items.map((item) => (
              <MenuItem key={item.id} data={item} />
            ))}
          </div>
        </section>
      ))}
      {/* product modal */}
      {productId && <ProductModal data={ item!} />}
      {/* option and choice modal */}
      {productSId && <SelectModal data={item!} />}
      {/* remove option or choice modal */}
      {removePId && <RemoveSelectedModal id={removePId} />}
    </div>
  );
};

export default Menu;
