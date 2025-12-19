export enum ArticleOrderByEnum {
  HOT = 'HOT',
  MOST_RECENT = 'MOST_RECENT',
  MOST_RELEVANT = 'MOST_RELEVANT',
  MOST_VOTES = 'MOST_VOTES',
  MOST_VOTES_WEEK = 'MOST_VOTES_WEEK',
  MOST_VOTES_MONTH = 'MOST_VOTES_MONTH',
}

export interface IDiscussPostItems {
  orderBy?: ArticleOrderByEnum;
  keywords?: string[];
  tagSlugs?: string[];
  skip?: number;
  first?: number;
}

export const defaultDiscussPostItems: IDiscussPostItems = {
  orderBy: ArticleOrderByEnum.HOT,
  keywords: [''],
  tagSlugs: ['compensation'],
  skip: 0,
  first: 50,
};
