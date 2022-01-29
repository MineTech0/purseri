import { Ship } from "../lib/db/entity/Ship";
import { ShipFormData } from "../types/types";
import instance from "./instance";


class RecordService {
    async getOne(id: string) { 
        return await instance.get<Ship>(`/ships/${id}`);
    }
    async getAll() { 
        return await instance.get<Ship[]>(`/ships`);
    }
    async create(formData: ShipFormData){
        return await instance.post<Ship>("/ships", formData);
    }
}
export default new RecordService