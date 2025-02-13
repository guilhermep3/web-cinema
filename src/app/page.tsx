"use client"
import { HeroSlide } from "@/components/heroslide";
import { MoviesList } from "@/components/movieslist";
import { TopRatedMovies } from "@/components/toprated";
import { MovieType } from "@/types/MovieType";
import { useMovies } from "@/utils/api";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Footer } from "@/components/footer";

function Home() {
   const [movies, setMovies] = useState<MovieType[]>([]);
   const [page, setPage] = useState(1);
   const { data } = useMovies(page);
   const sectionRef = useRef<HTMLInputElement>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const savedPage = localStorage.getItem('page');
         if (savedPage) {
            setPage(parseInt(savedPage, 10));
         }
      }
   }, []);

   useEffect(() => {
      setIsLoading(true);
      setMovies([]);

      if (data?.results) {
         setMovies(data.results);
         localStorage.setItem('page', page.toString());
         setIsLoading(false);
      }
   }, [data]);

   useEffect(() => {
      localStorage.setItem('page', page.toString());
      sectionRef.current?.scrollIntoView();
      setIsLoading(true);
   }, [page]);

   function handlePrevBtn() {
      setPage(page === 1 ? 1 : page - 1)
   }
   function handleNextBtn() {
      setPage(page + 1)
   }

   return (
      <div>
         <main>
            <HeroSlide />
            <section id="topRated" className="TopRated-section">
               <TopRatedMovies />
            </section>
            <section ref={sectionRef} id="allMovies" className="all-movies-section">
               <div className="movies-area">
                  <div className="movies-title-area">
                     <h1 className="movies-title">Todos os Filmes</h1>
                     <p className="page-number">Página: {page}</p>
                  </div>
                  <MoviesList movies={movies} isLoading={isLoading} />
                  <button className="prev-next-btn" onClick={handlePrevBtn}><FaArrowLeft /></button>
                  <button className="prev-next-btn" onClick={handleNextBtn}><FaArrowRight /></button>
               </div>
            </section>
         </main>
         <Footer />
      </div>
   )
}
export default Home