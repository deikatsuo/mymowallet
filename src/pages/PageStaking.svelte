<script>
  import WebApp from "@twa-dev/sdk";
  import { Block, BlockTitle } from "konsta/svelte";
  import { storeTitle, storeActiveTab } from "../stores.js";

  storeTitle.set("Staking");
  storeActiveTab.set("staking");

  WebApp.BackButton.hide();
</script>

<main>
  <BlockTitle>Staking</BlockTitle>
  <Block strong>
    <p>Page under construction</p>
  </Block>
</main>
