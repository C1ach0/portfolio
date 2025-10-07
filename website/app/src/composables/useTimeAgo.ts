export function useTimeAgo(date: Date | number, interval: number | null = 30 * 1000) {
  const now = ref(new Date());
  let timer: number | undefined;

  onMounted(() => {
    if (interval !== null) {
      timer = window.setInterval(() => {
        now.value = new Date();
      }, interval);
    }
  });

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer);
  });

  const timeAgo = computed(() => {
    const target = typeof date === "number" ? new Date(date) : date;
    const diff = (target.getTime() - now.value.getTime()) / 1000; // secondes
    const abs = Math.abs(diff);

    // tableau des unités
    const units: [number, string][] = [
      [60, "seconde"], // < 60 -> secondes
      [60, "minute"],  // < 60 -> minutes
      [24, "heure"],   // < 24 -> heures
      [30, "jour"],    // < 30 -> jours
      [12, "mois"],    // < 12 -> mois
      [Number.POSITIVE_INFINITY, "an"], // sinon -> années
    ];

    let value = abs;
    let unit = "an";

    for (let i = 0; i < units.length; i++) {
      if (value < units[i][0]) {
        unit = units[i][1];
        break;
      }
      value = value / units[i][0];
    }

    value = Math.floor(value);
    const plural = value > 1 ? "s" : "";

    if (diff > 0) {
      return `dans ${value} ${unit}${plural}`;
    } else {
      return `il y a ${value} ${unit}${plural}`;
    }
  });

  return timeAgo;
}