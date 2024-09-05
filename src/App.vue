<script lang="ts" setup>
const dark = computed(() => isDark.value)
</script>

<template>
  <main
    class="bg-gray-150 font-sans dark:bg-gray-200"
  >
    <VanConfigProvider :theme="dark ? 'dark' : 'light'">
      <RouterView />
    </VanConfigProvider>
  </main>
</template>
