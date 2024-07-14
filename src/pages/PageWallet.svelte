<script>
  import WebApp from "@twa-dev/sdk";
  import { Block, BlockTitle } from "konsta/svelte";

  import { storeTitle, storeActiveTab } from "../stores.js";

  storeTitle.set("Wallet");
  storeActiveTab.set("wallet");

  WebApp.BackButton.hide();
</script>

<main>
  <BlockTitle>Wallet</BlockTitle>
  <Block strong>
    <p>Page under construction</p>
  </Block>
</main>
