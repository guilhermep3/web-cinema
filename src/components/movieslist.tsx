"use client"
import { MovieType } from "@/types/MovieType"
import { StarsRating } from "./stars"
import { useRouter } from "next/navigation"
import { useMovieContext } from "@/utils/movieContext"
import { Skeleton } from "./skeleton"

type props = {
   movies?: MovieType[];
   isLoading: boolean;
}
export const MoviesList = ({ movies, isLoading }: props) => {
   const router = useRouter();
   const { setSelectedMovie } = useMovieContext();

   function handleNavReadMore(movie: MovieType) {
      setSelectedMovie(movie);
      router.push('/readmore');
   }

   return (
      <div className="movies-list">
         {isLoading || !movies
         ? <Skeleton/>
         : movies.map((movie) => (
            <div key={movie.id} className="movie" onClick={() => handleNavReadMore(movie)}>
               <div className="movie-poster">
                  <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
               </div>
               <div className="movie-infos">
                  <h2 className="movie-title">{movie.title}</h2>
                  <span>({movie.release_date.substring(0, 4)})</span>
                  <StarsRating rating={movie.vote_average} />
                  <p className="movie-overview">{movie.overview ? movie.overview.substring(0, 90) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta dolor dolor, ut vulputate nulla cursus vel. Pellentesque'}...</p>
                  <button className="readmore-btn">Ver mais</button>
               </div>
            </div>
         ))}
      </div>
   )
}