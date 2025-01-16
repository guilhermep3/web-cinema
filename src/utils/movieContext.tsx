"use client"
import { MovieType } from "@/types/MovieType";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type MovieContextType = {
   selectedMovie: MovieType | null,
   setSelectedMovie: (movie: MovieType) => void,
   savedMovies: MovieType[],
   saveMovie: (movie: MovieType) => void,
   removeMovie: (movieId: number) => void,
   setSavedMovies: any
}
export const MovieContext = createContext<MovieContextType | null>(null)
export const MovieProvider = ({children}:{children: ReactNode} ) => {
   const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
   const [savedMovies, setSavedMovies] =  useState<MovieType[]>(() => {
      try {
         const saved = localStorage.getItem('savedMovies');
         return saved ? JSON.parse(saved) : [];
      } catch(error){
         console.log('Erro ao salvar filmes: '+error);
         return [];
      }
   })

   // se algum filme salvado ja tiver o id do filme a ser salvo retorne o propio filme salvado
   const saveMovie = (movie: MovieType) => {
      setSavedMovies((prev) => {
         if(prev.some((saved) => saved.id === movie.id)){
            return prev;
         } else {
            return [...prev, movie];
         }
      })
   };

   const removeMovie = (movieId: number) => {
      setSavedMovies((prev) => prev.filter(movie => movie.id !== movieId))
   }

   useEffect(() => {
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
   }, [savedMovies])

   return (
      <MovieContext.Provider value={{selectedMovie, setSelectedMovie, savedMovies, saveMovie, removeMovie, setSavedMovies}}>
         {children}
      </MovieContext.Provider>
   )
}

export const useMovieContext = (): MovieContextType => {
   const context = useContext(MovieContext);
   if (!context) {
      throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
}