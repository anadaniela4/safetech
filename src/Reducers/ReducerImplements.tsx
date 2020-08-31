export function reduceMoviesList(action) {
  return { moviesList: action.payload };
}

export function reduceSelectedMovie(action) {
  return { selectedMovie: action.payload };
}

export function reduceRecomendations(action) {
  return { recomendationsList: action.payload };
}

export function reduceAddProductsOnBag(action, state) {
  let newBag = state.bag.concat(action.payload)
  sessionStorage.setItem('bag', JSON.stringify(newBag));
  return { bag: newBag };
}

export function reduceUpdateProductsOnBag(action) {
  sessionStorage.setItem('bag', JSON.stringify(action.payload));
  return { bag: action.payload };
}

export function reduceRemoveProductsOnBag(action, state) {
  let newBag = state.bag.filter(product => product.id !== action.payload.id)
  sessionStorage.setItem('bag', JSON.stringify(newBag));
  return { bag: newBag };
}
