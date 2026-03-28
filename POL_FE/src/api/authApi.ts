import axios from 'axios';

const API_URL = '/api';

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  },

  async verify(token: string): Promise<{ user: User }> {
    const response = await axios.get<{ user: User }>(`${API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string, token: string): Promise<{ message: string }> {
    const response = await axios.post<{ message: string }>(
      `${API_URL}/auth/change-password`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
