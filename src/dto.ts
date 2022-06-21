export interface HttpResponse<T> {
  data?: T;
  paging?: { current: number; limit: number; total: number };
  message?: string;
  status?: string;
}

export interface HttpRequest<T> {
  data: T;
  paging?: { current: number; limit: number };
  sort?: { field: string; order: string }[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  refreshExpire: string | null;
  time: number | undefined;
}

export interface User {
  _id: string;
  name?: string | null;
  surname?: string | null;
  username: string;
  password: string;
  email: string;
  role?: string | number;
  image?: string | null;
  isNew?: boolean;
}
