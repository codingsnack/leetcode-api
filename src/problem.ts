import { IProblem } from './models/IProblem';
import { Constants } from './constants';
import { IDifficulty } from './models/IDifficulty';
import { ITopicTag } from './models/ITopicTag';

export class Problem implements IProblem {
  questionId: string;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  content: string;
  isPaidOnly: boolean;
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
  difficulty: IDifficulty;
  freqBar: number;
  isFavor: boolean;
  status: string;
  topicTags: ITopicTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
  url: string;

  similarProblems: Problem[] = [];

  constructor(question: IProblem) {
    const {
      questionId,
      questionFrontendId,
      title,
      titleSlug,
      content,
      isPaidOnly,
      likes,
      dislikes,
      isLiked,
      similarQuestions,
      exampleTestcases,
      companyTagStats,
      stats,
      hints,
      sampleTestCase,
      acRate,
      difficulty,
      freqBar,
      isFavor,
      status,
      topicTags,
      hasSolution,
      hasVideoSolution,
    } = question;

    this.questionId = questionId;
    this.questionFrontendId = questionFrontendId;
    this.title = title;
    this.titleSlug = titleSlug;
    this.content = content;
    this.isPaidOnly = isPaidOnly;
    this.likes = likes;
    this.dislikes = dislikes;
    this.isLiked = isLiked;
    this.similarQuestions = similarQuestions;
    this.exampleTestcases = exampleTestcases;
    this.companyTagStats = companyTagStats;
    this.stats = stats;
    this.hints = hints;
    this.sampleTestCase = sampleTestCase;
    this.acRate = acRate;
    this.difficulty = difficulty;
    this.freqBar = freqBar;
    this.isFavor = isFavor;
    this.status = status;
    this.topicTags = topicTags;
    this.hasSolution = hasSolution;
    this.hasVideoSolution = hasVideoSolution;
    this.url = `${Constants.ENDPOINT}/problems/${titleSlug}`;
  }
}
