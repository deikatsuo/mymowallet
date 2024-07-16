<script>
  import WebApp from "@twa-dev/sdk";
  import { ethers } from "ethers";
  import { navigate } from "svelte-routing";
  import {
    storeAlertMessage,
    storeAlertOpened,
    storeTitle,
  } from "../stores.js";
  import { Block, BlockTitle, Button, Chip } from "konsta/svelte";
  import MdCopy from "../components/MdCopy.svelte";

  storeTitle.set("Create Mo Wallet");

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
        storeAlertMessage.set("Mnemonic copied successfully");
        storeAlertOpened.set(true);
      })
      .catch((err) => {
        storeAlertMessage.set("Error copying nemonic phrase: "+err);
        storeAlertOpened.set(true);
      });
  }

  generateMnemonic();
</script>

<BlockTitle>Generated Mnemonic Phrase</BlockTitle>
<Block strong inset>
  {#each arrMnemonic as mnemonic, i}
    <Chip class="m-0.5">{i + 1}. {mnemonic}</Chip>
  {/each}
</Block>

<Block>
  <div class="grid grid-cols-5 gap-x-4">
    <Button class="col-span-2" onClick={() => generateMnemonic()}
      >Regenerate</Button
    >
    <Button onClick={() => copyMnemonic()}><MdCopy class="w-6 h-6" /></Button>
    <Button class="col-span-2">Import Now</Button>
  </div>
</Block>
