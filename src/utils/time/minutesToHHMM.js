export default function minutesToHHMM(value) {
  let hours = (value / 60).toFixed(0);
  hours = hours.length === 2 ? hours : '0' + hours;
  let minutes = String(value % 60);
  minutes = minutes.length === 2 ? minutes : '0' + minutes;
  return hours + ':' + minutes;
}