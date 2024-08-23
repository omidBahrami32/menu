import { axiosInstance } from "@/services/api";
import BrandBox from "../components/menu/BrandBox";
import CartIcon from "../components/menu/CartIcon";
import CartModal from "../components/menu/CartModal";
import CategorySwiper from "../components/menu/CategorySwiper";
import { CategoryWithItems, Type } from "../components/Interfaces";
import Menu from "../components/menu/Menu";

interface Props {
  searchParams: {
    typeId: number;
    categoryId: number;
    cart: boolean;
    // used to open select modal
    productSId: number;
    productId: number;
    removePId: number;
  };
}

const MenuPage = async ({
  searchParams: { typeId, categoryId, cart, productId, productSId, removePId },
}: Props) => {
  const resCategory = await axiosInstance<Type>(`/api/type/${typeId}`);
  const categoryData = resCategory.data;

  const resMenu = await axiosInstance<CategoryWithItems[]>(
    `/api/category/${typeId}`,
  );
  const menuData = resMenu.data;

  return (
    <div
      className={`${cart || productSId || productId || removePId ? "fixed" : "relative"} w-full px-4`}
    >
      {/* brand */}
      <BrandBox />
      {/* category swiper */}
      <CategorySwiper data={categoryData} category_id={categoryId} />
      {/* menu */}
      <Menu
        data={menuData}
        productId={productId}
        productSId={productSId}
        removePId={removePId}
      />
      {/* cart */}
      <CartIcon />
      {cart && <CartModal />}
    </div>
  );
};

export default MenuPage;
