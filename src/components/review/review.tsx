import { Comment } from '../../types/comment';
import { getDataFormat } from '../../utils/utils';
import { DateFormat, RATING_DIGIT } from '../../const';

type ReviewProps = {
  comment: Comment;
}

function Review({comment}: ReviewProps): JSX.Element {
  const {user, rating, date} = comment;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime={getDataFormat(date, DateFormat.DATE_TIME_FORMAT)}>{getDataFormat(date, DateFormat.REVIEW_DATE_FORMAT)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating.toFixed(RATING_DIGIT)}</div>
    </div>
  );
}

export default Review;
