import { MovieType } from "@/types/MovieType";
import { Ban, Calendar, ChartNoAxesCombined, CircleDollarSign, Clock, Star, Youtube } from "lucide-react";
import { starStyle } from "@/utils/styles";
import { formateDate } from "@/utils/formatDate";
import { InfoBox } from "../infoBox";
import { useMoviesVideos } from "@/utils/api";

type props = {
  movie: MovieType;
}
export const ReadMoreInfos = ({ movie }: props) => {
  const { data: videos } = useMoviesVideos(movie.id || 0);

  function convertMinHours(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours === 0) {
      return `${minutes} minutos`;
    } else {
      return `${hours} hrs ${minutes} min`
    }
  }

  if (!videos) return <p>Vídeos não encontrados</p>;

  const trailer = videos.find(
    (video: { type: string; site: string; }) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="flex justify-between items-center flex-col lg:flex-row gap-10 sm:gap-6 p-3">
      <div className="flex flex-col items-start gap-6 flex-1 w-full md:w-fit">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-5">
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold">{movie.title}</h1>
            <div className="flex items-center gap-1">
              <Star className={starStyle} />
              <p className="text-yellow-200 font-bold text-lg">{movie.vote_average.toFixed(2)}</p>
              <img src="/imdb-logo.svg" alt="imdb-logo" className="ml-1" />
            </div>
          </div>
          <div className="flex gap-4 text-zinc-200">
            {movie.genres.map((genre, index) => (
              <span key={genre.id} className="flex items-center gap-4 text-sm md:text-base">
                <p>{genre.name}</p>
                {index < movie.genres.length - 1 && <span>|</span>}
              </span>
            ))}
          </div>
          <div className="flex gap-6 items-center mt-4">
            <p className="px-3 py-1 bg-red-600">
              {movie.adult ? '+18' : 'Livre'}
            </p>
            <div className="flex items-center gap-1 md:gap-2" title="Popularidade">
              <ChartNoAxesCombined className="stroke-green-500" />
              <p>Popularidade: <span className="text-green-200">{movie.popularity.toString().slice(0, 3)}</span></p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full sm:w-fit">
          <InfoBox title="Duração"
            icon={<Clock className="text-blue-300" />}
            label={convertMinHours(movie.runtime)}
          />
          <InfoBox title="Estreia"
            icon={<Calendar className="fill-blue-950 stroke-blue-300" />}
            label={formateDate(movie.release_date)}
          />
          <InfoBox title="Orçamento"
            icon={<CircleDollarSign className="text-green-500" />}
            label={movie.revenue !== 0 ? `$ ${movie.budget.toLocaleString('en-US')}` : 'Desconhecido'}
          />
          <InfoBox title="Receita"
            icon={<CircleDollarSign className="text-green-500" />}
            label={movie.revenue !== 0 ? `$ ${movie.revenue.toLocaleString('en-US')}` : 'Desconhecido'}
          />
        </div>
      </div>
      <div>
        <p className="sm:text-lg text-red-200 mb-1 flex items-center gap-2">
          <Youtube className="stroke-red-600" /> Trailer :
        </p>
        <div className="flex justify-end">
          {trailer ? (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block"
            >
              <img
                src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                alt="Trailer thumbnail"
                className="rounded-lg w-full sm:w-96 h-fit sm:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          ) : (
            <div className="relative w-80 h-52">
              <div className="bg-zinc-700 w-full h-full"></div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Ban />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}