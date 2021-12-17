export interface IMyLists {
  allFavorites: Favorite[];
  watchedFavorites: Favorite[];
}

export interface Favorite {
  idHash: string;
  name: string;
  description: string;
  viewCount: number;
  creator: string;
  isWatched: boolean;
  isPublicFavorite: boolean;
  questions: Question[];
}

export interface Question {
  questionId: string;
  status: string;
  title: string;
  titleSlug: string;
}

export class MyLists implements IMyLists {
  allFavorites: Favorite[];
  watchedFavorites: Favorite[];

  constructor(allFavorites: Favorite[], watchedFavorites: Favorite[]) {
    this.allFavorites = allFavorites;
    this.watchedFavorites = watchedFavorites;
  }
}
