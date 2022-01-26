import { Record } from './entity/Record';
import 'reflect-metadata';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { Ship } from './entity/Ship';

export async function connection() {
  const options = await getConnectionOptions()
  try {
    const conn = getConnection();
    return conn;
  } catch (e) {
    return createConnection({
      entities: [Record, Ship],
      ...options
    });
  }
}

export default connection