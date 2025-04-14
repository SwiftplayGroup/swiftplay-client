export interface Forum {
    id: string;
    name: string;
    description: string;
}

export type CreateForumPayload = Omit<Forum, 'id'>