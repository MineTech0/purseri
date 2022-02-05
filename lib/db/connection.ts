import { Connection, getConnectionManager, ConnectionOptions } from "typeorm";
import allEntities from "./allEntities";

export const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: Number.parseInt(process.env.TYPEORM_PORT as string),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: ["query", "error"]
};

export const options: Record<string, ConnectionOptions> = {
  default: {
    ...connectionOptions,
    synchronize: true,
    entities: allEntities,
  },
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[]
) {
  if (!entitiesChanged(connection.options.entities as any[], entities)) return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

/**
 * @see https://github.com/typeorm/typeorm/issues/6241#issuecomment-643690383
 * @param name name of the connection
 */
export async function getConn(
  name: string = "default"
): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    if (process.env.NODE_ENV !== "production") {
      await updateConnectionEntities(connection, options[name].entities as any[]);
    }

    return connection;
  }

  return connectionManager.create({ name, ...options[name] }).connect();
}