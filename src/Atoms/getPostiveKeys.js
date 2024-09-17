export const getPostiveKeys = (data) => {
    for (let key in data) {
        data[key] = +data[key];
    }
}