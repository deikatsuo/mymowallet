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
import { getLocalStorage, setLocalStorage } from "./utils";

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

  setLocalStorage("salt", salt);
  setLocalStorage("seed", encSeed);
  setLocalStorage("login", true);

  buildWalletFromSeed(seed);
}

export function decryptAndBuild(password) {
  let salt = getLocalStorage("salt");
  let encPassword = encryptPassword(password, salt);
  let encSeed = getLocalStorage("seed");

  let decSeed = decryptSeed(encSeed, encPassword);
  if (!decSeed) {
    throw new Error("Wrong password");
  }
  buildWalletFromSeed(decSeed);
  storeEncryptedPassword.set(encPassword);
}

export function buildWalletFromSeed(seed) {
  let mainWallet = Wallet.fromPhrase(seed);

  storeMain.set(mainWallet);

  addWallet(mainWallet.address);
  let wallets = get(storeWallets);
  let isExistActive;
  let activeType;
  let activeNumber;
  wallets.some((w) => {
    if (w.active === true) {
      isExistActive = true;
      activeNumber = w.number;
      activeType = w.type;
    }
  });

  if (!isExistActive) {
    setStoreActiveWallet(mainWallet);
  } else {
    if (activeType === "parent") {
      setStoreActiveWallet(mainWallet);
    } else if (activeType === "child") {
      buildChildWallet(activeNumber);
    } else {
      // not implemented
    }
  }

  storeIsLogin.set(
    getLocalStorage("login") === "true" || getLocalStorage("login") === "false"
  );
}

export function buildChildWallet(number = -1) {
  let nth = nthChild();
  if (number >= 0) {
    nth = number;
  }
  let wallet = get(storeMain).deriveChild(nth);
  addWallet(wallet.address, "child", nth);
  setStoreActiveWallet(wallet);
  updateActiveWalletBalance();
  updateBalance();
}

export function nthChild() {
  let child = 0;
  let wallets = getLocalStorage('wallets') ? JSON.parse(getLocalStorage('wallets')) : [];
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
    active: false,
    balance: 0,
  };
  let wallets = getLocalStorage("wallets")
    ? JSON.parse(getLocalStorage("wallets"))
    : [];
  if (wallets.length > 0) {
    const isAddressExists = wallets.some((item) => item.address === address);
    if (!isAddressExists) {
      wallets.push(wallet);
    }
  } else {
    wallets.push(wallet);
  }

  updateLocalStorageWallets(wallets);
}

function updateLocalStorageWallets(wallets) {
  setLocalStorage("wallets", JSON.stringify(wallets));
  storeWallets.set(JSON.parse(getLocalStorage("wallets")));
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

  let wallets = get(storeWallets);
  for (let i = 0; i < wallets.length; i++) {
    let address = wallets[i].address;
    if (address === wallet.address) {
      wallets[i].active = true;
    } else {
      wallets[i].active = false;
    }
  }
  updateLocalStorageWallets(wallets);

  storeActiveWallet.set(activeWallet);
}

export function updateActiveWalletBalance() {
  waitActiveWalletBalance(get(storeActiveWallet).wallet.address);
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
