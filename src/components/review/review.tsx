import { Comment } from '../../types/comment';

type ReviewProps = {
  comment: Comment;
}

function Review({comment}: ReviewProps): JSX.Element {
  const {user, rating} = comment;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Review;
