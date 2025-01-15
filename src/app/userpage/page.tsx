"use client";
import { useUser } from "@/utils/userContext";
import { FaUserCircle, FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React from "react";
import { useMovieContext } from "@/utils/movieContext";
import { MovieType } from "@/types/MovieType";
import "@/styles/userpage.css";
import "@/styles/modal.css";
import "@/styles/response.css";

const UserPage = () => {
   const router = useRouter();
   const { user, setUser, imageSrc, setImageSrc } = useUser();
   const { savedMovies, setSelectedMovie } = useMovieContext()

   if (!user || typeof document === 'undefined') return <div className="userpage-section"><p>Page not found</p></div>;

   if (user.name === '' && user.lastname === '') return <div className="userpage-section"><p>Page not found</p></div>;

   function handleShowModal() {
      document.querySelector('.modal-container')?.classList.add('show-modal-container');
   };

   function handleDeleteUser() {
      document.querySelector('.modal-container')?.classList.remove('show-modal-container');
      setUser({ name: '', lastname: '' });
      router.push('/')
   };

   function handleFileImage(etv: React.ChangeEvent<HTMLInputElement>) {
      const file = etv.target.files?.[0]
      if (file) {
         const reader = new FileReader;
         reader.onload = () => {
            if (reader.result) {
               setImageSrc(reader.result as string);
            }
         }
         reader.readAsDataURL(file)
      }
   };

   function handleNavReadMore(movie: MovieType) {
      setSelectedMovie(movie)
      router.push('/readmore')
   }

   return (
      <section className="userpage-section">
         <div className="userpage-container">
            <div className="user-info">
               <div className="user-profile">
                  <div className="user-image-area">
                     <img src={`${imageSrc}`} alt={`Foto de ${user.name}`} className="user-image" />
                     <input type="file" accept="image/*" id="file-input"
                        onChange={handleFileImage} />
                     <label htmlFor="file-input" className="file-label">Escolher foto</label>
                  </div>
                  <div className="user-info-right">
                     <h1 className="username">{user.name} {user.lastname}</h1>
                     <div className="user-actions">
                        <button className="btnDelete" onClick={handleShowModal}>Excluir</button>
                        <button className="btnEdit">Editar</button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="user-details">
               <div className="user-stats">
                  <h2>Estatísticas</h2>
                  <p>{savedMovies.length === 0 ? 'Nenhum filme salvo' : `Filmes salvos: ${savedMovies.length}`}</p>
               </div>
               <div className="saved-movies">
                  <h2>Filmes Salvos</h2>
                  {savedMovies.map((movie) => (
                     <div className="savedmovie" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="savedmovie-poster"></img>
                        <div className="savedmovie-info">
                           <div className="savedmovie-nameyear">
                              <span className="savedmovie-name">{movie.title}</span>
                              <span className="savedmovie-year">{movie.release_date.slice(0, 4)}</span>
                           </div>
                           <FaInfoCircle className="info-icon" onClick={() => handleNavReadMore(movie)} />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="modal-container">
            <div className="modal">
               <p className="modal-title">Excluir conta</p>
               <p className="modal-text">Tem certeza que deseja excluir sua conta? Você perderá todos seus dados.</p>
               <button onClick={handleDeleteUser} style={{ backgroundColor: '#d30707' }}>EXCLUIR</button>
            </div>
         </div>
      </section>
   );
};

export default UserPage;
