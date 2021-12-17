import { MyLists } from './my-lists';
import { GraphQLHelper } from './graphql-helper';
import { Problem } from './problem';

interface Config {
  csrfToken: string;
  session: string;
}

export default class Leetcode {
  private graphQLHelper: GraphQLHelper;

  constructor(config: Config) {
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
}
