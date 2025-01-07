"use client"
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";

export const Header = () => {
   const navigate = useNavigate();
   const [search, setSearch] = useState<string>();

   useEffect(() => {
      window.addEventListener('scroll', () => {
         if (typeof document !== 'undefined'){
            if(window.scrollY > 1){
               document.querySelector('.header')?.classList.add('headerBG')
            } else {
               document.querySelector('.header')?.classList.remove('headerBG')
            }
         }
      })
   })

   function handleInputClass(){
      if (typeof document !== 'undefined'){
         document.querySelector('.search')?.classList.toggle('showSearch');
         document.querySelector('.search-area')?.classList.toggle('search-area-border');
         document.querySelector('.search-icon-send')?.classList.toggle('show-icon-send');
         const search = document.querySelector('.search') as HTMLInputElement;
         search?.focus()
      }
   }

   function handleGoMenu(){
      navigate('/')
   }

   function handleSendSearch(e: any){
      e.preventDefault()
      if(!search) return;
      navigate(`/search?q=${search}`);
      setSearch('')
      console.log(search)
   }

   return (
      <header className="header">
         <div className="logo" onClick={handleGoMenu}>
            MOVIES<span>API</span>
         </div>
         <nav>
            <ul>
               <li><a href="#">Início</a></li>
               <li><a href="#topRated">Melhores</a></li>
               <li><a href="#allMovies">Todos</a></li>
            </ul>
            <form className="search-area" onSubmit={(e) => handleSendSearch(e)}>
               <FaSearch className="search-icon-lupe" onClick={handleInputClass}/>
               <input type="search" className="search" onChange={(e) => setSearch(e.target.value)} placeholder="pesquisar..." />
               <button type="submit">
                  <IoIosSend className="search-icon-send"/>
               </button>
            </form>
         </nav>
         <button className="login">Login</button>
      </header>
   )
}