<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import html2canvas from 'html2canvas'
import { showDialog, showLoadingToast, showToast } from 'vant'
import { copyText, generateRandomIntegerString, openQQHref } from '~/utils'

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

async function onSelect({ icon }: { icon: string }) {
  const key = icon
  if (key === 'link') {
    copyText(window.location.href)
    showToast({ message: '复制成功', type: 'success' })
  }
  else if (key === 'qrcode') {
    showDialog({ message: `<img class="m-auto" src='${qrcode.value}'' />`, allowHtml: true, theme: 'round-button' })
  }
  else if (key === 'poster') {
    const toastInstance = showLoadingToast({
      mask: true,
      message: '加载中...',
      teleport: '#otherContainer',
    })
    showShare.value = false
    await nextTick()
    const canvas = await html2canvas(document.querySelector('#app') as HTMLElement, { useCORS: true, allowTaint: true, scrollY: 0, scrollX: 0 })
    const dataUrl = canvas.toDataURL()
    toastInstance.close()
    showDialog({
      message: `<img class="m-auto" src='${dataUrl}'' />`,
      allowHtml: true,
      theme: 'round-button',
      showCancelButton: true,
      confirmButtonText: '保存图片',
    }).then(() => {
      // 创建一个 a 标签，并设置 href 和 download 属性
      const el = document.createElement('a')
      // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
      el.href = dataUrl
      el.download = generateRandomIntegerString(10)
      // 创建一个点击事件并对 a 标签进行触发
      const event = new MouseEvent('click')
      el.dispatchEvent(event)
    })
  }
  else {
    openQQHref()
  }
}
</script>

<template>
  <SvgIcon icon-class="share" :color="props.color" :size="props.size" @click="showShare = !showShare" />
  <van-share-sheet v-model:show="showShare" :options="options" teleport="body" @select="onSelect" />
</template>

<style scoped></style>
