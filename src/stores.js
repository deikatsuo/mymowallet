import { ethers } from "ethers";
import { readable, writable } from "svelte/store";

export const storeTitle = writable("");
export const storeActiveTab = writable("");
export const storeAskPassword = writable(false);
export const storePasswordValue = writable("");
export const storeAlertOpened = writable(false);
export const storeAlertMessage = writable("");

let callback = function (){};
export const storeCallback = writable(callback);

let isLogin;
if (localStorage.login) {
  isLogin = true;
} else {
  isLogin = false;
}

export const storeLogin = writable(isLogin);

let wallets = [];
if (localStorage.wallets) {
  wallets = localStorage.wallets;
}

export const storeWallets = writable(wallets);

let activeWallet = {};
if (localStorage.active) {
  activeWallet = localStorage.active;
}

export const storeActiveWallet = writable(activeWallet);

let wallet = ethers.HDNodeWallet;

export const storeWallet = writable(wallet);

let main = ethers.HDNodeWallet;

export const storeMain = writable(main);

