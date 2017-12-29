export function plusOrMinus() {
  return Math.random() < 0.5 ? -1 : 1;
}

export function rand(min, max, point = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(point));
}
