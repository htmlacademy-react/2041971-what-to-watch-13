import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { FilmShortCard, PromoFilmCard } from './film';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    avatarUrl: string;
}

export type FilmsProcess = {
    films: FilmShortCard[];
    filmsCount: number;
    filmsByGenreCount: number;
    checkedGenre: string;
    isFilmsLoading: boolean;
}

export type FilmCardProcess = {
    checkedTab: string;
}

export type FavoriteProcess = {
    favorite: FilmShortCard[];
}

export type PromoFilmProcess = {
    promoFilm: PromoFilmCard | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
