import API from './api';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  height: number;
  weight: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  message: string;
}

export const register = async (body: RegisterRequest) => {
  const res = await API.post('/auth/register', body);
  return res.data;
};

export const login = async (
  body: LoginRequest
): Promise<AuthResponse> => {
  const res = await API.post('/auth/login', body);
  return res.data;
};