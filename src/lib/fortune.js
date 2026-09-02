const LEGENDARY_CHANCE = 0.02;

export function pickDistinct(list, current) {
  if (list.length <= 1) return list[0] ?? "";
  let next = current;
  while (next === current) {
    next = list[Math.floor(Math.random() * list.length)];
  }
  return next;
}

// Sortea un mensaje normal, o —con ~2% de probabilidad— un presagio legendario.
export function drawFortune(list, legendaryList, currentMessage) {
  const legendary = legendaryList.length > 0 && Math.random() < LEGENDARY_CHANCE;
  const message = pickDistinct(legendary ? legendaryList : list, currentMessage);
  return { message, legendary };
}
