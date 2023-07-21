import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../config/database";

class Facturas extends Model {
  id!: number;
  clienteId!: number;
  cantidad!: number[];
  total!: number;
};

Facturas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Facturas",
    timestamps: true,
  }
);

export { Facturas };
