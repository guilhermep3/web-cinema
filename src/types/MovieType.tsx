export type MovieType = {
  id: number;
  adult: boolean;
  overview: string;
  popularity: string;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  budget: number;
  revenue: number;
  runtime: number;
  genres: [{ id: number, name: string }];
  production_countries: [{
    iso_3166_1: string;
    name: string;
  }];
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
}

export type NowPlayingType = {
  id: number;
  adult: boolean;
  overview: string;
  popularity: string;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  budget: number;
  revenue: number;
  runtime: number;
  genres: [{ id: number, name: string }];
  production_countries: [{
    iso_3166_1: string;
    name: string;
  }];
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  genre_ids: [id: number]
}