export type Comment = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}

export type Review = {
  comment: string;
  rating: number;
}
