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
    let symbol;

    if (e.target.value === "idr") {
      symbol = "Rp";
    } else if (e.target.value === "usd") {
      symbol = "$";
    }

    $storeCurrency = { currency: e.target.value, symbol: symbol };

    localStorage.localCurrency = JSON.stringify($storeCurrency);

    $storePrice = 0;
    localStorage.removeItem("localPrice");
    localStorage.removeItem("lastPriceUpdate");
  };
</script>

<List strong inset>
  {#if $storeCurrency.currency === "idr"}
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
          selected={currency.value == $storeCurrency.currency}
        >
          {currency.view}
        </option>
      {/each}
    </ListInput>
  {:else if $storeCurrency.currency === "usd"}
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
          selected={currency.value == $storeCurrency.currency}
        >
          {currency.view}
        </option>
      {/each}
    </ListInput>
  {/if}
</List>
