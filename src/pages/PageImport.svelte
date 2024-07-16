<script>
  import WebApp from "@twa-dev/sdk";
  import { Mnemonic, Wallet } from "ethers";
  import { navigate } from "svelte-routing";

  import {
    Block,
    BlockTitle,
    List,
    ListInput,
    Sheet,
    Button,
    Dialog,
    DialogButton,
  } from "konsta/svelte";

  import MdPasswordAdd from "../components/MdPasswordAdd.svelte";
  import {
    storeAlertMessage,
    storeAlertOpened,
    storeAskPassword,
    storeCallback,
    storeLogin,
    storePasswordValue,
    storeTitle,
  } from "../stores.js";
  import { encryptAndBuild, encryptString, generateSalt } from "../utils.js";

  storeTitle.set("Import Mo Wallet");

  WebApp.BackButton.onClick(() => navigate("/"));
  WebApp.BackButton.show();

  let seedValue = "";

  const onSeedValueChange = (e) => {
    seedValue = e.target.value;
  };
  const onSeedValueClear = () => {
    seedValue = "";
  };

  let passwordValue = "";

  storePasswordValue.subscribe((val) => (passwordValue = val));

  // const onPasswordValueChange = (e) => {
  //   passwordValue = e.target.value;
  // };

  function importNow() {
    seedValue = seedValue.trim();
    if (!seedValue) {
      storeAlertMessage.set("Please input Mnemonic phrase!");
      storeAlertOpened.set(true);
      return;
    }

    let isValidSeed = Mnemonic.isValidMnemonic(seedValue);
    if (!isValidSeed) {
      storeAlertMessage.set("Mnemonic phrase is invalid!");
      storeAlertOpened.set(true);
      return;
    }

    storeAskPassword.set(true);
    storeCallback.set(importFromSeed);
  }

  function importFromSeed() {
    passwordValue = passwordValue.replace(/\\s/g, "");
    if (!passwordValue) {
      storeAlertMessage.set("Please input a password!");
      storeAlertOpened.set(true);
      return;
    }

    encryptAndBuild(seedValue, passwordValue);

    navigate("/");
  }
</script>

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

<!-- <Sheet class="pb-safe w-full" opened={askPassword}>
  <Block>
    <List>
      <ListInput
        outline
        label="Input Password"
        type="password"
        placeholder="****"
        value={passwordValue}
        onInput={onPasswordValueChange}
      >
        <MdPasswordAdd slot="media" />
      </ListInput>
    </List>
    <Block margin="my-4">
      <div class="grid grid-cols-2 gap-x-4">
        <Button class="bg-red-500" onClick={() => (askPassword = false)}>
          Cancel
        </Button>
        <Button onClick={() => importFromSeed()}>Set Password</Button>
      </div>
    </Block>
  </Block>
</Sheet> -->
