import { Record } from '../lib/db/entity/Record'
import { AllRecords, RecordFormData } from '../types/types'
import instance from './instance'

class ShipRecordService {
  async addRecord(shipId: string, formData: RecordFormData) {
    return (await instance.post<Record>(`/ships/${shipId}/records`, formData)).data
  }

  async getShipRecords(shipId: string, monthAndYear: string) {
    return (await instance.get<AllRecords>(`/ships/${shipId}/records?monthAndYear=${monthAndYear}`)).data
  }
}
export default new ShipRecordService()
