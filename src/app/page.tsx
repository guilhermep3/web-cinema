"use client"
import { Header } from "@/components/header";
import { HeroSlide } from "@/components/heroslide";
import { MoviesList } from "@/components/movieslist";
import { TopRatedMovies } from "@/components/toprated";
import { MovieType } from "@/types/MovieType";
import { useMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "@/styles/menu.css"
import { Footer } from "@/components/footer";

function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState(1);
  const { data } = useMovies(page);

  useEffect(() => {
     setMovies(data?.results)
  }, [data])

  function handlePrevBtn() {
     setPage(page === 1 ? 1 : page - 1)
  }
  function handleNextBtn() {
     setPage(page + 1)
  }

  return (
     <div>
        <Header />
        <main>
           <HeroSlide />
           <section id="topRated" className="TopRated-section">
              <TopRatedMovies />
           </section>
           <section id="allMovies" className="all-movies-section">
              <div className="movies-area">
                 <div className="movies-title-area">
                    <h1 className="movies-title">Todos os Filmes</h1>
                    <p className="page-number">Página: {page}</p>
                 </div>
                 <MoviesList movies={movies}/>
                 <button className="prev-next-btn" onClick={handlePrevBtn}><FaArrowLeft /></button>
                 <button className="prev-next-btn" onClick={handleNextBtn}><FaArrowRight /></button>
              </div>
           </section>
        </main>
        <Footer/>
     </div>
  )
}
export default Home