import { createSlice } from '@reduxjs/toolkit';
import { FavoriteProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFavoriteAction } from '../api-actions';

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
      });
  }
});
