<script setup lang="ts" name="/user/login">
import type { FieldRule, FormInstance } from 'vant'
import { userGetPhoneCode, userLogin } from '~/api/user'
import { parseRedirectPath, randomNum } from '~/utils'

const { query } = useRoute()
const router = useRouter()
const userStore = useUserStore()

const phone = ref(randomNum())
const code = ref('')
const timeCounter = ref(0)
const timer = ref<null | NodeJS.Timeout>(null)

// 是否能点击获取验证码
const isClickGetCode = computed(() => (timeCounter.value === 0 && phone.value))

// 获取验证码
async function getCode() {
  if (!isClickGetCode.value)
    return

  const { code: phoneCode } = await userGetPhoneCode({ phone: phone.value })
  code.value = phoneCode

  timeCounter.value = 9
  timer.value = setInterval(() => {
    timeCounter.value--
    if (timeCounter.value <= 0) {
      if (timer.value) {
        clearInterval(timer.value)
      }
      timeCounter.value = 0
    }
  }, 1000)
}
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

function rulesFn(msg: string = '请输入'): FieldRule[] {
  return [{ required: true, message: msg, trigger: 'onSubmit' }]
}

const formRef = ref<null | FormInstance>(null)
async function submit() {
  await formRef.value?.validate()

  const params = {
    phone: phone.value,
    code: code.value,
  }
  const { token } = await userLogin(params)
  await userStore.changeToken(token)

  const redirectPath = query.redirectPath ? parseRedirectPath(query.redirectPath as string) : ''
  router.replace(redirectPath || '/')
}
</script>

<template>
  <div class="flex flex-1 flex-col bg-white">
    <van-nav-bar placeholder fixed>
      <template #left>
        <RouterLink to="/" :replace="true">
          <van-icon name="wap-home-o" color="#0B1526" :size="18" />
        </RouterLink>
      </template>
    </van-nav-bar>
    <div class="flex-1 px7">
      <div class="mt-10 text-6">
        手机号码登录
      </div>
      <div class="mt-10">
        <van-form ref="formRef">
          <van-field
            v-model="phone" label="" placeholder="请输入手机号码" :border="false" clearable
            :rules="rulesFn('请输入手机号码')"
          />
          <van-field
            v-model="code" label="" placeholder="请输入手机验证码" :border="false" clearable :maxlength="6"
            :rules="rulesFn('请输入手机验证码')"
          >
            <template #right-icon>
              <span :class="[isClickGetCode ? 'color-[#0B1526]' : 'text-[#ccc8c8]']" @click="getCode">获取验证码 {{ timeCounter > 0 ? timeCounter : '' }}</span>
            </template>
          </van-field>
        </van-form>
      </div>
      <div class="mt-6">
        <div class="h-10 rounded-full text-center text-4 color-white line-height-10 bg-primary" @click="submit">
          登录
        </div>
      </div>

      <RouterLink to="/user/register" replace class="mt5 block text-center color-[#666262]">
        <span>新用户注册</span>
        <van-icon name="arrow" />
      </RouterLink>
    </div>

    <!-- 其它登录 -->
    <div class="flex-shrink-0 pb-10">
      <p class="text-center color-[#666262]">
        其他登录方式
      </p>
      <div class="mt-5 flex justify-evenly px-5">
        <SvgIcon icon-class="wechat" size="53" color="#00c785" />
        <SvgIcon icon-class="qq" size="53" color="#23a0f0" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-cell.van-field) {
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #ebedf0;
}
</style>

<route lang="yaml">
  meta:
    title: 用户登录
    noCache: true
</route>
