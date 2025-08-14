"use client"
import { useSearchedMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { MovieType } from "@/types/MovieType";
import { MoviesList } from "@/components/movieslist";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { Loading } from "@/components/loading";
import { PrevNextButtons } from "@/components/prevNextButtons";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') as string || '';
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState(1)
  const { data, isLoading } = useSearchedMovies(query, page);

  useEffect(() => {
    if (data?.results) {
      setMovies(data.results)
    }
  }, [data, query])

  if (!query) return <p>Nenhum filme foi encontrado.</p>

  return (
    <section className="container mx-auto mt-32">
      <div className="movies-area">
        <div className="movies-title-area">
          <h1 className="text-lg mx-2 my-10">Resultados para: <span className="font-bold">{query}</span></h1>
        </div>
        {isLoading && <div className="w-full h-full min-h-screen flex justify-center items-center"><Loading /></div>}
        {movies.length === 0 || !movies &&
          <div className="my-10">Nenhum filme foi encontrado.</div>
        }
        <MoviesList movies={movies} isLoading={false} />
        {movies.length >= 20 &&
          <PrevNextButtons page={page} setPage={setPage} />
        }
      </div>
    </section>
  )
}

const Search = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPage />
    </Suspense>
  )
}
export default Search