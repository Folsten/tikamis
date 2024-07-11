<template>
  <ModalBoolean
    @callback="modal.callback"
    :is-visible="modal.isVisible"
    :primary-button-component="BaseButtonFilledDark"
    :main-title="modal.mainTitle"
    :primary-button-text="modal.primaryButtonText"
    :secondary-button-text="modal.secondaryButtonText"
  />
  <MainHeader />
  <MainHeaderGap />
  <div class="w-full flex overflow-x-hidden">
    <div class="flex flex-col w-full">
      <div
        v-if="changesSince"
        :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }"
        class="w-full flex justify-center items-center bg-red text-2xl text-white font-medium h-[50px]"
      >
        Изменения вступят в силу начиная с {{ changesSinceFormatted }}
      </div>
      <section
        :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }"
        class="pt-[20px] pl-[122px] flex flex-1 mr-[30px] mb-10"
      >
        <form class="flex flex-col w-full max-w-[540px]">
          <h1 class="text-4xl leading-normal font-medium">
            Технические настройки<br />
            {{ formattedFullAddress }}
          </h1>
          <div
            v-if="isEnv('sadmin')"
            class="flex flex-col mt-10 w-full max-w-full"
          >
            <div class="flex w-full">
              <div class="flex flex-col mr-5 w-full">
                <span class="text-lg font-semibold">Логин директора</span>
                <input
                  v-model="login"
                  class="base-input text-2xl w-full mt-3"
                  type="text"
                />
              </div>
              <div class="flex flex-col w-full">
                <span class="text-lg font-semibold">Пароль директора</span>
                <input
                  v-model="password"
                  class="base-input text-2xl w-full mt-3"
                  type="password"
                  autocomplete="false"
                />
              </div>
            </div>
            <div class="flex mt-5">
              Изменение логина или пароля приведёт к отключению<br />
              аккаунта с предыдущими данными.<br />
              Изменения вступят в силу сразу.
            </div>
          </div>
          <div class="text-2xl font-medium mt-5">Режим работы</div>
          <div class="flex flex-col mt-4">
            <div
              @click="bookingAvailable = false"
              class="flex items-center cursor-pointer"
            >
              <BaseRadioButton :is-active="!bookingAvailable" />
              <span class="text-lg ml-2">Без записи, только живая очередь</span>
            </div>
            <div
              @click="bookingAvailable = true"
              class="flex items-center cursor-pointer mt-3"
            >
              <BaseRadioButton :is-active="bookingAvailable" />
              <span class="text-lg ml-2">Режим записи</span>
            </div>
          </div>
          <div
            v-if="bookingAvailable"
            class="flex mt-6"
          >
            <div class="flex flex-col">
              <span class="text-lg font-semibold">Время начала работы</span>
              <input
                v-model="shiftsStart"
                v-mask="'##:##'"
                class="base-input text-2xl w-full mt-3"
                type="text"
              />
            </div>
            <div class="flex flex-col ml-8">
              <span class="text-lg font-semibold">Время окончания работы</span>
              <input
                v-model="shiftsFinish"
                v-mask="'##:##'"
                class="base-input text-2xl w-full mt-3"
                type="text"
              />
            </div>
          </div>
          <div
            v-if="bookingAvailable"
            class="flex flex-col mt-10"
          >
            <span class="text-2xl font-medium">Часовой пояс</span>
            <SelectTimezone
              @set-time-zone="emitSetTimezone"
              :timezone-offset-hours="timezoneOffsetHours"
              class="mt-3"
            />
          </div>
          <div class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Техническая оснащённость постами</span>
            <input
              v-model="postsEquipment"
              type="number"
              class="base-input text-2xl w-40 mt-3"
            />
          </div>
          <div
            v-if="isEnv('sadmin')"
            class="flex flex-col mt-10"
          >
            <span class="text-2xl font-medium">Производственный люфт</span>
            <span class="text-lg mt-3 mb-3"
              >Установка значения перерыва между обслуживанием автомобилей на посту, в
              минутах.</span
            >
            <input
              v-model="clearanceMinutes"
              type="number"
              class="base-input text-2xl w-40 mt-3"
            />
          </div>
          <div
            v-if="isEnv('sadmin')"
            class="flex flex-col mt-10"
          >
            <span class="text-2xl font-medium">Установка глубины записи в днях</span>
            <input
              v-model="orderDepthDays"
              type="number"
              class="base-input text-2xl w-40 mt-3"
            />
          </div>
          <div class="flex flex-col items-center">
            <div class="w-full flex mt-10 mb-3">
              <BaseButtonFilledGreen
                @click.prevent="saveModal"
                class="flex flex-1 mr-5"
                >Сохранить</BaseButtonFilledGreen
              >
              <BaseButtonFilledLight
                v-if="isEnv('sadmin')"
                @click.prevent="closeModal"
                class="flex flex-1"
                >Закрыть</BaseButtonFilledLight
              >
            </div>
            <BaseErrorText v-if="isRequestSuccess !== undefined && !isRequestSuccess"
              >Ошибка! Один или несколько полей заполнены не верно</BaseErrorText
            >
            <BaseSuccessText v-if="isRequestSuccess !== undefined && isRequestSuccess"
              >Успех! Запрос отправлен</BaseSuccessText
            >
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
<script setup>
import MainHeader from '@/components/MainHeader.vue';
import BaseRadioButton from '@/components/BaseRadioButton.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import SelectTimezone from '@/components/SelectTimezone.vue';
import { useMainStore } from '@/stores/shared/main.js';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
import isEnv from '@/utils/isEnv.js';
import { computed, onBeforeMount, ref } from 'vue';
import directorApiManageSettings from '@/api/director/directorApiManageSettings.js';
import directorApiManageSettingsPost from '@/api/director/directorApiManageSettingsPost.js';
import sadminApiManageSettings from '@/api/sadmin/sadminApiManageSettings.js';
import sadminApiManageSettingsPost from '@/api/sadmin/sadminApiManageSettingsPost.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import BaseSuccessText from '@/components/BaseSuccessText.vue';
import BaseErrorText from '@/components/BaseErrorText.vue';
import ModalBoolean from '@/components/ModalBoolean.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import router from '@/router/index.js';
import minutesToHHMM from '@/utils/time/minutesToHHMM.js';
import HHMMtoMinutes from '@/utils/time/HHMMtoMinutes.js';
import directorApiCenterInfo from '@/api/director/directorApiCenterInfo.js';

