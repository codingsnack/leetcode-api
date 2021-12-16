import { Constants } from './constants';
import { Problem, IProblem } from './problem';
import { gql, GraphQLClient } from 'graphql-request';

interface Config {
  csrfToken: string;
  session: string;
}

export default class Leetcode {
  private csrfToken: string;
  private session: string;
  private graphQLClient: GraphQLClient;

  constructor(config: Config) {
    const { csrfToken, session } = config;
    this.csrfToken = csrfToken;
    this.session = session;
    this.graphQLClient = this.initGraphQLClient(csrfToken, session);
  }

  initGraphQLClient(csrfToken: string, session: string): GraphQLClient {
    return new GraphQLClient(Constants.API_URL, {
      headers: {
        referer: Constants.ENDPOINT,
        [Constants.X_CSRFTOKEN_HEADER_KEY]: csrfToken,
        Cookie: this.generateCookie(csrfToken, session),
      },
    });
  }

  generateCookie(csrfToken: string, session: string): string {
    return `csrftoken=${csrfToken};LEETCODE_SESSION=${session}`;
  }

  async getProblem(titleSlug: string): Promise<Problem> {
    const variables = { titleSlug };
    const query = gql`
      query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          questionFrontendId
          title
          titleSlug
          content
          isPaidOnly
          difficulty
          likes
          dislikes
          isLiked
          similarQuestions
          exampleTestcases
          companyTagStats
          stats
          hints
          sampleTestCase
        }
      }
    `;
    const data = await this.graphQLClient.request(query, JSON.stringify(variables));
    const { question } = data;
    return new Problem(question);
  }
}
