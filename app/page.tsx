import { axiosInstance } from "@/services/api";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import CollapsibleMenu from "./components/CollapsibleMenu";
import Header from "./components/Header";
import { Type } from "./components/Interfaces";


interface Props {
  searchParams: {
    show: boolean
  }
}

export default async function Home({ searchParams: { show } }: Props) {
  // api call
  const res = await axiosInstance<Type[]>("/api/type");
  const data = res.data;
  return (
    <div className="relative">
      <Image
        src="/images/background.jpeg"
        alt="background image"
        fill={true}
        className="absolute inset-0 -z-10 bg-cover bg-center blur-sm"
      />
      <div className="flex h-screen flex-col">
        <div className="fixed left-0 top-0 z-20 w-full">
          <Header show={show} />
          <div className="mx-auto mt-8 rounded-full border border-primary bg-primary/50 px-4 py-2 text-center text-sm lg:w-1/6">
            <Link href="#">ورود به مینی وبسایت برند شما</Link>
          </div>
        </div>
        {/* Menu */}
        <div className="z-10 mx-2 mt-72 flex flex-col overflow-y-auto scroll-smooth rounded-3xl bg-secondary/20 px-2 text-white backdrop-blur-xl">
          <div className="flex w-full place-items-center justify-between p-2 text-xs lg:text-xl">
            <div className="flex px-1">
              <p className="px-1">گزینش میان</p>
              <p className="px-1 font-bold">دسته‌بندی‌ها</p>
            </div>
            <p className="pe-3 ps-1">یا</p>
            <Link
              href={`/menu?typeId=${data[0].id}`}
              className="text-2xs flex cursor-pointer items-center justify-evenly gap-2 rounded-full bg-white/20 py-1 pe-4 ps-5 align-middle font-bold backdrop-blur-lg lg:text-lg"
            >
              <div className="flex flex-col items-center">
                <p>شروع به</p>
                <p>گشت و گذار</p>
              </div>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          </div>
          <div className="mt-2 flex flex-col gap-3">
            <CollapsibleMenu data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
