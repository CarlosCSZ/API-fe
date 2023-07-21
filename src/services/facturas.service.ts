import { CrearFacturaDTO, FacturasDTO } from "../dtos/factura.dto";
import { Clientes } from "../models/clientes.model";
import { FacturasProductos } from "../models/facturaProductos.model";
import { models } from "../models/index.model";
import { productoPorId } from "./producto.service";

const todosFacturas = async () => {
  try {
    return await models.Facturas.findAll();
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const facturaPorId = async (id: number) => {
  try {
    return await models.Facturas.findByPk(id, {
      include: [
        {
          model: Clientes,
          as: "cliente",
        },
        {
          model: FacturasProductos,
          as: "productos",
        },
      ],
    });
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const clientePorFactura = async (id: number) => {
  try {
    const factura = <FacturasDTO>await models.Facturas.findByPk(id, {
      include: [
        {
          model: Clientes,
          as: "cliente",
        },
        {
          model: FacturasProductos,
          as: "productos",
        },
      ],
    });

    return factura.cliente;
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const productosPorFactura = async (id: number) => {
  try {
    const factura = <FacturasDTO>await models.Facturas.findByPk(id, {
      include: [
        {
          model: Clientes,
          as: "cliente",
        },
        {
          model: FacturasProductos,
          as: "productos",
        },
      ],
    });

    return factura.productos;
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const guardarFactura = async (body: CrearFacturaDTO) => {
  try {
    const { clienteId, productos, cantidad } = body;
    let total = 0;

    for (let i = 0; i < productos.length; i++) {
      const producto = await productoPorId(productos[i]);
      if (!producto) {
        throw new Error("Producto no registrado");
      }

      const totalProducto = producto.precio * cantidad[i];
      if (producto.iva === 0) {
        total += totalProducto;
      } else {
        total += (totalProducto * producto.iva) / 100 + totalProducto;
      }
      producto.stock = producto.stock - cantidad[i];
      await producto.save();
    }

    const factura = await models.Facturas.create({ clienteId, total });

    for (let i = 0; i < productos.length; i++) {
      await models.FacturasProductos.create({
        facturaId: factura.id,
        productoId: productos[i],
        cantidad: cantidad[i],
      });
    }

    return factura;
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

export {
  todosFacturas,
  facturaPorId,
  clientePorFactura,
  productosPorFactura,
  guardarFactura,
};
