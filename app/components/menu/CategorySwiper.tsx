"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Type } from "../Interfaces";

const CategorySwiper = ({
  data,
  category_id,
}: {
  data: Type;
  category_id: number | null;
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    swiperRef?.current?.swiper.slideTo(activeSlide);
    var scrollDiv = document.getElementById(
      `${data.categories[activeSlide].id}`,
    )?.offsetTop;
    if (scrollDiv) {
      scrollDiv -= 140;
    }
    window.scrollTo({ top: scrollDiv });
  }, [activeSlide]);

  // handle coming from search item
  useEffect(() => {
    if (category_id) {
      const index = data.categories.findIndex(
        (category) => category.id == category_id,
      );
      setActiveSlide(index);
    }
  }, [category_id]);
  // handle scrolling and changing the active category
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const sectionOffsets = Array.from(sections).map((section) => {
      return {
        id: section.id,
        offsetTop: section.offsetTop,
        clientHeight: section.clientHeight,
      };
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const currentActiveSection = sectionOffsets.find((section) => {
        const sectionTop = section.offsetTop - 222;
        const sectionBottom = sectionTop + section.clientHeight;
        return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
      });
      if (currentActiveSection?.id) {
        const index = data.categories.findIndex(
          (category) => category.id == Number(currentActiveSection?.id),
        );
        setActiveSlide(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-2 z-50 w-full rounded-3xl border-2 border-secondary bg-secondary/35 text-secondary-foreground backdrop-blur-xl transition-all">
      <div className="flex w-full flex-col divide-y divide-secondary/30">
        <div className="flex items-center justify-between p-2 text-white">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap px-2 text-base">
            {data.title}
          </p>
          <Link
            href="/"
            className="flex cursor-pointer flex-row items-center whitespace-nowrap rounded-2xl border-2 border-secondary bg-secondary/20 p-1 px-3 text-base backdrop-blur-2xl"
          >
            <p>همه منو‌ها</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="mx-auto mr-2 h-8 w-8 text-base"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              ></path>
            </svg>
          </Link>
        </div>
        {/* swiper */}
        <div className="flex h-16 w-full flex-row justify-center gap-2 overflow-y-scroll transition-all">
          <Swiper
            ref={swiperRef}
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={0}
            slideToClickedSlide={true}
            grabCursor={true}
            className="flex h-full w-full items-center justify-center"
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.activeIndex);
            }}
          >
            {data.categories.map((category) => (
              <SwiperSlide
                key={category.id}
                className="!w-[117px] lg:!w-[148.5px]"
              >
                {({ isActive }) => (
                  <button className="flex h-16 w-full items-center justify-center py-2">
                    <div
                      className={`my-0 flex aspect-square h-full ${isActive && "w-full"} scale-100 flex-row items-center justify-center gap-2 rounded-[2.5rem] ${isActive ? "bg-brown" : "bg-brown/20"} px-3 transition-transform duration-300`}
                    >
                      <div className="flex h-full items-center justify-center">
                        <Image
                          alt={category.title}
                          src={category.icon}
                          width={50}
                          height={50}
                          color="white"
                          className="h-8 w-10 object-contain opacity-100 brightness-0 invert saturate-100 sepia-0 transition-opacity duration-300"
                        />
                      </div>
                      <div className={`${!isActive && "hidden"} basis-3/5`}>
                        <p className="line-clamp-2 text-xs text-white">
                          {category.title}
                        </p>
                      </div>
                    </div>
                  </button>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CategorySwiper;
