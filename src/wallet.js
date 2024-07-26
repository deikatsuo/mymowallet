import { get } from "svelte/store";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import {
  storeEncryptedPassword,
  storeActiveWallet,
  storeIsLogin,
  storeMain,
  storeWallets,
  storeBalance,
  storeCurrency,
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
  let cipher = CryptoJS.AES.encrypt(seed, password);
  return cipher.toString();
}

export function decryptSeed(cipher, password) {
  let seed = CryptoJS.AES.decrypt(cipher, password);
  return seed.toString(CryptoJS.enc.Utf8);
}

export function encryptPassword(password, salt) {
  let hmac = CryptoJS.HmacSHA256(password, salt);
  return hmac.toString();
}

export function encryptAndBuild(seed, password) {
  let salt = generateSalt();
  let encPassword = encryptPassword(password, salt);
  let encSeed = encryptSeed(seed, encPassword);

  storeEncryptedPassword.set(encPassword);
  localStorage.salt = salt;
  localStorage.seed = encSeed;
  localStorage.login = true;

  buildWalletFromSeed(seed);
}

export function decryptAndBuild(password) {
  let salt = localStorage.salt;
  let encPassword = encryptPassword(password, salt);
  let encSeed = localStorage.seed;

  let decSeed = decryptSeed(encSeed, encPassword);
  if (!decSeed) {
    throw new Error("Wrong password");
  }
  buildWalletFromSeed(decSeed);
  storeEncryptedPassword.set(encPassword);
}

export function buildWalletFromSeed(seed) {
  let wallet = Wallet.fromPhrase(seed);

  storeMain.set(wallet);

  addWallet(wallet.address);
  setStoreActiveWallet(wallet);

  storeIsLogin.set(localStorage.login);
}

export function nthChild() {
  let child = 0;
  let wallets = localStorage.wallets ? JSON.parse(localStorage.wallets) : [];
  wallets.some((wallet) => {
    if (wallet.type === "child") {
      child += 1;
    }
  });
  return child;
}

export function addWallet(address, type = "parent", number = -1, key = "") {
  let wallet = {
    address: address,
    type: type,
    number: number,
    key: key,
    active: true,
    balance: 0,
  };
  let wallets = localStorage.wallets ? JSON.parse(localStorage.wallets) : [];
  if (wallets.length > 0) {
    const isAddressExists = wallets.some((item) => item.address === address);
    if (!isAddressExists) {
      wallets.some((iw) => (iw.active = false));
      wallets.push(wallet);
    }
  } else {
    wallets.push(wallet);
  }

  updateLocalStorageWallets(wallets);
}

function updateLocalStorageWallets(wallets) {
  localStorage.wallets = JSON.stringify(wallets);
  storeWallets.set(JSON.parse(localStorage.wallets));
}

export function setStoreActiveWallet(
  wallet = ethers.HDNodeWallet,
  type = "parent",
  number = -1
) {
  let activeWallet = {
    wallet: wallet,
    type: type,
    number: number,
  };

  storeActiveWallet.set(activeWallet);
}

export function getActiveWalletBalance(address) {
  waitActiveWalletBalance(address);
}

async function waitActiveWalletBalance(address) {
  let balance = await moProvider.getBalance(address);
  storeBalance.set(parseFloat(ethers.formatEther(balance)));
}

export async function updateBalance() {
  let wallets = get(storeWallets);
  for (let i = 0; i < wallets.length; i++) {
    let balance = await waitUpdateBalance(wallets[i].address);
    wallets[i].balance = parseFloat(ethers.formatEther(balance));
  }
  updateLocalStorageWallets(wallets);
}

async function waitUpdateBalance(address) {
  let balance = await moProvider.getBalance(address);
  return balance;
}
