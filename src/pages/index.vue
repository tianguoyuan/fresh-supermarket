<script setup lang="ts" name="/">
</script>

<template>
  <div id="dashboard" class="flex flex-1 flex-col justify-between">
    <div class="px-8">
      <div class="pt-21 text-7">
        欢迎来到生鲜！
      </div>
      <div class="mt-3 pr-10 color-#999 line-height-6">
        无论您身在何处，我们都会为您提供您喜爱的食物，以满足您的食物需求，这里是一些文字描述
      </div>
      <RouterLink to="/home" class="mt-7 block h-11 w-45 rounded-full bg-#40AE36 text-center color-white line-height-11">
        现在开始
      </RouterLink>
    </div>
    <div class="mt-20 block h-260px w-full overflow-hidden">
      <SvgIcon icon-class="dashboardCover" size="100vw" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
  meta:
    title: dashboard
</route>
