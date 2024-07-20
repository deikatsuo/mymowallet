<script>
  import WebApp from "@twa-dev/sdk";
  import { Mnemonic, Wallet } from "ethers";
  import { navigate } from "svelte-routing";

  import { Block, BlockTitle, List, ListInput, Button } from "konsta/svelte";

  import {
    storeAlert,
    storePassword,
    storeCallback,
    storeTitle,
    storeIsLogin,
  } from "../stores";
  import { encryptAndBuild } from "../utils";
  import MdImport from "../components/MdImport.svelte";

  $storeTitle = "Import Mo Wallet";

  WebApp.BackButton.onClick(() => navigate("/"));
  WebApp.BackButton.show();

  let seedValue = "";

  const onSeedValueChange = (e) => {
    seedValue = e.target.value;
  };
  const onSeedValueClear = () => {
    seedValue = "";
  };

  function importNow() {
    seedValue = seedValue.trim();
    if (!seedValue) {
      $storeAlert.message = "Please input Mnemonic Phrase";
      $storeAlert.open = true;
      return;
    }

    let isValidSeed = Mnemonic.isValidMnemonic(seedValue);
    if (!isValidSeed) {
      $storeAlert.message = "Mnemonic phrase is invalid!";
      $storeAlert.open = true;
      return;
    }

    $storePassword = { open: true, password: "" };
    storeCallback.set(importFromSeed);
  }

  function importFromSeed() {
    $storePassword.password = $storePassword.password.replace(/\\s/g, "");
    if (!$storePassword.password) {
      $storeAlert.message = "Please input a password!";
      $storeAlert.open = true;
      return;
    }

    encryptAndBuild(seedValue, $storePassword.password);
    $storePassword = {
      open: false,
      password: "",
    };

    navigate("/");
  }
</script>

<div class="flex justify-center">
  <Block>
    <MdImport class="text-md-light-surface-3" width="10em" height="10em" />
  </Block>
</div>

<Block>
  <BlockTitle>Mnemonic Phrase</BlockTitle>
  <List>
    <ListInput
      outline
      label="12 or 24 words seed phrase"
      type="textarea"
      placeholder="Input phrase..."
      inputClass="!h-20 resize-none"
      info="Each word is separated by a space."
      value={seedValue}
      clearButton={seedValue.length > 0}
      onInput={onSeedValueChange}
      onClear={onSeedValueClear}
    ></ListInput>
  </List>
</Block>
<Block inset>
  <Button onClick={() => importNow()}>Import Now</Button>
</Block>
