import { FilmShortCard } from '../../types/film';
import { useEffect, useState } from 'react';
import VideoPlayer from '../video-player/video-player';

type SmallFilmCardProps = {
  film: FilmShortCard;
}

function SmallFilmCard({film}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, previewVideoLink} = film;

  const [isSelectedFilm, setSelectedFilm] = useState(false);
  const [isFilmMouseOver, setFilmMouseOver] = useState<boolean>(false);

  useEffect(() => {
    if (isFilmMouseOver) {
      const timer = setTimeout(() => setSelectedFilm(true), 1000);

      return () => {
        clearTimeout(timer);
        setSelectedFilm(false);
      };
    }
  }, [isFilmMouseOver]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => setFilmMouseOver(true)}
      onMouseLeave={() => setFilmMouseOver(false)}
    >
      {isSelectedFilm ? <VideoPlayer src={previewVideoLink} poster={previewImage} /> :
        <>
          <div className="small-film-card__image">
            <img src={previewImage} alt={name} width={280} height={175} />
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="film-page.html">{name}</a>
          </h3>
        </> }
    </article>
  );
}

export default SmallFilmCard;
