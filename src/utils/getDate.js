export default date => {
  if (!Array.isArray(date)) return date;
  return date.slice(0, 3).join("-") + " " + date.slice(3).join(":");
};
