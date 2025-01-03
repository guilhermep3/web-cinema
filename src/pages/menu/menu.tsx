import { Header } from "@/components/header";
import { Movies } from "@/components/movies";
import { TopRatedMovies } from "@/components/toprated";

export const Menu = () => {

   return (
      <div>
         <Header/>
         <main style={{marginTop: '80px'}}>
            <section>
               <h1>Fazer slide</h1>
            </section>
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