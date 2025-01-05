import { MovieType } from "@/types/MovieType";
import { useSlideMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { FaStar, FaCalendar, FaInfoCircle } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const HeroSlide = () => {
   const [movies, setMovies] = useState<MovieType[]>();
   const { data } = useSlideMovies();
   const [newMargin, setNewMargin] = useState(0);
   let [currentSlide, setCurrentSlide] = useState(0);
   let totalSlides = 5;
   const navigate = useNavigate()

   useEffect(() => {
      setMovies(data?.results.slice(0, 5))
   }, [data])

   function handleNavReadMore(movie: MovieType) {
      navigate('/readmore', { state: { movie } })
   }

   function handlePrevSlide(){
      setCurrentSlide((prev) => {
         const newSlide = prev <= 0 ? totalSlides -1 : prev -1;
         updateMargin(newSlide)
         updateMargin(newSlide)
         return newSlide;
      })
      console.log("prev: "+currentSlide)
   }
   function handleNextSlide(){
      setCurrentSlide((prev) => {
         const newSlide = prev >= totalSlides -1 ? 0 : prev + 1;
         updateMargin(newSlide)
         return newSlide;
      })
      console.log("next: "+currentSlide)
   }
   function updateMargin(newSlide: number){
      setNewMargin(newSlide * window.innerWidth);
   }
   function handlesetSlide(index: number){
      setCurrentSlide(index);
      updateMargin(index);
   }

   return (
      <div className="hero-slider">
         <div className="hero-slide-btn-area">
            <button className="hero-slide-btn" onClick={handlePrevSlide}><FaArrowLeftLong /></button>
            {Array.from({length: totalSlides}).map((i, index) => (
               <span key={index} className={index === currentSlide ? 'slider-active' : ''} onClick={() => handlesetSlide(index)}>
                  {index + 1}
               </span>
            ))}
            <button className="hero-slide-btn" onClick={handleNextSlide}><FaArrowRightLong /></button>
         </div>
         <div className="hero-slider-area" style={{marginLeft: `-${newMargin}px`}}>
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
                        <span>|</span>
                        <FaInfoCircle className="icon-moreinfos" onClick={() => handleNavReadMore(movie)}/>
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