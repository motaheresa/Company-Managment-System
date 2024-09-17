export const getTimeFromDate = (date) => {
    if (date) {
        const timeString = date.split('T')[1].split('.')[0];
        return timeString
    }
    return null
}