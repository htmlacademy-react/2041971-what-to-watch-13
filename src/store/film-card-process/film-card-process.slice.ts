import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmCardProcess } from '../../types/state';
import { NameSpace, DEFAULT_TAB } from '../../const';

const initialState: FilmCardProcess = {
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
//   extraReducers(builder) {
//     builder
//       .addCase(fetchFilmsAction.fulfilled, (state, action) => {
//         state.films = action.payload;
//       });
//   }
});

export const {changeTab} = filmCardProcess.actions;
