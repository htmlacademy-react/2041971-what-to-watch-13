export const GENRES = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thrillers'];

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
    Favorite = 'FAVORITE',
    Promo = 'PROMO',
}

export const AUTH_TOKEN_KEY_NAME = 'wtw-token';
export const BACKEND_URL = 'https://13.design.pages.academy/wtw';
export const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
    Films = '/films',
    Favorite = '/favorite',
    Promo = '/promo',
    Login = '/login',
    Logout = '/logout',
}
