export const formatNumber = (num) => {
    return num.toLocaleString(undefined, { minimumFractionDigits: 0 })
}