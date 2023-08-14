import { Sequelize } from "sequelize";
const host = <string>process.env.HOST;
const username = <string>process.env.USER;
const password = <string>process.env.PASSWORD;
const database = <string>process.env.DATABASE;
const dbUri = <string>process.env.DATABASE_URL || <string>process.env.DB_URI;

const sequelize = new Sequelize(dbUri);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    // const [results, metadata] = await sequelize.query(`SELECT * FROM WideWorldImporters.Sales.Customers`);
    console.log("[db]*****DB_CONNECTED*****");
  } catch (e) {
    console.log("[db]*****ERROR_CONNECTING_DB*****");
    console.log(`Error: ${e}`);
  }
};

export { dbConnect, sequelize };
