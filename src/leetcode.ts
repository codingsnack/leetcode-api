import { GraphQLHelper } from './graphql-helper';
import { IConfig } from './models/IConfig';
import { ISortAndFilterParams } from './models/ISortAndFilterParams';
import { MyLists } from './my-lists';
import { Problem } from './problem';
import { ProblemList } from './problem-list';
import { SubmissionList } from './submission-list';
import { TagInfo } from './tag-info';
import { IFavoriteQuestion } from './models/IFavoriteQuestion';

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
    // 1. Fetch list metadata
    const detailData = await this.graphQLHelper.getFavoriteDetail(listId);
    const detail = detailData.favoriteDetailV2;

    // 2. Fetch all questions using pagination
    const questions = await this.getFavoriteQuestions(listId);

    // 3. Find additional metadata from the user's lists
    let existingList;

    try {
      const myListsData = await this.graphQLHelper.getMyLists();
      const { allFavorites, watchedFavorites } = myListsData.favoritesLists;

      existingList = [...allFavorites, ...watchedFavorites].find(
        (list) => list.idHash === listId
      );
    } catch {
      // Optional metadata is unavailable; continue without it.
    }

    // 4. Construct the original PublicList response
    return {
      id_hash: detail.slug,
      name: detail.name,
      description: detail.description,
      questions: questions.map((question) => ({
        id: question.id,
        title: question.title,
        title_slug: question.titleSlug,
      })),
      is_public_favorite: detail.isPublicFavorite,
      creator: detail.creator.userSlug,
      ...(existingList && {
        view_count: existingList.viewCount,
        is_watched: existingList.isWatched,
      }),
    };
  }

  private async getFavoriteQuestions(
    favoriteSlug: string
  ): Promise<IFavoriteQuestion[]> {
    const limit = 100;
    let skip = 0;
    let hasMore = true;

    const allQuestions: IFavoriteQuestion[] = [];

    while (hasMore) {
      const result = await this.graphQLHelper.getFavoriteQuestionList(
        favoriteSlug,
        skip,
        limit
      );

      allQuestions.push(...result.questions);

      hasMore = result.hasMore;
      skip += limit;
    }

    return allQuestions;
  }

  async getProblemsByTag(tag: string): Promise<TagInfo> {
    const data = await this.graphQLHelper.getProblemsByTag(tag);
    const { topicTag } = data;
    const { name, slug, questions, frequencies } = topicTag;
    return new TagInfo(name, slug, questions, frequencies);
  }

  async getProblemsByCompany(company: string): Promise<TagInfo> {
    const data = await this.graphQLHelper.getProblemsByCompany(company);
    const { companyTag } = data;
    const { name, slug, questions, frequencies } = companyTag;
    return new TagInfo(name, slug, questions, frequencies);
  }

  async getSimilarProblems(titleSlug: string, depth = 1): Promise<Problem> {
    const problem = await this.getProblem(titleSlug);
    const visited: Set<String> = new Set();
    const q: Problem[] = [];
    q.push(problem);
    while (q.length > 0 && depth > 0) {
      const length = q.length;
      for (let i = 0; i < length; i++) {
        const currentProblem: Problem = q.shift()!;
        if (visited.has(currentProblem.titleSlug)) continue;
        visited.add(currentProblem.titleSlug);
        await this.fillSimilarProblems(currentProblem);
        q.push(...currentProblem.similarProblems);
      }
      depth--;
    }
    return problem;
  }

  private async fillSimilarProblems(problem: Problem) {
    const similarProblemsParsed: Object[] = this.parseSimilarQuestions(problem);

    for (let i = 0; i < similarProblemsParsed.length; i++) {
      const item: any = similarProblemsParsed[i];
      const { titleSlug } = item;
      const currentProblem = await this.getProblem(titleSlug);
      problem.similarProblems.push(currentProblem);
    }
  }

  private parseSimilarQuestions(problem: Problem) {
    const { similarQuestions } = problem;
    return similarQuestions ? JSON.parse(problem.similarQuestions) : [];
  }

  async addQuestionToFavorite(favoriteSlug: string, questionSlug: string): Promise<{ ok: boolean; error: string }> {
    const data = await this.graphQLHelper.addQuestionToFavorite(favoriteSlug, questionSlug);
    const { ok, error } = data;
    return { ok, error };
  }

  async batchAddQuestionsToFavorite(favoriteSlug: string, questionSlugs: string[]): Promise<{ ok: boolean; error: string }> {
    const data = await this.graphQLHelper.batchAddQuestionsToFavorite(favoriteSlug, questionSlugs);
    const { ok, error } = data;
    return { ok, error };
  }
}