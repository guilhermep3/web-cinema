"use client";
import { useMovieDetails, useReleaseDates } from "@/utils/api";
import { MdLibraryAdd } from "react-icons/md";
import { FaStar, FaClock, FaCalendar, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useMovieContext } from "@/utils/movieContext";
import { Loading } from "@/components/loading";
import { useUser } from "@/utils/userContext";

const ReadMore = () => {
   const { selectedMovie, saveMovie, savedMovies, removeMovie } = useMovieContext();
   const { user } = useUser();

   if (!selectedMovie) {
      return (
         <div className="page-not-found">
            <div className="not-found-text">
               <p>Não há nenhum filme selecionado.</p>
               <p>Volte ao menu para selecionar um filme.</p>
            </div>
         </div>
      );
   }

   const { data, isLoading: isMovieLoading } = useMovieDetails(selectedMovie.id);
   const { data: release, isLoading: isReleaseLoading } = useReleaseDates(selectedMovie.id);

   const [dateMovie, setDateMovie] = useState<string>("--/--/----");
   const [certification, setCertification] = useState<string>("Livre");

   // Função para converter minutos em horas e minutos
   const convertMinHours = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (hours === 0) {
         return `${remainingMinutes}min`;
      } else if (remainingMinutes === 0) {
         return `${hours}hrs`;
      } else {
         return `${hours}h ${remainingMinutes}min`;
      }
   };

   // Atualizar certificação com base no release
   useEffect(() => {
      if (release?.results) {
         const findRelease = release.results.find(
            (item: { iso_3166_1: string }) => item.iso_3166_1 === "BR"
         );
         setCertification(findRelease?.release_dates[0]?.certification || "Livre");
      }
   }, [release]);

   // Atualizar data do filme
   useEffect(() => {
      if (selectedMovie?.release_date) {
         const date = new Date(selectedMovie.release_date);
         const formattedDate = new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
         }).format(date);
         setDateMovie(formattedDate);
      }
   }, [selectedMovie?.release_date]);

   function handleSaveMovie() {
      if(user.name !== '' && user.lastname !== ''){         
         if (selectedMovie) {
            saveMovie(selectedMovie)
            console.log(selectedMovie)
         }
      } else {
         document.querySelector('.modal-container')?.classList.add('show-modal-container');
      }
   }

   function handleRemoveMovie(){
      if(selectedMovie) removeMovie(selectedMovie.id)
   }

   function handleCloseModal(){
      document.querySelector('.modal-container')?.classList.remove('show-modal-container');
   }

   if (isMovieLoading || isReleaseLoading) return <Loading />;

   return (
      <div>
         <div className="readmore-overlay"></div>
         <section
            style={
               selectedMovie.backdrop_path
                  ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})` }
                  : undefined
            }
            className="readmore-section"
         >
            <div className="readmore-infos">
               <div className="readmore-info-left">
                  <h1>{selectedMovie.title}</h1>
                  <div className="readmore-details">
                     <p>
                        <FaStar className="icon-details icon-star" />
                        {selectedMovie.vote_average.toFixed(1)}
                     </p>
                     <span>|</span>
                     <p>
                        {data?.genres[0]?.name} {data?.genres[1] && ` e ${data.genres[1].name}`}
                     </p>
                     <span>|</span>
                     <p className="readmore-runtime">
                        <FaClock className="icon-details" /> {convertMinHours(data?.runtime || 0)}
                     </p>
                     <span>|</span>
                     <p className="readmore-adult">
                        {certification === "L" ? "Livre" : certification === 'Livre' ? "Livre" : `+${certification}`}
                     </p>
                     <span>|</span>
                     <p className="readmore-release">
                        <FaCalendar className="icon-details icon-release" style={{ marginRight: "3px" }} />
                        {dateMovie}
                     </p>
                  </div>
                  <p className="readmore-overview">{selectedMovie.overview}</p>
                  <div className="buttons-area">
                     <button className="watchBtn">ASSISTIR</button>
                     {savedMovies.some(movie => movie.id === selectedMovie.id)
                        ? <button className="addBtn addBtn-hover" onClick={handleRemoveMovie}>
                           <FaCheck className="addBtn-icon" />Salvo
                        </button>
                        : <button className="addBtn addBtn-hover" onClick={handleSaveMovie}>
                           <MdLibraryAdd className="addBtn-icon" />Salvar
                        </button>
                     }
                  </div>
               </div>
               <div className="readmore-info-right">
                  <img
                     className="readmore-poster"
                     src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
                     alt={selectedMovie.title}
                  />
               </div>
            </div>
         </section>
         <div className="modal-container">
            <div className="modal">
               <p className="modal-title">Erro ao salvar</p>
               <p className="modal-text">Faça login para salvar seus filmes favoritos.</p>
               <button onClick={handleCloseModal}>OK</button>
            </div>
         </div>
      </div>
   );
};

export default ReadMore;