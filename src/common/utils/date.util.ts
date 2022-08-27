export const dayToSeconds = (day: string) => {
  if (day.slice(day.length - 1) === 'm') {
    return parseInt(day.slice(0, -1)) * 60;
  } else if (day.slice(day.length - 1) === 'h') {
    return parseInt(day.slice(0, -1)) * 60 * 60;
  } else if (day.slice(day.length - 1) === 'd') {
    return parseInt(day.slice(0, -1)) * 60 * 60 * 24;
  } else {
    return parseInt(day);
  }
};
