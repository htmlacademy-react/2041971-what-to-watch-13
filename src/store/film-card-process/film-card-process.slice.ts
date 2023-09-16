import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmCardProcess } from '../../types/state';
import { NameSpace, DEFAULT_TAB } from '../../const';
import { fetchFilmByIdAction } from '../api-actions';

const initialState: FilmCardProcess = {
  film: {},
  checkedTab: DEFAULT_TAB,
};

export const filmCardProcess = createSlice({
  name: NameSpace.FilmCard,
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string>) => {
      state.checkedTab = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  }
});

export const {changeTab} = filmCardProcess.actions;
