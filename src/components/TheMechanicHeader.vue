<template>
  <header class="flex w-full border-b border-gray-dcdcdc h-the-header">
    <div
      @click="isMenuActive = !isMenuActive"
      :class="{ 'bg-gray-2c2d2f': isMenuActive }"
      class="relative flex bg- h-full pl-[30px] pr-[30px] justify-center items-center border-r border-gray-dcdcdc cursor-pointer"
    >
      <BaseSvgIcon
        v-if="!isMenuActive"
        name="burger-menu"
        class="w-[30px] h-[30px]"
      />
      <BaseSvgIcon
        v-if="isMenuActive"
        name="cross"
        class="w-[30px] h-[30px]"
      />
      <div
        v-if="isMenuActive"
        @click="mechanicLogout"
        class="absolute pl-[30px] text-white w-[276px] flex items-center bg-gray-2c2d2f -bottom-[80px] left-0 h-[80px]"
      >
        Выход
      </div>
    </div>
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center ml-7">
        <BaseSvgIcon
          name="logo"
          class="w-[32px] h-[32px]"
        />
        <span class="pl-[10px] font-semibold text-lg">Механик</span>
        <span class="pl-[30px] text-lg">{{ mechanicUserStore.activeMechanicName }}</span>
      </div>
      <div class="pr-[30px]">{{ formattedFullAddress}}</div>
    </div>
  </header>
</template>

<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue'
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js'
import { computed, onMounted, ref } from 'vue'
import mechanicApiMechanicLogout from '@/api/mechanic/mechanicApiMechanicLogout.js'
import mechanicApiCenterInfo from '@/api/mechanic/mechanicApiCenterInfo.js'
import router from '@/router/index.js'

let mechanicUserStore = useMechanicUserStore()
let isMenuActive = ref(false)
let city = ref('')
let address = ref('')
let formattedFullAddress = computed(() => city.value + ', ' + address.value)

onMounted(async () => {
  if (mechanicUserStore.accessToken) {
    await getCenterInfo()
  }
})

async function getCenterInfo() {
  const data = await mechanicApiCenterInfo()
  city.value = data.city
  address.value = data.addressName
}

async function mechanicLogout() {
  mechanicUserStore.activeMechanicId = ''
  mechanicUserStore.activeMechanicName = ''
  await mechanicApiMechanicLogout()
  await router.push('/mechanic/human-select')
}
</script>
