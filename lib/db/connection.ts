import { Record } from './entity/Record';
import 'reflect-metadata';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

export async function connection() {
  const options = await getConnectionOptions()
  try {
    const conn = getConnection();
    return conn;
  } catch (e) {
    return createConnection({
      entities: [Record],
      ...options
    });
  }
}

export default connection