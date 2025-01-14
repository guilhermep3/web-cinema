"use client"
import { MovieType } from "@/types/MovieType";
import { useSlideMovies } from "@/utils/api";
import { useMovieContext } from "@/utils/context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar, FaCalendar, FaInfoCircle } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";

export const HeroSlide = () => {
   if (typeof window === "undefined") return ;

   const [movies, setMovies] = useState<MovieType[]>();
   const { data } = useSlideMovies();
   const [newMargin, setNewMargin] = useState(0);
   let [currentSlide, setCurrentSlide] = useState(0);
   let totalSlides = 5;
   const router = useRouter();
   const { setSelectedMovie } = useMovieContext();

   useEffect(() => {
      setMovies(data?.results.slice(0, 5))
   }, [data])

   function handleNavReadMore(movie: MovieType) {
      setSelectedMovie(movie)
      router.push(`/readmore`)
   }

   function handlePrevSlide() {
      setCurrentSlide((prev) => {
         const newSlide = prev <= 0 ? totalSlides - 1 : prev - 1;
         updateMargin(newSlide)
         return newSlide;
      })
   }
   function handleNextSlide() {
      setCurrentSlide((prev) => {
         const newSlide = prev >= totalSlides - 1 ? 0 : prev + 1;
         updateMargin(newSlide)
         return newSlide;
      })
   }
   function updateMargin(newSlide: number) {
      if (typeof window !== "undefined") {
         setNewMargin(newSlide * window.innerWidth);
      }
   }
   function handlesetSlide(index: number) {
      setCurrentSlide(index);
      updateMargin(index);
   }

   useEffect(() => {
      if (typeof document !== "undefined") {
         document.querySelectorAll('.hero-slide').forEach((heroSlide) => {
            heroSlide.classList.add('hero-slide-animation')
         })
      }
   })

   useEffect(() => {
      if (typeof document !== "undefined") {
         const interval = setInterval(() => {
            handleNextSlide()
            document.querySelectorAll('.hero-slide').forEach((heroSlide) => {
               heroSlide.classList.add('hero-slide-animation')
            })
         }, 7000)
         return () => clearInterval(interval)
      }
   }, [currentSlide])

   const formateDate = (movieDate: string) => {
      const date = new Date(movieDate)
      return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
   }

   return (
      <div className="hero-slider">
         <div className="hero-slide-btn-area">
            <button className="hero-slide-btn" onClick={handlePrevSlide}><FaArrowLeftLong /></button>
            {Array.from({ length: totalSlides }).map((i, index) => (
               <span key={index} className={index === currentSlide ? 'slider-active' : ''} onClick={() => handlesetSlide(index)}>
                  {index + 1}
               </span>
            ))}
            <button className="hero-slide-btn" onClick={handleNextSlide}><FaArrowRightLong /></button>
         </div>
         <div className="hero-slider-area" style={{ marginLeft: `-${newMargin}px` }}>
            <div className="hero-overlay">
            </div>
            {movies?.map((movie) => (
               <div className="hero-slide" key={movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                  <div className="hero-slide-left">
                     <h1>{movie.title}</h1>
                     <div className="hero-slide-infos">
                        <p>{movie.vote_average.toString().slice(0, 3)} <FaStar className="icon-details icon-star" /></p>
                        <span>|</span>
                        <p className="hero-release-date"><FaCalendar className="icon-details" /> {formateDate(movie.release_date)}</p>
                        <span className="hero-release-date">|</span>
                        <p className="hero-debut"><MdLocalMovies className="icon-details" />Estreia</p>
                        <span>|</span>
                        <FaInfoCircle className="icon-moreinfos" onClick={() => handleNavReadMore(movie)} title="Ver mais informações" />
                     </div>
                     <p className="hero-overview">{movie.overview}</p>
                     <button className="watchBtn">ASSISTIR</button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}