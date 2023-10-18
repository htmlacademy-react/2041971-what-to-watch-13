import { State } from '../../types/state';
import { PromoFilmCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getPromoFilm = (state: Pick<State, NameSpace.Promo>): PromoFilmCard | null => state[NameSpace.Promo].promoFilm;
