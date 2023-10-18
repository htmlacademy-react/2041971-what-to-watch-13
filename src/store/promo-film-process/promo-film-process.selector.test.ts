import { NameSpace } from '../../const';
import { makeFakePromo } from '../../utils/mocks';
import { getPromoFilm } from './promo-film-process.selector';

describe('promo-film-process selectors', () => {
  const state = {
    [NameSpace.Promo]: {
      promoFilm: makeFakePromo(),
    }
  };

  it('should return promo film from state', () => {
    const {promoFilm} = state[NameSpace.Promo];
    const result = getPromoFilm(state);
    expect(result).toEqual(promoFilm);
  });
});
