<script setup lang="ts" name="/add/">
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed title="发布帖子">
      <template #left>
        <RouterLink replace to="/home">
          <van-icon name="arrow-left" color="#0B1526" />
        </RouterLink>
      </template>
      <template #right>
        <van-icon name="question-o" color="#B1B4C3" />
      </template>
    </van-nav-bar>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 发布帖子
</route>
