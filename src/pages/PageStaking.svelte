<script>
  import WebApp from "@twa-dev/sdk";
  import { Block, BlockTitle } from "konsta/svelte";
  import { storeTitle, storeActiveTab } from "../stores.js";
  import IconStaking from "../components/IconStaking.svelte";

  $storeTitle = "Staking";
  $storeActiveTab = "staking";

  WebApp.BackButton.hide();
</script>

<div class="flex justify-center">
  <Block>
    <IconStaking class="text-md-light-surface-3" width="10em" height="10em" />
  </Block>
</div>

<BlockTitle>Staking</BlockTitle>
<Block strong inset>
  <p>Page under construction</p>
</Block>
