<script>
  import { Router, Route } from "svelte-routing";

  import PageWelcome from "../pages/PageWelcome.svelte";
  import PageImport from "../pages/PageImport.svelte";
  import PageCreate from "../pages/PageCreate.svelte";
  import PageNotFound from "../pages/PageNotFound.svelte";
</script>

<main>
  <Router>
    <Route path="/" component={PageWelcome} />
    <Route path="/import" component={PageImport} />
    <Route path="/create" component={PageCreate} />
    <Route component={PageNotFound} />
  </Router>
</main>
