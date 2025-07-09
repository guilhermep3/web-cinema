import { flexCenter, movieSectionTitleStyle } from "@/utils/styles";
import { useRef } from "react";
import { MovieType } from "@/types/MovieType";
import { MoviesList } from "../movieslist";
import { PrevNextButtons } from "../prevNextButtons";

type props = {
  movies: MovieType[];
  page: number;
  setPage: (newV: number) => void;
  isLoading: boolean;
  setIsLoading: (newV: boolean) => void;
}
export const AllMovies = ({ movies, page, setPage, isLoading, setIsLoading }: props) => {
  const sectionRef = useRef<HTMLInputElement>(null);

  return (
    <section ref={sectionRef} id="allMovies" className="container mx-auto py-10 border-t-2 border-zinc-900">
      <div className={flexCenter + ' flex-wrap gap-6'}>
        <div className="flex justify-between items-center w-full p-3">
          <h1 className={movieSectionTitleStyle}>Todos os Filmes</h1>
          <p className="text-[var(--light-blue)] pr-4">Página: {page}</p>
        </div>
        <MoviesList movies={movies} isLoading={isLoading} />
        <PrevNextButtons page={page} setPage={setPage}/>
      </div>
    </section>
  )
}