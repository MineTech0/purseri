export const convertDate = (date: Date) => {
    return (new Date(date).toLocaleDateString('fi-FI')).toString()
}
