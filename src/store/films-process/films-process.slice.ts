import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmsProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFilmsAction } from '../api-actions';
import { DEFAULT_GENRE } from '../../const';

const initialState: FilmsProcess = {
  films: [],
  checkedGenre: DEFAULT_GENRE,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.checkedGenre = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
      });
  }
});

export const {changeGenre} = filmsProcess.actions;
