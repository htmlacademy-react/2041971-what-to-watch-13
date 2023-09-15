import { FilmShortCard } from './types/film';
import { DEFAULT_GENRE } from './const';

export function getCurrentGenresList(films: FilmShortCard[]):string[] {
  const genres = Array.from(new Set(films.map((film) => film.genre))).slice(0, 9);
  genres.unshift(DEFAULT_GENRE);
  return genres;
}

export function getCurrentFilmsList(films: FilmShortCard[], genre: string) {
  if (genre === DEFAULT_GENRE) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
}

export function validPassword(password: string | undefined) {
  if (
    !password ||
    password.length < 2 ||
    !/\d/.test(password) ||
    !/\D/i.test(password) ||
    false
  ) {
    return false;
  }

  return true;
}


export function validEmail(email: string | undefined) {
  if (
    !email ||
    !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email) ||
    false
  ) {
    return false;
  }

  return true;
}
