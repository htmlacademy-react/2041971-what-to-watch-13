export const TABS = ['Overview', 'Details', 'Reviews'];

export enum AppRoute {
    Main = '/',
    SignIn = '/login',
    MyList = '/mylist',
    Film = '/films/:id',
    AddReview = '/films/:id/review',
    Player = '/player/:id',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum NameSpace {
    Films = 'FILMS',
    FilmCard = 'FILM_CARD',
    Favorite = 'FAVORITE',
    Promo = 'PROMO',
    User = 'USER',
}

export const AUTH_TOKEN_KEY_NAME = 'wtw-token';
export const USER_EMAIL_KEY_NAME = 'Email';
export const BACKEND_URL = 'https://13.design.pages.academy/wtw';
export const REQUEST_TIMEOUT = 5000;
export const DEFAULT_TAB = 'Overview';
export const DEFAULT_GENRE = 'All genres';
export const DEFAULT_FILMS_COUNT = 8;

export enum APIRoute {
    Films = '/films',
    Favorite = '/favorite',
    Promo = '/promo',
    Login = '/login',
    Logout = '/logout',
}
