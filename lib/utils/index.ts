export const convertDate = (date: Date) => {
  return new Date(date).toLocaleDateString('fi-FI').toString()
}
export const getMonthAndYear = () => {
  return (new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2)).toString()
}
export const splitDate = (date: string) => {
  const newDate = date.split('-')
  return { year: newDate[0], month: newDate[1] }
}
