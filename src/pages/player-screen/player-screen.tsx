import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VideoPlayer from '../../components/video-player/video-player';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilmById, getFilmCardLoadingStatus } from '../../store/film-card-process/film-card-process.selector';
import { fetchFilmByIdAction } from '../../store/api-actions';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { getFormatRunTime } from '../../utils';

function PlayerScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const filmCard = useAppSelector(getFilmById);
  const isLoading = useAppSelector(getFilmCardLoadingStatus);
  const [isPause, setIsPause] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!filmCard) {
    return <NotFoundScreen />;
  }

  return (
    <div className="player">
      <VideoPlayer filmCard={filmCard} />

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormatRunTime(filmCard.runTime)}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={(evt) => {
              evt.preventDefault();
              setIsPause((prev) => !prev);
            }}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPause ? '#play-s' : '#pause'}></use>
            </svg>
            <span>{isPause ? 'Play' : 'Pause'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
