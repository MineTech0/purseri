import { RecordFormData } from './../types.d';
import { Record } from './../lib/db/entity/Record';
import instance from "./instance";


class RecordService {
    async getOne(id: string) { 
        return await instance.get<Record>(`/records/${id}`);
    }
    async getAll() { 
        return await instance.get<Record[]>(`/records`);
    }
    async create(formData: RecordFormData){
        return await instance.post<Record>("/records", formData);
    }
}
export default new RecordService