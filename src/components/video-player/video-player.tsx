import { FilmCard, FilmShortCard } from '../../types/film';
import { forwardRef } from 'react';

type VideoPlayerProps = {
    film?: FilmShortCard;
    filmCard?: FilmCard;
    onTimeUpdate?: () => void;
}

const VideoPlayer = forwardRef<null | HTMLVideoElement, VideoPlayerProps>(({film, filmCard, onTimeUpdate}, ref) => (
  <video
    ref={ref}
    src={film ? film.previewVideoLink : filmCard?.videoLink}
    className="player__video"
    poster={film ? film.previewImage : filmCard?.posterImage}
    muted autoPlay
    onTimeUpdate={onTimeUpdate}
  >
  </video>));

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
