import { get } from "svelte/store";
import WebApp from "@twa-dev/sdk";
import { storeAlert, storeLocalPrefix, storeToast } from "./stores";

export function setLocalStorage(s, v) {
  localStorage.setItem(`${get(storeLocalPrefix)}${s}`, v);
}

export function getLocalStorage(s) {
  return localStorage.getItem(`${get(storeLocalPrefix)}${s}`);
}

export function removeLocalStorage(s) {
  localStorage.removeItem(`${get(storeLocalPrefix)}${s}`);
}

export function truncateAddress(address = "0x") {
  let endChars = 5;
  let totalChars = 12;
  const start = address.slice(0, totalChars - endChars);
  const end = address.slice(-endChars);

  return start + "…" + end;
}

export function copyText(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast("Copied successfully");
    })
    .catch((err) => {
      storeAlert.set({
        open: true,
        message: "Error copying: " + err,
      });
    });
}

export function validAmount(n) {
  const numberPattern = /^[0-9]*\.?[0-9]+$/;
  return numberPattern.test(n);
}

export function toHex(n) {
  let result = "";
  let split = n.split(".");
  if (split.length > 1) {
    result =
      Number(split[0]).toString(16) + "_" + Number(split[1]).toString(16);
  } else {
    result = Number(n).toString(16);
  }

  return result;
}

export function fromHex(n) {
  let result = 0;
  let split = n.split("_");
  if (split.length > 1) {
    let merge = parseInt(split[0], 16) + "." + parseInt(split[1], 16);
    result = parseFloat(merge);
  } else {
    result = parseInt(n, 16);
  }

  return result;
}

export function scanQR() {}

export function toast(text) {
  storeToast.set({ open: true, message: text });
  setTimeout(() => {
    storeToast.set({ open: false, message: "" });
  }, 3000);
}
