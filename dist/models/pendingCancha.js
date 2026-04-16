"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPendingCanchaModel = exports.PendingCancha = void 0;
const sequelize_1 = require("sequelize");
class PendingCancha extends sequelize_1.Model {
}
exports.PendingCancha = PendingCancha;
const initPendingCanchaModel = (sequelize) => {
    PendingCancha.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        club: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: sequelize_1.DataTypes.ENUM('Trinquete', 'Frontón', 'Cajón'),
            allowNull: false,
        },
        maps_location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            // allowNull: false,
            allowNull: true,
        },
        pending: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'PendingCancha',
        tableName: 'pendingCanchas',
    });
};
exports.initPendingCanchaModel = initPendingCanchaModel;
