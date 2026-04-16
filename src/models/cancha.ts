import { Model, DataTypes, Sequelize } from 'sequelize';

export class Cancha extends Model {
  public id!: number;
  public club!: string;
  public city!: string;
  public state!: string;
  public type!: 'Trinquete' | 'Frontón' | 'Cajón';
  public maps_location!: string;
  // TODO: type number???
  public phone!: string;
  // TODO: type image url???
  public image!: string;
  public address!: string | null;
}

export const initCanchaModel = (sequelize: Sequelize) => {
  Cancha.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    club: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Trinquete', 'Frontón', 'Cajón'),
      allowNull: false,
    },
    maps_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Cancha',
    tableName: 'canchas',
  });
};