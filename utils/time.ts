export function getTimeAfterShiftFromUTC(shiftInSeconds: number) {
  const nowUTC = new Date(new Date().toUTCString());
  const shiftedTime = new Date(nowUTC.getTime() + shiftInSeconds * 1000);

  const hours = Number(shiftedTime.getUTCHours());
  const minutes = String(shiftedTime.getUTCMinutes()).padStart(2, "0");

  if (hours === 0) {
    return {
      hour: String(0).padStart(2, "0"),
      minutes,
      ampm: "AM",
    };
  } else if (hours < 12) {
    return {
      hour: String(hours).padStart(2, "0"),
      minutes,
      ampm: "AM",
    };
  } else {
    return {
      hour: String((12 - hours) * -1),
      minutes,
      ampm: "PM",
    };
  }
}

export function getSeconds() {
  const now = new Date();
  return now.getSeconds();
}
