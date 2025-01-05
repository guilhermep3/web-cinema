import { Header } from "@/components/header";
import { HeroSlide } from "@/components/heroslide";
import { Movies } from "@/components/movies";
import { TopRatedMovies } from "@/components/toprated";

export const Menu = () => {
   
   return (
      <div>
         <Header/>
         <main>
            <HeroSlide/>
            <section id="topRated" className="TopRated-section">
               <TopRatedMovies/>
            </section>
            <section id="allMovies" className="all-movies-section">
               <Movies/>
            </section>
         </main>
      </div>
   )
}