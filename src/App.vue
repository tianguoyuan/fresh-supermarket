<script lang="ts" setup>
const { isDark } = useAppDark()
</script>

<template>
  <div class="text-[14px]">
    <Suspense>
      <VanConfigProvider :theme="isDark ? 'dark' : 'light'">
        <RouterView />
      </VanConfigProvider>
    </Suspense>
  </div>
</template>
