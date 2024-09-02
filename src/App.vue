<script lang="ts" setup>
const dark = computed(() => isDark.value)
</script>

<template>
  <main
    class="gray-700 dark:gray-200 font-sans"
  >
    <VanConfigProvider :theme="dark ? 'dark' : 'light'">
      <RouterView />
    </VanConfigProvider>
  </main>
</template>
