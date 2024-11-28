<script setup lang="ts">
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

const props = defineProps<{
  list: API.CommonRecommendListRes['list']
  hideAdd?: boolean
  hideAnimation?: boolean
}>()

// const emits = defineEmits<{
//   add: [v: API.CommonRecommendListItem]
// }>()
</script>

<template>
  <Waterfall
    :list="props.list" :cross-origin="false" :breakpoints="{
      500: { rowPerView: 2 },
    }"
    :has-around-gutter="false"
    animation-effect="animate__jackInTheBox"
    background-color="transpant"
    :animation-cancel="hideAnimation"
  >
    <template #default="{ item }">
      <CardItem v-bind="$attrs" :item="item" />
    </template>
  </Waterfall>
</template>
