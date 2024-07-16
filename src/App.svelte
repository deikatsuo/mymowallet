<script>
  import WebApp from "@twa-dev/sdk";
  import { ethers } from "ethers";
  import {
    App,
    Page,
    Dialog,
    DialogButton,
    Sheet,
    Block,
    List,
    ListInput,
    Button,
  } from "konsta/svelte";

  import LibApp from "./libs/LibApp.svelte";
  import LibWelcome from "./libs/LibWelcome.svelte";

  import {
    storeTitle,
    storeActiveTab,
    storeLogin,
    storeWallet,
    storeAlertOpened,
    storeAlertMessage,
    storeAskPassword,
    storePasswordValue,
    storeCallback,
  } from "./stores";

  import MdPasswordAdd from "./components/MdPasswordAdd.svelte";

  WebApp.setHeaderColor("secondary_bg_color");
  WebApp.setBackgroundColor("secondary_bg_color");
  WebApp.expand();

  let title;
  let activeTab;
  let isLogin;
  let alertOpened;
  let alertMessage;
  let askPassword;
  let passwordValue;
  let callback;

  storeTitle.subscribe((val) => (title = val));
  storeActiveTab.subscribe((val) => (activeTab = val));
  storeLogin.subscribe((val) => (isLogin = val));
  storeAlertOpened.subscribe((val) => (alertOpened = val));
  storeAlertMessage.subscribe((val) => (alertMessage = val));
  storeAskPassword.subscribe((val) => (askPassword = val));
  storePasswordValue.subscribe((val) => (passwordValue = val));
  storeCallback.subscribe((val) => (callback = val));

  const onPasswordValueChange = (e) => {
    storePasswordValue.set(e.target.value);
  };

  let wallet = ethers.HDNodeWallet;
  storeWallet.subscribe((val) => (wallet = val));
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
      >
        <MdPasswordAdd slot="media" />
      </ListInput>
    </List>
    <Block margin="my-4">
      <div class="grid grid-cols-2 gap-x-4">
        <Button
          class="bg-red-500"
          onClick={() => (
            storeAskPassword.set(false), storePasswordValue.set("")
          )}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            storeAskPassword.set(false), callback();
          }}>Enter</Button
        >
      </div>
    </Block>
  </Block>
</Sheet>

<Dialog
  opened={alertOpened}
  onBackdropClick={() => storeAlertOpened.set(false)}
>
  {alertMessage}
  <svelte:fragment slot="buttons">
    <DialogButton onClick={() => storeAlertOpened.set(false)}
      >Close</DialogButton
    >
  </svelte:fragment>
</Dialog>
