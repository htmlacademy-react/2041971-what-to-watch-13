export type FilmCard = {
    id: number;
    name: string;
    posterImage: string;
    previewImage: string;
    backgroundImage: string;
    backgroundColor: string;
    videoLink: string;
    previewVideoLink: string;
    description: string;
    rating: number;
    scoresCount: number;
    director: string;
    starring: string[];
    runTime: number;
    genre: string;
    released: number;
    isFavorite: boolean;
};

export type FilmShortCard = {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
};

export type PromoFilmCard = {
    id: string;
    name: string;
    posterImage: string;
    backgroundImage: string;
    videoLink: string;
    genre: string;
    released: number;
    isFavorite: boolean;
};
