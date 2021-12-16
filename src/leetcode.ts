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
}
