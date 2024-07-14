<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { Navbar, Block, BlockTitle, Button, Icon } from "konsta/svelte";

  import PageWelcome from "../pages/PageWelcome.svelte";
  import PageImport from "../pages/PageImport.svelte";
  import PageCreate from "../pages/PageCreate.svelte";
  import PageNotFound from "../pages/PageNotFound.svelte";

  import { storeTitle } from "../stores";

  let title;

  storeTitle.subscribe((val) => (title = val));
</script>

<Navbar {title}></Navbar>

<Router>
  <Route path="/" component={PageWelcome} />
  <Route path="/import" component={PageImport} />
  <Route path="/create" component={PageCreate} />
  <Route component={PageNotFound} />
</Router>
