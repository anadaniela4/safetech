import {
  IMoviesList,
  ISelectedMovie,
  IRecomendations
} from '../Store/Interfaces';

export enum ActionType {
  MOVIES_LIST = 'MOVIES_LIST',
  SELECTED_MOVIE = 'SELECTED_MOVIE',
  RECOMENDATIONS_BY_ID = 'RECOMENDATIONS_BY_ID',
  ADD_PRODUCTS_ON_BAG = 'ADD_PRODUCTS_ON_BAG',
  REMOVE_PRODUCTS_ON_BAG = 'REMOVE_PRODUCTS_ON_BAG',
  UPDATE_PRODUCTS_ON_BAG = 'UPDATE_PRODUCTS_ON_BAG'
}


export interface IUpdateMoviesList {
  type : ActionType.MOVIES_LIST,
  payload : IMoviesList
}

export interface ISelectedMovieType {
  type : ActionType.SELECTED_MOVIE,
  payload : ISelectedMovie
}

export interface IRecomentationsType {
  type : ActionType.RECOMENDATIONS_BY_ID,
  payload : IRecomendations[]
}

export interface IAddProducstOnBagType {
  type : ActionType.ADD_PRODUCTS_ON_BAG,
  payload : ISelectedMovie[]
}

export interface IUpdateProducstOnBagType {
  type : ActionType.UPDATE_PRODUCTS_ON_BAG,
  payload : ISelectedMovie[]
}

export interface IRemoveProducstOnBagType {
  type : ActionType.REMOVE_PRODUCTS_ON_BAG,
  payload : ISelectedMovie
}

export type Actions =
  | IUpdateMoviesList
  | ISelectedMovieType
  | IRecomentationsType
  | IAddProducstOnBagType
  | IUpdateProducstOnBagType
  | IRemoveProducstOnBagType;
