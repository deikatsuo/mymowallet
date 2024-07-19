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
  } from "../stores";
  import { navigate } from "svelte-routing";
  import { encryptPassword } from "../utils";
  import MdTheme from "../components/MdTheme.svelte";

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
    $storePassword.open = false;
  }

  function destroy() {
    localStorage.clear();
    storeIsLogin.set(localStorage.login);
    navigate("/");
  }
  let themes = ["material", "ios"];
</script>

<main>
  <BlockTitle>Wallet</BlockTitle>
  <Block strong inset class="space-y-2">
    <div class="grid grid-cols-2 gap-x-4">
      <Button onClick={() => recover()}>Recover</Button>
      <Button onClick={() => destroy()} class="bg-red-500">Destroy</Button>
    </div>
  </Block>
  {#if key}
    <BlockTitle>Secret Key</BlockTitle>
    <Block strong inset class="space-y-4">
      <p>
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
        <option value={theme} selected={theme == $storeTheme}>
          {theme}
        </option>
      {/each}
    </ListInput>
  </List>
</main>
