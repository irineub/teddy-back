import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateClientsTable1731976378361 } from "./migrations/1731976378361-CreateClientsTable";
export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize:false,
    migrations: [CreateClientsTable1731976378361],

})