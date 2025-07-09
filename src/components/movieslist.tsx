"use client"
import { MovieType } from "@/types/MovieType"
import { Skeleton } from "./skeleton"
import { Movie } from "./movie"

type props = {
	movies?: MovieType[];
	isLoading: boolean;
}
export const MoviesList = ({ movies, isLoading }: props) => {

	return (
		<div className="flex justify-center items-center flex-wrap gap-2">
			{isLoading || !movies
				? <Skeleton />
				: movies.map((movie) => (
					<Movie key={movie.id} movie={movie} />
				))}
		</div>
	)
}