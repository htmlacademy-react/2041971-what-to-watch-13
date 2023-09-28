import { FilmShortCard } from '../../types/film';
import { useEffect, useState } from 'react';
import VideoPlayer from '../video-player/video-player';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type SmallFilmCardProps = {
  film: FilmShortCard;
}

function SmallFilmCard({film}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, previewVideoLink, id} = film;
  const navigate = useNavigate();
  const [isSelectedFilm, setSelectedFilm] = useState(false);
  const [isFilmMouseOver, setFilmMouseOver] = useState(false);

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
          <div
            className="small-film-card__image"
            onClick={() => navigate(`${AppRoute.Film}${id}`)}
          >
            <img src={previewImage} alt={name} width={280} height={175} />
          </div>
          <h3 className="small-film-card__title">
            <Link className="small-film-card__link" to={`${AppRoute.Film}${id}`}>{name}</Link>
          </h3>
        </> }
    </article>
  );
}

export default SmallFilmCard;
