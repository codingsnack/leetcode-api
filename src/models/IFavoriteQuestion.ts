export interface IFavoriteQuestion {
  id: number;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  paidOnly: boolean;
  status: string;
}

export interface IFavoriteQuestionList {
  questions: IFavoriteQuestion[];
  totalLength: number;
  hasMore: boolean;
}
