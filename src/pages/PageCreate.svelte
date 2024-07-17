<script>
  import WebApp from "@twa-dev/sdk";
  import { ethers } from "ethers";
  import { navigate } from "svelte-routing";
  import {
    storeAlert,
    storeCallback,
    storePassword,
    storeTitle,
  } from "../stores";
  import { Block, BlockTitle, Button, Chip } from "konsta/svelte";
  import MdCopy from "../components/MdCopy.svelte";
  import { encryptAndBuild } from "../utils";
  import MdReload from "../components/MdReload.svelte";

  $storeTitle = "Create Mo Wallet";

  WebApp.BackButton.onClick(() => navigate("/"));
  WebApp.BackButton.show();

  let entropy;
  let mnemonic;
  let arrMnemonic;

  function generateMnemonic() {
    entropy = ethers.randomBytes(32);
    mnemonic = ethers.Mnemonic.entropyToPhrase(entropy);
    arrMnemonic = mnemonic.split(" ");
  }

  function copyMnemonic() {
    navigator.clipboard
      .writeText(mnemonic)
      .then(() => {
        $storeAlert = { open: true, message: "Mnemonic copied successfully" };
      })
      .catch((err) => {
        $storeAlert = {
          open: true,
          message: "Error copying nemonic phrase: " + err,
        };
      });
  }

  generateMnemonic();

  function importNow() {
    $storePassword = { open: true, password: "" };
    storeCallback.set(importFromSeed);
  }

  function importFromSeed() {
    $storePassword.password = $storePassword.password.replace(/\\s/g, "");
    if (!$storePassword.password) {
      $storeAlert = { open: true, message: "Please input a password!" };
      return;
    }

    encryptAndBuild(mnemonic, $storePassword.password);
    $storePassword = {
      open: false,
      password: "",
      encryptedPassword: $storePassword.encryptedPassword,
    };

    navigate("/");
  }
</script>

<BlockTitle>Generated Mnemonic Phrase</BlockTitle>
<Block strong inset>
  {#each arrMnemonic as mnemonic, i}
    <Chip class="m-0.5">{i + 1}. {mnemonic}</Chip>
  {/each}
</Block>

<Block>
  <div class="grid grid-cols-5 gap-x-4">
    <Button class="bg-orange-500" onClick={() => generateMnemonic()}
      ><MdReload class="w-6 h-6" /></Button
    >
    <Button onClick={() => copyMnemonic()}><MdCopy class="w-6 h-6" /></Button>
    <Button class="col-span-3" onClick={() => importNow()}>Import Now</Button>
  </div>
</Block>
