import {
  IGenres,
  IProductionCompanies,
  IProductionCountries,
  ISpokenLanguages
} from './Interfaces'

export interface ISelectedMovie {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: any,
  budget: number,
  genres: IGenres[],
  homepage: string,
  id: string,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: IProductionCompanies[],
  production_countries: IProductionCountries[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: ISpokenLanguages[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}