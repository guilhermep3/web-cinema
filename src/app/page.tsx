"use client"
import { Loading } from "@/components/loading";
import { HeroSlide } from "@/components/layout/heroslide";
import { useMovies, useNowPlaying, useTopRatedMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { AllMovies } from "@/components/layout/allMovies";
import { MovieList } from "@/components/layout/movieList";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data: movies } = useMovies(page);
  const [isLoading, setIsLoading] = useState(true);
  const { data: topRated } = useTopRatedMovies();
  const { data: nowPlaying } = useNowPlaying();

  useEffect(() => {
    if (movies) {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    const savedPage = localStorage.getItem('page');
    if (savedPage) {
      setPage(parseInt(savedPage, 10));
    }
  }, []);

  useEffect(() => {

    if (movies) {
      localStorage.setItem('page', page.toString());
      setIsLoading(false);
    }
  }, [movies]);

  return (
    <main>
      {isLoading && <div className="w-full h-full min-h-screen flex justify-center items-center"><Loading /></div>}
      {!isLoading &&
        <div>
          <HeroSlide />
          <div className="mt-14">
            <MovieList title="Os mais bem avaliados" movies={topRated} />
            <MovieList title="Lanaçados recentemente" movies={nowPlaying!} />
          </div>
          <AllMovies movies={movies}
            page={page} setPage={setPage}
            isLoading={isLoading} setIsLoading={setIsLoading}
          />
        </div>
      }
    </main>
  )
}