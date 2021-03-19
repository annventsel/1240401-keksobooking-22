
const URL = 'https://22.javascript.pages.academy/keksobooking';

const ERROR_TEXT = 'Ошибка при загрузке данных';

const getData = (onSuccess, onFail) => {
  fetch(`${URL}/data`)
    .then((response) =>
      response.json(),
    )
    .then((data) =>
      onSuccess(data),
    )
    .catch(() => onFail(ERROR_TEXT))
}

const sendData = (onSuccess, onFail, data) => {
  fetch(URL,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess()
      } else {
        onFail()
      }
    })
    .catch(() => {
      onFail()
    })
}

export {
  getData,
  sendData
}

// ++
