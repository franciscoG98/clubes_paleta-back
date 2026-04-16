"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const cancha_1 = require("./cancha");
const pendingCancha_1 = require("./pendingCancha");
require("dotenv/config");
const sequelize = new sequelize_1.Sequelize(process.env.PSQL_CONNECTION_STRING, {
    dialect: 'postgres',
});
// check conection
sequelize.authenticate().then(() => {
    console.log(`Database connected to canchas`);
    // TODO: type error
}).catch((err) => {
    console.log('Connection error: ', err);
});
(0, cancha_1.initCanchaModel)(sequelize);
(0, pendingCancha_1.initPendingCanchaModel)(sequelize);
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    Cancha: cancha_1.Cancha,
    PendingCancha: pendingCancha_1.PendingCancha
};
exports.default = db;
