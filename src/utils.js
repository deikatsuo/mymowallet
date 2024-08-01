import { storeAlert, storeToast } from "./stores";

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
      storeToast.set({ open: true, message: "Copied successfully" });
      setTimeout(() => {
        storeToast.set({ open: false, message: "" });
      }, 3000);
    })
    .catch((err) => {
      storeAlert.set({
        open: true,
        message: "Error copying: " + err,
      });
    });
}

export function validAmount(e) {
  return !isNaN(e) && !isNaN(parseFloat(e));
};