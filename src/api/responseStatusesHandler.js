export function responseStatusesHandler(response) {
  if (response.status === 409) {
    alert(response.data);
  }
  if (
    response.status > 400 &&
    response.status !== 409 &&
    response.status !== 401
  ) {
    alert(`Произошла ошибка на сервере, код ошибки ${response.status}`);
  }
}