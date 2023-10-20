import { render, screen } from '@testing-library/react';
import VideoPlayer from './video-player';

describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'video';
    render(<VideoPlayer />);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
