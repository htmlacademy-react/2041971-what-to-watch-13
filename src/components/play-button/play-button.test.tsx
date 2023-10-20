import { render, screen } from '@testing-library/react';
import { makeFakeFilmById } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';
import PlayButton from './play-button';

describe('Component: PlayButton', () => {
  it('should render correctly', () => {
    const id = makeFakeFilmById().id;

    const prepearedComponent = withHistory(<PlayButton id={id} />);

    render(prepearedComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
