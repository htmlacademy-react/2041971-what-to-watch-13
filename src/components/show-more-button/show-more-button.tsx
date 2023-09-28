import { DEFAULT_FILMS_COUNT } from '../../const';

type ShowMoreButtonProps = {
  filmsCount: number;
  setFilmsCount: (filmsCount: number) => void;
}

function ShowMoreButton({filmsCount, setFilmsCount}: ShowMoreButtonProps): JSX.Element {
  return (
    <button
      className="catalog__button"
      type="button"
      onClick={() => setFilmsCount(filmsCount + DEFAULT_FILMS_COUNT)}
    >Show more
    </button>
  );
}

export default ShowMoreButton;
