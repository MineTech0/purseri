import { User } from 'next-auth';

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
/**
 * @returns like `101020`
 */
export const convertBirthDateToString = (date: Date) => {
  return ('0' + (new Date(date).getDate())).slice(-2) + ('0' + (new Date(date).getMonth()+1)).slice(-2) + (new Date(date).getFullYear()).toString().slice(-2)
}
export const isAllowedToAccess = (user: User) => {
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(',').map(email => email.trim()) || []
  return user.email ? allowedEmails.includes(user.email) : false
}

