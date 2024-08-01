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
    Panel,
    Page,
    Popover,
    MenuList,
    MenuListItem,
    Popup,
  } from "konsta/svelte";

  import {
    storeTitle,
    storeActiveTab,
    storeCurrency,
    storePrice,
    storeEncryptedPassword,
    storeBalance,
    storeActiveWallet,
    storeWallets,
    storeMain,
  } from "../stores";
  import IconHistory from "../components/IconHistory.svelte";
  import IconMo from "../components/IconMo.svelte";
  import {
    addWallet,
    buildChildWallet,
    updateActiveWalletBalance,
    nthChild,
    setStoreActiveWallet,
    updateBalance,
  } from "../wallet";
  import { copyText, truncateAddress } from "../utils";
  import IconBitcoinWallet from "../components/IconBitcoinWallet.svelte";
  import IconCopy from "../components/IconCopy.svelte";
  import { navigate } from "svelte-routing";
  import PageWalletReceive from "./PageWalletReceive.svelte";

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
    updateActiveWalletBalance();
  }

  let openPanelWallets = false;
  let openPopoverAddWallet = false;
  let popoverAddWalletTargetEl = null;

  const openPopover = (targetEl) => {
    popoverAddWalletTargetEl = targetEl;
    openPopoverAddWallet = true;
  };

  let receivePopupOpen = false;
</script>

<Navbar
  outline={false}
  centerTitle
  titleClass="text-base"
  title={truncateAddress($storeActiveWallet.wallet.address)}
  class="z-30"
>
  <Link
    navbar
    iconOnly
    slot="left"
    onClick={() => {
      copyText($storeActiveWallet.wallet.address);
    }}
  >
    <Icon>
      <IconCopy class="w-6 h-6" />
    </Icon>
  </Link>
  <Link
    navbar
    iconOnly
    slot="right"
    onClick={() => {
      updateBalance(), (openPanelWallets = true);
    }}
  >
    <Icon badge={$storeWallets.length} badgeColors={{ bg: "bg-blue-500" }}>
      <IconBitcoinWallet class="w-6 h-6" />
    </Icon>
  </Link>
</Navbar>
<Toolbar outline={false}>
  <div class="w-full flex align-middle text-center justify-center">
    {$storeCurrency.symbol + $storeBalance * $storePrice}
  </div>
</Toolbar>
<Toolbar outline={false}></Toolbar>

<Block>
  <div class="grid grid-cols-5 gap-x-4">
    <Button
      class="col-span-2"
      onClick={() => {
        navigate("/wallet/transfer");
      }}
    >
      Send
    </Button>
    <Button
      class="col-span-2"
      onClick={() => {
        receivePopupOpen = true;
      }}
    >
      Receive
    </Button>
    <Link iconOnly>
      <Icon badge="0" badgeColors={{ bg: "bg-red-500" }}>
        <IconHistory class="w-6 h-6" />
      </Icon>
    </Link>
  </div>
</Block>

<BlockTitle>Tokens</BlockTitle>
<Block>
  <List outline>
    <ListItem
      link
      header={$storeCurrency.symbol + $storePrice}
      title={$storeBalance.toString()}
      footer={$storeCurrency.symbol + $storeBalance * $storePrice}
      after="MO"
    >
      <IconMo class="w-6 h-6" slot="media" />
    </ListItem>
  </List>
</Block>

<Block strong inset class="space-y-4">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend
    eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum
    pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non
    nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam
    elementum vulputate. Mauris ornare consequat nunc viverra pellentesque.
    Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis
    elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor.
    Suspendisse a faucibus lectus.
  </p>
</Block>

<Panel
  side="right"
  opened={openPanelWallets}
  onBackdropClick={() => (openPanelWallets = false)}
>
  <Page>
    <Navbar title="Wallets">
      <Link slot="right" navbar onClick={() => (openPanelWallets = false)}>
        Close
      </Link>
    </Navbar>
    <Block class="my-3">
      <Button
        small
        outline
        class="add-wallet-button"
        onClick={() => openPopover(".add-wallet-button")}>Add wallet</Button
      >
    </Block>
    <List dividers>
      {#each $storeWallets as wallet}
        <ListItem
          chevron={false}
          menuListItem={wallet.active}
          link
          header={truncateAddress(wallet.address)}
          title={wallet.balance.toString()}
          footer={$storeCurrency.symbol + wallet.balance * $storePrice}
          after="MO"
          onClick={() => {
            if (wallet.type === "parent") {
              setStoreActiveWallet($storeMain), updateActiveWalletBalance();
            } else if (wallet.type === "child") {
              buildChildWallet(wallet.number);
            } else {
              // import wallet, not implemented
            }
          }}
        >
          <IconMo class="w-6 h-6" slot="media" />
        </ListItem>
      {/each}
    </List>
  </Page>
</Panel>

<Popover
  opened={openPopoverAddWallet}
  target={popoverAddWalletTargetEl}
  onBackdropClick={() => (openPopoverAddWallet = false)}
>
  <List nested>
    <ListItem
      title="Add new wallet"
      link
      onClick={() => {
        buildChildWallet(), (openPopoverAddWallet = false);
      }}
    />
    <ListItem
      title="Import wallet"
      link
      onClick={() => (openPopoverAddWallet = false)}
    />
  </List>
</Popover>

<Popup
  opened={receivePopupOpen}
  onBackdropClick={() => (receivePopupOpen = false)}
>
  <Page>
    <Navbar title="Deposit">
      <Link slot="right" navbar onClick={() => (receivePopupOpen = false)}>
        Close
      </Link>
    </Navbar>
    {#if receivePopupOpen}
      <PageWalletReceive />
    {/if}
  </Page>
</Popup>
