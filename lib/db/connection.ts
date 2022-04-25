/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, getConnectionManager, createConnection } from 'typeorm'

import { CrewMember } from './entity/CrewMember'
import {
  AccountEntity,
  SessionEntity,
  UserEntity,
  VerificationTokenEntity,
} from './entity/entities'
import { Record } from './entity/Record'
import { Ship } from './entity/Ship'

const allEntities = [
  CrewMember,
  Record,
  Ship,
  UserEntity,
  SessionEntity,
  VerificationTokenEntity,
  AccountEntity,
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
    url: process.env.DATABASE_URL,
    type: 'postgres',
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
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
  }
  })
}
