<script>
  import { Block, Button, BlockTitle, List, ListInput } from "konsta/svelte";
  import QRCodeStyling from "qr-code-styling";
  import { storeActiveWallet, storeToast } from "../stores";
  import IconCurrencyUsd from "../components/IconCurrencyUsd.svelte";
  import { copyText } from "../utils";

  let amount;
  let qrBlobURL;

  let data =
    "https://t.me/mymowallet_bot/app?transferTo=" +
    $storeActiveWallet.wallet.address;

  const onInputAmount = (e) => {
    e = e.target.value;
    if (!e) {
      e = 0;
    }
    if (!validAmount(e)) {
      $storeToast = { open: true, message: "Please input valid amount" };
      setTimeout(() => {
        $storeToast = { open: false, message: "" };
      }, 3000);
    } else {
      if (e > 0) {
        amount = e;
      } else {
        amount = 0;
      }
      generateQR();
    }
  };

  const validAmount = (e) => {
    return !isNaN(e) && !isNaN(parseFloat(e));
  };

  function generateQR() {
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: data + "-" + amount,
      image: "/mymowallet.svg",
      dotsOptions: {
        color: "#4267b2",
        type: "rounded",
      },
      backgroundOptions: {
        color: "transparent",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    qrCode.getRawData().then((v) => {
      qrBlobURL = URL.createObjectURL(v);
    });
  }
  generateQR();
</script>

<BlockTitle>Your Mo Address</BlockTitle>
<Block>
  <Button tonal onClick={() => copyText($storeActiveWallet.wallet.address)}
    >{$storeActiveWallet.wallet.address}</Button
  >
</Block>
<div class="flex justify-center">
  <img src={qrBlobURL} alt="QR Code" />
</div>
<div class="flex justify-center">
  <p>Scan QR with camera to send MO to your wallet</p>
</div>
<Block class="space-y-4">
  <List strongIos insetIos>
    <ListInput
      outline
      label="Amount"
      floatingLabel
      type="text"
      placeholder="MO"
      onInput={onInputAmount}
    >
      <IconCurrencyUsd slot="media" />
    </ListInput>
  </List>
</Block>
