import classNames from 'classnames';
import FilmOverview from '../../components/film-overview/film-overview';
import FilmDetails from '../../components/film-details/film-details';
import FilmReviews from '../../components/film-reviews/film-reviews';
import { DEFAULT_TAB, Tab } from '../../const';
import { FilmCard } from '../../types/film';
import { useState } from 'react';

type TabsProps = {
  filmById: FilmCard;
}

function Tabs({filmById}: TabsProps): JSX.Element {
  const [checkedTab, setCheckedTab] = useState(DEFAULT_TAB);
  const handleTabClick = (tab: string) => {
    setCheckedTab(tab);
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(Tab).map((tab) => (
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
      {checkedTab === Tab.Overview && <FilmOverview film={filmById} />}
      {checkedTab === Tab.Details && <FilmDetails film={filmById} />}
      {checkedTab === Tab.Reviews && <FilmReviews id={filmById.id} />}
    </div>
  );
}

export default Tabs;
