import MechanicAuthView from '@/views/Mechanic/MechanicAuth/MechanicAuthView.vue';
import MechanicHumanSelectView from '@/views/Mechanic/MechanicHumanSelect/MechanicHumanSelectView.vue';
import MechanicOrderView from '@/views/Mechanic/MechanicOrder/MechanicOrderView.vue';
import MechanicOrderWorkAddView from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddView.vue';
import MechanicPaymentQrView from '@/views/Mechanic/MechanicPaymentQr/MechanicPaymentQrView.vue';
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js';

const mechanicRoutes = {
  path: '/mechanic',
  children: [
    {
      path: 'auth',
      name: 'mechanic.auth',
      component: MechanicAuthView,
      meta: { title: 'Аутентификация' }
    },
    {
      path: 'human-select',
      name: 'mechanic.human-select',
      component: MechanicHumanSelectView,
      meta: { title: 'Выбор механика' }
    },
    {
      path: 'order',
      name: 'mechanic.order',
      component: MechanicOrderView,
      meta: { title: 'Заказ' }
    },
    {
      path: 'order/work-add',
      name: 'mechanic.order.work-add',
      component: MechanicOrderWorkAddView,
      meta: { title: 'Добавление работы в заказ' }
    },
    {
      path: 'payment-qr',
      name: 'mechanic.payment-qr',
      component: MechanicPaymentQrView,
      meta: { title: 'QR Код' }
    },
    // >>> 404 REDIRECT <<<
    {
      path: ':pathMatch(.*)*',
      redirect: '/mechanic/auth',
    }
  ]
};

function mechanicBeforeEach(to) {
  const mechanicUserStore = useMechanicUserStore();
  const mechanicOrderStore = useMechanicOrderStore();

  // Роутинг если в localStorage нету access токена
  if (!mechanicUserStore.accessToken) {
    if (to.path === '/mechanic/auth') {
      return true;
    } else {
      return '/mechanic/auth';
    }
  }

  // Роутинг если в localStorage есть access токен

  if (mechanicUserStore.accessToken) {
    // Если переход на страницу выбора механика, но механик уже выбран
    // то редиректнуть на страницу заказа
    if (to.path === '/mechanic/human-select' && mechanicUserStore.activeMechanicId) {
      return '/mechanic/order'
    }
    // Если переход на страницу заказа, но механик ещё не выбран
    // то редиректнуть на страницу выбора механика
    if (to.path === '/mechanic/order' && mechanicUserStore.activeMechanicId === '') {
      return '/mechanic/human-select'
    }
    // Если переход на страницу авторизации, но человек уже авторизован
    // то переход на страницу выбора механика
    if (to.path === '/mechanic/auth' && mechanicUserStore.accessToken) {
      return '/mechanic/human-select'
    }
    // Если переход на страницу добавления работ в заказ, но механик ещё не выбран
    // то редиректнуть на страницу выбора механика
    if (to.path === '/mechanic/order/work-add' && !mechanicUserStore.activeMechanicId) {
      return '/mechanic/human-select'
    }
    // Если переход на страницу с QR кодом, но QR код о завершении заказа ещё не получен
    // то редиректнуть на страницу заказа
    if (to.path === '/mechanic/payment-qr' && !mechanicOrderStore.qrcode) {
      return '/mechanic/order'
    }
  }

  return true;
}

export { mechanicRoutes, mechanicBeforeEach };
