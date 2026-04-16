"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCanchaModel = exports.Cancha = void 0;
const sequelize_1 = require("sequelize");
class Cancha extends sequelize_1.Model {
}
exports.Cancha = Cancha;
const initCanchaModel = (sequelize) => {
    Cancha.init({
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
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Cancha',
        tableName: 'canchas',
    });
};
exports.initCanchaModel = initCanchaModel;
