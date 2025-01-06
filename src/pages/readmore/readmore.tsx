import { Header } from "@/components/header";
import { useMovieDetails } from "@/utils/api";
import { useLocation } from "react-router-dom";
import "@/pages/readmore/readmore.css"
import { MdLibraryAdd } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { FaClock, FaCalendar } from "react-icons/fa";
import { useEffect, useState } from "react";

const ReadMore = () => {
   const location = useLocation();
   const { movie } = location.state;
   const { data } = useMovieDetails(movie.id);
   const [dateMovie, setDateMovie] = useState<any>()

   function convertMinHours(minutes: number){
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if(remainingMinutes === 0){
         return `${hours}hrs`
      } else {
         return `${hours}h ${remainingMinutes}min`
      }
   }

   const formateDate = () => {
      const date = new Date(movie.release_date)
      const returndate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
      setDateMovie(returndate)
   }
   useEffect(() => {
      formateDate()
   }, [movie.release_date])

   return (
      <div>
         <Header />
         <div className="readmore-overlay"></div>
         <section style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}} className="readmore-section">
            <div className="readmore-infos">
               <div className="readmore-info-left">
                  <h1>{movie.title}</h1>
                  <div className="readmore-details">
                     <p>{data?.genres[0].name} {data?.genres[1] && ` e ${data?.genres[1].name}`}</p>
                     <span>|</span>
                     <p className="readmore-release"><FaCalendar className="icon-details" style={{marginRight: '3px'}}/>{dateMovie}</p>
                     <span>|</span>
                     <p className="readmore-adult">{movie.adult ? '+18' : 'Livre'}</p>
                     <span>|</span>
                     <p className="readmore-runtime"><FaClock className="icon-details"/> {convertMinHours(data?.runtime)}</p>
                     <span>|</span>
                     <p><FaStar className="icon-details icon-star"/> {movie.vote_average.toString().slice(0, 3)}</p>
                  </div>
                  <p className="readmore-overview">{movie.overview}</p>
                  <div className="buttons-area">
                     <button className="watchBtn">ASSISTIR</button>
                     <button className="addBtn addBtn-hover"><MdLibraryAdd className="addBtn-icon"/>Adicionar</button>
                  </div>
               </div>
               <div className="readmore-info-right">
                  <img className="readmore-poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
               </div>
            </div>
         </section>
      </div>
   )
}
export default ReadMore