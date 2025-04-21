export interface Thread {
    _id: string;
    authorID: string
    title: string;
    forumID: string;
    mainPostID?: string;
}

export type CreateThreadPayload = Omit<Thread, '_id'>
