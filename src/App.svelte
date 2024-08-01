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
    BlockFooter,
    Link,
    Toast,
  } from "konsta/svelte";

  import LibApp from "./libs/LibApp.svelte";
  import LibWelcome from "./libs/LibWelcome.svelte";

  import {
    storeTheme,
    storeTitle,
    storeIsLogin,
    storeAlert,
    storeToast,
    storePassword,
    storeCallback,
    storeDestroy,
  } from "./stores";

  import IconPasswordAdd from "./components/IconPasswordAdd.svelte";
  import LibDestroy from "./libs/LibDestroy.svelte";
  import { navigate } from "svelte-routing";

  WebApp.setHeaderColor("secondary_bg_color");
  WebApp.setBackgroundColor("secondary_bg_color");
  WebApp.expand();

  const onPasswordValueChange = (e) => {
    $storePassword.password = e.target.value;
  };
</script>

<svelte:head>
  <title>MyMoWallet - {$storeTitle}</title>
</svelte:head>

<App theme={$storeTheme}>
  <Page>
    {#if $storeIsLogin}
      {#if $storeDestroy}
        <LibDestroy />
      {:else}
        <LibApp />
      {/if}
    {:else}
      <LibWelcome />
    {/if}
  </Page>
</App>

<Sheet class="pb-safe w-full" opened={$storePassword.open}>
  <Block>
    <List>
      <form on:submit|preventDefault={() => $storeCallback()}>
        <ListInput
          outline
          label="Input Password"
          type="password"
          placeholder="****"
          value={$storePassword.password}
          onInput={onPasswordValueChange}
        >
          <IconPasswordAdd slot="media" />
        </ListInput>
      </form>
    </List>
    {#if $storeIsLogin}
      <BlockFooter>
        <Link
          onClick={() => (
            ($storeDestroy = true), ($storePassword.open = false)
          )}>Forgot Password? Destroy the Wallet</Link
        >
      </BlockFooter>
      <BlockFooter>
        <Link
          onClick={() => (
            ($storePassword.open = false),
            localStorage.clear(),
            ($storeIsLogin = false),
            ($storeDestroy = false),
            navigate("/")
          )}>Force Destroy</Link
        >
      </BlockFooter>
    {/if}
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

<Toast position="center" opened={$storeToast.open}>
  <div class="shrink">{$storeToast.message}</div>
</Toast>
