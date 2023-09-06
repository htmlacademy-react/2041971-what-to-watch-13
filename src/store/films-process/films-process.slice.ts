import { createSlice } from '@reduxjs/toolkit';
import { FilmsProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFilmsAction } from '../api-actions';

const initialState: FilmsProcess = {
  films: [],
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
      });
  }
});
