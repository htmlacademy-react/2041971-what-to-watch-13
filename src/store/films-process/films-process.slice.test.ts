import { makeFakeFilms } from '../../utils/mocks';
import { fetchFilmsAction } from '../api-actions';
import { filmsProcess, setFilmsCountByGenre } from './films-process.slice';

describe('FilmsProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      films: makeFakeFilms(),
      filmsByGenreCount: 10,
      isFilmsLoading: false,
      hasFilmsError: false,
    };

    const result = filmsProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      films: [],
      filmsByGenreCount: 0,
      isFilmsLoading: false,
      hasFilmsError: false,
    };

    const result = filmsProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return films count by genre with "setFilmsCountByGenre" action', () => {
    const initialState = {
      films: [],
      filmsByGenreCount: 0,
      isFilmsLoading: false,
      hasFilmsError: false,
    };
    const expectedFilmsCount = 5;

    const result = filmsProcess.reducer(initialState, setFilmsCountByGenre(expectedFilmsCount));
    expect(result.filmsByGenreCount).toBe(expectedFilmsCount);
  });

  it('should set"isFilmsLoading" to true, "hasFilmsError" to false wwith "fetchFilmsAction.pending"', () => {
    const expectedState = {
      films: [],
      filmsByGenreCount: 0,
      isFilmsLoading: true,
      hasFilmsError: false,
    };

    const result = filmsProcess.reducer(undefined, fetchFilmsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set"isFilmsLoading" to false, "hasFilmsError" to true wwith "fetchFilmsAction.rejected"', () => {
    const expectedState = {
      films: [],
      filmsByGenreCount: 0,
      isFilmsLoading: false,
      hasFilmsError: true,
    };

    const result = filmsProcess.reducer(undefined, fetchFilmsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "films" to array with films, "isFilmsLoading" to false, "hasFilmsError" to false wwith "fetchFilmsAction.fulfilled"', () => {
    const films = makeFakeFilms();
    const expectedState = {
      films,
      filmsByGenreCount: 0,
      isFilmsLoading: false,
      hasFilmsError: false,
    };

    const result = filmsProcess.reducer(undefined, fetchFilmsAction.fulfilled(films, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
