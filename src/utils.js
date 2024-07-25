import { storeAlert } from "./stores";

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
      storeAlert.set({ open: true, message: "Mnemonic copied successfully" });
    })
    .catch((err) => {
      storeAlert.set({
        open: true,
        message: "Error copying nemonic phrase: " + err,
      });
    });
}
