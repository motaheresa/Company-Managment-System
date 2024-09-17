export const formatToISO8601 = (event) => {
  const dateString = event.target.value;
  if (dateString) {
    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString();
  }
  return null;
};