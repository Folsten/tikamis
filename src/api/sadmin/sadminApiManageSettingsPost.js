import { sadminApiClient } from '@/api/sadminApiClient.js'

export default async function (
  carCenterId,
  login,
  password,
  bookingAvailable,
  postsEquipment,
  shiftsStart,
  shiftsFinish,
  timezoneOffsetHours,
  clearanceMinutes,
  orderDepthDays
) {
  const response = await sadminApiClient.post('manage/settings', {
    carCenterId,
    login,
    password,
    bookingAvailable,
    postsEquipment,
    shiftsStart,
    shiftsFinish,
    timezoneOffsetHours,
    clearanceMinutes,
    orderDepthDays
  });
  return response;
}
