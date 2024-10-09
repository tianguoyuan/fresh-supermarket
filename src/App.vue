<script lang="ts" setup>
const { isDark } = useAppDark()
</script>

<template>
  <Suspense>
    <VanConfigProvider :theme="isDark ? 'dark' : 'light'">
      <RouterView />
    </VanConfigProvider>
  </Suspense>
</template>
