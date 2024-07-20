<script>
  import { Router, Route, navigate } from "svelte-routing";

  import {
    Block,
    Icon,
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

  import {
    storeIsLogin,
    storePassword,
    storeEncryptedPassword,
    storeActiveTab,
    storeCallback,
    storeAlert,
  } from "../stores";
  import { decryptAndBuild } from "../utils";

  if ($storeIsLogin && !$storeEncryptedPassword) {
    $storePassword = { open: true, hideCancleButton: true };
    $storeCallback = importFromLocalStorage;
  }

  function importFromLocalStorage() {
    $storePassword.password = $storePassword.password.replace(/\\s/g, "");
    if (!$storePassword.password) {
      $storeAlert.message = "Please input a password!";
      $storeAlert.open = true;
      return;
    }

    try {
      decryptAndBuild($storePassword.password);
    } catch (e) {
      $storeAlert.message = "Please input the correct password!";
      $storeAlert.open = true;
      return;
    }

    $storePassword = {
      open: false,
      password: "",
    };
  }
</script>

<Tabbar labels icons class="left-0 bottom-0 fixed">
  <TabbarLink
    active={$storeActiveTab === "wallet"}
    onClick={() => navigate("/")}
    label="Wallet"
  >
    <Icon slot="icon" badge="" badgeColors={{ bg: "bg-green-500" }}>
      <MdWallet class="w-6 h-6" />
    </Icon>
  </TabbarLink>
  <TabbarLink
    active={$storeActiveTab === "staking"}
    onClick={() => navigate("/staking")}
    label="Staking"
  >
    <Icon slot="icon" badge="" badgeColors={{ bg: "bg-red-500" }}>
      <MdFinance class="w-6 h-6" />
    </Icon>
  </TabbarLink>
  <TabbarLink
    active={$storeActiveTab === "setting"}
    onClick={() => navigate("/setting")}
    label="Setting"
  >
    <Icon slot="icon" badge="" badgeColors={{ bg: "bg-red-500" }}>
      <MdGear class="w-6 h-6" />
    </Icon>
  </TabbarLink>
</Tabbar>

<main class="pb-16">
  <Router>
    <Route path="/" component={PageWallet} />
    <Route path="/staking" component={PageStaking} />
    <Route path="/setting" component={PageSetting} />
    <Route component={PageNotFound} />
  </Router>
</main>
