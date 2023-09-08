import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCheckedTab = (state: State): string => state[NameSpace.FilmCard].checkedTab;
