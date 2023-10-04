import { FilmCard, FilmShortCard } from '../../types/film';
import { forwardRef } from 'react';

type VideoPlayerProps = {
    film?: FilmShortCard;
    filmCard?: FilmCard;
    onTimeUpdate?: () => void;
}

const VideoPlayer = forwardRef(({film, filmCard, onTimeUpdate}: VideoPlayerProps, ref) => (
  <video
    ref={ref}
    src={film ? film.previewVideoLink : filmCard?.videoLink}
    className="player__video"
    poster={film ? film.previewImage : filmCard?.posterImage}
    muted autoPlay
    onTimeUpdate={onTimeUpdate}
  >
  </video>));

// function VideoPlayer({film, filmCard, ref}: VideoPlayerProps): JSX.Element {

//   return (
//     <video ref={ref} src={film ? film.previewVideoLink : filmCard?.videoLink} className="player__video" poster={film ? film.previewImage : filmCard?.posterImage} muted autoPlay ></video>
//   );
// }

export default VideoPlayer;
