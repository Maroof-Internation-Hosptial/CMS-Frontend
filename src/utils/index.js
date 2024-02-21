import moment from "moment";
export const convertToUnix = (date, time) => {
  const dateTimeString = date + " " + time;
  const dateTime = moment(dateTimeString, "YYYY-MM-DD HH:mm");
  const unixTimestamp = dateTime.unix();
  return unixTimestamp;
};

export function convertMinutes(minutes) {
  if (minutes < 0) {
    return "Input must be a non-negative number.";
  }
  const duration = moment.duration(minutes, "minutes");
  const days = duration.days();
  const hours = duration.hours();
  let result = "";
  if (days > 0) {
    result += days + " days ";
  }
  if (hours > 0) {
    result += hours + " hours";
  }
  if (days === 0 && hours === 0) {
    result = "less than an hour";
  }
  return result;
}

export function isActive(lastActiveDate) {
  const inputDate = new Date(lastActiveDate);
  const currentDate = new Date();
  const timeDifference = currentDate - inputDate;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return daysDifference >= 30;
}

export function deepEqual(objA, objB) {
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  )
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!objB.hasOwnProperty(key) || !deepEqual(objA[key], objB[key]))
      return false;
  }

  return true;
}

export function calculatePercentage(ratings) {
  if (ratings.length === 0) {
    return 0;
  }
  const averageRating =
    ratings.reduce((total, rating) => total + rating.rating, 0) /
    ratings.length;
  const successPercentage = Math.floor((averageRating / 5) * 100);
  return successPercentage;
}
