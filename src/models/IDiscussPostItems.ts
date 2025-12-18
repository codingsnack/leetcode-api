export enum ArticleOrderByEnum {
  HOT = 'HOT',
  MOST_RECENT = 'MOST_RECENT',
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
  skip: 50,
  first: 50,
};
