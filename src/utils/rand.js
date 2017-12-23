export default function rand(min, max, point = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(point));
}
