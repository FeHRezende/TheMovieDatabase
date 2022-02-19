import axios from 'axios';
const API_KEY = '1fa853000dd334b4115f711b80abea48';

const getPopularMovies = async (page) => await axios.get(`https://api.themoviedb.org/3/movie/popular?&api_key=${API_KEY}&page=${page}&language=pt-BR`)
  .then((response) => response.data)

const getMovie = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
  .then((response) => response.data)

const getTrailers = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`)
  .then((response) => response.data)

const getRecommendations = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=pt-BR`)
  .then((response) => response.data)

const getCredits = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`)
  .then((response) => response.data)

const getReleaseDates = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}&language=pt-BR`)
  .then((response) => response.data)

const getGenres = async () => await axios.get(`https://api.themoviedb.org/3/genre/movie/list?&api_key=${API_KEY}&language=pt-BR`)
  .then((response) => response.data)

export { getPopularMovies, getMovie, getTrailers, getRecommendations, getCredits, getReleaseDates, getGenres };
