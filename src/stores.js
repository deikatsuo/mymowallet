import { writable } from "svelte/store";

export const storeTitle = writable("");
export const storeActiveTab = writable("");

let isLogin;
if (localStorage.login) {
  isLogin = true;
} else {
  isLogin = false;
}

export const storeLogin = writable(isLogin);