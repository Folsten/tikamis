export default function HHMMtoMinutes(value) {
  let time = value.split(':');
  let hoursPart = Number(time[0]) * 60;
  let minutesPart = Number(time[1]);
  return hoursPart + minutesPart;
}