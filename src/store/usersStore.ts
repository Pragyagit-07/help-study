import { create } from 'zustand';
import axios from 'axios';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company: { name: string };
}

interface UsersState {
  users: User[];
  total: number;
  fetchUsers: (limit?: number, skip?: number) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  total: 0,
  fetchUsers: async (limit = 10, skip = 0) => {
    const res = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    set({ users: res.data.users, total: res.data.total });
  },
  searchUsers: async (query) => {
    const res = await axios.get(`https://dummyjson.com/users/search?q=${query}`);
    set({ users: res.data.users, total: res.data.total });
  },
}));
