import classNames from 'classnames';
import { TABS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCheckedTab } from '../../store/film-card-process/film-card-process.selector';
import { changeTab } from '../../store/film-card-process/film-card-process.slice';

function Tabs(): JSX.Element {
  const dispatch = useAppDispatch();
  const checkedTab = useAppSelector(getCheckedTab);
  const handleTabCheck = (tab: string) => {
    dispatch(changeTab(tab));
  };

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {TABS.map((tab) => (
          <li key={tab} className={classNames('film-nav__item', {'film-nav__item--active': tab === checkedTab})}>
            <a
              href="#"
              className="film-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                handleTabCheck(tab);
              }}
            >{tab}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Tabs;
