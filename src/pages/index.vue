<script setup lang="ts" name="/">
</script>

<template>
  <div id="dashboard" class="flex">
    dashboard
  </div>
</template>

<style scoped>
#dashboard {
  height: 100vh;
}

/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
  #dashboard {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
}
</style>

<route lang="yaml">
  meta:
    layout: default
    title: dashboard
</route>
