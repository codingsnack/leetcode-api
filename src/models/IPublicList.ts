namespace PublicList {
  export interface IPublicList {
    id_hash: string;
    name: string;
    description: string;
    questions: Question[];
    is_public_favorite: boolean;
    view_count: number;
    creator: string;
    current_user: string;
    is_watched: boolean;
  }

  export interface Question {
    id: number;
    title: string;
    title_slug: string;
  }
}
