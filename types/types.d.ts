import { RecordFormData } from './types.d';
import { CrewMember } from './../lib/db/entity/CrewMember';
import { Record } from "../lib/db/entity/Record"

export interface RecordFormData {
  firstName: string
  lastName: string
  reason: string
  date: Date
  info: string
  birthDate: Date
}
export interface RecordFormDataWithShip extends RecordFormData {
  shipId: string
}
export interface RecordFormDataWithSocialNumber extends RecordFormData {
  socialSecurityNumber: string
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
export interface CrewMemberFormData {
  firstName: string
  lastName: string
  role: string
  socialSecurityNumber: string
}

export interface MemberRecord extends CrewMember {
  records: Record[]
}

interface MockMemberRecord {
  id: string
  firstName: string
  lastName: string
  role: string
  records: string[]
  socialSecurityNumber: string
}

export interface AllRecords {
  memberRecords: MemberRecord[];
  unnamedRecords: Record[]
}

