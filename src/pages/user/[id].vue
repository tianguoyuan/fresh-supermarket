<script setup lang="ts">
const { params } = useRoute('/user/[id]')
</script>

<template>
  <div>
    {{ params.id }}
  </div>
</template>

<style scoped>

</style>
