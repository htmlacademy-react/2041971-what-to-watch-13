import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilmById, getFilmCardLoadingStatus } from '../../store/film-card-process/film-card-process.selector';
import { fetchFilmByIdAction } from '../../store/api-actions';
import { getFormatRunTime } from '../../utils/utils';
import { AppRoute } from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import VideoPlayer from '../../components/video-player/video-player';
import { Helmet } from 'react-helmet-async';

function PlayerScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const filmCard = useAppSelector(getFilmById);
  const isLoading = useAppSelector(getFilmCardLoadingStatus);
  const [isPause, setIsPause] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeUpdate, setTimeUpdate] = useState(0);
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!filmCard || !id) {
    return <NotFoundScreen />;
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPause) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPause(!isPause);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setTimeLeft(Math.floor(videoRef.current.duration - videoRef.current.currentTime));
      setTimeUpdate(Math.ceil(videoRef.current.currentTime * 100 / videoRef.current.duration));
      if(videoRef.current.duration === videoRef.current.currentTime) {
        setIsPause(true);
      }
    }
  };

  return (
    <div className="player">
      <Helmet>
        <title>{`WTW. Player ${filmCard.name}`}</title>
      </Helmet>
      <VideoPlayer
        filmCard={filmCard}
        ref={videoRef}
        onTimeUpdate={handleVideoTimeUpdate}
      />
      <button
        type="button"
        className="player__exit"
        onClick={() => {
          navigate(`${AppRoute.Film}${id}`);
        }}
      >Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={timeUpdate} max={100}></progress>
            <div className="player__toggler" style={{left: `${timeUpdate}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormatRunTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => {
              togglePlay();
            }}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPause ? '#play-s' : '#pause'}></use>
            </svg>
            <span>{isPause ? 'Play' : 'Pause'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.requestFullscreen();
              }
            }}
          >
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
