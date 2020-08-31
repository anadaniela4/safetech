import { IGenres } from './Interfaces'

export interface IRecomendations {
  id: string,
  video: boolean,
  vote_count: number,
  vote_average: number,
  title: string,
  release_date: string,
  original_language: string,
  original_title: string,
  genre_ids: IGenres[],
  backdrop_path: string,
  adult: boolean,
  overview: string,
  poster_path: string,
  popularity: number
}