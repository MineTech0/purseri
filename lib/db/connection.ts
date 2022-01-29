import 'reflect-metadata'
import { createConnection, getConnection, getConnectionOptions } from 'typeorm'
import allEntities from './allEntities'

let connectionCreated = false

export default async function connection() {
  const options = await getConnectionOptions()
  Object.assign(options, { entities: allEntities })
  try {
    const currentConnection = getConnection()
    if (connectionCreated) {
      return currentConnection
    }
    await currentConnection.close()
  } catch (e) {
    // ignore connection error
  }
  connectionCreated = true
  return await createConnection(options)
}
