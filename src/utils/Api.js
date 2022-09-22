export const getNewsId = () => {
  return fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
};

export const getData = (id) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
};
