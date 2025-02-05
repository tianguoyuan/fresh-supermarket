<script setup lang="ts">
const props = withDefaults(defineProps<{
  item: API.ShoppingAddressResItem
  showFlag?: 'info' | 'edit' | 'remove' | 'editAndRemove'
}>(), {
  showFlag: 'info',
})

const emits = defineEmits<{
  handleClick: []
  removeClick: [v: typeof props.item]
  checkedClick: [v: typeof props.item]
  rightClick: [v: typeof props.item]
}>()
</script>

<template>
  <div class="rounded-2 bg-white p-3" @click="emits('handleClick')">
    <div class="flex items-center">
      <div>
        <SvgIcon icon-class="address" size="22" />
      </div>
      <div class="flex-1 px-2">
        <div class="line-clamp-2 text-15px line-height-22px">
          {{ props.item.province + props.item.city + props.item.county + props.item.suffix }}
        </div>
        <div class="text-3 color-#999 line-height-17px">
          <span>{{ props.item.username }}</span> <span>{{ props.item.phone }}</span>
        </div>
      </div>
      <div
        v-if="['edit', 'info', 'editAndRemove'].includes(props.showFlag)" @click.stop="emits('rightClick', props.item)"
      >
        <SvgIcon v-if="props.showFlag === 'edit' || props.showFlag === 'editAndRemove'" icon-class="edit" size="14" />

        <van-icon v-if="props.showFlag === 'info'" name="arrow" color="#0B1526" />
      </div>
    </div>
    <div v-if="['remove', 'editAndRemove'].includes(props.showFlag)" class="mt-2 flex justify-between text-3">
      <div class="flex items-center" @click.stop="emits('checkedClick', props.item)">
        <SvgIcon :icon-class="item.checked ? 'radio-checked' : 'radio'" size="14" />
        <span class="pl-1">默认地址</span>
      </div>
      <div class="color-#ee0a24" @click.stop="emits('removeClick', props.item)">
        删除
      </div>
    </div>
  </div>
</template>
