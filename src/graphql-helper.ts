import { gql, GraphQLClient } from 'graphql-request';
import { Constants } from './constants';
import { ISortAndFilterParams } from './models/ISortAndFilterParams';
import { IFavoriteQuestionList } from './models/IFavoriteQuestion';

export class GraphQLHelper {
  private static readonly QUESTION_FIELDS = `
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
          acRate
          difficulty
          freqBar
          isFavor
          status
          topicTags {
            name
            id
            slug
          }
          hasSolution
          hasVideoSolution
    `;
  private static readonly TAG_QUESTION_FIELDS = `
            status
            questionId
            freqBar
            questionFrontendId
            title
            titleSlug
            stats
            difficulty
            isPaidOnly
            topicTags {
              name
              slug
            }
            companyTags {
              name
              slug
            }
  `;
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
            ${GraphQLHelper.QUESTION_FIELDS}
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

  async getProblems(params?: ISortAndFilterParams) {
    const { categorySlug = '', skip = 0, limit = 100, filters = {} } = params || {};
    const variables = { categorySlug, skip, limit, filters };

    const query = gql`
      query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
          total: totalNum
          questions: data {
            ${GraphQLHelper.QUESTION_FIELDS}
          }
        }
      }
    `;
    return await this.graphQLClient.request(query, JSON.stringify(variables));
  }

  async getSubmissions(questionSlug: string) {
    const variables = { offset: 0, limit: 100, lastKey: null, questionSlug };
    const query = gql`
      query Submissions($offset: Int!, $limit: Int!, $lastKey: String, $questionSlug: String!) {
        submissionList(offset: $offset, limit: $limit, lastKey: $lastKey, questionSlug: $questionSlug) {
          lastKey
          hasNext
          submissions {
            id
            statusDisplay
            lang
            runtime
            timestamp
            url
            isPending
            memory
          }
        }
      }
    `;
    return await this.graphQLClient.request(query, JSON.stringify(variables));
  }

  async getRandomQuestion() {
    const variables = { categorySlug: '', filters: {} };
    const query = gql`
      query randomQuestion($categorySlug: String, $filters: QuestionListFilterInput) {
        randomQuestion(categorySlug: $categorySlug, filters: $filters) {
          titleSlug
        }
      }
    `;
    return await this.graphQLClient.request(query, JSON.stringify(variables));
  }

  async getProblemsByTag(tag: string) {
    const variables = { slug: tag };

    const query = gql`
      query getTopicTag($slug: String!) {
        topicTag(slug: $slug) {
          name
          slug
          questions {
            ${GraphQLHelper.TAG_QUESTION_FIELDS}
          }
          frequencies
        }
      }
    `;
    return await this.graphQLClient.request(query, JSON.stringify(variables));
  }
  async getProblemsByCompany(company: string) {
    const variables = { slug: company };

    const query = gql`
      query getCompanyTag($slug: String!) {
        companyTag(slug: $slug) {
          name
          questions {
            ${GraphQLHelper.TAG_QUESTION_FIELDS}
          }
          frequencies
        }
      }
    `;
    return await this.graphQLClient.request(query, JSON.stringify(variables));
  }

  async addQuestionToFavorite(favoriteSlug: string, questionSlug: string): Promise<{ ok: boolean; error: string }> {
    const variables = { favoriteSlug, questionSlug };
    const query = gql`
      mutation addQuestionToFavoriteV2($favoriteSlug: String!, $questionSlug: String!) {
        addQuestionToFavoriteV2(favoriteSlug: $favoriteSlug, questionSlug: $questionSlug) {
          ok
          error
        }
      }
    `;
    const data: any = await this.graphQLClient.request(query, JSON.stringify(variables));
    const { addQuestionToFavoriteV2 } = data;
    return { ok: addQuestionToFavoriteV2.ok, error: addQuestionToFavoriteV2.error };
  }

  async batchAddQuestionsToFavorite(favoriteSlug: string, questionSlugs: string[]): Promise<{ ok: boolean; error: string }> {
    const variables = { favoriteSlug, questionSlugs };
    const query = gql`
      mutation batchAddQuestionsToFavorite($favoriteSlug: String!, $questionSlugs: [String!]!) {
        batchAddQuestionsToFavorite(favoriteSlug: $favoriteSlug, questionSlugs: $questionSlugs) {
          ok
          error
        }
      }
    `;
    const data: any = await this.graphQLClient.request(query, JSON.stringify(variables));
    const { batchAddQuestionsToFavorite } = data;
    return { ok: batchAddQuestionsToFavorite.ok, error: batchAddQuestionsToFavorite.error };
  }

  async getFavoriteQuestionList(
    favoriteSlug: string,
    skip = 0,
    limit = 100
  ): Promise<IFavoriteQuestionList> {
    const query = gql`
      query favoriteQuestionList(
        $favoriteSlug: String!,
        $filter: FavoriteQuestionFilterInput,
        $filtersV2: QuestionFilterInput,
        $searchKeyword: String,
        $sortBy: QuestionSortByInput,
        $limit: Int,
        $skip: Int,
        $version: String
      ) {
        favoriteQuestionList(
          favoriteSlug: $favoriteSlug,
          filter: $filter,
          filtersV2: $filtersV2,
          searchKeyword: $searchKeyword,
          sortBy: $sortBy,
          limit: $limit,
          skip: $skip,
          version: $version
        ) {
          questions {
            difficulty
            id
            paidOnly
            questionFrontendId
            status
            title
            titleSlug
            topicTags {
              name
              slug
            }
          }
          totalLength
          hasMore
        }
      }
    `;

    const variables = {
      favoriteSlug,
      skip,
      limit,
      searchKeyword: '',
      filtersV2: {
        filterCombineType: 'ALL',
        statusFilter: { questionStatuses: [], operator: 'IS' },
        difficultyFilter: { difficulties: [], operator: 'IS' },
        languageFilter: { languageSlugs: [], operator: 'IS' },
        topicFilter: { topicSlugs: [], operator: 'IS' },
        acceptanceFilter: {},
        frequencyFilter: {},
        frontendIdFilter: {},
        lastSubmittedFilter: {},
        publishedFilter: {},
        companyFilter: { companySlugs: [], operator: 'IS' },
        positionFilter: { positionSlugs: [], operator: 'IS' },
        positionLevelFilter: { positionLevelSlugs: [], operator: 'IS' },
        contestPointFilter: { contestPoints: [], operator: 'IS' },
        premiumFilter: { premiumStatus: [], operator: 'IS' }
      },
      sortBy: {
        sortField: 'CUSTOM',
        sortOrder: 'ASCENDING'
      },
      version: 'v2'
    };

    const data = await this.graphQLClient.request<{
      favoriteQuestionList: IFavoriteQuestionList;
    }>(query, variables);

    return data.favoriteQuestionList;
  }

  async getFavoriteDetail(favoriteSlug: string) {
    const query = gql`
      query favoriteDetailV2($favoriteSlug: String!) {
        favoriteDetailV2(favoriteSlug: $favoriteSlug) {
          description
          creator {
            realName
            userAvatar
            userSlug
          }
          isPublicFavorite
          name
          questionNumber
          slug
          isDefaultList
        }
      }
    `;
    return await this.graphQLClient.request(query, { favoriteSlug });
  }
}