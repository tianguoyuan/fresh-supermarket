<script setup lang="ts">
const { params } = useRoute('/redirect/[path]')

const isEncode = (str: string) => str.includes(encodeURIComponent('?'))

function deepDecode(str: string) {
  if (isEncode(str)) {
    str = decodeURIComponent(str)
    return deepDecode(str)
  }
  return `/${str}`
}

const redirectPath = deepDecode(params.path)

const router = useRouter()
router.replace(redirectPath)
</script>

<template>
  <div />
</template>
