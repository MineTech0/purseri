import { ConnectionOptions } from "typeorm"

const options: ConnectionOptions =  {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "purseri",
    "migrations": ["../lib/db/migration/*{.js,.ts}"],
    "synchronize": true,
    "cli": {
        "entitiesDir": "lib/db/entity/",
        "migrationsDir": "lib/db/migration"
    }
 }
 export default options