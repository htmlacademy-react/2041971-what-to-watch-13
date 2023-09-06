import { FilmShortCard } from '../../types/film';
import { useState } from 'react';

type SmallFilmCardProps = {
  film: FilmShortCard;
}

function SmallFilmCard({film}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, id} = film;

  const [/*selectedFilm*/, setSelectedFilm] = useState('');

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => setSelectedFilm(id)}
    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width={280} height={175} />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
