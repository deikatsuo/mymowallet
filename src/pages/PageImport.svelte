<script>
  import WebApp from "@twa-dev/sdk";
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

  import { storeTitle } from "../stores.js";

  storeTitle.set("Import Mo Wallet");

  WebApp.BackButton.onClick(() => navigate("/"));
  WebApp.BackButton.show();

  let alertMessage = "";
  let seedValue = "";

  const onSeedValueChange = (e) => {
    seedValue = e.target.value;
  };
  const onSeedValueClear = () => {
    seedValue = "";
  };

  let passwordValue = "";
  let askPassword = false;
  let alertOpened = false;

  const onPasswordValueChange = (e) => {
    passwordValue = e.target.value;
  };

  function importNow() {
    if (!seedValue) {
      alertMessage = "Please input Mnemonic phrase!";
      alertOpened = true;
      return;
    }
    askPassword = true;
  }

  function importFromSeed() {
    if (!passwordValue) {
      alertMessage = "Please input a password!";
      alertOpened = true;
      return;
    }
    seedValue = seedValue.trim();
    let salt = bcrypt.randomBytes(16);
    alert(salt);
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

<Sheet class="pb-safe w-full" opened={askPassword}>
  <Block>
    <List>
      <ListInput
        outline
        label="Input Password"
        type="password"
        placeholder="****"
        value={passwordValue}
        onInput={onPasswordValueChange}
      ></ListInput>
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
</Sheet>

<Dialog opened={alertOpened} onBackdropClick={() => (alertOpened = false)}>
  {alertMessage}
  <svelte:fragment slot="buttons">
    <DialogButton onClick={() => (alertOpened = false)}>Close</DialogButton>
  </svelte:fragment>
</Dialog>
