<script>
  import WebApp from "@twa-dev/sdk";
  import { Block, BlockTitle, Button } from "konsta/svelte";

  import { storeTitle, storeActiveTab } from "../stores.js";

  storeTitle.set("Setting");
  storeActiveTab.set("setting");

  WebApp.BackButton.hide();
</script>

<main>
  <BlockTitle>Setting</BlockTitle>
  <Block strong>
    <p>Page under construction</p>
  </Block>
</main>
