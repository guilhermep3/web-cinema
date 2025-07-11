"use client"
import { MovieType } from "@/types/MovieType"
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { starStyle } from "@/utils/styles";

type props = {
  movie: MovieType;
}
export const Movie = ({ movie }: props) => {
  const router = useRouter();

  function handleNavReadMore(movie: MovieType) {
    router.push(`/readmore/${movie.id}`);
  }

  return (
    <div className="relative group w-40 sm:w-44 h-fit mb-4 hover:scale-110 transition-all duration-300 p-2 md:p-4 cursor-pointer mx-auto
      before:absolute before:inset-0 hover:before:bg-zinc-800 before:-z-10 before:transition-all before:duration-300"
      onClick={() => handleNavReadMore(movie)}
    >
      <div className="w-full h-52">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`banner do ${movie.title}`}
          className="w-full h-full object-cover bg-zinc-600"
        />
      </div>
      <div className="pt-2">
        <h2 className="text-sm">
          {movie.title.length > 18 ? movie.title.substring(0, 18) + '...' : movie.title}
        </h2>
        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-1 text-sm mt-1">
            <Star className={starStyle} />
            <p>{movie.vote_average.toString().slice(0, 3)}</p>
          </div>
          <span className="text-sm">({movie.release_date.substring(0, 4)})</span>
        </div>
      </div>
    </div>
  )
}