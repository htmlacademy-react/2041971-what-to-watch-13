import { State } from '../../types/state';
import { PromoFilmCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getPromoFilm = (state: State): PromoFilmCard => state[NameSpace.Promo].promoFilm;
