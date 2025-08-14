"use client";
import { useMovieCast, useMovieDetails } from "@/utils/api";
import { Loading } from "@/components/loading";
import { ReadMoreBanner } from "@/components/layout/readmore-banner";
import { ReadMoreInfos } from "@/components/layout/readmore-infos";
import ReadMoreTabs from "@/components/layout/readmore-tabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ReadMore = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const [isDelayed, setIsDelayed] = useState(true);
  
  const { data: cast, } = useMovieCast(movieId || 1);
  const { data: movie, isLoading } = useMovieDetails(movieId || 1);
  console.log("cast", cast)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isDelayed) {
    return <div className="w-full min-h-screen flex justify-center items-center"><Loading /></div>;
  }

  if (!movie || !cast) {
    return (
      <div className="pt-32 min-h-[400px] w-full flex justify-center items-center">
        <div>
          <p>Não há nenhum filme selecionado.</p>
          <p>Volte ao menu para selecionar um filme.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="my-20">
      <div className="container mx-auto w-full flex flex-col gap-6 md:gap-12">
        <ReadMoreBanner movie={movie} />
        <ReadMoreInfos movie={movie} />
        <ReadMoreTabs movie={movie} cast={cast.slice(0, 16)} />
      </div>
    </main>
  );
};

export default ReadMore;