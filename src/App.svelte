<script>
  import WebApp from "@twa-dev/sdk";
  import { ethers } from "ethers";
  import { App, Page } from "konsta/svelte";

  import LibApp from "./libs/LibApp.svelte";
  import LibWelcome from "./libs/LibWelcome.svelte";

  import { storeTitle, storeActiveTab, storeLogin } from "./stores";

  WebApp.setHeaderColor("secondary_bg_color");
  WebApp.setBackgroundColor("secondary_bg_color");
  WebApp.expand();

  let title;
  let activeTab;
  let isLogin;

  storeTitle.subscribe((val) => (title = val));
  storeActiveTab.subscribe((val) => (activeTab = val));
  storeLogin.subscribe((val) => (isLogin = val));

  let seed = localStorage.seed;
  let wallet = localStorage.wallet;
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
