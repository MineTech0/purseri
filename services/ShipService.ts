import { CrewMemberFormData, RecordFormData } from './../types/types.d';
import { Ship } from "../lib/db/entity/Ship";
import { ShipFormData } from "../types/types";
import instance from "./instance";
import { Record } from '../lib/db/entity/Record';
import { CrewMember } from '../lib/db/entity/CrewMember';


class ShipService {
    async getOne(id: string) { 
        return (await instance.get<Ship>(`/ships/${id}`)).data;
    }

    async getAll() { 
        return (await instance.get<Ship[]>(`/ships`)).data;
    }

    async create(formData: ShipFormData){
        return (await instance.post<Ship>("/ships", formData)).data;
    }

    async addRecord(shipId:string, formData: RecordFormData){
        return (await instance.post<Record>(`/ships/${shipId}/records`, formData)).data;
    }

    async getShipRecords(shipId: string) { 
        return (await instance.get<Record[]>(`/ships/${shipId}/records`)).data;
    }

    async getShipRecordByName(shipId: string) { 
        return (await instance.get<Record[]>(`/ships/${shipId}/records?name=true`)).data;
    }

    async addCrewMember(shipId:string, formData: CrewMemberFormData){
        return (await instance.post<CrewMember>(`/ships/${shipId}/crew`, formData)).data;
    }
}
export default new ShipService