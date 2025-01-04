import { Header } from "@/components/header";
import { HeroSlide } from "@/components/heroslide";
import { Movies } from "@/components/movies";
import { TopRatedMovies } from "@/components/toprated";

export const Menu = () => {

   return (
      <div>
         <Header/>
         <main style={{marginTop: '80px'}}>
            <HeroSlide/>
            <section className="TopRated-section">
               <TopRatedMovies/>
            </section>
            <section className="all-movies-section">
               <Movies/>
            </section>
         </main>
      </div>
   )
}