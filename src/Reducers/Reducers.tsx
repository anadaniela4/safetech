import { ActionType, Actions } from '../Actions/ActionsTypes';
import { IStateApp } from '../Store/Interfaces';
import {
  reduceMoviesList,
  reduceSelectedMovie,
  reduceRecomendations,
  reduceAddProductsOnBag,
  reduceRemoveProductsOnBag,
  reduceUpdateProductsOnBag
} from './ReducerImplements';

export const initialState: IStateApp = {
  moviesList: [],
  selectedMovie: null,
  recomendationsList: null,
  bag: []
};

function Reducer(state: IStateApp, action: Actions) {
  switch (action.type) {
    case ActionType.MOVIES_LIST:
      return { ...state, ...reduceMoviesList(action) }
    case ActionType.SELECTED_MOVIE:
      return { ...state, ...reduceSelectedMovie(action) }
    case ActionType.RECOMENDATIONS_BY_ID:
      return { ...state, ...reduceRecomendations(action) }
    case ActionType.ADD_PRODUCTS_ON_BAG:
      return { ...state, ...reduceAddProductsOnBag(action, state) }
    case ActionType.REMOVE_PRODUCTS_ON_BAG:
      return { ...state, ...reduceRemoveProductsOnBag(action, state) }
    case ActionType.UPDATE_PRODUCTS_ON_BAG:
      return { ...state, ...reduceUpdateProductsOnBag(action) }
    default:
      return state;
  }
}

export default Reducer;
