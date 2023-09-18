import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction } from '../../store/api-actions';
import { getComments } from '../../store/film-card-process/film-card-process.selector';
import Review from '../review/review';

type FilmReviewsProps = {
  id: string;
}

function FilmReviews({id}: FilmReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);
  const index = Math.ceil(comments.length / 2);
  const fitstColComments = comments.slice(0, index);
  const secondColComments = comments.slice(index);

  useEffect(() => {
    dispatch(fetchCommentsAction(id));
  }, [id, dispatch]);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {fitstColComments.map((comment) => <Review key={comment.id} comment={comment} /> )}
      </div>
      <div className="film-card__reviews-col">
        {secondColComments.map((comment) => <Review key={comment.id} comment={comment} /> )}
      </div>
    </div>
  );
}

export default FilmReviews;
