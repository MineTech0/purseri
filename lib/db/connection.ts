import 'reflect-metadata';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import allEntities from './allEntities';

export async function connection() {
  const options = await getConnectionOptions()
  Object.assign(options, { entities:allEntities});
  try {
    const conn = getConnection();
    return conn;
  } catch (e) {
    return createConnection(options);
  }
}

export default connection