import {
  ISelectedMovie,
  IRecomendations
} from './Interfaces'

export interface IStateApp {
  moviesList: [];
  selectedMovie: ISelectedMovie | null,
  recomendationsList: IRecomendations[]  | null,
  bag: ISelectedMovie[] | []
}

export interface IMoviesList {
  id: string;
  description: string;
}
