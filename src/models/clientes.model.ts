import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../config/database";

class Clientes extends Model {
  id!: number;
  nombre!: string;
  cedula!: string;
  celular!: string;
  direccion!: string;
};

Clientes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    timestamps: true,
  }
);

export { Clientes };
