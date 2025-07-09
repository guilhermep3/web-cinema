"use client"
import { MovieType } from "@/types/MovieType";
import { useEffect, useState } from "react";
import { useTopRatedMovies } from "@/utils/api";
import { Movie } from "../movie";
import { movieSectionTitleStyle } from "@/utils/styles";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, EffectCube, Navigation, Scrollbar } from "swiper/modules";

export const TopRatedMoviesSwiper = () => {
  const { data } = useTopRatedMovies();
  const [movies, setMovies] = useState<MovieType[]>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768 ? true : false)
    }
    window.removeEventListener('resize', checkMobile);

    return () => {
      window.addEventListener('resize', checkMobile)
    }
  }, []);

  useEffect(() => {
    setMovies(data?.results);
  }, [data]);

  useEffect(() => {
    if (!movies) return;

  }, [movies]);

  return (
    <section id="topRated" className="container mx-auto py-10">
      <div className="flex justify-start">
        <h1 className={movieSectionTitleStyle}>Os mais bem avaliados</h1>
      </div>
      <div className="relative w-full flex justify-start mx-auto pt-4 px-1 overflow-hidden">
        <Swiper
          modules={[Navigation, Scrollbar, A11y, EffectCube]}
          slidesPerView={7}
          navigation={!isMobile ? true : false}
          spaceBetween={0}
          className='px-72 z-40'
          slidesPerGroup={2}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 7,
            },
          }}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id} className="pt-4 flex justify-center items-center">
              <Movie key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};