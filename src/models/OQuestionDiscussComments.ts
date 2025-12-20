export interface OQuestionDiscussComments {
  topicComments: {
      data: {
        id: number;
        pinned: boolean;
        pinnedBy: string | null;
        post: {
          id: number;
          voteCount: number;
          voteUpCount: number;
          voteStatus: number;
          content: string;
          updationDate: number;
          creationDate: number;
          status: string;
          isHidden: string | null;
          anonymous: boolean;
          author: {
            isDiscussAdmin: boolean;
            isDiscussStaff: boolean;
            username: string;
            nameColor: string | null;
            activeBadge: {
              displayName: string;
              icon: string;
            } | null;
            profile: {
              userAvatar: string;
              reputation: number;
              realName: string;
              certificationLevel: string;
            };
            isActive: boolean;
          };
          authorIsModerator: boolean;
          isOwnPost: boolean;
        };
        intentionTag: string | null;
        numChildren: number;
      }[];
      totalNum: number;
    };
  };
}
