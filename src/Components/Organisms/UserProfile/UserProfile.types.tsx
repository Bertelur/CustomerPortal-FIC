export type ApiResponse<T> = {
  message: string;
  data: T;
};

export interface UserProfileProps {
  _id: string;
  nama: string;
  email: string;
}
