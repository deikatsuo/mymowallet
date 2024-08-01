import { ethers } from "ethers";
import { writable } from "svelte/store";

export const storeTitle = writable("");
export const storeActiveTab = writable("");
export const storeAlert = writable({ open: false, message: "" });
export const storeToast = writable({ open: false, message: "" });
export const storePassword = writable({
  open: false,
  hideCancleButton: false,
  password: "",
});
export const storeEncryptedPassword = writable();
export const storeCallback = writable(function () {});
export const storeIsLogin = writable(localStorage.login ? true : false);
export const storeWallets = writable(
  localStorage.wallets ? JSON.parse(localStorage.wallets) : []
);
export const storeActiveWallet = writable({
  wallet: ethers.HDNodeWallet,
  type: "parent",
  number: 0,
});
export const storeMain = writable(ethers.HDNodeWallet);
export const storeTheme = writable("material");
let localCurrency = { currency: "", sysmbol: "" };
if (localStorage.localCurrency) {
  JSON.parse(localStorage.localCurrency);
}
export const storeCurrency = writable({
  currency: localCurrency.currency ? localCurrency.currency : "usd",
  symbol: localCurrency.symbol ? localCurrency.symbol : "$",
});
export const storeDestroy = writable(false);
export const storePrice = writable(0);
export const storeBalance = writable(0);
