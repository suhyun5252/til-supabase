import { create } from "zustand";

interface UserState {
  uid: string;
  name: string;
  email: string;
  //   setUser: (user: UserState) => void;
  setUser: (name: string, email: string, uid: string) => void;
}
export const useUserStore = create<UserState>((set) => ({
  uid: "",
  name: "",
  email: "",
  //   setUser: (user) => set(user),
  setUser: (name, email, uid) => set({ name, email, uid }),
}));
