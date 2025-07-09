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
   return response.data;
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
export const GetReleaseDates = async (movieId: number) => {
   const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, {
      params: {
         api_key: process.env.NEXT_PUBLIC_API_KEY,
         language: 'pt-BR'
      }
   });
   return response.data;
}
export const GetTopRatedMovies = async () => {
   const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
      params: {
         api_key: process.env.NEXT_PUBLIC_API_KEY,
         language: 'pt-BR'
      }
   })
   return response.data;
}
export const GetSlideMovies = async () => {
   const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
      params: {
         api_key: process.env.NEXT_PUBLIC_API_KEY,
         language: 'pt-BR'
      }
   });
   return response.data
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
export const GetMovieVideos = async (movieId: number) => {
   const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      params: {
         api_key: process.env.NEXT_PUBLIC_API_KEY,
         language: 'pt-BR'
      }
   });

   return response.data.results;
};

export const useMovies = (page: number) => useQuery({
   queryKey: ['movies', page],
   queryFn: () => GetMovies(page),
   placeholderData: keepPreviousData
});
export const useMovieDetails = (movieId: number) => useQuery({
   queryKey: ['movieDetails', movieId],
   queryFn: () => GetMovieDetail(movieId)
});
export const useReleaseDates = (movieId: number) => useQuery({
   queryKey: ['releaseDates', movieId],
   queryFn: () => GetReleaseDates(movieId)
});
export const useTopRatedMovies = () => useQuery({
   queryKey: ['toprated'],
   queryFn: GetTopRatedMovies
});
export const useSlideMovies = () => useQuery({
   queryKey: ['slideMovies'],
   queryFn: GetSlideMovies
});
export const useSearchedMovies = (query: string, page: number) => useQuery({
   queryKey: ['searched', query, page],
   queryFn: () => GetSearchedMovies(query, page),
   placeholderData: keepPreviousData
});
export const useMovieVideos = (movieId: number) => useQuery({
   queryKey: ['movieVideos', movieId],
   queryFn: () => GetMovieVideos(movieId)
});