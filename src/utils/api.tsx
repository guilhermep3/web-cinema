import { MovieType, NowPlayingType } from "@/types/MovieType";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios"

export const GetMovies = async (page: number) => {
  const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      page: page
    }
  });
  return response.data.results;
}

export const GetMovieDetail = async (movieId: number) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR'
    }
  })
  return response.data;
}

export const GetTopRatedMovies = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR'
    }
  })
  return response.data.results;
}

export const GetUpcomingMovies = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR'
    }
  })
  return response.data;
}

export const GetNowPlaying = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR'
    }
  });
  return response.data.results;
}

export const GetSearchedMovies = async (query: string, page: number) => {
  const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR',
      query: query,
      page: page
    }
  })
  return response.data
}
export const GetMoviesVideos = async (movieId: number) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR'
    }
  });

  return response.data.results;
}
  ;
export const GetMoviesGenres = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR'
    }
  })

  return response.data.genres;
}

export const GetMoviesCast = async (movieId: number) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-BR'
    }
  })

  return response.data.cast;
}

export const useMovies = (page: number) => useQuery({
  queryKey: ['movies', page],
  queryFn: () => GetMovies(page),
  placeholderData: keepPreviousData
});

export const useMovieDetails = (movieId: number) => useQuery({
  queryKey: ['movieDetails', movieId],
  queryFn: () => GetMovieDetail(movieId)
});

export const useTopRatedMovies = () => useQuery({
  queryKey: ['toprated'],
  queryFn: GetTopRatedMovies
});

export const useUpcomingMovies = () => useQuery({
  queryKey: ['upcoming'],
  queryFn: () => GetUpcomingMovies()
})

export const useNowPlaying = () => useQuery<NowPlayingType[]>({
  queryKey: ['slideMovies'],
  queryFn: GetNowPlaying
});

export const useSearchedMovies = (query: string, page: number) => useQuery({
  queryKey: ['searched', query, page],
  queryFn: () => GetSearchedMovies(query, page),
  placeholderData: keepPreviousData
});

export const useMoviesVideos = (movieId: number) => useQuery({
  queryKey: ['movieVideos', movieId],
  queryFn: () => GetMoviesVideos(movieId)
});

export const useMoviesGenres = () => useQuery({
  queryKey: ['genres'],
  queryFn: () => GetMoviesGenres()
});

export const useMovieCast = (movieId: number) => useQuery({
  queryKey: ['credits', movieId],
  queryFn: () => GetMoviesCast(movieId)
});