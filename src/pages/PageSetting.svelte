<script>
  import WebApp from "@twa-dev/sdk";
  import { Block, BlockTitle, List, ListInput, Button } from "konsta/svelte";

  import {
    storeTitle,
    storeActiveTab,
    storeAlert,
    storePassword,
    storeEncryptedPassword,
    storeCallback,
    storeActiveWallet,
    storeDestroy,
  } from "../stores";
  import { encryptPassword } from "../wallet";
  import IconSetting from "../components/IconSetting.svelte";
  import PageSettingCurrency from "./PageSettingCurrency.svelte";
  import PageSettingTheme from "./PageSettingTheme.svelte";
  import { getLocalStorage } from "../utils";

  $storeTitle = "Setting";
  $storeActiveTab = "setting";

  WebApp.BackButton.hide();

  let key;
  let mnemonic;

  function hide() {
    key = "";
    mnemonic = "";
  }

  function recover() {
    $storePassword.open = true;
    $storeCallback = showRecover;
  }

  function showRecover() {
    $storePassword.password = $storePassword.password.replace(/\\s/g, "");
    if (!$storePassword.password) {
      $storeAlert = { open: true, message: "Please input a password!" };
      return;
    }

    let encPassword = encryptPassword(
      $storePassword.password,
      getLocalStorage('salt')
    );

    if (encPassword !== $storeEncryptedPassword) {
      $storeAlert = { open: true, message: "Please input a correct password!" };
      return;
    }

    key = $storeActiveWallet.wallet.privateKey;
    mnemonic = $storeActiveWallet.wallet.mnemonic.phrase;
    $storePassword = { open: false, password: "" };
  }
</script>

<div class="flex justify-center">
  <Block>
    <IconSetting
      class="fill-md-light-surface-3 text-md-light-surface-3"
      width="10em"
      height="10em"
    />
  </Block>
</div>

<BlockTitle>Wallet</BlockTitle>
<Block strong inset class="space-y-2">
  <div class="grid grid-cols-2 gap-x-4">
    {#if key || mnemonic}
      <Button onClick={() => hide()}>Hide</Button>
    {:else}
      <Button onClick={() => recover()}>Recover</Button>
    {/if}
    <Button onClick={() => ($storeDestroy = true)} class="bg-red-500"
      >Destroy</Button
    >
  </div>
</Block>
{#if key}
  <BlockTitle>Secret Key</BlockTitle>
  <Block strong inset class="space-y-4">
    <p class="break-all">
      {key}
    </p>
  </Block>
{/if}
{#if mnemonic}
  <BlockTitle>Mnemonic Phrase</BlockTitle>
  <Block strong inset class="space-y-4">
    <p>
      {mnemonic}
    </p>
  </Block>
{/if}

<BlockTitle>Local Currency</BlockTitle>
<PageSettingCurrency />

<BlockTitle>Theme</BlockTitle>
<PageSettingTheme />
