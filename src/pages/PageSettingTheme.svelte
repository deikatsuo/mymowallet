<script>
  import { List, ListInput } from "konsta/svelte";
  import IconAndroid from "../components/IconAndroid.svelte";
  import IconIos from "../components/IconIos.svelte";
  import { storeTheme } from "../stores";

  let themes = [
    { value: "material", view: "Material" },
    { value: "ios", view: "iOS" },
  ];
</script>

{#if $storeTheme === "material"}
  <List strong inset>
    <ListInput
      outline
      type="select"
      dropdown
      placeholder="Please choose..."
      onChange={(e) => ($storeTheme = e.target.value)}
    >
      <IconAndroid slot="media" />

      {#each themes as theme}
        <option value={theme.value} selected={theme.value == $storeTheme}>
          {theme.view}
        </option>
      {/each}
    </ListInput>
  </List>
{:else if $storeTheme === "ios"}
  <List strong inset>
    <ListInput
      outline
      type="select"
      dropdown
      placeholder="Please choose..."
      onChange={(e) => ($storeTheme = e.target.value)}
    >
      <IconIos slot="media" />

      {#each themes as theme}
        <option value={theme.value} selected={theme.value == $storeTheme}>
          {theme.view}
        </option>
      {/each}
    </ListInput>
  </List>
{/if}
