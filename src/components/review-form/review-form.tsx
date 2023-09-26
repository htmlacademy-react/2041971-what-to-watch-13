import { Fragment, useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSendReviewAction } from '../../store/api-actions';
import { validateComment } from '../../utils';
import { getCommentSendingErrorStatus, getCommentSendingStatus } from '../../store/film-card-process/film-card-process.selector';

const REVIEW_TEXT = 'review-text';

type ReviewFormProps = {
  id: string;
}

function ReviewForm({id}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isSending = useAppSelector(getCommentSendingStatus);
  const isCommentSendingError = useAppSelector(getCommentSendingErrorStatus);

  const [formData, setFormData] = useState({
    rating: 0,
    [REVIEW_TEXT]: '',
  });
  const isCommentValid = validateComment(formData[REVIEW_TEXT]);
  const [isValidComment, setValidComment] = useState(true);

  const handleFormDataChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    let parsedValue: string | number = value;

    if (name === 'rating') {
      parsedValue = Number(value);
    }

    setFormData({
      ...formData,
      [name]: parsedValue});

    setValidComment(isCommentValid);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const rating = formData.rating;
    const comment = formData[REVIEW_TEXT];

    if (rating && isCommentValid) {
      dispatch(fetchSendReviewAction({id, rating, comment}));
    }
  };

  return (
    <form
      action="#"
      className="add-review__form"
      onSubmit={handleFormSubmit}
    >
      <div className="rating">
        <div className="rating__stars">
          {(Array.from({length: 10}, (_, k) => (
            <Fragment key={`rating__${k}`}>
              <input
                className="rating__input"
                id={`star-${k + 1}`}
                type="radio"
                name="rating"
                value={k + 1}
                onChange={handleFormDataChange}
                disabled={isSending}
              />
              <label className="rating__label" htmlFor={`star-${k + 1}`}>{`Rating ${k + 1}`}</label>
            </Fragment>
          )
          )).reverse()}
        </div>
      </div>
      {!formData.rating && <p>Pleas add rating</p>}
      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={handleFormDataChange}
          disabled={isSending}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isCommentValid || !formData.rating || isSending}>Post</button>
        </div>
      </div>
      {!isValidComment && <p>The length must be more than 50 and less than 400</p>}
      {isCommentSendingError && <p>Something went wrong, try again</p>}
    </form>
  );
}

export default ReviewForm;
