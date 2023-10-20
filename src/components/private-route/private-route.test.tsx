import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.MyList);
    mockHistory.push(AppRoute.AddReview);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'privet route';
    const prepearedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.SignIn} element={<span>{expectedText}</span>} />
        <Route element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth} />}>
          <Route path={AppRoute.MyList} element={<span>{notExpectedText}</span>} />
          <Route path={AppRoute.AddReview} element={<span>{notExpectedText}</span>} />
        </Route>
      </Routes>,
      mockHistory
    );

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'privet route';
    const notExpectedText = 'public route';
    const prepearedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.SignIn} element={<span>{notExpectedText}</span>} />
        <Route element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth} />}>
          <Route path={AppRoute.MyList} element={<span>{expectedText}</span>} />
          <Route path={AppRoute.AddReview} element={<span>{expectedText}</span>} />
        </Route>
      </Routes>,
      mockHistory
    );

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
