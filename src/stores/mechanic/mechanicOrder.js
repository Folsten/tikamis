import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { mechanicApiClient } from '@/api/mechanicApiClient.js';
import router from '@/router/index.js'

export const useMechanicOrderStore = defineStore(
  'mechanicOrder',
  () => {
    let orderId = ref();
    let isOrderAccepted = ref(false);
    let plateNumber = ref('');
    let startTime = ref('');
    let startDate = ref('');
    let completionTimeHours = ref();
    let works = ref();
    let qrcode = ref();

    let formattedCompletionTime = computed(() => {
      let time = String(completionTimeHours.value).split('.');
      if (time.length === 2) {
        let hoursString = '';
        let minutesString = '';
        if (Number(time[0]) !== 0) {
          hoursString = `${time[0]} ч `;
        }
        minutesString = `${60 * (time[1] / (10 + '0'.repeat(time[1].length - 1)))} мин`;
        return hoursString + minutesString;
      }
      return null;
    });

    async function orderGetNext() {
      const { data } = await mechanicApiClient.get(`/order/get-next`);
      orderId.value = data.orderId;
      isOrderAccepted.value = data.isOrderAccepted;
      plateNumber.value = data.plateNumber;
      startTime.value = data.startTime;
      startDate.value = data.startDate;
      completionTimeHours.value = data.completionTimeHours;
      works.value = data.works;
    }

    async function orderStart() {
      let response = await mechanicApiClient.post('/order/start', { orderId: orderId.value });
      if (response.status === 200) {
        qrcode.value = ''
        await orderGetNext();
      }
    }

    async function orderCancel() {
      await mechanicApiClient.post('/order/cancel', { orderId: orderId.value });
      await orderGetNext();
    }

    async function orderComplete(odometer) {
      const { data } = await mechanicApiClient.post('/order/complete', { odometer });
      if (data.result) {
        qrcode.value = data.result;
        await router.push('/mechanic/payment-qr');
      }
    }

    async function workList() {
      const { data } = await mechanicApiClient.get('/work/list');
      return data;
    }

    async function workAdd(workIds) {
      await mechanicApiClient.post('/order/work', { orderId: orderId.value, workIds });
      await orderGetNext();
    }

    async function workRemove(workId) {
      await mechanicApiClient.delete('/order/work', {
        data: {
          orderId: orderId.value,
          workId: workId
        }
      });
      await orderGetNext();
    }

    return {
      orderId,
      plateNumber,
      startTime,
      startDate,
      completionTimeHours,
      works,
      formattedCompletionTime,
      isOrderAccepted,
      qrcode,
      orderGetNext,
      orderStart,
      orderCancel,
      orderComplete,
      workAdd,
      workRemove,
      workList
    };
  },
  {
    persist: true
  }
);
