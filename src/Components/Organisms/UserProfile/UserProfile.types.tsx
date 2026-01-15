export type ApiResponse<T> = {
  message: string;
  data: T;
};

export interface UserProfileProps {
  _id?: string;
  username?: string;
  email?: string;
}
