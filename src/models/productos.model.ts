import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../config/database";

class Productos extends Model {
  id!: number;
  nombre!: string;
  descripcion!: string;
  img!: string;
  precio!: number;
  iva!: number;
  stock!: number;
};

Productos.init(
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
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    iva: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Productos",
    timestamps: true,
  }
);

export { Productos };
