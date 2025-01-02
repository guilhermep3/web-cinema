import { MovieType } from "@/types/MovieType";
import { usePopularMovies } from "@/utils/api"
import { useEffect, useState } from "react";

export const PopularMovies = () => {
   const { data } = usePopularMovies();
   const [movies, setMovies] = useState<MovieType[]>();

   useEffect(() => {
      setMovies(data?.results)
   }, [data])

   return (
      <div className="popular-area">
         <div className="topRated-title-area">
            <h1>Os mais bem avaliados</h1>
         </div>
         <div className="topRated-list">
            {movies?.map((movie) => (
               <div key={movie.id}>
                  <p>{movie.title}</p>
               </div>
            ))}
         </div>
      </div>
   )
}