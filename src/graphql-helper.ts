import { gql, GraphQLClient } from 'graphql-request';
import { Constants } from './constants';

export class GraphQLHelper {
  private graphQLClient: GraphQLClient;

  constructor(csrfToken: string, session: string) {
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

  async getProblem(titleSlug: string) {
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
    return await this.graphQLClient.request(query, JSON.stringify(variables));
  }

  async getMyLists() {
    const query = gql`
      query favoritesList {
        favoritesLists {
          allFavorites {
            idHash
            name
            description
            viewCount
            creator
            isWatched
            isPublicFavorite
            questions {
              questionId
              status
              title
              titleSlug
            }
          }
          watchedFavorites {
            idHash
            name
            description
            viewCount
            creator
            isWatched
            isPublicFavorite
            questions {
              questionId
              status
              title
              titleSlug
            }
          }
        }
      }
    `;
    return await this.graphQLClient.request(query);
  }
}
