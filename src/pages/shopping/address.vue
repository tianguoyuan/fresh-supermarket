<script setup lang="ts" name="/shopping/address">
import type { FormInstance } from 'vant'
import { areaList } from '@vant/area-data'
import { showDialog } from 'vant'
import { shoppingAddress } from '~/api/shopping'

const userStore = useUserStore()
const addressList = ref<API.ShoppingAddressRes['addressList']>([])

init()
async function init() {
  const result = await shoppingAddress({ userId: userStore.userInfo.id })
  addressList.value = (result.addressList || []).map((v, i) => ({ ...v, checked: i === 0 }))
}

const isEdit = ref(false)
onBeforeRouteLeave(() => {
  isEdit.value = false
})

function removeClick(v: API.ShoppingAddressResItem) {
  showDialog({
    message: '确定要删除该地址吗?',
    theme: 'round-button',
    showCancelButton: true,
    teleport: 'body',
  }).then(() => {
    addressList.value = addressList.value.filter(l => l.id !== v.id)
  })
}
function checkedClick(v: API.ShoppingAddressResItem) {
  v.checked = !v.checked
}

const height = ref(Math.round(0.85 * window.innerHeight))
const showEditDialog = ref(false)
const initEditAddressItem = {
  id: '',
  username: '',
  phone: '',
  checked: false,

  province: '',
  city: '',
  county: '',
  suffix: '',
}
const editAddress = ref({ ...initEditAddressItem })
const currentAddressId = ref('')
const showProvince = ref(false)
const addressCode = ref('')
const formRef = ref<FormInstance | null>(null)
function rightClick(v: API.ShoppingAddressResItem) {
  showEditDialog.value = true
  editAddress.value = { ...v }
  currentAddressId.value = v.id
}
function add() {
  currentAddressId.value = ''
  showEditDialog.value = true
  editAddress.value = { ...initEditAddressItem }
}
function onSubmit() {
  if (currentAddressId.value) {
    const item = addressList.value.find(v => v.id === currentAddressId.value)
    if (item) {
      item.province = editAddress.value.province
      item.city = editAddress.value.city
      item.county = editAddress.value.county
      item.suffix = editAddress.value.suffix
      item.phone = editAddress.value.phone
      item.username = editAddress.value.username
    }
  }
  else {
    addressList.value.unshift(editAddress.value)
  }
  showEditDialog.value = false
}
function onCancel() {
  showEditDialog.value = false
  editAddress.value = { ...initEditAddressItem }
  formRef.value?.resetValidation()
}
function areaConfirm({ selectedOptions }: any) {
  showProvince.value = false

  editAddress.value.province = selectedOptions[0]?.text || ''
  editAddress.value.city = selectedOptions[1]?.text || ''
  editAddress.value.county = selectedOptions[2]?.text || ''
}
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed :clickable="false" title="地址管理">
      <template #left>
        <RouterLink to="/shopping/settleAccount">
          <van-icon name="arrow-left" color="#0B1526" />
        </RouterLink>
      </template>
    </van-nav-bar>
    <div class="p-3">
      <div class="flex justify-between text-3">
        <div>常用地址</div>
        <div class="flex">
          <div @click="isEdit = !isEdit">
            <SvgIcon icon-class="edit" size="12" :color="isEdit ? '#ee0a24' : '#333'" />
            <span class="pl-2px" :class="isEdit ? 'color-#ee0a24' : 'color-#333'">{{ isEdit ? '完成' : '管理' }}</span>
          </div>
          <div class="ml-2" @click="add">
            <SvgIcon icon-class="add" size="12" />
            <span class="pl-2px">新增地址</span>
          </div>
        </div>
      </div>

      <AddressItem
        v-for="(v, i) in addressList"
        :key="i"
        class="mt-3" :item="v"
        :show-flag="isEdit ? 'editAndRemove' : 'edit'" @remove-click="removeClick"
        @checked-click="checkedClick"
        @right-click="rightClick"
      />
      <div class="h-10" />
    </div>

    <!-- 新增 修改弹窗 -->
    <van-floating-panel v-show="showEditDialog" v-model:height="height" :anchors="[height]">
      <van-overlay :show="showEditDialog" teleport="body" />
      <div>
        <van-form ref="formRef" @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              :model-value="editAddress.province + editAddress.city + editAddress.county"
              readonly
              label="地区"
              placeholder="请选择所在地区"
              :rules="[{ required: true, message: '请选择所在地区' }]"
              @click="showProvince = true"
            />

            <van-field
              v-model="editAddress.suffix"
              name="详细地址"
              label="详细地址"
              placeholder="详细地址"
              :rules="[{ required: true, message: '请填写详细地址' }]"
            />
            <van-field
              v-model="editAddress.username"
              name="姓名"
              label="姓名"
              placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field
              v-model="editAddress.phone"
              type="tel"
              name="手机号"
              label="手机号"
              placeholder="手机号"
              :rules="[{ required: true, message: '请填写手机号' }]"
            />
          </van-cell-group>
          <div class="mx-3 mt-3 flex">
            <van-button round class="flex-1" @click="onCancel">
              取消
            </van-button>
            <div class="w-1" />
            <van-button round type="primary" native-type="submit" class="flex-1">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </van-floating-panel>
    <!-- 省市区选择 -->
    <van-popup v-model:show="showProvince" round position="bottom">
      <van-area
        v-model="addressCode"
        title="省" :area-list="areaList"
        @cancel="showProvince = false"
        @confirm="areaConfirm"
      />
    </van-popup>
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
  meta:
    title: 地址管理
</route>
