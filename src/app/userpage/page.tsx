"use client";
import { useUser } from "@/utils/userContext";
import { FaUserCircle, FaInfoCircle } from "react-icons/fa";
import "@/styles/userpage.css";
import "@/styles/modal.css";
import { useRouter } from "next/navigation";

const UserPage = () => {
   const router = useRouter();
   const { user, setUser } = useUser();

   if (!user || typeof document === 'undefined') return <div className="userpage-section"><p>Page not found</p></div>;

   if(user.name === '' && user.lastname === '') return <div className="userpage-section"><p>Page not found</p></div>;

   function handleShowModal(){
      document.querySelector('.modal-container')?.classList.add('show-modal-container');
   };

   function handleDeleteUser(){
      document.querySelector('.modal-container')?.classList.remove('show-modal-container');
      setUser({name: '', lastname: ''});
      router.push('/')
   };

   return (
      <section className="userpage-section">
         <div className="userpage-container">
            <div className="user-info">
               <div className="user-profile">
                  <div className="user-image-area">
                     <img src="/user-image.jpg" alt={`Foto de ${user.name}`} className="user-image" />
                     <button className="profile-btn">Escolher foto</button>
                  </div>
                  <h1 className="username">{user.name} {user.lastname}</h1>
               </div>
               <div className="user-actions">
                  <button className="btnDelete" onClick={handleShowModal}>Excluir</button>
                  <button className="btnEdit">Editar</button>
               </div>
            </div>
            <div className="user-details">
               <div className="user-stats">
                  <h2>Estatísticas</h2>
                  <p>Filmes salvos: 2</p>
               </div>
               <div className="saved-movies">
                  <h2>Filmes Salvos</h2>
                  <div className="savedmovie">
                     <div className="savedmovie-poster"></div>
                     <div className="savedmovie-info">
                        <div className="savedmovie-nameyear">
                           <span className="savedmovie-name">Gladiador 2</span>
                           <span className="savedmovie-year">2024</span>
                        </div>
                        <FaInfoCircle className="info-icon" />
                     </div>
                  </div>
                  <div className="savedmovie">
                     <div className="savedmovie-poster"></div>
                     <div className="savedmovie-info">
                        <div className="savedmovie-nameyear">
                           <span className="savedmovie-name">Sonic 2</span>
                           <span className="savedmovie-year">2024</span>
                        </div>
                        <FaInfoCircle className="info-icon" />
                     </div>
                  </div>
                  <div className="savedmovie">
                     <div className="savedmovie-poster"></div>
                     <div className="savedmovie-info">
                        <div className="savedmovie-nameyear">
                           <span className="savedmovie-name">Gladiador 2</span>
                           <span className="savedmovie-year">2024</span>
                        </div>
                        <FaInfoCircle className="info-icon" />
                     </div>
                  </div>
                  <div className="savedmovie">
                     <div className="savedmovie-poster"></div>
                     <div className="savedmovie-info">
                        <div className="savedmovie-nameyear">
                           <span className="savedmovie-name">Sonic 2</span>
                           <span className="savedmovie-year">2024</span>
                        </div>
                        <FaInfoCircle className="info-icon" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="modal-container">
            <div className="modal">
               <p className="modal-title">Excluir conta</p>
               <p className="modal-text">Tem certeza que deseja excluir sua conta? Você perderá todos seus dados.</p>
               <button onClick={handleDeleteUser} style={{backgroundColor: '#d30707'}}>EXCLUIR</button>
            </div>
         </div>
      </section>
   );
};

export default UserPage;
