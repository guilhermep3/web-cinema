"use client"
import { useSearchedMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { MovieType } from "@/types/MovieType";
import { MoviesList } from "@/components/movieslist";
import { Footer } from "@/components/footer";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { Loading } from "@/components/loading";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
          <h1 className="text-lg mb-2 ml-2">Resultados para: <span className="font-bold">{query}</span></h1>
        </div>
        {isLoading && <p>Carregando...</p>}
        <MoviesList movies={movies} isLoading={false} />
        {movies.length >= 20 &&
          <PrevNextButtons page={page} setPage={setPage} />
        }
      </div>
      <Footer />
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