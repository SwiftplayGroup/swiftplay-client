import { api } from "./api";

export const login = async (username: string, password: string) => {
  const response = await api.post("/user/sessions", { username, password });
  return response.data; //     .json({ ...sessionData, token: sessionToken, sessionID });
};

export const register = async (
  emailAddress: string,
  username: string,
  password: string,
) => {
  const response = await api.post("/users", {
    emailAddress,
    username,
    password,
  });
  return response.data;
};

export const logout = async (sessionID: string) => {
  const response = await api.delete(`/user/sessions/${sessionID}`);
  return response.data;
};
