<script>
  import WebApp from "@twa-dev/sdk";
  import { navigate } from "svelte-routing";
  import { storeTitle } from "../stores.js";

  storeTitle.set("Create Mo Wallet");

  WebApp.BackButton.onClick(() => navigate("/"));
  WebApp.BackButton.show();
</script>
