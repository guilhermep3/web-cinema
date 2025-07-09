"use client"
import { Loading } from "@/components/loading";
import { HeroSlide } from "@/components/layout/heroslide";
import { MovieType } from "@/types/MovieType";
import { useMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { AllMovies } from "@/components/layout/allMovies";
import { TopRatedMoviesSwiper } from "@/components/layout/toprated-swiper";

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState(1);
  const { data } = useMovies(page);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  });

  useEffect(() => {
    const savedPage = localStorage.getItem('page');
    if (savedPage) {
      setPage(parseInt(savedPage, 10));
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setMovies([]);

    if (data?.results) {
      setMovies(data.results);
      localStorage.setItem('page', page.toString());
      setIsLoading(false);
    }
  }, [data]);

  return (
    <main>
      {isLoading && <div className="w-full h-full min-h-screen flex justify-center items-center"><Loading /></div>}
      {!isLoading &&
        <div>
          <HeroSlide />
          <TopRatedMoviesSwiper />
          <AllMovies movies={movies}
            page={page} setPage={setPage}
            isLoading={isLoading} setIsLoading={setIsLoading}
          />
        </div>
      }
      {!isLoading && <Footer />}
    </main>
  )
}