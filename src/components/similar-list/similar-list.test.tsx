import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmById, makeFakeFilms, makeFakeStore } from '../../utils/mocks';
import SimilarList from './similar-list';

describe('Component: SimilarList', () => {
  const film = makeFakeFilmById();
  const similarFilms = makeFakeFilms();
  const fakeStore = makeFakeStore({
    FILM_CARD: {
      film,
      similarFilms,
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false
    }
  });
  it('should render correctly', () => {
    const expectedText = 'More like this';
    const {withStoreComponent} = withStore(<SimilarList/>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
