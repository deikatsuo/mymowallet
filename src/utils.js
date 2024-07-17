import { get } from "svelte/store";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import {
  storePassword,
  storeActiveWallet,
  storeIsLogin,
  storeMain,
  storeWallet,
  storeWallets,
} from "./stores";
import { Wallet } from "ethers";

export const moProvider = ethers.getDefaultProvider(
  "https://mainnet-rpc.mochain.app"
);

let main = ethers.HDNodeWallet;
storeMain.subscribe((val) => {
  main = val;
});

export function generateSalt() {
  let saltByte = ethers.randomBytes(32);
  return ethers.hexlify(saltByte).substring(2);
}

export function encryptSeed(seed, password) {
  let cihper = CryptoJS.AES.encrypt(seed, password);
  return cihper.toString();
}

export function decryptSeed(cipher, password) {
  let string = CryptoJS.AES.decrypt(cipher, password);
  return string.toString(CryptoJS.enc.Utf8);
}

export function encryptPassword(password, salt) {
  let hmac = CryptoJS.HmacSHA256(password, salt);
  return hmac.toString();
}

export function encryptAndBuild(seed, password) {
  let salt = generateSalt();
  let encPassword = encryptPassword(password, salt);
  let encSeed = encryptSeed(seed, encPassword);

  storePassword.set({ encryptedPassword: encPassword });
  localStorage.salt = salt;
  localStorage.seed = encSeed;
  localStorage.login = true;

  buildWalletFromSeed(seed);
}

export function decryptAndBuild(password) {
  let salt = localStorage.salt;
  let seed = localStorage.seed;

  let encPassword = encryptSeed(password, salt);
  let decSeed = decryptSeed(seed, encPassword);

  buildWalletFromSeed(decSeed);
}

export function buildWalletFromSeed(seed) {
  let wallet = Wallet.fromPhrase(seed, moProvider);
  storeMain.set(wallet);

  addWallet(wallet.address);
  setActiveWallet(wallet.address);

  storeIsLogin.set(localStorage.login);
}

export function addWallet(address, type = "parent", number = -1, key = "") {
  let wallet = {
    address: address,
    type: type,
    number: number,
    key: key,
  };
  let wallets = localStorage.wallets;
  if (wallets) {
    wallets.push(wallet);
  } else {
    wallets = [wallet];
  }
  localStorage.wallets = wallets;
  storeWallets.set(localStorage.wallets);
}

export function setActiveWallet(
  address,
  type = "parent",
  number = -1,
  key = ""
) {
  let activeWallet = {
    address: address,
    type: type,
    number: number,
    key: key,
  };
  if (type === "parent") {
    storeWallet.set(main);
  } else if (type === "child") {
    storeWallet.set(main.deriveChild(0));
  } else {
    storeWallet.set(new ethers.Wallet(key, moProvider));
  }

  localStorage.active = activeWallet;
  storeActiveWallet.set(localStorage.active);
}
