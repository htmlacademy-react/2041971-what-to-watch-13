import classNames from 'classnames';
import FilmOverview from '../../components/film-overview/film-overview';
import FilmDetails from '../../components/film-details/film-details';
import FilmReviews from '../../components/film-reviews/film-reviews';
import { TABS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCheckedTab } from '../../store/film-card-process/film-card-process.selector';
import { changeTab } from '../../store/film-card-process/film-card-process.slice';
import { FilmCard } from '../../types/film';

type TabsProps = {
  filmById: FilmCard;
}

function Tabs({filmById}: TabsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const checkedTab = useAppSelector(getCheckedTab);
  const handleTabClick = (tab: string) => {
    dispatch(changeTab(tab));
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {TABS.map((tab) => (
            <li key={tab} className={classNames('film-nav__item', {'film-nav__item--active': tab === checkedTab})}>
              <a
                href="#"
                className="film-nav__link"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleTabClick(tab);
                }}
              >{tab}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {checkedTab === TABS[0] && <FilmOverview film={filmById} />}
      {checkedTab === TABS[1] && <FilmDetails film={filmById} />}
      {checkedTab === TABS[2] && <FilmReviews id={filmById.id} />}
    </div>
  );
}

export default Tabs;
