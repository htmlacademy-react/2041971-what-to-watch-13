import { useAppDispatch } from '../../hooks';
import { changeFilmsCount } from '../../store/films-process/films-process.slice';

function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <button
      className="catalog__button"
      type="button"
      onClick={() => dispatch(changeFilmsCount())}
    >Show more
    </button>
  );
}

export default ShowMoreButton;
