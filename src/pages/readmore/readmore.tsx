import { Header } from "@/components/header";
import { useMovieDetails } from "@/utils/api";
import { useLocation } from "react-router-dom";
import "@/pages/readmore/readmore.css"
import { MdLibraryAdd } from "react-icons/md";

export const ReadMore = () => {
   const location = useLocation();
   const { movie } = location.state;
   const { data } = useMovieDetails(movie.id)

   function convertMinHours(minutes: number){
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if(remainingMinutes === 0){
         return `${hours}h`
      } else {
         return `${hours}h ${remainingMinutes}min`
      }
   }

   return (
      <div>
         <Header />
         <div className="readmore-overlay"></div>
         <section style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`}} className="readmore-section">
            <div className="readmore-infos">
               <div className="readmore-info-left">
                  <h1>{movie.title}</h1>
                  <div className="readmore-details">
                     <p className="readmore-release">{movie.release_date}</p>
                     <span>|</span>
                     <p className="readmore-adult">{movie.adult ? '+18' : 'Livre'}</p>
                     <span>|</span>
                     <p className="readmore-runtime">{convertMinHours(data?.runtime)}</p>
                     <span>|</span>
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