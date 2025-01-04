"use client"
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Header = () => {
   const navigate = useNavigate()

   window.addEventListener('scroll', () => {
      if(window.scrollY > 1){
         document.querySelector('.header')?.classList.add('headerBG')
      } else {
         document.querySelector('.header')?.classList.remove('headerBG')
      }
   })

   function handleInputClass(){
      document.querySelector('.search')?.classList.toggle('showSearch');
      document.querySelector('.search-area')?.classList.toggle('search-area-border');
   }

   function handleGoMenu(){
      navigate('/')
   }

   return (
      <header className="header">
         <div className="logo" onClick={handleGoMenu}>
            MOVIES<span>API</span>
         </div>
         <nav>
            <ul>
               <li><a href="">Início</a></li>
               <li><a href="">Melhores</a></li>
               <li><a href="">Todos</a></li>
            </ul>
            <div className="search-area">
               <FaSearch className="search-lupe" onClick={handleInputClass}/>
               <input type="search" className="search" placeholder="pesquisar..." />
            </div>
         </nav>
         <button className="login">Login</button>
      </header>
   )
}