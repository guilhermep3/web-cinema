"use client"
import { MovieType } from "@/types/MovieType";
import { createContext, ReactNode, useContext, useState } from "react"

type MovieContextType = {
   selectedMovie: MovieType | null,
   setSelectedMovie: (movie: MovieType) => void
}
export const MovieContext = createContext<MovieContextType | null>(null)
export const MovieProvider = ({children}:{children: ReactNode} ) => {
   const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
   return (
      <MovieContext.Provider value={{selectedMovie, setSelectedMovie}}>
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