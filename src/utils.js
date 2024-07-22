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
  storeEncryptedPassword.set(encPassword);

  buildWalletFromSeed(decSeed);
}

export function buildWalletFromSeed(seed) {
  let wallet = Wallet.fromPhrase(seed);

  storeMain.set(wallet);

  addWallet(wallet.address);
  setStoreActiveWallet(wallet);

  storeIsLogin.set(localStorage.login);
}

export function addWallet(address, type = "parent", number = -1, key = "") {
  let wallet = {
    address: address,
    type: type,
    number: number,
    key: key,
    active: true,
  };
  let wallets = localStorage.wallets ? JSON.parse(localStorage.wallets) : [];
  if (wallets.length > 0) {
    const isAddressExists = wallets.some((item) => item.address === address);
    if (!isAddressExists) {
      wallets.some((item) => (item.address = false));
      wallets.push(wallet);
    }
  } else {
    wallets.push(wallet);
  }

  localStorage.wallets = JSON.stringify(wallets);
  storeWallets.set(localStorage.wallets);
}

export function setStoreActiveWallet(
  wallet = ethers.HDNodeWallet,
  type = "parent",
  number = 0
) {
  let activeWallet = {
    wallet: wallet,
    type: type,
    number: number,
  };

  storeActiveWallet.set(activeWallet);
}

export function getToken() {
  let wallet = get(storeActiveWallet).wallet;
  waitToken(wallet);
}

async function waitToken(wallet) {
  let balance = await moProvider.getBalance(wallet.address);
  let currency = get(storeCurrency);
  if (currency === "idr") {
    storeBalance.set({ balance: ethers.formatEther(balance), local: "Rp" });
  } else if (currency === "usd") {
    storeBalance.set({ balance: ethers.formatEther(balance), local: "$" });
  }
  console.log("Balance ", balance);
  console.log("Balance Format ", ethers.formatEther(balance));
  console.log("Balance Number ", parseFloat(ethers.formatEther(balance)));
}
