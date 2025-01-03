import { MovieType } from "@/types/MovieType";
import { useEffect, useState } from "react";
import { StarsRating } from "./stars";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTopRatedMovies } from "@/utils/api";

export const TopRatedMovies = () => {
   const { data } = useTopRatedMovies();
   const [movies, setMovies] = useState<MovieType[]>();

   useEffect(() => {
      setMovies(data?.results)
   }, [data])

   return (
      <>
         <div className="topRated-title-area">
            <h1>Os mais bem avaliados</h1>
         </div>
         <div className="topRated-container">
            <div className="topRated-slide-btn-area">
               <button className="topRated-slide-btn"><FaArrowLeft /></button>
               <button className="topRated-slide-btn"><FaArrowRight /></button>
            </div>
            <div className="topRated-list">
               {movies?.map((movie) => (
                  <div key={movie.id} className="topRated-movie">
                     <div className="topRated-poster">
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                     </div>
                     <div className="topRated-infos">
                        <h2 className="topRated-title">{movie.title}</h2>
                        <span>({movie.release_date.substring(0, 4)})</span>
                        <StarsRating rating={movie.vote_average} />
                        <p className="topRated-overview">{movie.overview ? movie.overview.substring(0, 110) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta dolor dolor, ut vulputate nulla cursus vel. Pellentesque'}...</p>
                        <button className="readmore-btn">Ver mais</button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   )
}