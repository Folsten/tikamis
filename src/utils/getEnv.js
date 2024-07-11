import router from '@/router/index.js'
export default function getEnv() {
   return router.currentRoute.value.fullPath.split('/')[1]
}