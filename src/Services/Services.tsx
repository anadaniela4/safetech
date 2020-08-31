import axios from 'axios';
import {
  ISelectedMovie,
  IRecomendations
} from '../Store/Interfaces'

const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

const API_KEY = process.env.REACT_APP_API_KEY

export async function ServiceGetLatestMovies() {  
  try {
    const { data } = await instanceAxios.get(`3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
    return data.results;
  } catch (e) {
    throw e;
  }
}

export async function ServiceGetMovieById<ISelectedMovie>(id: string) {
  try {
    const { data } = await instanceAxios.get(`3/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function ServiceGetRecomendationsById(id: string) {
  try {
    const { data } = await instanceAxios.get(`3/movie/${id}/recommendations?api_key=${API_KEY}&language=pt-BR&page=1`);
    return data.results;
  } catch (e) {
    throw e;
  }
}
