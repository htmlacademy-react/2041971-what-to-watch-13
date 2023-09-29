import { FilmCard, FilmShortCard } from '../../types/film';

type VideoPlayerProps = {
    film?: FilmShortCard;
    filmCard?: FilmCard;
    ref: HTMLVideoElement;
}

function VideoPlayer({film, filmCard, ref}: VideoPlayerProps): JSX.Element {
  return (
    <video ref={ref} src={film ? film.previewVideoLink : filmCard?.videoLink} className="player__video" poster={film ? film.previewImage : filmCard?.posterImage} muted autoPlay ></video>
  );
}

export default VideoPlayer;
