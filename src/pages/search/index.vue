<script setup lang="ts" name="/search/">
const router = useRouter()
function back() {
  router.back()
}
const searchMsg = ref('')

const historySearch = useLocalStorage(('historySearch'), ['读书', '求职日记'])
</script>

<template>
  <div>
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" color="#0B1526" @click="back" />
      </template>
      <template #title>
        <van-search
          v-model="searchMsg"
          class="search-box h-[46px]"
          placeholder="搜索想要搜索的内容"
        />
      </template>

      <template #right>
        <span class="color-[#8D93A6]">搜索</span>
      </template>
    </van-nav-bar>

    <div class="mx-4 mt-4">
      <div class="flex justify-between">
        <span class="color-[#0B1526]">历史搜索</span>
        <img src="../../assets/images/rubbish.png" alt="" class="w-3">
      </div>

      <div class="mt-3 flex">
        <span v-for="item in historySearch" :key="item" class="mr-2 rounded-2 bg-[#F6F8FA] px-4 py-2 text-3 color-[#0B1526]">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.van-nav-bar__title) {
  width: calc(100vw - 120px);
  max-width: none;

  .van-search__field {
    padding: 0;
  }
  .van-search {
    padding: 0;
  }

  .search-box {
    .van-nav-bar,
    .van-icon {
      color: #8d93a6;
    }
  }
}
</style>

<route lang="yaml">
  meta:
    title: 搜索文章
</route>
