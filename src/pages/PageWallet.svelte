<script>
  import WebApp from "@twa-dev/sdk";
  import {
    Toolbar,
    Button,
    Link,
    Icon,
    Block,
    BlockTitle,
    ListItem,
    List,
  } from "konsta/svelte";

  import { storeTitle, storeActiveTab } from "../stores.js";
  import IconHistory from "../components/IconHistory.svelte";
  import IconMo from "../components/IconMo.svelte";

  $storeTitle = "Wallet";
  $storeActiveTab = "wallet";

  WebApp.BackButton.hide();
</script>

<Toolbar></Toolbar>
<Toolbar>
  <div class="w-full flex align-middle text-center justify-center">
    <div>ok</div>
    <div>ok</div>
    <div>ok</div>
      <p>Test</p><br />
      <p>Test</p><br />
      <p>Test</p><br />
      <p>Test</p><br />
      <p>Test</p><br />
  </div>
</Toolbar>
<Toolbar top={true} outline={true}></Toolbar>

<Block>
  <div class="grid grid-cols-5 gap-x-4">
    <Button class="col-span-2">Receive</Button>
    <Button class="col-span-2">Send</Button>
    <Link iconOnly>
      <Icon badge="0" badgeColors={{ bg: "bg-red-500" }}>
        <IconHistory class="w-6 h-6" />
      </Icon>
    </Link>
  </div>
</Block>

<BlockTitle>Tokens</BlockTitle>
<List strongIos outlineIos>
  <ListItem link header="$0.0004" title="1.300.554" footer="$547" after="MO">
    <IconMo class="w-6 h-6" slot="media" />
  </ListItem>
</List>
