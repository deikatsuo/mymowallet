<script>
  import WebApp from "@twa-dev/sdk";
  import { Block, BlockTitle, Button } from "konsta/svelte";

  import {
    storeTitle,
    storeActiveTab,
    storeAlert,
    storePassword,
    storeIsLogin,
    storeCallback,
  } from "../stores";
  import { navigate } from "svelte-routing";
  import { recoverAddress } from "ethers";
  import { encryptPassword } from "../utils";

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

    console.log("Password ", $storePassword.password);
    console.log("Password Enc ", $storePassword.encryptedPassword);
    console.log("Salt ", localStorage.salt);

    let encPassword = encryptPassword(
      $storePassword.password,
      localStorage.salt
    );

    if (encPassword !== $storePassword.encryptedPassword) {
      $storeAlert = { open: true, message: "Please input a correct password!" };
      return;
    }
    //encryptAndBuild(mnemonic, passwordValue);

    navigate("/");
  }

  function destroy() {
    localStorage.clear();
    storeIsLogin.set(localStorage.login);
    navigate("/");
  }
</script>

<main>
  <BlockTitle>Wallet</BlockTitle>
  <Block strong outlineIos class="space-y-2">
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
  <BlockTitle>Setting</BlockTitle>
  <Block strong>
    <p>Page under construction</p>
  </Block>
</main>
