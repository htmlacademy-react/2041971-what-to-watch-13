import { FilmCard, FilmShortCard } from '../../types/film';

type VideoPlayerProps = {
    film?: FilmShortCard;
    filmCard?: FilmCard;
}

function VideoPlayer({film, filmCard}: VideoPlayerProps): JSX.Element {
  return (
    <video src={film ? film.previewVideoLink : filmCard?.videoLink} className="player__video" poster={film ? film.previewImage : filmCard?.posterImage} muted autoPlay ></video>
  );
}

export default VideoPlayer;
