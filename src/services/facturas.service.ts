import puppeteer from "puppeteer";

import { CrearFacturaDTO, FacturasDTO } from "../dtos/factura.dto";
import { Clientes } from "../models/clientes.model";
import { FacturasProductos } from "../models/facturaProductos.model";
import { models } from "../models/index.model";
import { productoPorId } from "./producto.service";
import { compileHbs } from "../utils/handleHbs";

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

const imprimirTemplate = async (id: number) => {
  try {
    const factura = <FacturasDTO>await facturaPorId(id);
    console.log('factura: ', factura)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compileHbs(factura);
    console.log('content: ', content)

    await page.setContent(content);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: `facturaElectronica_${factura.cliente.nombre}.pdf`,
      format: 'A4',
      printBackground: true
    });

    await page.close()
    return true

  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }

}

export {
  todosFacturas,
  facturaPorId,
  clientePorFactura,
  productosPorFactura,
  guardarFactura,
  imprimirTemplate
};
