export interface Thread {
    _id: string;
    user: string;
    content: string;
    forum: string;
    date: Date;
    tags: [];
    views: number;
    likeCount: number;
    isDeleted: boolean;
}

export type CreateForumPayload = Omit<Thread, 'id'>