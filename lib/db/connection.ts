/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, getConnectionManager, ConnectionOptions, createConnection } from 'typeorm'

import { CrewMember } from './entity/CrewMember'
import {
  AccountEntity,
  SessionEntity,
  UserEntity,
  VerificationTokenEntity,
} from './entity/entities'
import { Record } from './entity/Record'
import { Ship } from './entity/Ship'

export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number.parseInt(process.env.TYPEORM_PORT as string),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: ['query', 'error'],
}
const allEntities = [
  Record,
  Ship,
  UserEntity,
  SessionEntity,
  VerificationTokenEntity,
  AccountEntity,
  CrewMember,
]

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true
  }

  return false
}

async function updateConnectionEntities(connection: Connection, entities: any[]) {
  if (!entitiesChanged(connection.options.entities as any[], entities)) return

  // @ts-ignore
  connection.options.entities = entities

  // @ts-ignore
  connection.buildMetadatas()

  if (connection.options.synchronize) {
    await connection.synchronize()
  }
}

/**
 * @see https://github.com/typeorm/typeorm/issues/6241#issuecomment-643690383
 * @param name name of the connection
 */
export async function getConn(name: string = 'Conn1'): Promise<Connection> {
  const connectionManager = getConnectionManager()

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name)

    if (!connection.isConnected) {
      await connection.connect()
    }

    
    await updateConnectionEntities(connection, allEntities as any[])
    

    return connection
  }

  return createConnection({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number.parseInt(process.env.TYPEORM_PORT as string),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: ['error'],
    entities: [
      Record,
      Ship,
      UserEntity,
      SessionEntity,
      VerificationTokenEntity,
      AccountEntity,
      CrewMember,
    ],
    name:'Conn1',
    synchronize: true,
  })
}
