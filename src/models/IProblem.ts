import { IDifficulty } from './IDifficulty';
import { ITopicTag } from './ITopicTag';

export interface IProblem {
  questionId: string;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  content: string;
  isPaidOnly: boolean;
  difficulty: IDifficulty;
  likes: number;
  dislikes: number;
  isLiked: null;
  similarQuestions: string;
  exampleTestcases: string;
  companyTagStats: string;
  stats: string;
  hints: string[];
  sampleTestCase: string;

  acRate: number;
  freqBar: number;
  isFavor: boolean;
  status: string;
  topicTags: ITopicTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
}
