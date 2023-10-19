import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilmById } from '../../store/film-card-process/film-card-process.selector';
import { Link, useParams } from 'react-router-dom';
import { APIRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { fetchFilmByIdAction } from '../../store/api-actions';
import ReviewForm from '../../components/review-form/review-form';
import Header from '../../components/header/header';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function AddReviewScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
    }
  }, [id, dispatch]);

  const film = useAppSelector(getFilmById);

  if(!film) {
    return <NotFoundScreen />;
  }

  return (
    <section className="film-card film-card--full" data-testid="filmCardAddReview">
      <Helmet>
        <title>{`WTW. Add review ${film.name}`}</title>
      </Helmet>
      <div className="film-card__header">
        <Header isFilmCard>
          <h1 className="visually-hidden">WTW</h1>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${APIRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.backgroundImage} alt={film.name} width={218} height={327} />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm id={film.id} />
      </div>
    </section>
  );
}

export default AddReviewScreen;
