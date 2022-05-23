<script setup lang="ts">
import { handleStart, result } from "../request";
const msg = $ref("");
function postMsg() {
  handleStart(1, msg);
  msg = "";
}
</script>

<template>
  <div>
    <div v-for="msg in result">
      <div border-1 border-rd-1 border-bg-dark m-y-2>
        {{ msg }}
      </div>
    </div>
    <input type="text" v-model="msg" border-1 border-rd-1 border-bg-dark m-y-2 />

    <div>
      <button class="m-3 text-sm btn" @click="postMsg">Go</button>
    </div>
  </div>
</template>
