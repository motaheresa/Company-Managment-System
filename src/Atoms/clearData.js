export const clearData = (data) => {
    Object.keys(data).map(ele => data[ele] = "")
    return data;
}