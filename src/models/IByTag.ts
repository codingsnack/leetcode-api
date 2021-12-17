import { IDifficulty } from './IDifficulty';
import { ITopicTag } from './ITopicTag';

export interface IByTag {
  name: string;
  slug: string;
  questions: TopicTagQuestion[];
  frequencies: string;
}

export interface TopicTagQuestion {
  status: string;
  questionId: string;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  stats: string;
  difficulty: IDifficulty;
  isPaidOnly: boolean;
  topicTags: ITopicTag[];
  companyTags: ITopicTag[];
  frequency: number;
  freqBar: number;
}
