<script>
  import { Block, BlockHeader, BlockTitle, Button } from "konsta/svelte";
  import { storeDestroy, storeEncryptedPassword, storeIsLogin, storePassword } from "../stores";
  import { navigate } from "svelte-routing";
  import MdWarning from "../components/MdWarning.svelte";

  function destroy() {
    localStorage.clear();
    $storeIsLogin = false;
    $storeDestroy = false;

    navigate("/");
  }
</script>

<div class="flex justify-center">
  <Block>
    <MdWarning class="text-md-light-surface-3" width="10em" height="10em" />
  </Block>
</div>

<BlockTitle>Are you sure to destroy the wallet?</BlockTitle>
<BlockHeader
  >"Beware, this action can't be undone. Once destroyed, we can't restore your
  wallet unless you have the mnemonic phrase."</BlockHeader
>
<Block strong inset class="space-y-2">
  <div class="grid grid-cols-2 gap-x-4">
    <Button
      onClick={() => {
        $storeDestroy = false;
        if (!$storeEncryptedPassword) {
          $storePassword.open = true;
        }
      }}>Cancel</Button
    >
    <Button onClick={() => destroy()} class="bg-red-500">Destroy</Button>
  </div>
</Block>
