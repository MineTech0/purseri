import { CrewMemberFormData } from '../types/types';
import { CrewMember } from './../lib/db/entity/CrewMember';
import instance from "./instance";

class ShipCrewMemberService {

    async addCrewMember(shipId:string, formData: CrewMemberFormData){
        return (await instance.post<CrewMember>(`/ships/${shipId}/crew`, formData)).data;
    }

    async editCrewMember(shipId:string, memberId:string, formData: CrewMemberFormData){
        return (await instance.put<CrewMember>(`/ships/${shipId}/crew/${memberId}`, formData)).data;
    }
}

export default new ShipCrewMemberService