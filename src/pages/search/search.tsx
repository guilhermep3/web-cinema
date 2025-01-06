import { Header } from "@/components/header";
import { useSearchParams } from "react-router-dom"
import { useSearchedMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { MovieType } from "@/types/MovieType";
import { StarsRating } from "@/components/stars";
import { MoviesList } from "@/components/movieslist";
import "@/pages/search/search.css"

export const Search = () => {
   const [searchParams] = useSearchParams();
   const query = searchParams.get('q') as string;
   const [movies, setMovies] = useState<MovieType[]>([]);
   const {data, isLoading} = useSearchedMovies(query);

   useEffect(() => {
      if(data?.results){
         setMovies(data.results)
      }
   }, [data, query])


   return (
      <section className="search-section">
         <Header />
         <h1 className="search-result-title">Resultados para: <span>{query}</span></h1>
         <h2 className="total-movies">total de {movies.length} filmes</h2>
         {isLoading && <p>Carregando...</p>}
         <MoviesList movies={movies}/>
      </section>
   )
}