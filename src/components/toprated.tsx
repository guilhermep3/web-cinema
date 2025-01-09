"use client"
import { MovieType } from "@/types/MovieType";
import { useEffect, useState } from "react";
import { StarsRating } from "./stars";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTopRatedMovies } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useMovieContext } from "@/utils/context";

export const TopRatedMovies = () => {
   const { data } = useTopRatedMovies();
   const [movies, setMovies] = useState<MovieType[]>();
   const router = useRouter();
   const [leftMargin, setLeftMargin] = useState(0);
   const [currentSlide, setCurrentSlide] = useState(0);
   const { setSelectedMovie } = useMovieContext();
   const totalSlides = 20;
   const slideWidth = 271;
   const itemsPerPage = 4;


   useEffect(() => {
      setMovies(data?.results)
   }, [data])

   function handleNavReadMore(movie: MovieType) {
      setSelectedMovie(movie)
      router.push('/readmore')
   }

   function handlePrevSlide() {
      const newSlide = (currentSlide - itemsPerPage + totalSlides) % totalSlides;
      setCurrentSlide(newSlide);
      updateMarginSlide(newSlide);
   }
   
   function handleNextSlide() {
      const newSlide = (currentSlide + itemsPerPage) % totalSlides;
      setCurrentSlide(newSlide);
      updateMarginSlide(newSlide);
   }
   function updateMarginSlide(newSlide: number) {
      setLeftMargin(newSlide * slideWidth);
   }   

   return (
      <>
         <div className="movies-title-area">
            <h1>Os mais bem avaliados</h1>
         </div>
         <div className="topRated-container">
            <div className="topRated-slide-btn-area">
               <button className="topRated-slide-btn" onClick={handlePrevSlide}><FaArrowLeft /></button>
               <button className="topRated-slide-btn" onClick={handleNextSlide}><FaArrowRight /></button>
            </div>
            <div className="topRated-list" style={{ marginLeft: `-${leftMargin}px`}}>
               {movies?.map((movie) => (
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
         </div>
      </>
   )
}