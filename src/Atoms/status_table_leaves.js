export const status_table_leaves = (status) => {
    if (status === "Approved") {
        return "bg-green-500"
    } else if (status === "Rejected") {
        return "bg-red-500"
    } else if (status === "Pending") {
        return "bg-orange-500"
    } else {
        return "bg-blue-500"
    }
}