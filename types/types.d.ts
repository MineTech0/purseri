export interface RecordFormData {
  name: string
  reason: string
  date: Date
  info: string
}
export interface RecordFormDataWithShip extends RecordFormData {
  shipId: string
}
export interface ShipFormData {
  name: string
  owner: string
  shipmaster: string
  idLetters: string
  imo: string
  gt: number
  power: number
  length: number
  nationality: string
  home: string
  address: string
  area: number
}
export interface FormResult {
  type: 'success' | 'error'
  message: string
}
