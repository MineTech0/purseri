import { CrewMemberFormData } from '../types/types'
import { CrewMember } from './../lib/db/entity/CrewMember'
import instance from './instance'

class ShipCrewMemberService {
    async addCrewMember(shipId: string, formData: CrewMemberFormData) {
        return (await instance.post<CrewMember>(`/ships/${shipId}/crew`, formData)).data
    }

    async editCrewMember(shipId: string, memberId: string, formData: CrewMemberFormData) {
        return (await instance.put<CrewMember>(`/ships/${shipId}/crew/${memberId}`, formData)).data
    }

    async deleteCrewMember(shipId: string, memberId: string) {
        return (await instance.delete<boolean>(`/ships/${shipId}/crew/${memberId}`)).data
    }

    async findCrewMember(shipId: string, memberId: string) {
        return (await instance.get<boolean>(`/ships/${shipId}/crew/${memberId}`)).data
    }

    async findCrewMemberByName(
        shipId: string,
        firstName: string,
        lastName: string,
        birthDate: string
    ) {
        return (await instance.get<boolean>(`/ships/${shipId}/crew/?firstName=${firstName}&lastName=${lastName}&birthDate=${birthDate}`)).data
    }
}

export default new ShipCrewMemberService()
