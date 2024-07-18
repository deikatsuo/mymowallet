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
    storeIsLogin,
    storeAlert,
    storePassword,
    storeCallback,
  } from "./stores";

  import MdPasswordAdd from "./components/MdPasswordAdd.svelte";

  WebApp.setHeaderColor("secondary_bg_color");
  WebApp.setBackgroundColor("secondary_bg_color");
  WebApp.expand();

  const onPasswordValueChange = (e) => {
    $storePassword.password = e.target.value;
  };
</script>

<svelte:head>
  <title>MyMoWallet - {storeTitle}</title>
</svelte:head>

<App theme="material">
  <Page>
    {#if $storeIsLogin}
      <LibApp />
    {:else}
      <LibWelcome />
    {/if}
  </Page>
</App>

<Sheet class="pb-safe w-full" opened={$storePassword.open}>
  <Block>
    <List>
      <ListInput
        outline
        label="Input Password"
        type="password"
        placeholder="****"
        value={$storePassword.password}
        onInput={onPasswordValueChange}
      >
        <MdPasswordAdd slot="media" />
      </ListInput>
    </List>
    <Block margin="my-4">
      <div
        class="grid {$storePassword.hideCancleButton
          ? 'grid-cols-1'
          : 'grid-cols-2 gap-x-4'}"
      >
        {#if !$storePassword.hideCancleButton}
          <Button
            class="bg-red-500"
            onClick={() => ($storePassword = { open: false, password: "" })}
          >
            Cancel
          </Button>
        {/if}
        <Button
          onClick={() => {
            $storeCallback();
          }}>Enter</Button
        >
      </div>
    </Block>
  </Block>
</Sheet>

<Dialog
  opened={$storeAlert.open}
  onBackdropClick={() => ($storeAlert.open = false)}
>
  {$storeAlert.message}
  <svelte:fragment slot="buttons">
    <DialogButton onClick={() => ($storeAlert.open = false)}>Close</DialogButton
    >
  </svelte:fragment>
</Dialog>
