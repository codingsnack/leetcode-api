import { gql, GraphQLClient } from 'graphql-request';
import { Constants } from './constants';
import { ISortAndFilterParams } from './models/ISortAndFilterParams';
import { ArticleOrderByEnum, IDiscussPostItems } from './models/IDiscussPostItems';
import { ODiscussPostDetail } from './models/ODiscussPostDetail';
import { OQuestionDiscussComments as OQuestionDiscussComments } from './models/OQuestionDiscussComments';
import { ODiscussPostItems } from './models/ODiscussPostItems';

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

  async getDiscussPostItems(options: IDiscussPostItems): Promise<ODiscussPostItems> {
    const { orderBy = ArticleOrderByEnum.HOT, keywords = [''], tagSlugs = [], skip = 0, first = 50 } = options;
    const variables = { orderBy, keywords, tagSlugs, skip, first };

    const query = gql`
      query discussPostItems($orderBy: ArticleOrderByEnum, $keywords: [String]!, $tagSlugs: [String!], $skip: Int, $first: Int) {
        ugcArticleDiscussionArticles(orderBy: $orderBy, keywords: $keywords, tagSlugs: $tagSlugs, skip: $skip, first: $first) {
          totalNum
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              uuid
              title
              slug
              summary
              author {
                realName
                userAvatar
                userSlug
                userName
                nameColor
                certificationLevel
                activeBadge {
                  icon
                  displayName
                }
              }
              isOwner
              isAnonymous
              isSerialized
              scoreInfo {
                scoreCoefficient
              }
              articleType
              thumbnail
              createdAt
              updatedAt
              status
              isLeetcode
              canSee
              canEdit
              isMyFavorite
              myReactionType
              topicId
              hitCount
              reactions {
                count
                reactionType
              }
              tags {
                name
                slug
                tagType
              }
              topic {
                id
                topLevelCommentCount
              }
            }
          }
        }
      }
    `;
    const data: ODiscussPostItems = await this.graphQLClient.request(query, JSON.stringify(variables));
    return data;
  }

  async discussPostDetail(topicId: string): Promise<ODiscussPostDetail> {
    const variables = { topicId };
    const query = gql`
      query discussPostDetail($topicId: ID!) {
        ugcArticleDiscussionArticle(topicId: $topicId) {
          uuid
          title
          slug
          summary
          content
          isSlate
          author {
            realName
            userAvatar
            userSlug
            userName
            nameColor
            certificationLevel
            activeBadge {
              icon
              displayName
            }
          }
          isOwner
          isAnonymous
          isSerialized
          isAuthorArticleReviewer
          scoreInfo {
            scoreCoefficient
          }
          articleType
          thumbnail
          summary
          createdAt
          updatedAt
          status
          isLeetcode
          canSee
          canEdit
          isMyFavorite
          myReactionType
          topicId
          hitCount
          reactions {
            count
            reactionType
          }
          tags {
            name
            slug
            tagType
          }
          topic {
            id
            topLevelCommentCount
          }
        }
      }
    `;
    return await this.graphQLClient.request(query, JSON.stringify(variables));
  }

  async questionDiscussComments(topicId: number, pageNo: number = 0, numPerPage: number = 10, orderBy: string = 'best'): Promise<OQuestionDiscussComments> {
    const variables = { topicId, pageNo, numPerPage, orderBy };
    const query = gql`
      query questionDiscussComments($topicId: Int!, $orderBy: String = "newest_to_oldest", $pageNo: Int = 1, $numPerPage: Int = 10) {
        topicComments(topicId: $topicId, orderBy: $orderBy, pageNo: $pageNo, numPerPage: $numPerPage) {
          data {
            id
            pinned
            pinnedBy {
              username
            }
            post {
              ...DiscussPost
            }
            intentionTag {
              slug
            }
            numChildren
          }
          totalNum
        }
      }

      fragment DiscussPost on PostNode {
        id
        voteCount
        voteUpCount
        voteStatus
        content
        updationDate
        creationDate
        status
        isHidden
        anonymous
        author {
          isDiscussAdmin
          isDiscussStaff
          username
          nameColor
          activeBadge {
            displayName
            icon
          }
          profile {
            userAvatar
            reputation
            realName
            certificationLevel
          }
          isActive
        }
        authorIsModerator
        isOwnPost
      }
    `;
    return await this.graphQLClient.request(query, JSON.stringify(variables));
  }
}
