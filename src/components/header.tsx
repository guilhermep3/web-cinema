"use client"
import { flexCenter } from "@/utils/styles";
import { useUser } from "@/utils/userContext";
import { Search, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
  const { user, setUser, imageSrc } = useUser();
  const router = useRouter();
  const [search, setSearch] = useState<string>();
  const [scrollYActive, setScrollYActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchMobileActive, setSearchMobileActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollYActive(true);
      } else {
        setScrollYActive(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  function handleGoMenu() {
    router.push('/')
  }

  function handleSendSearch(e: any) {
    e.preventDefault()
    if (!search) return;
    router.push(`/search?q=${search}`);
    setSearch('')
  }

  function handleNavUserPage() {
    router.push('/userpage')
  }

  return (
    <header className={`fixed top-0 left-0 right-0 flex justify-between items-center z-40 py-2 px-4 md:px-10 text-lg
     text-white transition-all duration-500 backdrop-blur-md
      ${scrollYActive ? 'bg-black/75' : 'bg-black/25'}
      `}
    >
      <div className="w-20 md:w-24 cursor-pointer" onClick={handleGoMenu}>
        <img src="/web-cinema-light.png" alt="logo da web cinema" />
      </div>
      <nav className="flex justify-end items-center flex-1 px-4 md:px-10 z-40">
        <ul className="hidden md:flex">
          <li className="list-none px-5">
            <a className="relative pb-2" href="#">Início</a>
          </li>
          <li className="list-none px-5">
            <a className="relative pb-2" href="#topRated">Melhores</a>
          </li>
          <li className="list-none px-5">
            <a className="relative pb-2" href="#allMovies">Todos</a>
          </li>
        </ul>
      </nav>
      <form
        onSubmit={(e) => handleSendSearch(e)}
        className={`hidden md:flex py-1 px-3 border  overflow-hidden transition-all duration-300
            ${flexCenter} ${searchActive ? 'border-zinc-700 bg-zinc-900/25' : 'border-transparent'}
          `}
      >
        <Search className={`stroke-2 w-5 cursor-pointer transition-all duration-300 mr-2 ${searchActive && 'w-4 text-zinc-400'}`}
          onClick={() => setSearchActive((prev) => !prev)} />
        <input type="search"
          className={`relative outline-none border-b-2 border-transparent border-none transition-all duration-300
              ${searchActive ? 'opacity-100 max-w-64 border-zinc-800 px-3 py-1' : 'opacity-0 max-w-0 p-0'}
            `}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="pesquisar..."
        />
        <button type="submit" className={`${searchActive ? 'opacity-100 max-w-fit cursor-pointer' : 'opacity-0 max-w-0'}`}>
          <Send className="relative w-5 transition-all duration-300 -mb-1 text-blue-300 hover:text-[var(--second-color)]" />
        </button>
      </form>
      {searchMobileActive
        ?
        <X className="md:hidden stroke-2 w-5 cursor-pointer transition-all duration-300 mx-3"
          onClick={() => setSearchMobileActive((prev) => !prev)}
        />
        :
        <Search className="md:hidden stroke-2 w-5 cursor-pointer transition-all duration-300 mx-3"
          onClick={() => setSearchMobileActive((prev) => !prev)}
        />
      }
      <div className="ml-4">

        {user.name && user.lastname
          ? <img src={`${imageSrc}`} alt={`Foto de ${user.name}`} className="user-image-header"
            onClick={handleNavUserPage} title={`${user.name}`} />
          : <button className="text-lg px-4 py-1 rounded-lg border-none text-white bg-[var(--main-color)] cursor-pointer"
          >
            Login
          </button>
        }
      </div>
      <div className={`fixed left-0 right-0 md:hidden flex justify-center items-center p-2 bg-zinc-900 -z-10 transition-all duration-300
        ${searchMobileActive ? 'top-[76px] opacity-100 visible' : 'top-0 opacity-0 invisible'}
      `}>
        <form className={flexCenter + " border border-zinc-700 py-1 px-2 text-base"}
          onSubmit={(e) => handleSendSearch(e)}
        >
          <Search className={`stroke-2 cursor-pointer transition-all duration-300 mr-2 w-4 text-zinc-500`}
            onClick={() => setSearchActive((prev) => !prev)} />
          <input type="search" className="relative px-3 py-1 outline-none border-b-2 border-transparent border-none transition-all duration-300"
            onChange={(e) => setSearch(e.target.value)} placeholder="pesquisar..." />
          <button type="submit" className={`${searchMobileActive ? 'opacity-100 max-w-fit' : 'opacity-0 max-w-0'} cursor-pointer`}>
            <Send className="relative w-5 transition-all duration-300 -mb-1 text-blue-300 hover:text-[var(--second-color)]" />
          </button>
        </form>
      </div>
    </header>
  )
}