<script>
  import WebApp from "@twa-dev/sdk";
  import { Block, BlockTitle, Button } from "konsta/svelte";

  import { storeTitle, storeActiveTab } from "../stores.js";
  import { navigate } from "svelte-routing";

  storeTitle.set("Setting");
  storeActiveTab.set("setting");

  WebApp.BackButton.hide();

  function destroy() {
    localStorage.clear();
    navigate("/");
  }
</script>

<main>
  <BlockTitle>Wallet</BlockTitle>
  <Block strong outlineIos class="space-y-2">
    <div class="grid grid-cols-2 gap-x-4">
      <Button>Recover</Button>
      <Button onClick={() => (destroy())} class="bg-red-500">Destroy</Button>
    </div>
  </Block>
  <BlockTitle>Setting</BlockTitle>
  <Block strong>
    <p>Page under construction</p>
  </Block>
</main>
