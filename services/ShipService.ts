import { Ship } from "../lib/db/entity/Ship";
import { ShipFormData } from "../types/types";
import instance from "./instance";


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

}
export default new ShipService