"use client"
import { useSearchedMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { MovieType } from "@/types/MovieType";
import { MoviesList } from "@/components/movieslist";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Footer } from "@/components/footer";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { Loading } from "@/components/loading";

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

   function handlePrevBtn() {
      setPage(page === 1 ? 1 : page - 1)
   }
   function handleNextBtn() {
      setPage(page + 1)
   }
   if (!query) return <p>Nenhum filme foi encontrado.</p>

   return (
      <section className="search-section">
         <div className="movies-area">
            <div className="movies-title-area">
               <h1 className="search-result-title">Resultados para: <span>{query}</span></h1>
            </div>
            {isLoading && <p>Carregando...</p>}
            <MoviesList movies={movies} />
            {movies.length >= 20 &&
               <div className="buttons-area">
                  <button className="prev-next-btn" onClick={handlePrevBtn}><FaArrowLeft /></button>
                  <button className="prev-next-btn" onClick={handleNextBtn}><FaArrowRight /></button>
               </div>
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