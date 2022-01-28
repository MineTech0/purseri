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
}
export interface FormResult {
  type: 'success' | 'error'
  message: string
}
