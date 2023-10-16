import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeComments, makeFakeFavorite, makeFakeFilmById, makeFakeFilms, makeFakePromo, makeFakeReview } from '../utils/mocks';
import { checkAuthAction, fetchChangeFavoriteStatusAction, fetchCommentsAction, fetchFavoriteAction, fetchFilmByIdAction, fetchFilmsAction, fetchPromoFilmAction, fetchSendReviewAction, fetchSimilarFilmsAction, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';
import * as userStorage from '../services/user';

describe('Async axtions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({FILMS: {films: []}});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmsAction', () => {
    it('should dispatch "fetchFilmsAction.pending" and "fetchFilmsAction.fulfilled" when server response 200', async () => {
      const mockFilms = makeFakeFilms();
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, mockFilms);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "fetchFilmsAction.pending" and "fetchFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(400, []);

      await store.dispatch(fetchFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectRout", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = {email: 'test@test.ru', password: '123456'};
      const fakeServerReply = {token: 'secret'};
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken", "saveAvatarUrl" once with the received token', async () => {
      const fakeUser: AuthData = {email: 'test@test.ru', password: '123456'};
      const fakeServerReply = {token: 'secret', avatarUrl: 'https://13.design.pages.academy/static/avatar/8.jpg'};
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
      const mockSaveAvatarUrl = vi.spyOn(userStorage, 'saveAvatarUrl');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveAvatarUrl).toBeCalledTimes(1);

      expect(mockSaveToken).toBeCalledWith(fakeServerReply.token);
      expect(mockSaveAvatarUrl).toBeCalledWith(fakeServerReply.avatarUrl);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logout.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken", "dropAvatarUrl" with "logoutAction"',async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
      const mockDropAvatarUrl = vi.spyOn(userStorage, 'dropAvatarUrl');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
      expect(mockDropAvatarUrl).toBeCalledTimes(1);
    });
  });

  describe('fetchFilmByIdAction', () => {
    const mockFilm = makeFakeFilmById();

    it('should dispatch "fetchFilmByIdAction.pending" and "fetchFilmByIdAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${mockFilm.id}`).reply(200, mockFilm);

      await store.dispatch(fetchFilmByIdAction(mockFilm.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmByIdActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmByIdAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmByIdAction.pending.type,
        fetchFilmByIdAction.fulfilled.type,
      ]);

      expect(fetchFilmByIdActionFulfilled.payload).toEqual(mockFilm);
    });

    it('should dispatch "fetchFilmByIdAction.pending" and "fetchFilmByIdAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${mockFilm.id}`).reply(400, {});

      await store.dispatch(fetchFilmByIdAction(mockFilm.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmByIdAction.pending.type,
        fetchFilmByIdAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    it('should dispatch "fetchSimilarFilmsAction.pending" and "fetchSimilarFilmsAction.fulfilled" when server response 200', async () => {
      const id = makeFakeFilmById().id;
      const mockFilms = makeFakeFilms();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}/similar`).reply(200, mockFilms);

      await store.dispatch(fetchSimilarFilmsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsActionFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "fetchSimilarFilmsAction.pending" and "fetchSimilarFilmsAction.rejected" when server response 400', async () => {
      const id = makeFakeFilmById().id;
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}/similar`).reply(400, []);

      await store.dispatch(fetchSimilarFilmsAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.fulfilled" when server response 200', async () => {
      const id = makeFakeFilmById().id;
      const mockComments = makeFakeComments();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(200, mockComments);

      await store.dispatch(fetchCommentsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);

      expect(fetchCommentsActionFulfilled.payload).toEqual(mockComments);
    });

    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.rejected" when server response 400', async () => {
      const id = makeFakeFilmById().id;
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(400, []);

      await store.dispatch(fetchCommentsAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('fetchSendReviewAction', () => {
    it('should dispatch "fetchSendReviewAction.pending", "redirectRout", and "fetchSendReviewAction.fulfilled" when server response 200', async () => {
      const mockReview = makeFakeReview();
      const id = makeFakeFilmById().id;
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(200);

      await store.dispatch(fetchSendReviewAction({id, rating: mockReview.rating, comment: mockReview.comment}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchSendReviewAction.pending.type,
        redirectToRoute.type,
        fetchSendReviewAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchSendReviewAction.pending" and "fetchSendReviewAction.rejected" when server response 400', async () => {
      const id = makeFakeFilmById().id;
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(400);

      await store.dispatch(fetchSendReviewAction({id, rating: mockReview.rating, comment: mockReview.comment}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSendReviewAction.pending.type,
        fetchSendReviewAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteAction', () => {
    it('should dispatch "fetchFavoriteAction.pending" and "fetchFavoriteAction.fulfilled" when server response 200', async () => {
      const mockFilms = makeFakeFilms();
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFilms);

      await store.dispatch(fetchFavoriteAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteAction.pending.type,
        fetchFavoriteAction.fulfilled.type,
      ]);

      expect(fetchFavoriteActionFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "fetchFavoriteAction.pending" and "fetchFavoriteAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoriteAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteAction.pending.type,
        fetchFavoriteAction.rejected.type,
      ]);
    });
  });

  describe('fetchChangeFavoriteStatusAction', () => {
    const id = makeFakeFilmById().id;
    const status = 1;
    it('should dispatch "fetchChangeFavoriteStatusAction.pending", "fetchChangeFavoriteStatusAction.fulfilled" when server response 200', async () => {
      const mockFavorite = makeFakeFavorite();
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${status}`).reply(200, mockFavorite);

      await store.dispatch(fetchChangeFavoriteStatusAction({status, id}));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchChangeStatusActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchChangeFavoriteStatusAction.fulfilled>;

      expect(actions).toEqual([
        fetchChangeFavoriteStatusAction.pending.type,
        fetchChangeFavoriteStatusAction.fulfilled.type,
      ]);

      expect(fetchChangeStatusActionFulfilled.payload).toEqual(mockFavorite);
    });

    it('should dispatch "fetchChangeFavoriteStatusAction.pending" and "fetchChangeFavoriteStatusAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${status}`).reply(400, {});

      await store.dispatch(fetchChangeFavoriteStatusAction({status, id}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchChangeFavoriteStatusAction.pending.type,
        fetchChangeFavoriteStatusAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilmAction', () => {
    it('should dispatch "fetchPromoFilmAction.pending" and "fetchPromoFilmAction.fulfilled" when server response 200', async () => {
      const mockPromo = makeFakePromo();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromo);

      await store.dispatch(fetchPromoFilmAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);

      expect(fetchPromoActionFulfilled.payload).toEqual(mockPromo);
    });

    it('should dispatch "fetchPromoFilmAction.pending" and "fetchPromoFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, {});

      await store.dispatch(fetchPromoFilmAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.rejected.type,
      ]);
    });
  });
});
