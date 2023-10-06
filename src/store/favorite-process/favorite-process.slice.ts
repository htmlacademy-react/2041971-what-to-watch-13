import { createSlice } from '@reduxjs/toolkit';
import { FavoriteProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchChangeFavoriteStatusAction, fetchFavoriteAction } from '../api-actions';

const initialState: FavoriteProcess = {
  favorite: [],
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorite = action.payload;
      })
      .addCase(fetchChangeFavoriteStatusAction.fulfilled, (state, action) => {
        const {genre, id, name, previewImage, previewVideoLink} = action.payload;

        if (action.payload.isFavorite) {
          state.favorite.push({genre, id, name, previewImage, previewVideoLink});
        } else {
          state.favorite = state.favorite.filter((offer) => offer.id !== action.payload.id);
        }
      });
  }
});
