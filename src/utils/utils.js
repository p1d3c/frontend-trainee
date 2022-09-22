export function getDate(string) {
  let time = new Date(string * 1000);
  return (time = time.toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }));
}

export const sortByTime = (a, b) => {
  return b.time - a.time;
};
