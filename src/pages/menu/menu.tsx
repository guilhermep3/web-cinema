import { Header } from "@/components/header";
import { HeroSlide } from "@/components/heroslide";
import { Movies } from "@/components/movies";
import { TopRatedMovies } from "@/components/toprated";

export const Menu = () => {
// style={{marginTop: '80px'}}

   return (
      <div>
         <Header/>
         <main>
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