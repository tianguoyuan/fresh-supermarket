<!-- 优惠券 -->
<script setup lang="ts">
const props = defineProps<{
  pickerValue: number[]
  columns: { text: number, value: number }[]
}>()
const emits = defineEmits<{
  'update:pickerValue': [number[]]
}>()

const showPicker = ref(false)

function confirm({ selectedValues }: { selectedValues: number[] }) {
  // props.pickerValue.value = selectedValues
  emits('update:pickerValue', selectedValues)
  showPicker.value = false
}
</script>

<template>
  <div class="flex justify-between rounded-8px bg-white p-3 py-4" @click="showPicker = true">
    <div>优惠券</div>
    <div class="flex items-center">
      <div v-if="props.pickerValue[0]">
        <span class="color-#F55726"><span class="text-3">￥</span>-{{ pickerValue[0] }}</span>
      </div>
      <div v-else class="color-#999">
        请选择
      </div>
      <van-icon name="arrow" class="pl-1" />
    </div>
  </div>

  <van-popup v-model:show="showPicker" round destroy-on-close position="bottom">
    <van-picker
      :model-value="props.pickerValue"
      :columns="props.columns"
      @cancel="showPicker = false"
      @confirm="confirm"
    />
  </van-popup>
</template>

<style scoped lang="scss"></style>
