import { NameSpace } from '../../const';
import { makeFakeFilms } from '../../utils/mocks';
import { getFilms, getFilmsCountByGenre, getFilmsErrorStatus, getFilmsLoadingStatus } from './films-process.selector';

describe('films-process selectors', () => {
  const state = {
    [NameSpace.Films]: {
      films: makeFakeFilms(),
      filmsByGenreCount: 5,
      isFilmsLoading: true,
      hasFilmsError: false,
    }
  };

  it('should return films from state', () => {
    const {films} = state[NameSpace.Films];
    const result = getFilms(state);
    expect(result).toEqual(films);
  });

  it('should return films count by genre from state', () => {
    const {filmsByGenreCount} = state[NameSpace.Films];
    const result = getFilmsCountByGenre(state);
    expect(result).toBe(filmsByGenreCount);
  });

  it('should return filmss data loading status', () => {
    const {isFilmsLoading} = state[NameSpace.Films];
    const result = getFilmsLoadingStatus(state);
    expect(result).toBe(isFilmsLoading);
  });

  it('should return films data error status from state', () => {
    const {hasFilmsError} = state[NameSpace.Films];
    const result = getFilmsErrorStatus(state);
    expect(result).toBe(hasFilmsError);
  });
});
