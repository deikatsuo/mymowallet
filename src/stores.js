import { ethers } from "ethers";
import { writable } from "svelte/store";

export const storeTitle = writable("");
export const storeActiveTab = writable("");
export const storeAlert = writable({ open: false, message: "" });
export const storePassword = writable({
  open: false,
  hideCancleButton: false,
  password: "",
  encryptedPassword: "",
});
export const storeCallback = writable(function () {});
export const storeIsLogin = writable(localStorage.login ? true : false);
export const storeWallets = writable(
  localStorage.wallets ? localStorage.wallets : []
);
export const storeActiveWallet = writable({
  wallet: ethers.HDNodeWallet,
  type: "parent",
  number: 0,
});
export const storeMain = writable(ethers.HDNodeWallet);
