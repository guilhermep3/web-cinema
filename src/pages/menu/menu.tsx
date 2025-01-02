import { Header } from "@/components/header";
import { Movies } from "@/components/movies";
import { PopularMovies } from "@/components/popularmovies";

export const Menu = () => {

   return (
      <div>
         <Header/>
         <main style={{marginTop: '80px'}}>
            <section>
               <h1>Fazer slide</h1>
            </section>
            <section className="most-popular-section">
               <PopularMovies/>
            </section>
            <section className="all-movies-section">
               <Movies/>
            </section>
         </main>
      </div>
   )
}