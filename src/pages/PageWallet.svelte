<script>
  import WebApp from "@twa-dev/sdk";
  import { Toolbar, Link, Icon, Block, BlockTitle } from "konsta/svelte";

  import { storeTitle, storeActiveTab } from "../stores.js";
  import MdHistory from "../components/MdHistory.svelte";

  $storeTitle = "Wallet";
  $storeActiveTab = "wallet";

  WebApp.BackButton.hide();
</script>

<main>
  <Toolbar class={`left-0 w-full`}>
    <Link iconOnly>
      <Icon badge="0" badgeColors={{ bg: "bg-red-500" }}>
        <MdHistory class="w-6 h-6" />
      </Icon>
    </Link>
  </Toolbar>
  
  <BlockTitle>Wallet</BlockTitle>
  <Block strong inset>
    <p>Page under construction</p>
  </Block>
</main>
