<script>
  import WebApp from "@twa-dev/sdk";
  import { ethers } from "ethers";
  import { App, Page } from "konsta/svelte";

  import LibApp from "./libs/LibApp.svelte";
  import LibWelcome from "./libs/LibWelcome.svelte";

  import { storeTitle, storeActiveTab } from "./stores.js";

  WebApp.setHeaderColor("secondary_bg_color");
  WebApp.setBackgroundColor("secondary_bg_color");
  WebApp.expand();

  let title;
  let activeTab;

  storeTitle.subscribe((val) => (title = val));
  storeActiveTab.subscribe((val) => (activeTab = val));

  let wallet = localStorage.wallet;

  import { bytesToHex, randomBytes } from "@noble/hashes/utils";
  let saltByte = randomBytes(32);
  let salt = bytesToHex(saltByte);
  console.log(saltByte);
  console.log(salt);

</script>

<svelte:head>
  <title>MyMoWallet - {title}</title>
</svelte:head>

<App theme="material">
  <Page>
    {#if wallet}
      <LibApp />
    {:else}
      <LibWelcome />
    {/if}
  </Page>
</App>
