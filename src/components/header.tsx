"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { BsFillCameraReelsFill } from "react-icons/bs";

export const Header = () => {
   const router = useRouter();
   const [search, setSearch] = useState<string>();

      if (typeof window !== "undefined") {
         const handleScroll = () => {
            const header = document.querySelector('.header')
            if (typeof document !== "undefined") {
               if (window.scrollY > 1) {
                  header?.classList.add('headerBG');
               } else {
                  header?.classList.remove('headerBG');
               }
            }
         }
         window.addEventListener('scroll', handleScroll);
      }

   function handleInputClass() {
      if (typeof document !== "undefined") {
         document.querySelector('.search')?.classList.toggle('showSearch');
         document.querySelector('.search-area')?.classList.toggle('search-area-border');
         document.querySelector('.search-icon-send')?.classList.toggle('show-icon-send');
         const search = document.querySelector('.search') as HTMLInputElement;
         search?.focus()
      }
   }

   function handleGoMenu() {
      router.push('/')
   }

   function handleSendSearch(e: any) {
      e.preventDefault()
      if (!search) return;
      router.push(`/search?q=${search}`);
      setSearch('')
   }

   return (
      <header className="header">
         <div className="logo" onClick={handleGoMenu}>
            <BsFillCameraReelsFill className="icon-logo"/>
            <div>
               <p>WEB</p>
               <span>CINEMA</span>
            </div>
         </div>
         <nav>
            <ul>
               <li><a href="#">Início</a></li>
               <li><a href="#topRated">Melhores</a></li>
               <li><a href="#allMovies">Todos</a></li>
            </ul>
            <form className="search-area" onSubmit={(e) => handleSendSearch(e)}>
               <FaSearch className="search-icon-lupe" onClick={handleInputClass} />
               <input type="search" className="search" onChange={(e) => setSearch(e.target.value)} placeholder="pesquisar..." />
               <button type="submit">
                  <IoIosSend className="search-icon-send" />
               </button>
            </form>
         </nav>
      </header>
   )
}