import {createConnection} from "typeorm";

 const connection = async () => await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "purseri",
    entities: ["/entity/*{.js,.ts}"],
    migrations: ["/migration/*{.js,.ts}"],
    synchronize: true
 });

 export default connection