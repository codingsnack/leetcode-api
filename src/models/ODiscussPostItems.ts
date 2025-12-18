export interface ODiscussPostItems {
  ugcArticleDiscussionArticles: {
    totalNum: number;
    pageInfo: {
      hasNextPage: boolean;
    };
    edges: {
      node: {
        uuid: string;
        title: string;
        slug: string;
        summary: string;
        author: {
          realName: string;
          userAvatar: string;
          userSlug: string;
          userName: string;
          nameColor: string | null;
          certificationLevel: string;
          activeBadge: {
            icon: string;
            displayName: string;
          };
        };
        isOwner: boolean;
        isAnonymous: boolean;
        isSerialized: boolean;
        scoreInfo: any | null; // Can be more specific if needed
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
          tagType: string;
        }[];
        topic: {
          id: number;
          topLevelCommentCount: number;
        };
      };
    }[];
  };
}
