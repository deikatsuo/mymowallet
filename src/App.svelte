<script>
  import WebApp from "@twa-dev/sdk";
  import { ethers } from "ethers";
  import { App, Page } from "konsta/svelte";

  import LibApp from "./libs/LibApp.svelte";
  import LibWelcome from "./libs/LibWelcome.svelte";

  import {
    storeTitle,
    storeActiveTab,
    storeLogin,
    storeWallet,
  } from "./stores";

  WebApp.setHeaderColor("secondary_bg_color");
  WebApp.setBackgroundColor("secondary_bg_color");
  WebApp.expand();

  let title;
  let activeTab;
  let isLogin;

  storeTitle.subscribe((val) => (title = val));
  storeActiveTab.subscribe((val) => (activeTab = val));
  storeLogin.subscribe((val) => (isLogin = val));

  let wallet = ethers.HDNodeWallet;
  storeWallet.subscribe((val) => (wallet = val));
</script>

<svelte:head>
  <title>MyMoWallet - {title}</title>
</svelte:head>

<App theme="material">
  <Page>
    {#if isLogin}
      <LibApp />
    {:else}
      <LibWelcome />
    {/if}
  </Page>
</App>
