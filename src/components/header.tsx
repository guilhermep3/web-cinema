"use client"
import { useUser } from "@/utils/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

export const Header = () => {
   const { user, setUser, imageSrc } = useUser();
   const router = useRouter();
   const [search, setSearch] = useState<string>();


   useEffect(() => {
      const handleScroll = () => {
         const header = document.querySelector('.header')
         if (window.scrollY > 1) {
            header?.classList.add('headerBG');
         } else {
            header?.classList.remove('headerBG');
         }
      }
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

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
   function handleGoLogin() {
      router.push('/login')
   }

   function handleSendSearch(e: any) {
      e.preventDefault()
      if (!search) return;
      router.push(`/search?q=${search}`);
      setSearch('')
   }

   function handleShowMobile() {
      document.querySelector('.mobile-input-area')?.classList.toggle('show-mobile-input-area');
   }

   function handleNavUserPage() {
      router.push('/userpage')
   }

   return (
      <header className="header">
         <div className="logo" onClick={handleGoMenu}>
            <img src="./web-cinema-light.png" alt="logo da web cinema" />
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
            <FaSearch className="search-lupe-mobile" onClick={handleShowMobile} />
            {user.name && user.lastname
               ? <img src={`${imageSrc}`} alt={`Foto de ${user.name}`} className="user-image-header"
                  onClick={handleNavUserPage} title={`${user.name}`} />
               : <button className="login" onClick={handleGoLogin}>Login</button>
            }
         </nav>
         <div className="mobile-input-area">
            <form className="search-area-mobile search-area-border" onSubmit={(e) => handleSendSearch(e)}>
               <input type="search" className="search search-mobile " onChange={(e) => setSearch(e.target.value)} placeholder="pesquisar..." />
               <button type="submit">
                  <IoIosSend className="search-icon-send send-mobile" />
               </button>
            </form>
         </div>
      </header>
   )
}