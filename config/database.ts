import { Sequelize } from "sequelize";
const host = <string>process.env.HOST;
const username = <string>process.env.USER;
const password = <string>process.env.PASSWORD;
const database = <string>process.env.DATABASE;

const sequelize = new Sequelize(database, username, password, {
  dialect: "mssql",
  host,
  port: 1433,
  logging: true
});

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    // const [results, metadata] = await sequelize.query(`SELECT * FROM WideWorldImporters.Sales.Customers`);
    console.log("[db]*****DB_CONNECTED*****");
  } catch (e) {
    console.log("[db]*****ERROR_CONNECTING_DB*****");
    console.error(`Error: ${e}`);
  }
};

export { dbConnect, sequelize };
