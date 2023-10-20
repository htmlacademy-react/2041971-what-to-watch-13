import { makeFakePromo } from '../../utils/mocks';
import { fetchPromoFilmAction } from '../api-actions';
import { promoFilmProcess } from './promo-film-process.slice';

describe('PromoFilmProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      promoFilm: makeFakePromo(),
    };

    const result = promoFilmProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      promoFilm: null,
    };

    const result = promoFilmProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "promoFilm" with "fetchFilmsAction.fulfilled"', () => {
    const promoFilm = makeFakePromo();
    const expectedState = {
      promoFilm,
    };

    const result = promoFilmProcess.reducer(undefined, fetchPromoFilmAction.fulfilled(promoFilm, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
