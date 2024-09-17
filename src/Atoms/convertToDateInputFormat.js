export const convertToDateInputFormat = (dateString) => {
    if (dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    return;
};