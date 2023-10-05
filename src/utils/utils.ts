import dayjs from 'dayjs';
import { FilmShortCard } from '../types/film';
import { DEFAULT_GENRE, Rating, DURATION_DIGIT } from '../const';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
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

export function validatePassword(password: string | undefined) {
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

export function validateEmail(email: string | undefined) {
  if (
    !email ||
    !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email) ||
    false
  ) {
    return false;
  }

  return true;
}

export function getTextRating(rating: number): Rating {
  switch (true) {
    case rating >= 0 && rating < 3:
      return Rating.Bad;
    case rating >= 3 && rating < 5:
      return Rating.Normal;
    case rating >= 5 && rating < 8:
      return Rating.Good;
    case rating >= 8 && rating < 10:
      return Rating.VeryGood;
    case rating === 10:
      return Rating.Awesome;
    default:
      return Rating.Default;
  }
}

export function getFormatDuration(time: number) {
  return `${Math.floor(time / DURATION_DIGIT)}h ${time % DURATION_DIGIT}m`;
}

export function getFormatRunTime(time: number) {
  const date = dayjs.duration(time);

  return `${date.minutes()}:${date.seconds()}:${date.milliseconds()}`;

}

export function getDataFormat(data: string, format: string):string {
  return dayjs(data).format(format);
}

export function validateComment(comment: string) {
  return comment.length >= 50 && comment.length <= 400;
}
