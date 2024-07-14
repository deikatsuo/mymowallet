import CryptoJS from "crypto-js";
import { ethers } from "ethers";

export function generateSalt() {
  let saltByte = ethers.randomBytes(32);
  return ethers.hexlify(saltByte).substring(2);
}

export function encryptString(string, salt) {
  let cihper = CryptoJS.AES.encrypt(string, salt);
  return cihper.toString();
}

export function decryptString(cipher, salt) {
  let string = CryptoJS.AES.decrypt(cipher, salt);
  return string.toString(CryptoJS.enc.Utf8);
}
