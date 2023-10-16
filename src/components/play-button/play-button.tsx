import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type PlayButtonProps = {
    id: string;
}

function PlayButton({id}: PlayButtonProps): JSX.Element {
  const navigate = useNavigate();

  if(!id) {
    return <NotFoundScreen />;
  }

  return (
    <button
      className="btn btn--play film-card__button"
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        navigate(AppRoute.Player.replace(':id', id));
      }}
    >
      <svg viewBox="0 0 19 19" width={19} height={19}>
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default PlayButton;
