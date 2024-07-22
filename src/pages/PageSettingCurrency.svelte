<script>
  import { List, ListInput } from "konsta/svelte";
  import IconCurrencyIdr from "../components/IconCurrencyIdr.svelte";
  import IconCurrencyUsd from "../components/IconCurrencyUsd.svelte";
  import { storeCurrency } from "../stores";

  let currencies = [
    { value: "idr", view: "Indonesian Rupiah" },
    { value: "usd", view: "US Dollar" },
  ];
</script>

<List strong inset>
  {#if $storeCurrency === "idr"}
    <ListInput
      outline
      type="select"
      dropdown
      placeholder="Please choose..."
      onChange={(e) => ($storeCurrency = e.target.value)}
    >
      <IconCurrencyIdr slot="media" />

      {#each currencies as currency}
        <option
          value={currency.value}
          selected={currency.value == $storeCurrency}
        >
          {currency.view}
        </option>
      {/each}
    </ListInput>
  {:else if $storeCurrency === "usd"}
    <ListInput
      outline
      type="select"
      dropdown
      placeholder="Please choose..."
      onChange={(e) => ($storeCurrency = e.target.value)}
    >
      <IconCurrencyUsd slot="media" />

      {#each currencies as currency}
        <option
          value={currency.value}
          selected={currency.value == $storeCurrency}
        >
          {currency.view}
        </option>
      {/each}
    </ListInput>
  {/if}
</List>
