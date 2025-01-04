import { MovieType } from "@/types/MovieType";
import { useSlideMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

export const HeroSlide = () => {
   const [movies, setMovies] = useState<MovieType[]>();
   const { data } = useSlideMovies();

   useEffect(() => {
      setMovies(data?.results.slice(0, 5))
   }, [data])

   // <div className="hero-slider-controls">
   //    <div className="hero-slide-btn"><FaArrowLeft /></div>
   //    <div className="hero-slide-btn"><FaArrowRight /></div>
   // </div>
   return (
      <div className="hero-slider">
         <div className="hero-slider-area">
            {movies?.map((movie) => (
               <div className="hero-slide" key={movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                  <div className="hero-overlay"></div>
                  <div className="hero-slide-left">
                     <div className="hero-slide-infos">
                        <p>{movie.vote_average} <FaStar style={{ color: '#bed307' }} /></p>
                        <span>|</span>
                        <p>{movie.release_date}</p>
                     </div>
                     <h1>{movie.title}</h1>
                  </div>
                  <div className="hero-slide-right">

                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}