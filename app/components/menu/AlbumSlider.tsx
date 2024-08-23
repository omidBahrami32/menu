"use client";
import React from "react";
import { Image as ImageType } from "../Interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const AlbumSlider = ({
  images,
  video,
}: {
  images: ImageType[];
  video: string | null;
}) => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      centeredSlides={true}
      centeredSlidesBounds={true}
      className="rounded-x border-primary-foreground/10 mx-16 max-h-[60vh] w-full max-w-[95vw] rounded-md border"
    >
      {video && (
        <SwiperSlide className="flex items-center justify-center">
          <video width={448} height={448} autoPlay loop className="mx-auto">
            <source src="/video/video.mp4" type="video/mp4" />
          </video>
        </SwiperSlide>
      )}
      {images.map((image) => (
        <SwiperSlide
          key={image.id}
          className="flex items-center justify-center"
        >
          <Image
            alt="product image"
            src={image.image_url}
            width={448}
            height={448}
            className="mx-auto max-h-[40vh] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AlbumSlider;
