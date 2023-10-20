import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../utils/mocks';
import Review from './review';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const comment = makeFakeComment();

    render(<Review comment={comment}/>);

    expect(screen.getByText(comment.user)).toBeInTheDocument();
  });
});
