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
    Navbar,
  } from "konsta/svelte";

  import {
    storeTitle,
    storeActiveTab,
    storeCurrency,
    storePrice,
    storeEncryptedPassword,
    storeBalance,
    storeActiveWallet,
  } from "../stores";
  import IconHistory from "../components/IconHistory.svelte";
  import IconMo from "../components/IconMo.svelte";
  import { getToken } from "../wallet";
  import { truncateAddress } from "../utils";

  $storeTitle = "Wallet";
  $storeActiveTab = "wallet";

  WebApp.BackButton.hide();

  if (localStorage.localPrice) {
    $storePrice = JSON.parse(localStorage.localPrice);
  }

  function getPrice() {
    if (localStorage.lastPriceUpdate) {
      const lastUpdateDate = new Date(JSON.parse(localStorage.lastPriceUpdate));
      const nowUpdateDate = new Date();

      const differenceInMs = nowUpdateDate - lastUpdateDate;
      const differenceInMinutes = Math.round(differenceInMs / 60000);

      if (differenceInMinutes <= 10) {
        return;
      }
    }
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=mo-chain&vs_currencies=" +
      $storeCurrency.currency;
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("x-cg-demo-api-key", "CG-phhTmjyHMZVp94VnuTSZzLFc");

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if ($storeCurrency.currency === "idr") {
          $storePrice = data["mo-chain"].idr;
        } else if ($storeCurrency.currency === "usd") {
          $storePrice = data["mo-chain"].usd;
        }
        localStorage.localPrice = JSON.stringify($storePrice);
        localStorage.lastPriceUpdate = Date.now();
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }
  getPrice();

  if ($storeEncryptedPassword) {
    getToken();
  }
</script>

<Toolbar outline={false}></Toolbar>
<Toolbar outline={false}>
  <div class="w-full flex align-middle text-center justify-center">
    {truncateAddress($storeActiveWallet.wallet.address)}
  </div>
</Toolbar>
<Toolbar outline={false}></Toolbar>

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
  <ListItem
    link
    header={$storeCurrency.symbol+$storePrice}
    title={$storeBalance.toString()}
    footer={$storeCurrency.symbol +
      $storeBalance * $storePrice}
    after="MO"
  >
    <IconMo class="w-6 h-6" slot="media" />
  </ListItem>
</List>
