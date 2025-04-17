import { api } from "./api";

export const getReplies= async(threadID: string) =>  {
    const data = await api.get(`/threads/${threadID}/posts`);
    return data;
}

export const getThread = async(threadID: string) => {
    const data = await api.get(`/threads/${threadID}`);
    return data;
}
