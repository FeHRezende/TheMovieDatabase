import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const getPopularMovies = async (page, genresIds) => await axios.get(`https://api.themoviedb.org/3/movie/popular?&api_key=${apiKey}&page=${page}&with_genres=${genresIds}&language=pt-BR`)
  .then((response) => response.data)

const getMovie = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`)
  .then((response) => response.data)

const getTrailers = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=pt-BR`)
  .then((response) => response.data)

const getRecommendations = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=pt-BR`)
  .then((response) => response.data)

const getCredits = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=pt-BR`)
  .then((response) => response.data)

const getReleaseDates = async (id) => await axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${apiKey}&language=pt-BR`)
  .then((response) => response.data)

  const getGenres = async () => await axios.get(`https://api.themoviedb.org/3/genre/movie/list?&api_key=${apiKey}&language=pt-BR`)
  .then((response) => response.data)

export { 
  getPopularMovies,
  getMovie,
  getTrailers,
  getRecommendations,
  getCredits,
  getReleaseDates, 
  getGenres,
};
