<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { showDialog, showToast } from 'vant'
import { copyText, openQQHref } from '~/utils'

const props = withDefaults(defineProps<{
  color?: string
  size?: string
}>(), {
  size: '18',
  color: '#666',
})

const showShare = ref(false)
const options = [
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: '微博', icon: 'weibo' },
    { name: 'QQ', icon: 'qq' },
  ],
  [
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
  ],
]
const qrcode = useQRCode(window.location.href)

function onSelect({ icon }: { icon: string }) {
  const key = icon
  if (key === 'link') {
    copyText(window.location.href)
    showToast({ message: '复制成功', type: 'success' })
  }
  else if (key === 'qrcode') {
    showDialog({ message: `<img src='${qrcode.value}'' />`, allowHtml: true })
  }
  else {
    openQQHref()
  }
}
</script>

<template>
  <SvgIcon icon-class="share" :color="props.color" :size="props.size" @click="showShare = !showShare" />
  <van-share-sheet
    v-model:show="showShare"
    :options="options"
    teleport="body"
    @select="onSelect"
  />
</template>

<style scoped>

</style>
