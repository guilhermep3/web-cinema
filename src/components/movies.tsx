import { MovieType } from "@/types/MovieType"
import { useMovies } from "@/utils/api"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "@/pages/menu/menu.css"
import { StarsRating } from "./stars";
import { useNavigate } from "react-router-dom";

export const Movies = () => {
   const navigate = useNavigate();
   const [movies, setMovies] = useState<MovieType[]>([]);
   const [page, setPage] = useState(1);
   const { data } = useMovies(page);

   useEffect(() => {
      setMovies(data?.results)
   }, [data])

   function handlePrevBtn() {
      setPage(page === 1 ? 1 : page - 1)
   }
   function handleNextBtn() {
      setPage(page + 1)
   }

   function handleNavReadMore(movie: MovieType) {
      navigate('/readmore', { state: { movie } })
   }

   return (
      <div className="movies-area">
         <div className="movies-title-area">
            <h1 className="movies-title">Todos os Filmes</h1>
            <p className="page-number">Página: {page}</p>
         </div>
         <div className="movies-list">
            {movies?.map((movie) => (
               <div key={movie.id} className="movie" onClick={() => handleNavReadMore(movie)}>
                     <div className="movie-poster">
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                     </div>
                     <div className="rating-area">
                        <h2 className="movie-title">{movie.title}</h2>
                        <span>({movie.release_date.substring(0, 4)})</span>
                        <StarsRating rating={movie.vote_average} />
                        <p className="movie-overview">{movie.overview ? movie.overview.substring(0, 90) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta dolor dolor, ut vulputate nulla cursus vel. Pellentesque'}...</p>
                        <button className="readmore-btn">Ver mais</button>
                     </div>
               </div>
            ))}
         </div>
         <button className="prev-next-btn" onClick={handlePrevBtn}><FaArrowLeft /></button>
         <button className="prev-next-btn" onClick={handleNextBtn}><FaArrowRight /></button>
      </div>
   )
}