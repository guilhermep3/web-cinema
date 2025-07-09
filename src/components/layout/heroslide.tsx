"use client"
import { MovieType } from "@/types/MovieType";
import { useSlideMovies } from "@/utils/api";
import { starStyle } from "@/utils/styles";
import { ArrowLeft, ArrowRight, Calendar, ChartNoAxesCombined, Info, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { formateDate } from "@/utils/formatDate";

export const HeroSlide = () => {

  const [movies, setMovies] = useState<MovieType[]>();
  const { data } = useSlideMovies();
  const [newMargin, setNewMargin] = useState(0);
  let [currentSlide, setCurrentSlide] = useState(0);
  let totalSlides = 5;
  const router = useRouter();

  useEffect(() => {
    setMovies(data?.results.slice(0, 5))
  }, [data])

  function handleNavReadMore(movie: MovieType) {
    router.push(`/readmore/${movie.id}`)
  }

  function handlePrevSlide() {
    setCurrentSlide((prev) => {
      const newSlide = prev <= 0 ? totalSlides - 1 : prev - 1;
      updateMargin(newSlide)
      return newSlide;
    })
  }
  function handleNextSlide() {
    setCurrentSlide((prev) => {
      const newSlide = prev >= totalSlides - 1 ? 0 : prev + 1;
      updateMargin(newSlide)
      return newSlide;
    })
  }
  function updateMargin(newSlide: number) {
    setNewMargin(newSlide * window.innerWidth);
  }
  function handlesetSlide(index: number) {
    setCurrentSlide(index);
    updateMargin(index);
  }

  useEffect(() => {
    document.querySelectorAll('.hero-slide').forEach((heroSlide) => {
      heroSlide.classList.add('hero-slide-animation')
    })
  })

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide()
      document.querySelectorAll('.hero-slide').forEach((heroSlide) => {
        heroSlide.classList.add('hero-slide-animation')
      })
    }, 7000);

    return () => clearInterval(interval);
  }, [currentSlide]);


  return (
    <div className="relative flex w-full h-full md:h-screen overflow-hidden">
      <div className="flex-1 z-30 relative flex h-auto md:h-full transition-all duration-300"
        style={{ marginLeft: `-${newMargin}px` }}
      >
        {movies?.map((movie) => (
          <div
            className="relative bg-center bg-cover bg-no-repeat flex flex-col justify-center w-screen h-screen object-cover"
            key={movie.id}
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black/75 to-black/25 z-10"></div>
            <div className="flex flex-col gap-6 p-4 md:p-20 z-30 max-w-3/5">
              <div className="flex gap-4">
                {['Ação', 'Aventura'].map((g: string) => (
                  <React.Fragment key={g}>
                    <span className="text-[var(--main-color)]">|</span>
                    <p>{g}</p>
                  </React.Fragment>
                ))}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">{movie.title}</h1>
              <p>{movie.overview}</p>
              <div className="flex items-center gap-3 md:gap-6">
                <div className="flex items-center gap-1">
                  <Star className={starStyle} />
                  <p className="text-yellow-200 font-bold text-lg">{movie.vote_average.toString().slice(0, 3)}</p>
                </div>
                <div className="flex gap-1 md:gap-2">
                  <Calendar className="fill-blue-950 stroke-blue-300" />
                  <p>{formateDate(movie.release_date)}</p>
                </div>
                <div className="flex gap-1 md:gap-2" title="Popularidade">
                  <ChartNoAxesCombined className="stroke-green-500" />
                  <p>{movie.popularity.toString().slice(0, 3)}</p>
                </div>
                <div onClick={() => handleNavReadMore(movie)} className="w-6 cursor-pointer">
                  <Info className="fill-white stroke-black w-full h-full" />
                </div>
              </div>
              <Button label="Ver mais" onClick={`/readmore/${movie.id}`} />
            </div>
          </div>

        ))}
      </div>
      <div className="absolute bottom-12 right-12 z-40 flex justify-center items-center">
        <button
          className="text-2xl p-2 border-none mx-1 bg-none text-white transition duration-300 cursor-pointer"
          onClick={handlePrevSlide}
        >
          <ArrowLeft />
        </button>
        {Array.from({ length: totalSlides }).map((i, index) => (
          <span key={index}
            className={`${index === currentSlide ? 'text-4xl font-bold text-[var(--main-color)]' : 'text-xl'} mx-1 transition-all duration-300`}
            onClick={() => handlesetSlide(index)}
          >
            {index + 1}
          </span>
        ))}
        <button
          className="text-2xl p-2 border-none mx-1 bg-none text-white transition duration-300 cursor-pointer"
          onClick={handleNextSlide}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}