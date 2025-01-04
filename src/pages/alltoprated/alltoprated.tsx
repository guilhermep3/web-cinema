import { Header } from "@/components/header";
import { StarsRating } from "@/components/stars";
import { MovieType } from "@/types/MovieType";
import { useTopRatedMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AllTopRated = () => {
   const { data } = useTopRatedMovies();
   const [movies, setMovies] = useState<MovieType[]>();
   const navigate = useNavigate();

   useEffect(() => {
      setMovies(data.result)
   }, [data])

   function handleNavReadMore(movie: MovieType) {
      navigate('/readmore', { state: { movie } })
   }

   return (
      <div>
         <Header />
         <div className="allTopRated-list">
            {movies?.map((movie) => (
               <div key={movie.id} className="topRated-movie" onClick={() => handleNavReadMore(movie)}>
                  <div className="topRated-poster">
                     <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                  </div>
                  <div className="topRated-infos">
                     <h2 className="topRated-title">{movie.title}</h2>
                     <span>({movie.release_date.substring(0, 4)})</span>
                     <StarsRating rating={movie.vote_average} />
                     <p className="topRated-overview">{movie.overview ? movie.overview.substring(0, 90) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta dolor dolor, ut vulputate nulla cursus vel. Pellentesque'}...</p>
                     <button className="readmore-btn">Ver mais</button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}