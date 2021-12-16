import { Constants } from './constants';
export interface IProblem {
  questionId: string;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  content: string;
  translatedTitle: null;
  translatedContent: null;
  isPaidOnly: boolean;
  difficulty: string;
  likes: number;
  dislikes: number;
  isLiked: null;
  similarQuestions: string;
  exampleTestcases: string;
  companyTagStats: string;
  stats: string;
  hints: string[];
  sampleTestCase: string;
}

export class Problem implements IProblem {
  questionId: string;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  content: string;
  translatedTitle: null;
  translatedContent: null;
  isPaidOnly: boolean;
  difficulty: string;
  likes: number;
  dislikes: number;
  isLiked: null;
  similarQuestions: string;
  exampleTestcases: string;
  companyTagStats: string;
  stats: string;
  hints: string[];
  sampleTestCase: string;
  url: string;

  constructor(question: IProblem) {
    const {
      questionId,
      questionFrontendId,
      title,
      titleSlug,
      content,
      translatedTitle,
      translatedContent,
      isPaidOnly,
      difficulty,
      likes,
      dislikes,
      isLiked,
      similarQuestions,
      exampleTestcases,
      companyTagStats,
      stats,
      hints,
      sampleTestCase,
    } = question;

    this.questionId = questionId;
    this.questionFrontendId = questionFrontendId;
    this.title = title;
    this.titleSlug = titleSlug;
    this.content = content;
    this.translatedTitle = translatedTitle;
    this.translatedContent = translatedContent;
    this.isPaidOnly = isPaidOnly;
    this.difficulty = difficulty;
    this.likes = likes;
    this.dislikes = dislikes;
    this.isLiked = isLiked;
    this.similarQuestions = similarQuestions;
    this.exampleTestcases = exampleTestcases;
    this.companyTagStats = companyTagStats;
    this.stats = stats;
    this.hints = hints;
    this.sampleTestCase = sampleTestCase;
    this.url = `${Constants.ENDPOINT}/problems/${titleSlug}`;
  }
}