const mainStore = useMainStore();

let login = ref();
let password = ref();
let changesSince = ref();
let changesSinceFormatted = computed(
  () => new Date(changesSince.value * 1000).getDate() + ' февраля'
);
let bookingAvailable = ref(false);
let postsEquipment = ref();
let shiftsFinish = ref();
let shiftsStart = ref();
let timezoneOffsetHours = ref();
let orderDepthDays = ref();
let clearanceMinutes = ref();
let isRequestSuccess = ref();
let formattedFullAddress = ref();

let modal = ref({});

function saveModal() {
  modal.value.callback = save;
  modal.value.isVisible = true;
  modal.value.mainTitle = 'Настройки будут применены 25 июня. Продолжить?';
  modal.value.primaryButtonText = 'Продолжить';
  modal.value.secondaryButtonText = 'Отмена';

  async function save() {
    let response;
    // Sadmin
    if (isEnv('sadmin')) {
      response = await sadminApiManageSettingsPost(
        router.currentRoute.value.query.id,
        login.value,
        password.value,
        bookingAvailable.value,
        postsEquipment.value,
        HHMMtoMinutes(shiftsStart.value),
        HHMMtoMinutes(shiftsFinish.value),
        timezoneOffsetHours.value,
        clearanceMinutes.value,
        orderDepthDays.value
      );
    }
    // Director
    if (isEnv('director')) {
      response = await directorApiManageSettingsPost(
        bookingAvailable.value,
        postsEquipment.value,
        HHMMtoMinutes(shiftsStart.value),
        HHMMtoMinutes(shiftsFinish.value),
        timezoneOffsetHours.value
      );
    }
    if (response.status === 200) {
      isRequestSuccess.value = true;
    }
    if (response.status === 400) {
      isRequestSuccess.value = false;
    }
    modal.value.isVisible = false;
  }
}

function closeModal() {
  modal.value.callback = close;
  modal.value.isVisible = true;
  modal.value.mainTitle = 'Закрыть без сохранения?';
  modal.value.mainText = 'Настройки не будут применены';
  modal.value.primaryButtonText = 'Сохранить изменения';
  modal.value.secondaryButtonText = 'Закрыть без сохранения';

  function close() {
    router.push('/');
  }
}

function emitSetTimezone(value) {
  timezoneOffsetHours.value = value;
}

onBeforeMount(async () => {
  if (isEnv('director')) {
    const centerInfo = await directorApiCenterInfo();
    formattedFullAddress.value = centerInfo.city + ', ' + centerInfo.addressName;

    const data = await directorApiManageSettings();
    bookingAvailable.value = data.bookingAvailable;
    postsEquipment.value = data.postsEquipment;
    shiftsStart.value = minutesToHHMM(data.shiftsStart);
    shiftsFinish.value = minutesToHHMM(data.shiftsFinish);
    changesSince.value = data.changesSince;
    timezoneOffsetHours.value = data.timeZoneOffsetHours;
  }

  if (isEnv('sadmin')) {
    const sadminServiceStationsStore = useSadminServiceStationsStore();
    formattedFullAddress.value =
      sadminServiceStationsStore.getSelectedServiceStation().city +
      ', ' +
      sadminServiceStationsStore.getSelectedServiceStation().addressName;

    const data = await sadminApiManageSettings(router.currentRoute.value.query.id);
    login.value = data.login;
    password.value = data.password;
    bookingAvailable.value = data.bookingAvailable;
    postsEquipment.value = data.postsEquipment;
    shiftsStart.value = minutesToHHMM(data.shiftsStart);
    shiftsFinish.value = minutesToHHMM(data.shiftsFinish);
    changesSince.value = data.changesSince;
    timezoneOffsetHours.value = data.timeZoneOffsetHours;
    clearanceMinutes.value = data.clearanceMinutes;
    orderDepthDays.value = data.orderDepthDays;
  }
});
</script>
