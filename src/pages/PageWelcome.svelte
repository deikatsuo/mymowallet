<script>
  import WebApp from "@twa-dev/sdk";
  import {
    Block,
    BlockTitle,
    Button
  } from "konsta/svelte";

  import { navigate } from "svelte-routing";

  import IconMo from "../components/IconMo.svelte";

  import { storeTitle } from "../stores.js";

  $storeTitle = "Welcome to MyMoWallet";

  WebApp.BackButton.hide();
</script>

<div class="flex justify-center">
  <Block>
    <IconMo class="fill-md-light-surface-3" width="10em" height="10em" />
  </Block>
</div>

<BlockTitle large>{$storeTitle}</BlockTitle>
<Block strong inset class="space-y-4">
  <p>
    To get started, you need to create a new wallet or import an existing wallet
    if you already have one.
  </p>
</Block>
<BlockTitle>Access Mo wallet</BlockTitle>
<Block strong inset class="flex space-x-4 rtl:space-x-reverse">
  <Button onClick={() => navigate("/import")}>Import Wallet</Button>
  <Button onClick={() => navigate("/create")}>Create Wallet</Button>
</Block>
