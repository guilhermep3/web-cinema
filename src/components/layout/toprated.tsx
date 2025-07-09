"use client"
import { MovieType } from "@/types/MovieType";
import { useEffect, useState } from "react";
import { useTopRatedMovies } from "@/utils/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Movie } from "../movie";
import { movieSectionTitleStyle } from "@/utils/styles";

export const TopRatedMovies = () => {
  const { data } = useTopRatedMovies();
  const [movies, setMovies] = useState<MovieType[]>();
  const [leftMargin, setLeftMargin] = useState(0);

  useEffect(() => {
    setMovies(data?.results);
  }, [data]);

  useEffect(() => {
    if (!movies) return;

  }, [movies]);

  const movieWidth = window.innerWidth > 768 ? 176 + 16 : 160 + 8;
  const margin = 8;
  const totalMovies = movies?.length || 20;
  const movieSize = movieWidth + margin;
  const moviesWidth = totalMovies * movieSize;

  function handleNextSlide() {
    if (movies) {
      let scrollx = leftMargin - Math.round(window.innerWidth / 2);
      const maxScroll = -(moviesWidth - window.innerWidth);

      if (scrollx <= maxScroll) {
        scrollx = 0;
      }

      setLeftMargin(scrollx);
    }
  }

  function handlePrevSlide() {
    if (movies) {
      let scrollx = leftMargin + Math.round(window.innerWidth / 2);

      if (scrollx > 0) {
        const totalMovies = movies.length;
        const movieSize = movieWidth + margin;
        const moviesWidth = totalMovies * movieSize;
        scrollx = -(moviesWidth - window.innerWidth);
      }

      setLeftMargin(scrollx);
    }
  }

  return (
    <section id="topRated" className="container mx-auto py-10">
      <div className="flex justify-start">
        <h1 className={movieSectionTitleStyle}>Os mais bem avaliados</h1>
      </div>
      <div className="relative w-full flex justify-start mx-auto pt-4 px-1 overflow-hidden">
        <div className="absolute flex justify-between items-center w-full h-full">
          <button
            className="rounded-full cursor-pointer p-3 backdrop-blur-sm bg-zinc-800/25 hover:bg-zinc-800 transition-all z-30"
            onClick={handlePrevSlide}
          >
            <ArrowLeft />
          </button>
          <button
            className="rounded-full cursor-pointer p-3 backdrop-blur-sm bg-zinc-800/25 hover:bg-zinc-800 transition-all z-30"
            onClick={handleNextSlide}
          >
            <ArrowRight />
          </button>
        </div>
        <div className="flex justify-center items-start gap-2 transition-all duration-300" style={{ marginLeft: `${leftMargin}px` }}>
          {movies?.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};