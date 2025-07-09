import { MovieType } from "@/types/MovieType";

type props = {
  movie: MovieType;
}
export const ReadMoreBanner = ({ movie }: props) => {

  return (
    <div className="flex relative md:w-10/12 mx-auto p-2 mt-4">
      {movie
        ?
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}
        className="rounded-xl md:rounded-2xl"
        />
        : <div className="w-full h-full bg-zinc-700"></div>
      }
      <div className="absolute bottom-0 p-2 bg-zinc-950 rounded-lg md:rounded-2xl">
        <div className="absolute h-5 w-5 top-0 left-0 -mt-5 md:-mt-6 rounded-bl-full shadow-[-10px_10px_0px_10px_#09090b] md:h-6 md:w-6 bg-transparent"></div>
        <div className="absolute h-5 w-5 bottom-0 right-0 rounded-bl-full shadow-[-10px_10px_0px_10px_#09090b] translate-x-[23px] md:translate-x-[23px] -translate-y-[33%] md:h-6 md:w-6"></div>
        <div className="relative w-20 md:w-40 z-30">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""
            className="rounded-lg md:rounded-2xl"
          />
          <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full w-9 md:w-12 h-9 md:h-12 flex justify-center items-center bg-zinc-950">
            <p className="text-yellow-500 font-bold text-xs md:text-sm">{movie.vote_average.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}