import {Sequelize} from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();
export const sequelize = new Sequelize(`${process.env.DB_URI}`);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Database connected successfully ${sequelize.config.database}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    await sequelize.close();
    process.exit(1);
  }
}


export { connectToDatabase };