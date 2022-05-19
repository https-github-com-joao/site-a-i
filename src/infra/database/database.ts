import { knex, Knex } from "knex";
import { attachPaginate } from "knex-paginate";
import { config } from "../../config";

const connDB = knex({
  client: "postgres",
  connection: {
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password,
    charset: "latin1",
  },
  pool: {
    min: 2,
    max: 30,
  },
});

attachPaginate();

export { connDB, knex, Knex };
