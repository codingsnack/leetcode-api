export interface ODiscussPostDetail {
  data: {
    ugcArticleDiscussionArticle: {
      uuid: string;
      title: string;
      slug: string;
      summary: string;
      content: string;
      isSlate: boolean;
      author: {
        realName: string;
        userAvatar: string;
        userSlug: string;
        userName: string;
        nameColor: string | null;
        certificationLevel: string;
        activeBadge: string | null;
      };
      isOwner: boolean;
      isAnonymous: boolean;
      isSerialized: boolean;
      isAuthorArticleReviewer: string | null;
      scoreInfo: string | null;
      articleType: string;
      thumbnail: string;
      createdAt: string;
      updatedAt: string;
      status: string;
      isLeetcode: boolean;
      canSee: boolean;
      canEdit: boolean;
      isMyFavorite: boolean;
      myReactionType: string | null;
      topicId: number;
      hitCount: number;
      reactions: {
        count: number;
        reactionType: string;
      }[];
      tags: {
        name: string;
        slug: string;
        tagType: string | null;
      }[];
      topic: {
        id: number;
        topLevelCommentCount: number;
      };
    };
  };
}
