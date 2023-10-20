import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { FilmCard, FilmShortCard, PromoFilmCard } from './film';
import { Comment, Review } from './comment';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    avatarUrl: string;
}

export type FilmsProcess = {
    films: FilmShortCard[];
    filmsByGenreCount: number;
    isFilmsLoading: boolean;
    hasFilmsError: boolean;
}

export type FilmCardProcess = {
    film: FilmCard | null;
    similarFilms: FilmShortCard[];
    comments: Comment[];
    comment: Review | null;
    isFilmCardLoading: boolean;
    hasFilmCardError: boolean;
    isCommentsLoading: boolean;
    hasCommentsError: boolean;
    isSimilarError: boolean;
    isCommentSending: boolean;
    hasCommentSendingError: boolean;
}

export type FavoriteProcess = {
    favorites: FilmShortCard[];
    isFavoritesLoading: boolean;
    hasFavoritesError: boolean;
    hasChangeStatusError: boolean;
}

export type PromoFilmProcess = {
    promoFilm: PromoFilmCard | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
