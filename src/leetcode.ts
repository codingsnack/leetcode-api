import { ISortAndFilterParams } from './models/ISortAndFilterParams';
import { MyLists } from './my-lists';
import { GraphQLHelper } from './graphql-helper';
import { Problem } from './problem';
import { ProblemList } from './problem-list';
import { IConfig } from './models/IConfig';
import { SubmissionList } from './submission-list';
import { Constants } from './constants';
import fetch from 'node-fetch';

export default class Leetcode {
  private graphQLHelper: GraphQLHelper;

  constructor(config: IConfig) {
    const { csrfToken, session } = config;
    this.graphQLHelper = new GraphQLHelper(csrfToken, session);
  }

  async getProblem(titleSlug: string): Promise<Problem> {
    const data = await this.graphQLHelper.getProblem(titleSlug);
    const { question } = data;
    return new Problem(question);
  }

  async getMyLists(): Promise<MyLists> {
    const data = await this.graphQLHelper.getMyLists();
    const { favoritesLists } = data;
    const { allFavorites, watchedFavorites } = favoritesLists;
    return new MyLists(allFavorites, watchedFavorites);
  }

  async getProblems(params?: ISortAndFilterParams): Promise<ProblemList> {
    const data = await this.graphQLHelper.getProblems(params);
    const { problemsetQuestionList } = data;
    const { total, questions } = problemsetQuestionList;
    return new ProblemList(total, questions);
  }
  async getSubmissions(titleSlug: string): Promise<SubmissionList> {
    const data = await this.graphQLHelper.getSubmissions(titleSlug);
    const { submissionList } = data;
    const { lastKey, hasNext, submissions } = submissionList;
    return new SubmissionList(lastKey, hasNext, submissions);
  }

  async getRandomQuestion(): Promise<Problem> {
    const data = await this.graphQLHelper.getRandomQuestion();
    const { randomQuestion } = data;
    const { titleSlug } = randomQuestion;
    return await this.getProblem(titleSlug);
  }

  async getPublicList(listId: string): Promise<PublicList.IPublicList> {
    const res = await fetch(`${Constants.ENDPOINT}/list/api/get_list/${listId}/`);
    return await res.json();
  }
}
