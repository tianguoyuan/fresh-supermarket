<script setup lang="ts">
import { clearAllStorage } from '~/utils/storage'
</script>

<template>
  <div>
    home
    <div class="btn" @click="clearAllStorage()">
      clearStorage
    </div>
  </div>
</template>

<style scoped>

</style>
