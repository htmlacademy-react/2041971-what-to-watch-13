import { makeFakePromo } from '../../utils/mocks';
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
});
