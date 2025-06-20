import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { StorageAdapter } from '../../../config/adapters/storage-adapter';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }
    // Todo: Guardar el token en storage
    await StorageAdapter.setItem("token", resp.token); // Guardamos el token en el storage
    set({ status: "authenticated", token: resp.token, user: resp.user });
    return true;
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return;
    }
    await StorageAdapter.setItem("token", resp.token); // Guardamos el token en el storage
    set({ status: "authenticated", token: resp.token, user: resp.user });
  },
  logout: async () => {
    await StorageAdapter.removeItem("token"); // Eliminamos el token del storage
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
