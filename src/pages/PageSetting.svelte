<script>
  import WebApp from "@twa-dev/sdk";
  import { Block, BlockTitle, List, ListInput, Button } from "konsta/svelte";

  import {
    storeTheme,
    storeTitle,
    storeActiveTab,
    storeAlert,
    storePassword,
    storeEncryptedPassword,
    storeIsLogin,
    storeCallback,
    storeActiveWallet,
    storeCurrency,
    storeDestroy,
  } from "../stores";
  import { navigate } from "svelte-routing";
  import { encryptPassword } from "../utils";
  import MdTheme from "../components/MdTheme.svelte";
  import MdSetting from "../components/MdSetting.svelte";

  $storeTitle = "Setting";
  $storeActiveTab = "setting";

  WebApp.BackButton.hide();

  let key;
  let mnemonic;

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
      localStorage.salt
    );

    if (encPassword !== $storeEncryptedPassword) {
      $storeAlert = { open: true, message: "Please input a correct password!" };
      return;
    }

    key = $storeActiveWallet.wallet.privateKey;
    mnemonic = $storeActiveWallet.wallet.mnemonic.phrase;
    $storePassword = { open: false, password: "" };
  }

  let currencies = [
    { value: "idr", view: "Indonesian Rupiah" },
    { value: "usd", view: "US Dollar" },
  ];
  let themes = [
    { value: "material", view: "Material" },
    { value: "ios", view: "iOS" },
  ];
</script>

<div class="flex justify-center">
  <Block>
    <MdSetting
      class="fill-md-light-surface-3 text-md-light-surface-3"
      width="10em"
      height="10em"
    />
  </Block>
</div>

<BlockTitle>Wallet</BlockTitle>
<Block strong inset class="space-y-2">
  <div class="grid grid-cols-2 gap-x-4">
    <Button onClick={() => recover()}>Recover</Button>
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
<List strong inset>
  <ListInput
    outline
    type="select"
    dropdown
    placeholder="Please choose..."
    onChange={(e) => ($storeCurrency = e.target.value)}
  >
    <MdTheme slot="media" />
    {#each currencies as currency}
      <option
        value={currency.value}
        selected={currency.value == $storeCurrency}
      >
        {currency.view}
      </option>
    {/each}
  </ListInput>
</List>
<BlockTitle>Theme</BlockTitle>
<List strong inset>
  <ListInput
    outline
    type="select"
    dropdown
    placeholder="Please choose..."
    onChange={(e) => ($storeTheme = e.target.value)}
  >
    <MdTheme slot="media" />
    {#each themes as theme}
      <option value={theme.value} selected={theme.value == $storeTheme}>
        {theme.view}
      </option>
    {/each}
  </ListInput>
</List>
