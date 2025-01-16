"use client";
import { useUser } from "@/utils/userContext";
import { FaUserCircle, FaInfoCircle, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMovieContext } from "@/utils/movieContext";
import { MovieType } from "@/types/MovieType";
import "@/styles/userpage.css";
import "@/styles/modal.css";
import "@/styles/response.css";

const UserPage = () => {
   const router = useRouter();
   const { user, setUser, imageSrc, setImageSrc } = useUser();
   const { savedMovies, setSelectedMovie, setSavedMovies } = useMovieContext();
   const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);

   if (!user || typeof document === 'undefined'){
      return (
         <div className="page-not-found">
            <div className="not-found-text">
               <p>Não há nenhum filme selecionado.</p>
               <p>Volte ao menu para selecionar um filme.</p>
            </div>
         </div>
      );
   }

   if (user.name === '' && user.lastname === ''){
      return (
         <div className="page-not-found">
            <div className="not-found-text">
               <p>Não há uma conta cadastrada.</p>
               <p>Faça login para ter acesso ao seu perfil.</p>
            </div>
         </div>
      );
   };

   function handleShowModal() {
      document.querySelector('.modal-container')?.classList.add('show-modal-container');
   };

   function handleHideModal(){
      document.querySelector('.modal-container')?.classList.remove('show-modal-container');
   }

   function handleDeleteUser() {
      document.querySelector('.modal-container')?.classList.remove('show-modal-container');
      setUser({ name: '', lastname: '' });
      setSavedMovies([])
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

   function handleDeleteSavedMovie(movieId: number){
      setSavedMovies((prev: MovieType[]) => prev.filter(movie => movie.id !== movieId))
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
                              <span className="savedmovie-year">({movie.release_date.slice(0, 4)})</span>
                           </div>
                           <div className="savedmovie-buttons">
                              <FaInfoCircle className="info-icon" onClick={() => handleNavReadMore(movie)} />
                              <FaTrash className="delete-saved-movie" onClick={() => handleDeleteSavedMovie(movie.id)}/>
                           </div>
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
               <button className="modal-back-btn" onClick={handleHideModal} style={{ backgroundColor: '#555' }}>Voltar</button>
               <button className="modal-delete-btn" onClick={handleDeleteUser}>Excluir</button>
            </div>
         </div>
      </section>
   );
};

export default UserPage;
