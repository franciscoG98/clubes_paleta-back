import { Sequelize } from 'sequelize';
import { initCanchaModel, Cancha } from './cancha';
import { initPendingCanchaModel, PendingCancha } from './pendingCancha';
import 'dotenv/config'

const sequelize = new Sequelize(process.env.PSQL_CONNECTION_STRING as string, {
  dialect: 'postgres',
});

// check conection
sequelize.authenticate().then(() => {
  console.log(`Database connected to canchas`)
  // TODO: type error
}).catch((err: any) => {
  console.log('Connection error: ', err)
})

initCanchaModel(sequelize);
initPendingCanchaModel(sequelize);

const db: any = {
  sequelize,
  Sequelize,
  Cancha,
  PendingCancha
};

export default db;
