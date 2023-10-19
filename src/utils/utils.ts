import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FilmShortCard } from '../types/film';
import { DEFAULT_GENRE, Rating, DURATION_DIGIT, ReviewLength, MAX_GENRES_COUNT } from '../const';

dayjs.extend(duration);
export function getCurrentGenresList(films: FilmShortCard[]):string[] {
  const genres = Array.from(new Set(films.map((film) => film.genre))).slice(0, MAX_GENRES_COUNT);
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

function getDurationFormat(time: number) {
  return time < 10 ? `0${time}` : time;
}

export function getFormatRunTime(time: number) {
  const date = dayjs.duration(time, 'seconds');
  const hours = date.hours();
  const minutes = date.minutes();
  const seconds = date.seconds();

  return `${getDurationFormat(hours)}:${getDurationFormat(minutes)}:${getDurationFormat(seconds)}`;
}

export function getDataFormat(data: string, format: string):string {
  return dayjs(data).format(format);
}

export function validateComment(comment: string) {
  return comment.length >= ReviewLength.MIN_LENGTH && comment.length <= ReviewLength.MAX_LENGTH;
}
