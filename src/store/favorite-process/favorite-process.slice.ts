import { createSlice } from '@reduxjs/toolkit';
import { FavoriteProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchChangeFavoriteStatusAction, fetchFavoriteAction } from '../api-actions';

const initialState: FavoriteProcess = {
  favorites: [],
  isFavoritesLoading: false,
  hasFavoritesError: false,
  hasChangeStatusError: false,
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.hasFavoritesError = false;
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.hasFavoritesError = false;
        state.isFavoritesLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.isFavoritesLoading = false;
        state.hasFavoritesError = true;
      })
      .addCase(fetchChangeFavoriteStatusAction.fulfilled, (state, action) => {
        state.hasChangeStatusError = false;
        const {genre, id, name, previewImage, previewVideoLink} = action.payload;

        if (action.payload.isFavorite) {
          state.favorites.push({genre, id, name, previewImage, previewVideoLink});
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.id);
        }
      })
      .addCase(fetchChangeFavoriteStatusAction.rejected, (state) => {
        state.hasChangeStatusError = true;
      });
  }
});
