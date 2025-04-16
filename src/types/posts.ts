export interface Post {
    _id: string;
    user: string;
    content: string;
    parentPost?: string;
    tags?: string[];
    date: Date;
    views: number;
    likes: number;
    isDeleted: boolean;
}

export type CreateForumPayload = Omit<Post, 'id'>