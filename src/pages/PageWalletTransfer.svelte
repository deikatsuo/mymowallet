<script>
  import WebApp from "@twa-dev/sdk";
  import { navigate } from "svelte-routing";
  import {
    storeTitle,
    storeActiveWallet,
    storeEncryptedPassword,
  } from "../stores";
  import { Block, BlockTitle, Fab, List, ListInput } from "konsta/svelte";

  import IconMo from "../components/IconMo.svelte";
  import IconTransfer from "../components/iconTransfer.svelte";
  import IconQrScan from "../components/IconQrScan.svelte";

  storeTitle.set("Transfer to");

  WebApp.BackButton.onClick(() => navigate("/"));
  WebApp.BackButton.show();

  let transferFrom = $storeEncryptedPassword ? $storeActiveWallet.wallet.address : "0x";

  storeEncryptedPassword.subscribe((v) => {
    if (v) {
      transferFrom = $storeActiveWallet.wallet.address;
    }
  });

  export let transferTo;
</script>

<div class="flex justify-center">
  <Block>
    <IconTransfer class="text-md-light-surface-3" width="10em" height="10em" />
  </Block>
</div>

<BlockTitle>Transfer</BlockTitle>
<List strongIos insetIos>
  <ListInput
    outline
    label="From"
    floatingLabel
    type="text"
    placeholder="0x..."
    value={transferFrom}
    disabled
  >
    <IconMo
      class="fill-md-light-surface-2"
      width="2em"
      height="2em"
      slot="media"
    />
  </ListInput>
  <ListInput
    outline
    label="To"
    floatingLabel
    type="text"
    placeholder="0x..."
    value={transferTo}
  >
    <IconMo
      class="fill-md-light-surface-2"
      width="2em"
      height="2em"
      slot="media"
    />
  </ListInput>
</List>

<Fab
  class="fixed right-4-safe ios:bottom-16-safe bottom- material:bottom-24-safe z-20"
>
  <IconQrScan slot="icon" />
</Fab>
