export interface Forum {
    _id: string;
    name: string;
    description: string;
}

export type CreateForumPayload = Omit<Forum, 'id'>