import { useSadminUserStore } from '@/stores/sadmin/sadminUser.js';
import SharedAuthView from '@/views/Shared/SharedAuth/SharedAuthView.vue';
import SharedManageSettingsView from '@/views/Shared/SharedManageSettings/SharedManageSettingsView.vue';
import SharedManageCalendarView from '@/views/Shared/SharedManageCalendar/SharedManageCalendarView.vue';
import SharedManageCustomerRecordsView from '@/views/Shared/SharedManageCustomerRecords/SharedManageCustomerRecordsView.vue';
import SharedAnalyticsPostsKpdView from '@/views/Shared/SharedAnalyticsPostsKpd/SharedAnalyticsPostsKpdView.vue';
import SharedAnalyticsReviewsView from '@/views/Shared/SharedAnalyticsReviews/SharedAnalyticsReviewsView.vue';
import SharedAnalyticsServiceKpd from '@/views/Shared/SharedAnalyticsServiceKpd/SharedAnalyticsServiceKpd.vue';
import SharedAnalyticsServiceWorkloadView from '@/views/Shared/SharedAnalyticsServiceWorkload/SharedAnalyticsServiceWorkloadView.vue';
import SharedReportPostsDowntimeView from '@/views/Shared/SharedReportPostsDowntime/SharedReportPostsDowntimeView.vue';
import SharedReportCanceledWorksView from '@/views/Shared/SharedReportCanceledWorks/SharedReportCanceledWorksView.vue';
import SharedReportAddedWorksView from '@/views/Shared/SharedReportAddedWorks/SharedReportAddedWorksView.vue';
import SharedReportCustomerSkipsView from '@/views/Shared/SharedReportCustomerSkipsView/SharedReportCustomerSkipsView.vue';
import SharedReportPlateFakesView from '@/views/Shared/SharedReportPlateFakes/SharedReportPlateFakesView.vue';
import SharedAnalyticsServiceHistoryView from '@/views/Shared/SharedAnalyticsServiceHistory/SharedAnalyticsServiceHistoryView.vue';
import SharedReportSuspiciousPhonesView from '@/views/Shared/SharedReportSuspiciousPhones/SharedReportSuspiciousPhonesView.vue';
import SadminManageCarCentersView from '@/views/Sadmin/SadminManageCarCenters/SadminManageCarCentersView.vue';
import sadminApiAllCarCenters from '@/api/sadmin/sadminApiAllCarCenters.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';

const sadminRoutes = {
  path: '/sadmin',
  children: [
    {
      path: 'auth',
      name: 'sadmin.auth',
      component: SharedAuthView,
      meta: { title: 'Аутентификация' },
      props: { title: 'Панель админа' }
    },
    {
      path: 'manage',
      children: [
        {
          path: 'settings',
          name: 'sadmin.manage.settings',
          component: SharedManageSettingsView,
          meta: { title: 'Настройки' }
        },
        {
          path: 'calendar',
          name: 'sadmin.manage.calendar',
          component: SharedManageCalendarView,
          meta: { title: 'Календарь рабочих смен' }
        },
        {
          path: 'customer-records',
          name: 'sadmin.manage.customer-records',
          component: SharedManageCustomerRecordsView,
          meta: { title: 'Записи клиентов' }
        },
        {
          path: 'car-centers',
          name: 'sadmin.manage.car-centers',
          component: SadminManageCarCentersView
        }
      ]
    },
    {
      path: 'analytics',
      children: [
        {
          path: 'posts-kpd',
          name: 'sadmin.analytics.posts-kpd',
          component: SharedAnalyticsPostsKpdView,
          meta: { title: 'КПД постов' }
        },
        {
          path: 'reviews',
          name: 'sadmin.analytics.reviews',
          component: SharedAnalyticsReviewsView,
          meta: { title: 'Отзывы' }
        },
        {
          path: 'service-kpd',
          name: 'sadmin.analytics.service-kpd',
          component: SharedAnalyticsServiceKpd,
          meta: { title: 'КПД сервиса' }
        },
        {
          path: 'service-workload',
          name: 'sadmin.service.workload',
          component: SharedAnalyticsServiceWorkloadView,
          meta: { title: 'Загруженность сервиса' }
        },
        {
          path: 'service-history',
          name: 'sadmin.analytics.service-history',
          component: SharedAnalyticsServiceHistoryView,
          meta: { title: 'Сервисная история' }
        }
      ]
    },
    {
      path: 'report',
      children: [
        {
          path: 'posts-downtime',
          name: 'sadmin.report.posts-downtime',
          component: SharedReportPostsDowntimeView,
          meta: { title: 'Простои постов' }
        },
        {
          path: 'canceled-works',
          name: 'sadmin.report.canceled-works',
          component: SharedReportCanceledWorksView,
          meta: { title: 'Заказанные, но не выполненные работы' }
        },
        {
          path: 'added-works',
          name: 'sadmin.report.added-works',
          component: SharedReportAddedWorksView,
          meta: { title: 'Дополнительные работы' }
        },
        {
          path: 'customer-skips',
          name: 'sadmin.report.customer-skips',
          component: SharedReportCustomerSkipsView,
          meta: { title: 'Не приехавшие клиенты' }
        },
        {
          path: 'plate-fakes',
          name: 'sadmin.report.plate-fakes',
          component: SharedReportPlateFakesView,
          meta: { title: 'Фалишовые гос. номера' }
        },
        {
          path: 'suspicious-phones',
          name: 'director.report.suspicious-phones',
          component: SharedReportSuspiciousPhonesView,
          meta: { title: 'Подозрительная привязка телефонов' }
        }
      ]
    }
    // >>> 404 REDIRECT <<<
    // {
    //   path: ':pathMatch(.*)*',
    //   redirect: '/sadmin/manage/car-services',
    // }
  ]
};

async function sadminBeforeEach(to) {
  const sadminUserStore = useSadminUserStore();

  if (!sadminUserStore.accessToken) {
    if (to.path === '/sadmin/auth') {
      return true;
    } else {
      return '/sadmin/auth';
    }
  }

  if (sadminUserStore.accessToken) {
    console.log('ny u')
    await sadminServiceStationsHandler();

    if (to.path === '/sadmin/auth') {
      return '/sadmin/manage/car-centers';
    }

    if (to.path === '/sadmin/manage/settings') {
      if (to.query.id) {
        return true;
      } else {
        return '/sadmin/manage/car-centers'
      }
    }

    return true;

  }

  return true;
}

async function sadminServiceStationsHandler() {
  const sadminServiceStationsStore = useSadminServiceStationsStore();
  if (sadminServiceStationsStore.serviceStations.length === 0) {
    const { carCenters } = await sadminApiAllCarCenters();
    carCenters.forEach((carCenter) => {
      carCenter.isSelected = false;
    })
    carCenters[0].isSelected = true;
    sadminServiceStationsStore.serviceStations = carCenters;
  }
}

export { sadminRoutes, sadminBeforeEach };
