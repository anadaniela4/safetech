import { ActionType } from './ActionsTypes';
import {
  ServiceGetLatestMovies,
  ServiceGetMovieById,
  ServiceGetRecomendationsById
} from '../Services/Services';
import { ISelectedMovie } from '../Store/Interfaces';

export const GetMoviesList = () => {
  return async dispatch => {
    const LastestMoviesList = await ServiceGetLatestMovies();
    
    dispatch({
      type: ActionType.MOVIES_LIST,
      payload: LastestMoviesList
    });
  };
};

export const GetMovieById = (id: string) => {
  return async dispatch => {
    const movie = await ServiceGetMovieById(id);
    
    dispatch({
      type: ActionType.SELECTED_MOVIE,
      payload: movie
    });
  };
};

export const GetRecomendationsById = (id: string) => {
  return async dispatch => {
    const recomendations = await ServiceGetRecomendationsById(id);
    
    dispatch({
      type: ActionType.RECOMENDATIONS_BY_ID,
      payload: recomendations
    });
  };
};

export const AddProductOnBag = (product: ISelectedMovie) => {
  return async dispatch => {
    dispatch({
      type: ActionType.ADD_PRODUCTS_ON_BAG,
      payload: product
    });
  };
};

export const RemoveProductOnBag = (product: ISelectedMovie) => {
  return async dispatch => {
    dispatch({
      type: ActionType.REMOVE_PRODUCTS_ON_BAG,
      payload: product
    });
  };
};

export const GetBag = () => {
  return async dispatch => {
    let bag;
    let bagSession = sessionStorage.getItem("bag")
    
    if (bagSession) {
      bag = JSON.parse(bagSession)
    }

    dispatch({
      type: ActionType.UPDATE_PRODUCTS_ON_BAG,
      payload: bag
    });
  };
};
