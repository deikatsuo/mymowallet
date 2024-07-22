<script>
  import WebApp from "@twa-dev/sdk";
  import { navigate } from "svelte-routing";
  import { storeTitle } from "../stores.js";
  import { BlockTitle, List, ListInput } from "konsta/svelte";

  import IconMo from "../components/IconMo.svelte";

  storeTitle.set("Transfer to");

  WebApp.BackButton.onClick(() => navigate("/"));
  WebApp.BackButton.show();
</script>

<BlockTitle>To</BlockTitle>
<List strongIos insetIos>
  <ListInput
    outline
    label="$MO Address"
    floatingLabel
    type="text"
    placeholder="0x..."
  >
    <IconMo class="fill-md-light-surface-2" width="2em" height="2em" slot="media" />
  </ListInput>
</List>
