import { random, system, internet, datatype, name, date } from 'faker';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { FilmCard, FilmFavoriteCard, FilmShortCard, PromoFilmCard } from '../types/film';
import { Comment, Review } from '../types/comment';
import { AuthorizationStatus } from '../const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

const GENRES = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thrillers'];

const makeFakeFilm = (): FilmShortCard => ({
  id: crypto.randomUUID(),
  name: random.words(),
  previewImage: system.filePath(),
  previewVideoLink: internet.url(),
  genre: GENRES[Math.floor(Math.random() * GENRES.length)],
});

export const makeFakeFilms = () => Array.from({length: 5}, makeFakeFilm);

export const makeFakeFilmById = (): FilmCard => ({
  id: crypto.randomUUID(),
  name: random.words(),
  posterImage: system.filePath(),
  backgroundImage: system.filePath(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  description: random.words(),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.findName(),
  starring: [name.findName(), name.findName()],
  runTime: datatype.number(),
  genre: GENRES[Math.floor(Math.random() * GENRES.length)],
  released: datatype.number(),
  isFavorite: datatype.boolean()
});

const makeFakeComment = (): Comment => ({
  id: crypto.randomUUID(),
  date: String(date.recent()),
  user: name.findName(),
  comment: random.words(),
  rating: datatype.number(),
});

export const makeFakeComments = () => Array.from({length: 5}, makeFakeComment);

export const makeFakeReview = (): Review => ({
  comment: random.words(),
  rating: datatype.number(),
});

export const makeFakeFavorite = (): FilmFavoriteCard => ({
  id: crypto.randomUUID(),
  name: random.words(),
  previewImage: system.filePath(),
  previewVideoLink: internet.url(),
  genre: GENRES[Math.floor(Math.random() * GENRES.length)],
  posterImage: system.filePath(),
  backgroundImage: system.filePath(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  description: random.words(),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: random.words(),
  starring: [name.findName(), name.findName()],
  runTime: datatype.number(),
  released: datatype.number(),
  isFavorite:  datatype.boolean(),
});

export const makeFakePromo = (): PromoFilmCard => ({
  id: crypto.randomUUID(),
  name: random.words(),
  posterImage: system.filePath(),
  backgroundImage: system.filePath(),
  videoLink: internet.url(),
  genre: GENRES[Math.floor(Math.random() * GENRES.length)],
  released: datatype.number(),
  isFavorite: datatype.boolean(),
});


export const makeFakeStore = (initialState?: Partial<State>): State => ({
  FILMS: {films: [], filmsByGenreCount: 0, isFilmsLoading: false, hasFilmsError: false},
  FILM_CARD: {
    film: null,
    similarFilms: [],
    comments: [],
    comment: null,
    isFilmCardLoading: false,
    hasFilmCardError: false,
    isCommentsLoading: false,
    hasCommentsError: false,
    isSimilarError: false,
    isCommentSending: false,
    hasCommentSendingError: false
  },
  FAVORITE: {favorites: [], isFavoritesLoading: false, hasFavoritesError: false, hasChangeStatusError: false},
  PROMO: {promoFilm: null},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: ''},
  ...initialState ?? {},
});
