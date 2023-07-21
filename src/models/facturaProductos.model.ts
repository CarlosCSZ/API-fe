import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../config/database";

class FacturasProductos extends Model {
  facturaId!: number;
  productoId!: number;
  cantidad!: number;
}

FacturasProductos.init(
  {
    facturaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize,
    modelName: "FacturasProductos",
    timestamps: true,
  }
);

export { FacturasProductos };
