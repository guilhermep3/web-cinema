import { MovieType } from "@/types/MovieType";
import { useSlideMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { FaStar, FaCalendar } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";

export const HeroSlide = () => {
   const [movies, setMovies] = useState<MovieType[]>();
   const { data } = useSlideMovies();

   useEffect(() => {
      setMovies(data?.results.slice(0, 5))
   }, [data])

   function handlePrevSlide(){

   }
   function handleNextSlide(){
      
   }

   return (
      <div className="hero-slider">
         <div className="hero-slide-btn-area">
            <button className="hero-slide-btn" onClick={handlePrevSlide}><FaArrowLeftLong /></button>
            <span className="slider-active">1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <button className="hero-slide-btn" onClick={handleNextSlide}><FaArrowRightLong /></button>
         </div>
         <div className="hero-slider-area">
            <div className="hero-overlay">
            </div>
            {movies?.map((movie) => (
               <div className="hero-slide" key={movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                  <div className="hero-slide-left">
                     <h1>{movie.title}</h1>
                     <div className="hero-slide-infos">
                        <p>{movie.vote_average.toString().slice(0, 3)} <FaStar className="icon-details" style={{ color: '#bed307' }} /></p>
                        <span>|</span>
                        <p><FaCalendar className="icon-details" /> {movie.release_date}</p>
                        <span>|</span>
                        <p className="hero-debut"><MdLocalMovies className="icon-details" />Estreia</p>
                     </div>
                     <button className="watchBtn">ASSISTIR</button>
                  </div>
                  <div className="hero-slide-right">

                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}