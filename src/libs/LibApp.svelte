<script>
  import { Router, Route, navigate } from "svelte-routing";

  import {
    Navbar,
    Toolbar,
    Icon,
    Link,
    Tabbar,
    TabbarLink,
  } from "konsta/svelte";

  import MdHistory from "../components/MdHistory.svelte";
  import MdWallet from "../components/MdWallet.svelte";
  import MdFinance from "../components/MdFinance.svelte";
  import MdGear from "../components/MdGear.svelte";

  import PageWallet from "../pages/PageWallet.svelte";
  import PageStaking from "../pages/PageStaking.svelte";
  import PageSetting from "../pages/PageSetting.svelte";
  import PageNotFound from "../pages/PageNotFound.svelte";

  import { storeActiveTab, storeTitle } from "../stores.js";

  let activeTab;
  let title;

  storeActiveTab.subscribe((val) => (activeTab = val));
  storeTitle.subscribe((val) => (title = val));
</script>

<Toolbar class={`left-0 w-full`}>
  <Link iconOnly>
    <Icon badge="0" badgeColors={{ bg: "bg-red-500" }}>
      <MdHistory class="w-6 h-6" />
    </Icon>
  </Link>
</Toolbar>

<Tabbar labels icons class="left-0 bottom-0 fixed">
  <TabbarLink
    active={activeTab === "wallet"}
    onClick={() => navigate("/")}
    label="Wallet"
  >
    <Icon slot="icon" badge="" badgeColors={{ bg: "bg-green-500" }}>
      <MdWallet class="w-6 h-6" />
    </Icon>
  </TabbarLink>
  <TabbarLink
    active={activeTab === "staking"}
    onClick={() => navigate("/staking")}
    label="Staking"
  >
    <Icon slot="icon" badge="" badgeColors={{ bg: "bg-red-500" }}>
      <MdFinance class="w-6 h-6" />
    </Icon>
  </TabbarLink>
  <TabbarLink
    active={activeTab === "setting"}
    onClick={() => navigate("/setting")}
    label="Setting"
  >
    <Icon slot="icon" badge="" badgeColors={{ bg: "bg-red-500" }}>
      <MdGear class="w-6 h-6" />
    </Icon>
  </TabbarLink>
</Tabbar>

<Router>
  <Route path="/" component={PageWallet} />
  <Route path="/staking" component={PageStaking} />
  <Route path="/setting" component={PageSetting} />
  <Route component={PageNotFound} />
</Router>
