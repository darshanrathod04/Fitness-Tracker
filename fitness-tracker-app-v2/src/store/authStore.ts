import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;

  saveToken:(token:string)=>Promise<void>;
  loadToken:()=>Promise<void>;
  logout:()=>Promise<void>;
}

export const useAuthStore=create<AuthState>((set)=>({

  token:null,
  isAuthenticated:false,

  saveToken:async(token)=>{
    await SecureStore.setItemAsync('jwt',token);

    set({
      token,
      isAuthenticated:true
    });
  },

  loadToken:async()=>{
    const token=await SecureStore.getItemAsync('jwt');

    set({
      token,
      isAuthenticated:!!token
    });
  },

  logout:async()=>{
    await SecureStore.deleteItemAsync('jwt');

    set({
      token:null,
      isAuthenticated:false
    });
  }

}));