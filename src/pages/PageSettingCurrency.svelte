<script>
  import { List, ListInput } from "konsta/svelte";
  import IconCurrencyIdr from "../components/IconCurrencyIdr.svelte";
  import IconCurrencyUsd from "../components/IconCurrencyUsd.svelte";
  import { storeCurrency, storePrice } from "../stores";

  let currencies = [
    { value: "idr", view: "Indonesian Rupiah" },
    { value: "usd", view: "US Dollar" },
  ];

  const onCurrencyValueChange = (e) => {
    $storeCurrency = e.target.value;
    localStorage.localCurrency = $storeCurrency;

    $storePrice = { price: 0, local: "" };
    localStorage.removeItem("localPrice");
    localStorage.removeItem("lastPriceUpdate");
  };
</script>

<List strong inset>
  {#if $storeCurrency === "idr"}
    <ListInput
      outline
      type="select"
      dropdown
      placeholder="Please choose..."
      onChange={onCurrencyValueChange}
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
      onChange={onCurrencyValueChange}
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
