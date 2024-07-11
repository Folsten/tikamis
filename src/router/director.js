import SharedAuthView from '@/views/Shared/SharedAuth/SharedAuthView.vue';
import SharedManageSettingsView from '@/views/Shared/SharedManageSettings/SharedManageSettingsView.vue';
import SharedReportPostsDowntimeView from '@/views/Shared/SharedReportPostsDowntime/SharedReportPostsDowntimeView.vue';
import SharedReportAddedWorksView from '@/views/Shared/SharedReportAddedWorks/SharedReportAddedWorksView.vue';
import SharedReportCustomerSkipsView from '@/views/Shared/SharedReportCustomerSkipsView/SharedReportCustomerSkipsView.vue';
import { useDirectorUserStore } from '@/stores/director/directorUser.js';
import SharedReportCanceledWorksView from '@/views/Shared/SharedReportCanceledWorks/SharedReportCanceledWorksView.vue';
import SharedManageCalendarView from '@/views/Shared/SharedManageCalendar/SharedManageCalendarView.vue';
import SharedManageCustomerRecordsView from '@/views/Shared/SharedManageCustomerRecords/SharedManageCustomerRecordsView.vue';
import SharedAnalyticsPostsKpdView from '@/views/Shared/SharedAnalyticsPostsKpd/SharedAnalyticsPostsKpdView.vue';
import SharedAnalyticsReviewsView from '@/views/Shared/SharedAnalyticsReviews/SharedAnalyticsReviewsView.vue';
import SharedAnalyticsServiceKpd from '@/views/Shared/SharedAnalyticsServiceKpd/SharedAnalyticsServiceKpd.vue';
import SharedAnalyticsServiceWorkloadView from '@/views/Shared/SharedAnalyticsServiceWorkload/SharedAnalyticsServiceWorkloadView.vue';
import SharedReportPlateFakesView from '@/views/Shared/SharedReportPlateFakes/SharedReportPlateFakesView.vue';
import SharedAnalyticsServiceHistoryView from '@/views/Shared/SharedAnalyticsServiceHistory/SharedAnalyticsServiceHistoryView.vue';
import SharedReportSuspiciousPhonesView from '@/views/Shared/SharedReportSuspiciousPhones/SharedReportSuspiciousPhonesView.vue';

const directorRoutes = {
  path: '/director',
  children: [
    {
      path: 'auth',
      name: 'director.auth',
      component: SharedAuthView,
      meta: { title: 'Аутентификация' },
      props: { title: 'Панель директора' }
    },
    {
      path: 'manage',
      children: [
        {
          path: 'settings',
          name: 'director.manage.settings',
          component: SharedManageSettingsView,
          meta: { title: 'Настройки' }
        },
        {
          path: 'calendar',
          name: 'manage.calendar',
          component: SharedManageCalendarView,
          meta: { title: 'Календарь рабочих смен' }
        },
        {
          path: 'customer-records',
          name: 'manage.customer-records',
          component: SharedManageCustomerRecordsView,
          meta: { title: 'Записи клиентов' }
        }
      ]
    },
    {
      path: 'analytics',
      children: [
        {
          path: 'posts-kpd',
          name: 'director.analytics.posts-kpd',
          component: SharedAnalyticsPostsKpdView,
          meta: { title: 'КПД постов' }
        },
        {
          path: 'reviews',
          name: 'analytics.reviews',
          component: SharedAnalyticsReviewsView,
          meta: { title: 'Отзывы' }
        },
        {
          path: 'service-kpd',
          name: 'director.analytics.service-kpd',
          component: SharedAnalyticsServiceKpd,
          meta: { title: 'КПД сервиса' }
        },
        {
          path: 'service-workload',
          name: 'director.analytics.service.workload',
          component: SharedAnalyticsServiceWorkloadView,
          meta: { title: 'Загруженность сервиса' }
        },
        {
          path: 'service-history',
          name: 'director.analytics.service-history',
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
          name: 'director.report.posts-downtime',
          component: SharedReportPostsDowntimeView,
          meta: { title: 'Простои постов' }
        },
        {
          path: 'canceled-works',
          name: 'director.report.canceled-works',
          component: SharedReportCanceledWorksView,
          meta: { title: 'Заказанные, но не выполненные работы' }
        },
        {
          path: 'added-works',
          name: 'director.report.added-works',
          component: SharedReportAddedWorksView,
          meta: { title: 'Дополнительные работы' }
        },
        {
          path: 'customer-skips',
          name: 'director.report.customer-skips',
          component: SharedReportCustomerSkipsView,
          meta: { title: 'Не приехавшие клиенты' }
        },
        {
          path: 'plate-fakes',
          name: 'director.report.plate-fakes',
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
    },
    // >>> 404 REDIRECT <<<
    {
      path: ':pathMatch(.*)*',
      redirect: '/director/auth',
    }
  ],
};

function directorBeforeEach(to) {
  const directorUserStore = useDirectorUserStore();

  if (!directorUserStore.accessToken) {
    if (to.path === '/director/auth') {
      return true;
    } else {
      return '/director/auth';
    }
  }

  if (directorUserStore.accessToken) {
    if (to.path === '/director/auth' && directorUserStore.accessToken) {
      return '/director/manage/settings'
    } else {
      return true;
    }
  }

  return true;
}

export { directorRoutes, directorBeforeEach };
