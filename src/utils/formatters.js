/**
 * Formats a Date object to appear as dd/mm/yyyy. Didn't want to add momentjs just for this. 
 * 
 * @param {Date} date 
 */
export function formatDate(date) {
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  const year = String(date.getFullYear());

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return `${day}/${month}/${year}`;
}

/**
 * Formats the representation of an audio/video duration, by removing the hours part if the
 * duration is under 1 hour
 *  
 * @param {string} duration in the format 'hh:mm:ss' or as seconds
 */
export function formatDuration(duration) {
  if (duration === undefined || duration === "") {
    return "unknown";
  }

  const timePieces = isNaN(duration)
    ? durationAsString(duration)
    : durationAsSeconds(parseInt(duration, 10));
  return timePieces
    .map(timePiece => parseInt(timePiece, 10))
    .map(timePiece => timePiece < 10 ? `0${timePiece}` : timePiece)
    .join(":");
}

function durationAsString(durationStr) {
  const timePieces = durationStr.split(":");
  let hours = timePieces[0];
  if (parseInt(hours, 10) === 0) hours = undefined;
  timePieces[0] = hours;
  return timePieces.filter(timePiece => timePiece !== undefined);
}

function durationAsSeconds(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = Math.floor(totalSeconds % 3600 % 60);
  return [hours, minutes, seconds];
}
